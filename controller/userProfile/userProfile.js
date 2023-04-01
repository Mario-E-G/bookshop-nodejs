const userModel = require("../../model/userModel");
const bookReviewModel = require("../../model/bookReviewModel");
const jwt = require("jsonwebtoken");
const reviewModel = require("../../model/review");
require("dotenv").config();
const USER_TOKEN_KEY = process.env.USER_TOKEN_KEY;

//////////////////////////User Profile////////////////////////////////////////////////////////
// const userProfile = async (req, res) => {
//     if (req.query.page && req.query.limit) {
//         const pagination = {
//             Page: req.query.page,
//             Limit: req.query.limit,
//         };
//         if (pagination.Limit > 8) {
//             pagination.Limit = 8;
//         }
//         //           http://localhost:6000/profile?page=3&limit=2
//         const userTable = await bookReviewModel
//             .find()
//             .skip((pagination.Page - 1) * pagination.Limit)
//             .limit(pagination.Limit)
//             .populate([
//                 {
//                     path: 'book_id',
//                     model: 'book',
//                     select: 'author_id name image_url',
//                     populate: {
//                         path: 'author_id',
//                         model: 'author',
//                         select: 'first_name last_name',
//                     }
//                 }
//             ])
//         return res.send({ Message: "User Profile", pagination: pagination, Data: userTable });
//     } else {
//         const pagination = {
//             Page: 1,
//             Limit: 8,
//         };
//         const userTable = await bookReviewModel
//             .find()
//             .skip((pagination.Page - 1) * pagination.Limit)
//             .limit(pagination.Limit)
//             .populate([
//                 {
//                     path: 'book_id',
//                     model: 'book',
//                     select: 'author_id name image_url',
//                     populate: {
//                         path: 'author_id',
//                         model: 'author',
//                         select: 'first_name last_name',
//                     }
//                 }
//             ])
//         return res.send({ Message: "User Profile", pagination: pagination, Data: userTable });
//     }
// }

/*--------------------------====UPDATE BOOK REVIEW====----------------------------------------------------*/
const updateBookReview = async (req, res) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res
        .status(400)
        .send({ Message: "You can't access without token key" });
    }

    const userToken = jwt.verify(token, USER_TOKEN_KEY);
    const filter = {
      book_id: req.params.id,
      user_id: userToken.user_id,
    };
    const update = { ...req.body };
    //filter book and uodate rate
    const bookReviewAfterUpdate = await bookReviewModel.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    if (bookReviewAfterUpdate) {
      // - update - averageRate -
      const update_average_rate = await bookReviewModel.aggregate([
        { $group: { _id: "$book_id", avg_val: { $avg: "$rate" } } },
      ]);
      // console.log(update_average_rate);
      update_average_rate.forEach(async (book) => {
        await bookReviewModel.updateMany(
          { book_id: book._id },
          { $set: { average_rate: book.avg_val } }
        );
      });
      //get book after being updated
      const bookReviewAfterUpdate = await bookReviewModel.findOne(filter);
      return res.status(200).send(bookReviewAfterUpdate);
    } else {
      return res.status(404).send({ Message: "Wrong book id or user id" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error with Book Review" });
  }
};

//--------------------------====Add BOOK REVIEW====-------------------------------------------------------
const addBookReview = async (req, res) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res
        .status(400)
        .send({ Message: "You can't access without token key" });
    }

    const userToken = jwt.verify(token, USER_TOKEN_KEY);
    const newBookReview = {
      book_id: req.body.book_id,
      user_id: userToken.user_id,
    };

    const existingReview = await bookReviewModel.findOne({
      $and: [
        { book_id: newBookReview.book_id },
        { user_id: newBookReview.user_id },
      ],
    });
    if (existingReview) {
      return res.status(400).send({
        Message: "You already have the book, You can update and delete it",
      });
    }
    // console.log("book_id: " + req.body.book_id, "user_id:" + userToken.user_id);
    const bookReview = await bookReviewModel.create({
      book_id: req.body.book_id,
      user_id: userToken.user_id,
    });

    if (bookReview) {
      return res.status(200).send(bookReview);
    } else {
      return res.status(404).send({ Message: "Wrong book id or user id" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

const addReviewText = async (req, res) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res
        .status(400)
        .send({ Message: "You can't access without token key" });
    }

    const userToken = jwt.verify(token, USER_TOKEN_KEY);
    const newBookReview = {
      book_id: req.params.book_id,
      user_id: req.params.user_id,
      review: req.body.review,
    };
    // console.log("book_id: " + req.body.book_id, "user_id:" + userToken.user_id);
    const bookReview = await reviewModel.create(newBookReview);

    if (bookReview) {
      const allReviews = await reviewModel.find({}).populate("user_id");
      return res.status(200).send({ review: allReviews, addedReview: bookReview, Message: "Review Added Successfully" });
      return res.status(200).send(bookReview);
    } else {
      return res.status(404).send({ Message: "Wrong book id or user id" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

//--------------------------====GET ALL BOOK REVIEW FOR SPECIFIC USER====-----------------------------------
const getBookReview = async (req, res) => {
  try {
    const book_id = req.params.id;
    const bookReview = await bookReviewModel
      .find({
        $and: [
          { book_id: book_id },
          { review: { $ne: null } },
          { review: { $ne: "" } },
        ],
      }) //{ pictures: { $exists: true, $ne: [] } }
      .populate([
        {
          path: "user_id",
          model: "user",
          select: "first_name last_name image_url",
        },
      ]);
    if (bookReview) {
      return res.status(200).send(bookReview);
    } else {
      return res.status(404).send({ Message: "Wrong user id" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error in retrieving book review" });
  }
};

//--------------------------====FILTER BOOK REVIEW BY STATUS WITH PAGINATION====-------------------------------------------
// const getFilterdBookReview = async (req, res) => {
//   try {
//     const user_id = req.params.id;
//     if (req.query.filter == "all" || req.query.filter == 'null') {
//       const book = await bookReviewModel.find({ user_id: user_id }).populate([
//         {
//           path: "book_id",
//           model: "book",
//           select: "author_id name image_url",
//           populate: {
//             path: "author_id",
//             model: "author",
//             select: "first_name last_name",
//           },
//         },
//       ]);
//       return res.status(200).send(book);
//     }

//     //  http://localhost:5000/profile/:id?filter=New&page=1&limit=1
//     //  will get books matched with filter
//     if (req.query.filter && req.query.page && req.query.limit) {
//       const pagination_status = {
//         Status: req.query.filter,
//       };
//       const pagination_page = {
//         Page: req.query.page,
//         Limit: req.query.limit,
//       };
//       const filterdBooksByStatus = await bookReviewModel
//         .find({ user_id: user_id, book_status: pagination_status.Status })
//         .skip((pagination_page.Page - 1) * pagination_page.Limit)
//         .limit(pagination_page.Limit)
//         .populate([
//           {
//             path: "book_id",
//             model: "book",
//             select: "author_id name image_url",
//             populate: {
//               path: "author_id",
//               model: "author",
//               select: "first_name last_name",
//             },
//           },
//         ]);
//       if (filterdBooksByStatus.length > 0) {
//         return res.status(200).send(filterdBooksByStatus);
//       } else {
//         return res.status(404).send({ Message: "No books with this status" });
//       }
//       //              http://localhost:5000/profile/id                 ------->   by defualt
//       //  will get all books for specific user
//     } else {
//       const pagination_status = {
//         Status: req.query.filter,
//       };

//       if (req.query.filter) {
//         const filterdBooksByStatus = await bookReviewModel
//           .find({
//             user_id: user_id,
//             book_status: pagination_status.Status,
//           })
//           .limit(8)
//           .populate([
//             {
//               path: "book_id",
//               model: "book",
//               select: "author_id name image_url",
//               populate: {
//                 path: "author_id",
//                 model: "author",
//                 select: "first_name last_name",
//               },
//             },
//           ]);

//         return res.status(200).send(filterdBooksByStatus);
//       }

//       let pagination_page;
//       if (req.query.page && req.query.limit) {
//         pagination_page = {
//           Page: req.query.page,
//           Limit: req.query.limit,
//         };
//       } else {
//         pagination_page = {
//           Page: 1,
//           Limit: 2,
//         };
//       }
//       const filterdBooksByStatus = await bookReviewModel
//         .find({ user_id: user_id })
//         .skip((pagination_page.Page - 1) * pagination_page.Limit)
//         .limit(pagination_page.Limit)
//         .populate([
//           {
//             path: "book_id",
//             model: "book",
//             select: "author_id name image_url",
//             populate: {
//               path: "author_id",
//               model: "author",
//               select: "first_name last_name",
//             },
//           },
//         ]);
//       if (filterdBooksByStatus.length > 0) {
//         return res.status(200).send(filterdBooksByStatus);
//       } else {
//         return res.status(200).send({ Message: "No books with this status" });
//       }
//     }
//   } catch (error) {
//     return res.status(500).send({ Message: "Error in retrieving book review" });
//   }
// };

//--------------------------====FILTER BOOK REVIEW BY STATUS WITH (NO) PAGINATION====-------------------------------------------
const getFilterdBookReview = async (req, res) => {
  try {
    const token = req.headers["access-token"];
    if (!token) {
      return res
        .status(400)
        .send({ Message: "You can't access without token key" });
    }

    const user_id = req.params.id;
    const filter = req.query.filter;

    if (req.query.filter == 'null') {
      const book = await bookReviewModel.find({ user_id: user_id }).populate([
        {
          path: "book_id",
          model: "book",
          select: "author_id name image_url",
          populate: {
            path: "author_id",
            model: "author",
            select: "first_name last_name",
          },
        },
      ]);

      if (book) {
        return res.status(200).send(book);
      } else {
        return res.status(200).send({ Message: "No books with this status" });
      }
    }
    if (req.query.filter) {
      const filterdBooksByStatus = await bookReviewModel
        .find({ user_id: user_id, book_status: filter })
        .populate([
          {
            path: "book_id",
            model: "book",
            select: "author_id name image_url",
            populate: {
              path: "author_id",
              model: "author",
              select: "first_name last_name",
            },
          },
        ]);

      if (filterdBooksByStatus) {
        return res.status(200).send(filterdBooksByStatus);
      } else {
        return res.status(200).send({ Message: "No books with this status" });
      }
    }

  } catch (error) {
    return res.status(500).send({ Message: "Error in retrieving book review" });
  }
}

//--------------------------====GET ALL BOOK REVIEW FOR SPECIFIC USER====-----------------------------------
const getBookRate = async (req, res) => {
  try {
    const book_id = req.params.book_id;
    const user_id = req.params.user_id;
    const bookRate = await bookReviewModel.findOne({
      $and: [{ book_id: book_id }, { user_id: user_id }],
    });

    console.log(bookRate);

    if (bookRate) {
      return res.status(200).send({ rate: bookRate });
    } else {
      return res.status(404).send({ Message: "Wrong user id or book id" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error in retrieving book review" });
  }
};

const deleteReviewText = async (req, res) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res
        .status(400)
        .send({ Message: "You can't access without token key" });
    }
    const review_id = req.params.review_id;

    const review = await reviewModel.findOneAndDelete(review_id);

    if (review) {
      const allReviews = await reviewModel.find({}).populate("user_id");
      return res.status(200).send({ review: allReviews, deletedReview: review, Message: "Review Deleted Successfully" });
    } else {
      return res.status(404).send({ Message: "Wrong review id" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error in deleting review" });
  }
}

const updateReviewText = async (req, res) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res
        .status(400)
        .send({ Message: "You can't access without token key" });
    }
    const review_id = req.params.review_id;
    const update = { ...req.body };

    const review = await reviewModel.findOneAndUpdate(
      review_id,
      update,
      { new: true }
    );

    if (review) {
      return res.status(200).send(review);
    } else {
      return res.status(404).send({ Message: "Wrong review id" });
    }
  } catch (error) {

  }

}

module.exports = {
  // userProfile,
  getBookRate,
  updateBookReview,
  addBookReview,
  getBookReview,
  getFilterdBookReview,
  addReviewText,
  deleteReviewText,
  updateReviewText
};

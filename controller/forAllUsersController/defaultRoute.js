const bookModel = require("../../model/bookModel");
const categoryModel = require("../../model/categoryModel");
const authorModel = require("../../model/authorModel");
const bookReviewModel = require("../../model/bookReviewModel");
const reviewModel = require("../../model/review");

//====================getAllBooks==========================
const getAllBooksForUsers = async (req, res) => {
  try {
    const book = await bookModel.find({}).populate({
      path: "author_id",
      model: "author",
      select: "first_name last_name",
    });
    if (book.length > 0) {
      return res.status(200).send(book);
    } else {
      return res.status(404).send({ Message: "No Books Found" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

//==================getBookById==================================
const getBookById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id).populate([
      {
        path: "author_id",
        model: "author",
        select: "first_name last_name image_url",
      },
      {
        path: "category_id",
        model: "category",
        select: "name",
      },
    ]);
    const bookReview = await bookReviewModel
      .find({
        rate: { $ne: null },
        book_id: req.params.id,
      })
      .count(); // Remeber to test this phrase // tested and works good

    const review = await bookReviewModel
      .find(
        { book_id: req.params.id },
        { rate: 1, review: 1, book_status: 1, user_id: 1 }
      )
      .populate([
        {
          path: "user_id",
          model: "user",
          select: "first_name last_name image_url",
        },
      ]);

    const update_average_rate = await bookReviewModel.aggregate([
      { $group: { _id: "$book_id", avg_val: { $avg: "$rate" } } },
    ]);
    // console.log(update_average_rate);
    update_average_rate.forEach(async (book) => {
      await bookReviewModel.updateMany(
        { book_id: req.body.id },
        { $set: { average_rate: book.avg_val } }
      );
    });

    if (book) {
      return res.status(200).send({
        totalRates: bookReview,
        book: book,
        review: review,
        avg_rate: update_average_rate[0],
      });
    } else {
      return res.status(404).json({ Message: "Book is not Exist" });
    }
  } catch (err) {
    return res.status(500).send({ Message: "Try again later....." });
  }
};

//====================getAllCategories==========================
const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (category.length > 0) {
      return res.status(200).send(category);
    } else {
      return res.status(404).json({ Message: "No Category Found" });
    }
  } catch (err) {
    return res.status(500).send({ Message: "Try again later....." });
  }
};

//==================getBookByCategoryId==================================
const getBookByCategoryId = async (req, res) => {
  try {
    const book = await bookModel
      .find({ category_id: req.params.id }, { image_url: 1, name: 1, _id: 1 })
      .populate({
        path: "author_id",
        select: { first_name: 1, last_name: 1, _id: 0 },
      });
    if (book.length > 0) {
      return res.status(200).send(book);
    } else {
      return res.status(404).json({ Message: "No books in this category yet" });
    }
  } catch (err) {
    return res.status(500).send({ Message: "Try again later....." });
  }
};

//==================getAuthorById==================================
const getAuthorById = async (req, res) => {
  // try {
  //   const author = await authorModel.findById(req.params.id);
  //   if (author) {
  //   const author_id = author._id;
  //   const author_book = await bookModel.find(
  //     { author_id: author_id },
  //     { book_id: 1, name: 1, image_url: 1, date_of_birth: 1 }
  //   );

  // const author_book_id = author_book.map((el) => el._id);
  // for (let i = 0; i < author_book_id.length; i++) {
  //   book_review = await bookReviewModel
  //     .find({ book_id: author_book_id[i] })
  //     .populate("book_id");
  // }

  // const update_average_rate = await bookReviewModel.aggregate([
  //   { $group: { _id: "$book_id", avg_val: { $avg: "$rate" } } },
  // ]);
  // console.log(update_average_rate);
  // console.log(update_average_rate);
  // update_average_rate.forEach(async (book) => {
  //   await bookReviewModel.updateMany(
  //     { book_id:  },
  //     { $set: { average_rate: book.avg_val } }
  //   );
  // });


  // const books = await bookModel.find({ author_id: author });
  // return res.status(200).send({ author: author, books: books });
  // } else {
  //   return res.status(404).json({ Message: "author is not Exist" });
  // }
  // } catch (err) {
  //   return res.status(500).send({ Message: "Try again later....." });
  // }




  try {
    const author = await authorModel.findById(req.params.id);
    if (author) {
      const author_id = author._id;
      const author_book = await bookModel.find(
        { author_id: author_id },
        { book_id: 1, name: 1, image_url: 1, date_of_birth: 1 }
      );

      // let book_review;
      // const author_book_id = author_book.map((el) => el._id);
      // for (let i = 0; i < author_book_id.length; i++) {
      //   book_review = await bookReviewModel
      //     .find({ book_id: author_book_id[i] })
      //     .populate("book_id");
      // }

      const books = await bookModel.find({ author_id: author });
      // console.log(books);
      return res.status(200).send({ author: author, books: books });
    } else {
      return res.status(404).json({ Message: "author is not Exist" });
    }
  } catch (err) {
    return res.status(500).send({ Message: "Try again later....." });
  }
}
//====================getAllAuthors==========================
const getAllAuthor = async (req, res) => {
  try {
    const author = await authorModel.find({});
    if (author.length > 0) {
      return res.status(200).send(author);
    } else {
      return res.status(404).json({ Message: "No Author Found" });
    }
  } catch (err) {
    return res.status(500).send({ Message: "Try again later....." });
  }
};

const popularBooks = async (req, res) => {
  try {
    const popularBooks = await bookReviewModel.aggregate([
      { $group: { _id: "$book_id", avg_val: { $avg: "$rate" } } },
      { $sort: { avg_val: -1 } },
      { $limit: 5 }
    ]);

    const popular_book_id = popularBooks.map((el) => el._id);
    // console.log(popular_book_id);

    let book_review = [];
    let books = [];

    for (let i = 0; i < popular_book_id.length; i++) {
      let book_id = popular_book_id[i];
      book_review = (await bookModel.find({ _id: book_id }).populate("author_id"));
      if (book_review[0] !== undefined) {
        books.push(book_review[0]);
      }
    }

    console.log(books);

    // console.log(popularBooks);
    return res.status(200).send(books);
  } catch (error) {
    return res.status(500).send({ Message: "Server Error" });
  }
};

const getAllReviewText = async (req, res) => {
  try {
    const review = await reviewModel.find({ book_id: req.params.id }).populate({
      path: "user_id",
      model: "user",
      select: "first_name last_name image_url",
    });
    // console.log(review);
    if (review.length > 0) {
      return res.status(200).send(review);
    } else {
      return res.status(404).send({ Message: "No review Found" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

module.exports = {
  getAllBooksForUsers,
  getBookById,
  getAllCategory,
  getBookByCategoryId,
  getAuthorById,
  getAllAuthor,
  popularBooks,
  getAllReviewText,
};

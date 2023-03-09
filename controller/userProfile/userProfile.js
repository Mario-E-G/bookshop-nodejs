const userModel = require("../../model/userModel");
const bookReviewModel = require("../../model/bookReviewModel");


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
        const filter = {
            book_id: req.body.book_id,
            user_id: req.body.user_id,
        };
        const update = { ...req.body };
        //filter book and uodate rate
        const bookReviewAfterUpdate = await bookReviewModel.findOneAndUpdate(filter, update, { new: true });

        if (bookReviewAfterUpdate) {
            // - update - averageRate -
            const update_average_rate = await bookReviewModel.aggregate([
                { $group: { _id: "$book_id", avg_val: { $avg: "$rate" } } }
            ])
            // console.log(update_average_rate);
            update_average_rate.forEach(async (book) => {
                await bookReviewModel.updateMany({ book_id: book._id },
                    { $set: { average_rate: book.avg_val } })
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
}

//--------------------------====Add BOOK REVIEW====-------------------------------------------------------
const addBookReview = async (req, res) => {
    try {
        const newBookReview = { ...req.body };
        const bookReview = await bookReviewModel.create(newBookReview);
        if (bookReview) {
            return res.status(200).send(bookReview);
        } else {
            return res.status(404).send({ Message: "Wrong book id or user id" });
        }
    } catch (error) {
        return res.status(500).send({ Message: error.message });
    }
}

//--------------------------====GET ALL BOOK REVIEW FOR SPECIFIC USER====-----------------------------------
const getBookReview = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const bookReview = await bookReviewModel.find({ user_id: userId })
            .populate([
                {
                    path: 'book_id',
                    model: 'book',
                    select: 'author_id name image_url',
                    populate: {
                        path: 'author_id',
                        model: 'author',
                        select: 'first_name last_name',
                    }
                }
            ])
        if (bookReview) {
            return res.status(200).send(bookReview);
        } else {
            return res.status(404).send({ Message: "Wrong user id" });
        }
    } catch (error) {
        return res.status(500).send({ Message: "Error in retrieving book review" });
    }
}

//--------------------------====FILTER BOOK REVIEW BY STATUS====-------------------------------------------
const getFilterdBookReview = async (req, res) => {
    try {
        const user_id = req.params.id;
        //                 http://localhost:6000/profile?filter=New&page=1&limit=1
        //  will get books matched with filter
        if (req.query.filter && req.query.page && req.query.limit) {
            const pagination_status = {
                Status: req.query.filter
            };
            const pagination_page = {
                Page: req.query.page,
                Limit: req.query.limit,
            };
            const filterdBooksByStatus = await bookReviewModel
                .find({ user_id: user_id, book_status: pagination_status.Status })
                .skip((pagination_page.Page - 1) * pagination_page.Limit)
                .limit(pagination_page.Limit)
                .populate([
                    {
                        path: 'book_id',
                        model: 'book',
                        select: 'author_id name image_url',
                        populate: {
                            path: 'author_id',
                            model: 'author',
                            select: 'first_name last_name',
                        }
                    }
                ])
            if (filterdBooksByStatus.length > 0) {
                return res.status(200).send(filterdBooksByStatus);
            } else {
                return res.status(404).send({ Message: "No books with this status" });
            }
            //              http://localhost:6000/profile                 ------->   by defualt
            //  will get all books for specific user
        } else {
            let pagination_page;
            if (req.query.page && req.query.limit) {
                pagination_page = {
                    Page: req.query.page,
                    Limit: req.query.limit,
                };
            } else {
                pagination_page = {
                    Page: 1,
                    Limit: 8,
                };
            }
            const filterdBooksByStatus = await bookReviewModel
                .find({ user_id: user_id })
                .skip((pagination_page.Page - 1) * pagination_page.Limit)
                .limit(pagination_page.Limit)
                .populate([
                    {
                        path: 'book_id',
                        model: 'book',
                        select: 'author_id name image_url',
                        populate: {
                            path: 'author_id',
                            model: 'author',
                            select: 'first_name last_name',
                        }
                    }
                ])
            if (filterdBooksByStatus.length > 0) {
                return res.status(200).send(filterdBooksByStatus);
            } else {
                return res.status(404).send({ Message: "No books with this status" });
            }
        }
    } catch (error) {
        return res.status(500).send({ Message: "Error in retrieving book review" });
    }
}



module.exports = {
    // userProfile,
    updateBookReview,
    addBookReview,
    getBookReview,
    getFilterdBookReview,
}
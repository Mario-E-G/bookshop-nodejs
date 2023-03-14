const bookModel = require("../../model/bookModel");
const categoryModel = require("../../model/categoryModel");
const authorModel = require("../../model/authorModel");
const bookReviewModel = require("../../model/bookReviewModel");

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
        select: "first_name last_name",
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
      .count(); // Remeber to test this phrase

    const review = await bookReviewModel
      .find(
        { book_id: req.params.id },
        { rate: 1, review: 1, book_status: 1, user_id: 1 }
      )
      .populate([
        { path: "user_id", model: "user", select: "first_name image_url" },
      ]);

    if (book) {
      return res
        .status(200)
        .send({ totalRates: bookReview, book: book, review: review });
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
  try {
    const author = await authorModel.findById(req.params.id);
    if (author) {
      return res.status(200).send(author);
    } else {
      return res.status(404).json({ Message: "author is not Exist" });
    }
  } catch (err) {
    return res.status(500).send({ Message: "Try again later....." });
  }
};

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

module.exports = {
  getAllBooksForUsers,
  getBookById,
  getAllCategory,
  getBookByCategoryId,
  getAuthorById,
  getAllAuthor,
};

const bookModel = require("../../model/bookModel")
const categoryModel = require("../../model/categoryModel");
const authorModel = require("../../model/authorModel");

//====================getAllBooks==========================
const getAllBooksForUsers = async (req, res) => {
    try {
        const book = await bookModel.find({});
        if (book.length > 0) {
            return res.status(200).send(book);
        } else {
            return res.status(404).send({ Message: "No Books Found" });
        }
    } catch (error) {
        return res.status(500).send({ Message: error.message })
    }
}

//==================getAuthorById==================================
const getBookById = async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if (book) {
            return res.status(200).send(book)
        } else {
            return res.status(404).json({ Message: "Book is not Exist" })
        }
    } catch (err) {
        return res.status(500).send({ Message: "Try again later....." })
    };
}



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
    };
}



//==================getBookByCategoryId==================================
const getBookByCategoryId = async (req, res) => {
    try {
        const book = await bookModel.find({ category_id: req.params.id }, { image_url: 1, name: 1, _id: 0 })
            .populate({ path: "author_id", select: { "first_name": 1, "last_name": 1, _id: 0 } })
        if (book.length > 0) {
            return res.status(200).send(book)
        } else {
            return res.status(404).json({ Message: "No books in this category yet" })
        }
    } catch (err) {
        return res.status(500).send({ Message: "Try again later....." })
    };
};


//==================getAuthorById==================================
const getAuthorById = async (req, res) => {
    try {
        const author = await authorModel.findById(req.params.id);
        if (author) {
            return res.status(200).send(author)
        } else {
            return res.status(404).json({ Message: "author is not Exist" })
        }
    } catch (err) {
        return res.status(500).send({ Message: "Try again later....." })
    };
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
    };
}

module.exports = {
    getAllBooksForUsers,
    getBookById,
    getAllCategory,
    getBookByCategoryId,
    getAuthorById,
    getAllAuthor,
}


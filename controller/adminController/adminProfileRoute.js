const categoryModel = require("../../model/categoryModel");
const bookModel = require("../../model/bookModel");
const authorModel = require("../../model/authorModel");



const adminHomeRoute = async (req, res) => {
    console.log("Admin Home Page");
    return res.send("Admin Home Page")
}

// get all categories
const adminGetAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        if (category) {
            return res.send(category);
        } else {
            return res.json({ Message: "No category exist" });
        }
    } catch (error) {
        return res.status(500).send({ Message: error.message });
    }

}

// get all books
const adminGetAllBook = async (req, res) => {
    try {
        const book = await bookModel.find({}).populate()
        if (book) {
            return res.send(book);
        } else {
            return res.json({ Message: "No Books exist" });
        }
    } catch (error) {
        return res.status(500).send({ Message: error.message });
    }
}

// get all authors
const adminGetallAuthor = async (req, res) => {
    try {
        const author = await authorModel.find({});
        if (author) {
            return res.status(200).json(author);
        } else {
            return res.status(500).json({ Message: "No Authors Found" });
        }
    } catch (error) {
        return res.status(500).json({ Message: error.message });
    }
}


//add new Category
const adminAddNewCategory = async (req, res) => {
    const newCategory = { ...req.body };
    try {
        const createdCategory = await categoryModel.create(newCategory);
        return res.json(createdCategory);
    } catch (error) {
        return res.status(500).send({ Message: error.message });
    }
}

//add new book
const adminAddNewBook = async (req, res) => {
    try {
        const newBook = { ...req.body };
        const book = await bookModel.create(newBook);
        return res.json(book);
    } catch (error) {
        return res.status(500).send({ Message: error.message });
    }
}

//add new author
const adminAddNewAuthor = async (req, res) => {
    try {
        const newauhtor = { ...req.body };
        const author = await authorModel.create(newauhtor);
        return res.send(author);
    } catch (error) {
        return res.status(500).send({ Message: error.message });
    }
}

//update category
const adminUpdateCategory = async (req, res) => {
    try {
        const updatedCategory = { ...req.body };
        const category = categoryModel.findByIdAndUpdate(req.params.id, updatedCategory);
        return res.status(202).json(updatedCategory);
    } catch (error) {
        return res.status(500).send({ Message: error.message });
    }
}


module.exports = {
    adminHomeRoute,
    adminGetAllCategory,
    adminGetAllBook,
    adminGetallAuthor,
    adminAddNewCategory,
    adminAddNewBook,
    adminAddNewAuthor,
}
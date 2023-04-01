const categoryModel = require("../../model/categoryModel");
const bookModel = require("../../model/bookModel");
const authorModel = require("../../model/authorModel");

const adminHomeRoute = async (req, res) => {
  console.log("Admin Home Page");
  return res.send("Admin Home Page");
};

///////////////////////////////////GetAll//////////////////////////////////////
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
};
// get all books
const adminGetAllBook = async (req, res) => {
  try {
    const book = await bookModel.find({}).populate("category_id").populate("author_id");
    if (book) {
      return res.send(book);
    } else {
      return res.json({ Message: "No Books exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};
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
};

//////////////////////////////////////getById//////////////////////////////////
// get category by id
const adminGetCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (category) {
      return res.status(200).send(category);
    } else {
      return res.status(404).send({ Message: "Category Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Retrieval" });
  }
};
// get book by id
const adminGetBookById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (book) {
      return res.status(200).send(book);
    } else {
      return res.status(404).send({ Message: "Book Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Retrieval" });
  }
};
// get author by id
const adminGetAuthorById = async (req, res) => {
  try {
    const author = await authorModel.findById(req.params.id);
    if (author) {
      return res.status(200).send(author);
    } else {
      return res.status(404).send({ Message: "Author Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error In Retrieval" });
  }
};

//////////////////////////////////////Add////////////////////////////////////////
//add new Category
const adminAddNewCategory = async (req, res) => {

  try {

    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "A token is required for Accessing" });
    }
    let image_url;
    let newCategory;
    if (req.file) {
      image_url = `${process.env.IMG_URL}/images/${req.file.filename}`;
      newCategory = { ...req.body, image_url: image_url };
    } else {
      newCategory = { ...req.body };
    }

    const createdCategory = await categoryModel.create(newCategory);
    if (createdCategory) {
      return res.status(200).json(createdCategory);
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};
//add new book
const adminAddNewBook = async (req, res) => {

  try {
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "Token is required for accessing " });
    }
    let image_url;
    let newBook;
    if (req.file) {
      image_url = `${process.env.IMG_URL}/images/${req.file.filename}`;
      newBook = { ...req.body, image_url: image_url };
      console.log(newBook);
    } else {
      newBook = { ...req.body };
    }

    const book = await bookModel.create(newBook);
    if (newBook) {
      return res.status(200).json(book);
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};
//add new author
const adminAddNewAuthor = async (req, res) => {
  try {

    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "A token is required for Accessing" });
    }
    let image_url;
    let newAuhtor;
    if (req.file) {
      image_url = `${process.env.IMG_URL}/images/${req.file.filename}`;
      newAuhtor = { ...req.body, image_url: image_url };
    } else {
      newAuhtor = { ...req.body };
    }

    const author = await authorModel.create(newAuhtor);
    if (author) {
      return res.status(200).send(author);
    }
  } catch (error) {
    return res.status(500).send({ Message: error.message });
  }
};

/////////////////////////////////////Update///////////////////////////////////////
//update category
const adminUpdateCategory = async (req, res) => {

  try {

    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "A token is required for Accessing" });
    }
    let updatedCategory;
    let image_url;
    if (req.file) {
      image_url = `${process.env.IMG_URL}/images/${req.file.filename}`;
      updatedCategory = { ...req.body, image_url: image_url };
    } else {
      updatedCategory = { ...req.body };
    }

    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      updatedCategory,
      { new: true }
    );
    if (category) {
      return res.status(200).send({ Message: "Updated Successfully" });
    } else {
      return res.status(404).json({ Message: "Category isn't Exist" });
    }
  } catch (error) {
    return res.status(500).send({ Message: "Error in Update" });
  }
};
//update book
const adminUpdateBook = async (req, res) => {
  try {
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "A token is required for Accessing" });
    }
    let image_url;
    let bookData;
    if (req.file) {
      image_url = `${process.env.IMG_URL}/images/${req.file.filename}`;
      bookData = { ...req.body, image_url: image_url };
    } else {
      bookData = { ...req.body };
    }

    const book = await bookModel.findByIdAndUpdate(req.params.id, bookData, {
      new: true,
    });
    if (book) {
      return res.status(200).send({ Message: "Updated Successfully" });
    } else {
      return res.status(404).json({ Message: "Book is not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ Message: "Error In Update" });
  }
};
//update author
const adminUpdateAuthor = async (req, res) => {

  try {

    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ Message: "A token is required for Accessing" });
    }
    let image_url;
    let authorData;
    if (req.file) {
      image_url = `${process.env.IMG_URL}/images/${req.file.filename}`;
      authorData = { ...req.body, image_url: image_url };
    } else {
      authorData = { ...req.body };
    }
    const author = await authorModel.findByIdAndUpdate(
      req.params.id,
      authorData,
      { new: true }
    );
    if (author) {
      return res.status(200).send({ Message: "Updated Successfully" });
    } else {
      return res.status(404).send({ Message: "Author is not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ Message: "Error In Update" });
  }
};

////////////////////////////////////Delete////////////////////////////////////////
//delete category
const adminDeleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(
      req.params.id
    );
    if (deletedCategory) {
      return res.status(200).send({ Message: "Deleted Successfully" });
    } else {
      return res.status(404).send({ Message: "category is not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ Message: "Error In Delete" });
  }
};
//delete book
const adminDeleteBook = async (req, res) => {
  try {
    const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      return res.status(200).send({ Message: "Deleted Successfully" });
    } else {
      return res.status(404).send({ Message: "book is not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ Message: "Error In Delete" });
  }
};
//delete author
const adminDeleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await authorModel.findByIdAndDelete(req.params.id);
    if (deletedAuthor) {
      return res.status(200).send({ Message: "Deleted Successfully" });
    } else {
      return res.status(404).send({ Message: "Author is not Exist" });
    }
  } catch (error) {
    return res.status(500).json({ Message: "Error In Delete" });
  }
};

module.exports = {
  adminHomeRoute,
  adminGetAllCategory,
  adminGetAllBook,
  adminGetallAuthor,
  adminAddNewCategory,
  adminAddNewBook,
  adminAddNewAuthor,
  adminUpdateCategory,
  adminUpdateBook,
  adminUpdateAuthor,
  adminDeleteCategory,
  adminDeleteBook,
  adminDeleteAuthor,
  adminGetCategoryById,
  adminGetBookById,
  adminGetAuthorById,
};

const bookModel = require("../../model/bookModel")
const categoryModel = require("../../model/categoryModel");


//====================get all book==========================
const GetAllBooksForUsers = async (req, res) => {
    try{
        const book = await bookModel.find({});
        if (book.length > 0 ) {
           return res.status(200).send(book);
        }else{
            return res.status(404).send({Message:"No Books Found"});
        }
    } catch (error) {
         return res.status(500).send({Message: error.message})
    }
}


//====================get all category==========================

const getAllCategory = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        if (category) {
            return res.status(200).send(category);
        } else {
            return res.status(404).json({ Message: "No Category Found" });
        }
    } catch (err) {
        return res.status(500).send({ Message: "Try again later....." });
    };
}
//==================getbyid==================================

const getCategorybyid = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (category) {
            return res.status(200).send(category)
        } else {
            return res.status(404).json({ Message: "Category is not Exist" })
        }
    } catch (err) {
        return res.status(500).send({ Message: "Try again later....." })
    };
};


module.exports = {
    GetAllBooksForUsers,
    getAllCategory,
    getCategorybyid,
}


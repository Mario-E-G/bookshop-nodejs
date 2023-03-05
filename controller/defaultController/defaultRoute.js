const bookModel = require("../../model/bookModel")

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

module.exports = {
    GetAllBooksForUsers
}
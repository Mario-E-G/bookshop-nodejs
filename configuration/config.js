const mongoose = require("mongoose");
const donenv = require("dotenv").config();
const DB_URL = process.env.DB_URL;

// main().catch((err) => {
//     if (!err)
//         return console.log(
//             `*-------------------Database Connected--------------------*`
//         );
//     return console.log(`-------------------Error In Database-------------------`);
// });
// async function main() {
//     console.log("inside main")
//     await mongoose.connect(DB_URL);
//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//     console.log("after inside main")
// }


const dbConnection = mongoose.connect(DB_URL, (err) => {
    if (!err) return console.log(
        `*-------------------Database Connected--------------------*`
    );
    return console.log(`-------------------Error In Database-------------------`);
})


module.exports = dbConnection;

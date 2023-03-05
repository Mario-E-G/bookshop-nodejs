const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const donenv = require("dotenv").config();
const dbConnection = require("./configuration/config");
const PORT = process.env.PORT;
const adminRoute = require("./route/adminRoutes/adminRoute.js");
const userRoute = require("./route/userRoutes/userRoute.js");
const defaultRoute = require("./route/defaultRoutes/defaultRoute.js");
const loginRoute = require("./route/logIn/logIn.js");
const loginAuth = require("./middleware/middlewareLoginAuth");

const app = express();
app.use(express.json());
// Middleware To log all action happen to DB
app.use(morgan("Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"));



app.use("/login", loginRoute)
app.use("/admin", loginAuth, adminRoute);
app.use("/user", loginAuth, userRoute);
app.use("/", defaultRoute)



app.listen(PORT, (err) => {
  if (!err) {
    console.log(
      `*-----------------Server running on ${PORT}------------------*`
    );
    dbConnection;
  } else {
    console.log(`*-----------------Error in Server---------------*`);
  }
});
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const donenv = require("dotenv").config();
const dbConnection = require("./configuration/config");
const PORT = process.env.PORT;
const adminRoute = require("./route/adminRoutes/adminRoute.js");
const userRoute = require("./route/userRoutesForAdmin/userRoute.js");
const defaultRoute = require("./route/routesForAllUsers/defaultRoute");
const userProfileRoute = require("./route/userProfileRoute/userProfileRoute");
const loginAuth = require("./middleware/middlewareLoginAuth");
const adminAuth = require("./middleware/adminAuth");



const app = express();
app.use(express.json());
// Middleware To log all action happen to DB
app.use(morgan("Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"));


app.use("/admin", loginAuth, adminAuth, adminRoute);
app.use("/user", loginAuth, adminAuth, userRoute);
// app.use("/profile", loginAuth, userProfileRoute);
app.use("/", [defaultRoute, userProfileRoute]);



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
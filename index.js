const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const dbConnection = require("./configuration/config");
const PORT = process.env.PORT;
const adminRoute = require("./route/adminRoutes/adminRoute.js");
const userRoute = require("./route/userRoutesForAdmin/userRoute.js");
const defaultRoute = require("./route/routesForAllUsers/defaultRoute");
const userProfileRoute = require("./route/userProfileRoute/userProfileRoute");
const loginAuth = require("./middleware/middlewareLoginAuth");
const adminAuth = require("./middleware/adminAuth");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(
  morgan(
    '"Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"',
    { stream: fs.createWriteStream("./logs/logs.txt", { flags: "a" }) }
  )
);
app.use(express.json());
app.use(cors());
app.use("/assets", express.static("assets"));

app.use("/admin", [adminRoute, userRoute]);
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

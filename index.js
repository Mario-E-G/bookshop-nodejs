const express = require("express");
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
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const imagesDir = "images";
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}
app.use(`/${imagesDir}`, express.static(imagesDir));


// Middleware To log all action happen to DB
app.use(
  morgan(
    '"Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"',
    {
      stream: fs.createWriteStream("./logs/logs.txt", { flags: "a" }),
    }
  )
);

app.use("/admin", adminAuth, [adminRoute, userRoute]);
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

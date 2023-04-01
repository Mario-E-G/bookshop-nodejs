const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    // if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    //   return cb({ Message: "Only JPG, JPEG, and PNG files are allowed" });
    // }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
  });
});

module.exports = upload;
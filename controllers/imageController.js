const express = require("express");
var multer = require("multer");
const path = require("path");
const UPLOAD_FOLDER = "uploads/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, UPLOAD_FOLDER));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  }
});
const upload = multer({ storage }).single("image");

module.exports = upload;

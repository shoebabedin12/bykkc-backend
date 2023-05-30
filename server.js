require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const route = require("./routes");
const dbConnection = require("./config/dbConnection");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
// cors
app.use(cors());
// route
app.use(route);


dbConnection();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(8000);

const express = require("express");
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const emailverificationotpmatchController = require("../../controllers/emailverificationotpmatchController ");
const upload = require("../../controllers/imageController");
const _ = express.Router();


_.post("/registration", upload, registrationController);
_.post("/login", loginController);
_.post("/email-verification", emailverificationotpmatchController);

module.exports = _;

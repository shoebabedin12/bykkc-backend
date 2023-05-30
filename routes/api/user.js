const express = require("express");
const UsersController = require("../../controllers/UsersController");
const _ = express.Router();

_.get("/users", UsersController)


module.exports = _;
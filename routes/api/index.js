const express = require("express")
const _ = express.Router()
const authRoutes = require("./auth")
const userRoutes = require("./user")


_.use("/auth", authRoutes);
_.use("/user", userRoutes);

module.exports = _;
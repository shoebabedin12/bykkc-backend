const express = require("express");
const _ = express.Router();
const apiRoutes = require("./api")

const api = process.env.BASE_URL

_.use(api, apiRoutes)

_.use(api, (req,res)=>res.json("No Api found on this Route"));


module.exports = _;
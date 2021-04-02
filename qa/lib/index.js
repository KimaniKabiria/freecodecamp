"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const apiRoutes = require("./routes/api.js");
const fccTestingRoutes = require("./routes/fcctesting.js");
const runner = require("./test-runner");

const router = express.Router();

router.use("/public", express.static(path.join(__dirname, "/public")));

router.use(cors({ origin: "*" })); //USED FOR FCC TESTING PURPOSES ONLY!

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
router.route("/").get(function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

//For FCC testing purposes
fccTestingRoutes(router);

//Routing for API
apiRoutes(router);

//404 Not Found Middleware
router.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

module.exports = router; //for unit/functional testing

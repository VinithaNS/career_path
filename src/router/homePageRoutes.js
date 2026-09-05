const express = require("express");

const { getHomeData } = require("../controller/homePageController");

const router = express.Router();

router.get("/all", getHomeData);

module.exports = router;

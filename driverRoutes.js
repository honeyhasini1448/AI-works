const express = require("express");

const router = express.Router();

const { getDrivers } = require("../controllers/driverController");

router.get("/", getDrivers);

module.exports = router;
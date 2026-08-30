const express = require("express");

const router = express.Router();

const { predictFare,bookRide,getRide,updateRideStatus } = require("../controllers/rideController");

router.post("/predict-fare", predictFare);
router.post("/book", bookRide);
router.get("/:id", getRide);
router.patch("/:id/status", updateRideStatus);

module.exports = router;
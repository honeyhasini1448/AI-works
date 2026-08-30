const express = require("express");

const router = express.Router();

const {
    getPricing,
    resetPricing
} = require("../controllers/pricingController");

router.get("/", getPricing);

router.post("/reset", resetPricing);

module.exports = router;
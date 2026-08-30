const surge = require("../data/surge.json");
const fs = require("fs");
const path = require("path");

function getPricing(req, res) {

    res.json(surge);

}

function resetPricing(req, res) {

    surge.forEach(zone => {
        zone.requests = 0;
        zone.drivers = 10;
        zone.surge = 1.0;
    });

    const filePath = path.join(__dirname, "../data/surge.json");

    fs.writeFileSync(
        filePath,
        JSON.stringify(surge, null, 4)
    );

    res.json({
        message: "Surge reset successfully."
    });

}

module.exports = {
    getPricing,
    resetPricing
};
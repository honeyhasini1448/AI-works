 const drivers = require("../data/drivers.json");

function getDrivers(req, res) {

    res.json(drivers);

}

module.exports = {
    getDrivers
};
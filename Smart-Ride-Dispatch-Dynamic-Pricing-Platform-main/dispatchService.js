const drivers = require("../data/drivers.json");

function assignDriver(vehicleType) {

    const driver = drivers.find(driver =>
        driver.vehicle === vehicleType &&
        driver.status === "available"
    );

    return driver || null;
}

module.exports = assignDriver;
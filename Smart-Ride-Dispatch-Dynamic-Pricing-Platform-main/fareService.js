function calculateFare(vehicleType, pooling) {

    let fare = 0;

    if (vehicleType === "MINI") {
        fare = 120;
    }
    else if (vehicleType === "SEDAN") {
        fare = 180;
    }
    else if (vehicleType === "SUV") {
        fare = 250;
    }
    else {
        fare = 150;
    }

    if (pooling) {
        fare = fare - 30;
    }

    return fare;
}

module.exports = calculateFare;
const fs = require("fs");
const path = require("path");


const calculateFare = require("../services/fareService");
const assignDriver = require("../services/dispatchService");
const rides = require("../data/rides.json");

function predictFare(req, res) {

    const { pickup, drop, vehicleType, pooling } = req.body;

    if (!pickup || !drop || !vehicleType) {
        return res.status(400).json({
            message: "Please fill all required fields."
        });
    }

    const fare = calculateFare(vehicleType, pooling);

    res.json({
        pickup,
        drop,
        vehicleType,
        pooling,
        predictedFare: fare
    });

}

function bookRide(req, res) {

    const { pickup, drop, vehicleType, pooling } = req.body;

    if (!pickup || !drop || !vehicleType) {
        return res.status(400).json({
            message: "Please fill all required fields."
        });
    }

    const fare = calculateFare(vehicleType, pooling);

    const driver = assignDriver(vehicleType);

    if (!driver) {
        return res.status(404).json({
            message: "No drivers available."
        });
    }

    const ride = {
        id: rides.length + 1,
        pickup,
        drop,
        vehicleType,
        pooling,
        fare,
        driver: driver.name,
        status: "Requested"
    };

    rides.push(ride);

    const filePath = path.join(__dirname, "../data/rides.json");

    fs.writeFileSync(
        filePath,
        JSON.stringify(rides, null, 4)
    );

    res.status(201).json({
        message: "Ride booked successfully.",
        ride
    });

}

function getRide(req, res) {

    const rideId = Number(req.params.id);

    const ride = rides.find(r => r.id === rideId);

    if (!ride) {
        return res.status(404).json({
            message: "Ride not found."
        });
    }

    res.json(ride);

}

function updateRideStatus(req, res) {

    const rideId = Number(req.params.id);

    const { status } = req.body;

    const ride = rides.find(r => r.id === rideId);

    if (!ride) {
        return res.status(404).json({
            message: "Ride not found."
        });
    }

    ride.status = status;

    const filePath = path.join(__dirname, "../data/rides.json");

    fs.writeFileSync(
        filePath,
        JSON.stringify(rides, null, 4)
    );

    res.json({
        message: "Ride status updated.",
        ride
    });

}

module.exports = {
    predictFare,
    bookRide,
    getRide,
    updateRideStatus
};
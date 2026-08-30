const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const rideRoutes = require("./routes/rideRoutes");
const driverRoutes = require("./routes/driverRoutes");
const pricingRoutes = require("./routes/pricingRoutes");

app.use("/api/ride", rideRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/pricing", pricingRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
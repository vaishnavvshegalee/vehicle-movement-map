const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const vehicleData = require('./vehicleData.json');
const dotenv = require('dotenv').config();
dotenv;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store'); // Disable caching
    next();
});

const port = process.env.PORT || 5000;

let currentIndex = 0;
app.get('/api/vehicle-location', (req, res) => {
    // const currentTime = new Date().toISOString();
    // const currentLocation = vehicleData.find((loc) => loc.timestamp <= currentTime);
    const currentLocation = vehicleData[currentIndex];
    currentIndex = (currentIndex + 1) % vehicleData.length;
    if (currentLocation) {
        res.status(200).json(currentLocation);
    } else {
        res.status(400).json({ message: 'Location not found!' });
    }
})

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
})


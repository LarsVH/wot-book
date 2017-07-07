/**
 * Created by lars on 06.06.17.
 */

var express = require('express'),
   // actuatorRoutes = require('./../routes/actuators'),
    sensorRoutes = require('./../routes/sensors'),
    resources = require('./../resources/model'),
    cors = require('cors');

var converter = require('./../middleware/converter');

var app = express();

app.use(cors());

//app.use('/pi/actuators', actuatorRoutes);
app.use('/pi/sensors', sensorRoutes); // Forward alles dat me /pi/sensors begint naat de sensors routes

app.get('/pi', function (req, res) {
    res.send('This the WoT-Pi!');
});

app.get('/', function (req, res) {
    res.send('Welcome to the root. Go to /pi');
});

app.use(converter());

module.exports = app;

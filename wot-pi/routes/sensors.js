/**
 * Created by lars on 06.06.17.
 */

var express = require('express'),
    router = express.Router(),
    resources = require('./../resources/model');


// GET request '/'
router.get('/', function(req, res, next){
    req.result = resources.pi.sensors;
    next();
});

// GET request on '/pir'
router.get('/pir', function(req, res, next){
    req.result = resources.pi.sensors.pir;
    next();
});

// GET request on '/temperature'
router.get('/temperature', function (req, res, next) {
    req.result = resources.pi.sensors.temperature;
    next();
});

// GET request on '/humidity'
router.get('/humidity', function (req,res, next) {
    req.result = resources.pi.sensors.humidity;
    next();
});

module.exports = router;
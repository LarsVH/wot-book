/**
 * Created by lars on 06.06.17.
 */

var express = require('express'),
    router = express.Router(),
    resources = require('./../resources/model');


// GET request '/'
router.get('/', function(req, res){
    res.send(resources.pi.sensors);
});

// GET request on '/pir'
router.get('/pir', function(req, res){
    res.send(resources.pi.sensors.pir);
});

// GET request on '/temperature'
router.get('/temperature', function (req,res) {
    res.send(resources.pi.sensors.temperature);

});

// GET request on '/humidity'
router.get('/humidity', function (req,res) {
    res.send(resources.pi.sensors.humidity)
});

module.exports = router;
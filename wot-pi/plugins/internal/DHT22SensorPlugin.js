/**
 * Created by lars on 22.06.17.
 */
var resources = require('./../../resources/model');
    utils = require('./../../utils/utils.js');

var interval, sensor;
var model = resources.pi.sensors;
var pluginName = 'Temperature & Humidity';
var localParams = {'simulate': true, 'frequency': 5000};


exports.start = function(params){
    localParams = params;
    if(params.simulate){
        simulate();
    } else {
        connectHardware();
    }
};


exports.stop = function(){

    if(params.simulate){
        clearInterval(interval);
    } else{
        sensor.unexport();
    }
};


function simulate() {
    interval = setInterval(function () {
        model.temperature.value = utils.randomInt(0,40);
        model.humidity.value = utils.randomInt(0,100);
        showValue();
    }, localParams.frequency);
    console.info('Simulated %s sensor started', pluginName);
}


function connectHardware() {
    var sensorDriver = require('node-dht-sensor');
    var sensor = {                                  // sensor is een MAP met 2 keys "initialize" en "read" met als values bijbehorende functies
        initialize: function() {
            return sensorDriver.initialize(22, model.temperature.gpio); // Type sensor: DTH >22<, GPIO pin
        },
        read: function () {
            var readout = sensorDriver.read();
            model.temperature.value = parseFloat(readout.temperature.toFixed(2)); // Model aanpassen met de nieuwe waarden
            model.humidity.value = parseFloat(readout.humidity.toFixed(2));
            showValue();

            setTimeout(function(){      // call de readoutfunctie pas na "frequency": DHT heeft geen interrupts: .watch gaat dus niet => we moeten pollen
                sensor.read();          // LET OP: functie wordt maar 1 keer uitgevoerd...
            }, localParams.frequency);
        }
    };
    console.toLocaleString('Hardware %s sensor started', pluginName);
}

function showValue() {
    console.info('Temperature: %s C, humidity %s \%',
        model.temperature.value, model.humidity.value);
};
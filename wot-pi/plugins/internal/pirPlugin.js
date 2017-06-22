/**
 * Created by lars on 09.06.17.
 */

var resources = require('../../resources/model');
var Gpio = require('onoff').Gpio;

var interval, sensor;
var model = resources.pi.sensors.pir;
var pluginName = resources.pi.sensors.pir.name;
var localParams = {'simulate':false, 'frequency': 2000};

exports.start = function (params) {
    localParams = params;
    if(localParams.simulate){
        simulate();
    } else {
        connectHardware();
    }
};

exports.stop = function () {
    if(localParams.simulate){
        clearInterval(interval);
    } else {
        sensor.unexport();
    }
    console.info('%s plugin stopped!', pluginName);
};

function connectHardware(){     // Indien we met de echte hardware werken
    var Gpio = require('onoff').Gpio;
    sensor = new Gpio(model.gpio, 'in', 'both');      // model.gpio geeft de gpio pin waarop de PIR zit terug.
    sensor.watch(function (err, value) {
        if (err) exit(err);
        model.value = !!value; // pas de value in het model aan met de gesenste value (!! -> is wrs om naar een bool te casten)
        showValue();
    });
    console.info('Hardware %s sensor started', pluginName);
}

function simulate(){
    interval = setInterval(function() {
        model.value = !model.value;     // update het model (gesimuleerd) -> draai gewoon om met NOT
        showValue();
    }, localParams.frequency);
    console.info('Simulated %s sensor started', pluginName);
}

function showValue() {
    console.info(model.value ? 'There is someone!' : 'Not anymore');

}

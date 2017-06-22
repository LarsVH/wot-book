var httpServer = require('./servers/http'),
    resources = require('./resources/model');

// Internal Plugins
var ledsPlugin = require('./plugins/internal/ledsPlugin'), //#A
    pirPlugin = require('./plugins/internal/pirPlugin'), //#A
    dhtPlugin = require('./plugins/internal/DHT22SensorPlugin'); //#A

// Internal Plugins for sensors/actuators connected to the PI GPIOs
// If you test this with real sensors do not forget to set simulate to 'false'
pirPlugin.start({'simulate': true, 'frequency': 2000});
ledsPlugin.start({'simulate': true, 'frequency': 10000});
dhtPlugin.start({'simulate': true, 'frequency': 10000});


var server = httpServer.listen(resources.pi.port, function () {     // Listen on port with function
    console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
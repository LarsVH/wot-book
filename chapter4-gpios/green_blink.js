var onoff = require('onoff'); //#A

var Gpio = onoff.Gpio,
  pir = new Gpio(15, 'in', 'both'),
  led = new Gpio(21, 'out'), //#B
  interval;


pir.watch(function (err, value) {
	if (err) exit(err);
	console.log(if (value) {'there is some one!'} else {'not anymore!'});
});

interval = setInterval(function () { //#C
  var value = (led.readSync() + 1) % 2; //#D
  led.write(value, function() { //#E
    console.log("Changed LED state to: " + value);
  });
}, 2000);

process.on('SIGINT', function () { //#F
  clearInterval(interval);
  led.writeSync(0);
  led.unexport();
  pir.unexport();
  console.log('Bye, bye!');
  process.exit();
});

// #A Import the onoff library
// #B Initialize pin 4 to be an output pin
// #C This interval will be called every 2 seconds
// #D Synchronously read the value of pin 4 and transform 1 to 0 or 0 to 1
// #E Asynchronously write the new value to pin 4
// #F Listen to the event triggered on CTRL+C
// #G Cleanly close the GPIO pin before exiting

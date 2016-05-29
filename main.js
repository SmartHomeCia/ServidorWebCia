var express       = require('express.io'),
    //child         = require('child_process'),
    Cylon         = require('cylon'),
    mongoose      = require("mongoose"),
    temper        = require('./models/temperature.js'),
    ExeStepper    = require('./models/stepper.js'),
    control_light = require('./models/lamps.js');

app = express();
socket = require('socket.io').listen(app.listen(8245));

app.sensorsReady = false;
app.sensors = {};

app.use(express.static(__dirname + '/public'));
app.http().io();

routes = require('./routes/smartroute.js')(app);
/*Cylon.robot({
  connections: {
    galileo: {
      adaptor: 'intel-iot'
    }
  },

  devices: {
    temp_bathroom: {driver: 'analogSensor',pin: 0},
    temp_kitchen: {driver: 'analogSensor', pin: 1},
    temp_bedroom: {driver: 'analogSensor', pin: 2},
    temp_room: {driver: 'analogSensor', pin: 3},
    relay_bathroom: {driver: 'direct-pin',pin: 6},
    relay_kitchen: {driver: 'direct-pin',pin: 7},
    relay_room: {driver: 'direct-pin',pin: 8},
    relay_room2: {driver: 'direct-pin',pin: 9},
    relay_bedroom: {driver: 'direct-pin',pin: 10}
  },

  work: function (my) {
   app.sensorsReady = true;
   app.sensors = {
   temp_bathroom: my.temp_bathroom,
   temp_kitchen: my.temp_kitchen,
   temp_bedroom: my.temp_bedroom,
   temp_room: my.temp_room,
   relay_bathroom: my.relay_bathroom,
   relay_kitchen: my.relay_kitchen,
   relay_room: my.relay_room,
   relay_room2: my.relay_room2,
   relay_bedroom: my.relay_bedroom,
  };
    every((4).second(), function () {
    app.tempBroadcast();
    });
  }
}).start();*/

app.tempBroadcast = function () {
  temper.temperature();
},

app.relay_connect_allController = function () {
  control_light.control_lampAll();
},

app.relay_bathroomController = function () {
  control_light.bathroom();
},

app.relay_kitchenController = function () {
  control_light.kitchen();
},

app.relay_bedroomController = function () {
  control_light.bedroom();
},

app.relay_roomController = function () {
  control_light.roomOne();
},

app.relay_room2Controller = function () {
  control_light.roomTwo();
},

app.control_curtain = function () {
  ExeStepper.controlMotor();
};

control_light.socket_Lamps();

ExeStepper.socket_curtain();

console.log('Smart Home - C.I.A - 8245');

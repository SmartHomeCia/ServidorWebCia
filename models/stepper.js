var child = require('child_process');
var motor = 0;

exports.controlMotor = function(){
  var exec = child.exec;
  if(motor === 0){
    motor = 1;
    console.log("Abriu a cortina!!!");
    /*exec('node stepper_left.js', function(err, stdout, stderr){
      if(err){
  	    console.log(err);
      }
    });*/
  }else {
    motor = 0;
    console.log("Fechou a cortina!!!");
   /*exec('node stepper_right.js', function(err, stdout, stderr){
      if(err){
    	 console.log(err);
      }
    });*/
  }
};

exports.socket_curtain = function(){
  socket.on('connect', function (client) {
  
  socket.emit('curtain_channel',{
    'sts_curtain':motor
  });

  client.on('curtain_func', function(curtain){
    console.log("Servidor Cortina " + curtain);

    if(curtain == "control_Curtain"){
      app.control_curtain();
    }

    client.broadcast.emit("curtain_func", curtain);
   });
 });
};
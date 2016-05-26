var child = require('child_process');
var motor = 0;
exports.controlMotor = function(){
var exec = child.exec;
  if(motor == 0){
    motor = 1;
  exec('node stepper_left.js', function(err, stdout, stderr){
     if(err){
	console.log(err);
     }
   });} else{
    motor = 0;
    exec('node stepper_right.js', function(err, stdout, stderr){
     if(err){
	console.log(err);
     }
   }
 )};
};

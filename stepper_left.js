var Stepper_lib = require('jsupm_uln200xa');
var steps = 1300;
var stepper = new Stepper_lib.ULN200XA(steps, 0, 1, 2, 3);

function runningStepper(direction){
    stepper.setSpeed(7); //RPMs
    stepper.setDirection(direction);
    stepper.stepperSteps(steps);
}
runningStepper(Stepper_lib.ULN200XA.DIR_CW); 

console.log("abriu cortina");
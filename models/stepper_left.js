var Stepper_lib = require('jsupm_uln200xa');
var stepper = new Stepper_lib.ULN200XA(4200, 0, 1, 2, 3);

function runningStepper(direction){
    stepper.setSpeed(5); // 5 RPMs
    stepper.setDirection(direction);
    stepper.stepperSteps(4200);
}
runningStepper(Stepper_lib.ULN200XA.DIR_CW);

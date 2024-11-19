const { Gpio } = require('onoff');

const lightPin = new Gpio(529, 'out'); //17
const redPin = new Gpio(530, 'out');  //18
const greenPin = new Gpio(516, 'out');  //04
const bluePin = new Gpio(535, 'out');   //23
var val=0
const toggle = ()=>{
    val = 1 - val;
    greenPin.writeSync(val ? 0 : 1);
    // console.log("Light toggled: ",val)
}
module.exports=toggle

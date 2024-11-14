const { Gpio } = require('onoff');

// const lightPin = new Gpio(529, 'out');
// const redPin = new Gpio(530, 'out');  
const greenPin = new Gpio(534, 'out'); 
// const bluePin = new Gpio(535, 'out');
var val=0
const toggle = ()=>{
    var val = 1- val;
    greenPin.writeSync(val ? 0 : 1);
}
module.exports=toggle
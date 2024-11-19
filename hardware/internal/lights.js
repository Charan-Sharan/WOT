const { Gpio } = require('onoff');
const {pins} = require('../../gpio-config.json')
const lightPin = new Gpio(pins.light, 'out'); //17
const redPin = new Gpio(pins.red, 'out');  //18
const greenPin = new Gpio(pins.green, 'out');  //04
const bluePin = new Gpio(pins.blue, 'out');   //23
var val=0
const toggle = ()=>{
    val = 1 - val;
    greenPin.writeSync(val ? 0 : 1);
    // console.log("Light toggled: ",val)
}
module.exports=toggle

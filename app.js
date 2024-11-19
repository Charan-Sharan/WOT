const express = require('express')
const app =  express()
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
// const {Server} = socketIo(server);
const io = new Server(server)
const path = require('path')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const pi = require('./routes/pi')
const ejsMate = require('ejs-mate')
const { Gpio } = require('onoff');
const { exec } = require('child_process');


const PORT = process.env.PORT || 5001

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())
app.use(express.static('public')); 


app.set('view engine','ejs')
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
const { PiGpio } = require('pigpio');
// const lightPin = new PiGpio(529, 'out'); //17
const redPin = new PiGpio(18, { mode: Gpio.OUTPUT });   //18
const greenPin = new PiGpio(4, { mode: Gpio.OUTPUT });   //04
const bluePin = new PiGpio(23, { mode: Gpio.OUTPUT });    //23



// Set up a PWM pin


// Write an analog value (duty cycle between 0 and 255)
 // 50% brightness (0 = off, 255 = fully on)

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('rgb', (rgb) => {
        const parsedColor = parseInt(color.replace('#', ''), 16);
        const r = ( parsedColor & 0xff0000 ) >> 16
        const g = ( parsedColor & 0x00ff00 ) >>8
        const b = parsedColor & 0x0000ff
        greenPin.pwmWrite(g);
        redPin.pwmWrite(r);
        bluePin.pwmWrite(b);
        console.log(`${color}=> r : ${r} || g : ${g} || b : ${b}`)
    });
});
app.use('/pi',pi)
app.get('/',(re,res)=>res.render('home',{title:"home"}))
app.get('/camera',(req,res)=>{
    res.render('sensors/camera')
})
app.post('/camera',(req,res)=>{
    exec('libcamera-jpeg -o public/images/image.jpeg', (error, stdout, stderr) => {
        res.redirect('/camera')
      });
})


server.listen(PORT,'0.0.0.0',()=>console.log(`listening on port ${PORT}!`))
  

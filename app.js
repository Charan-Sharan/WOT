const express = require('express')
const app =  express()
const path = require('path')
const socketIo = require('socket.io');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')
const pi = require('./routes/pi')
const ejsMate = require('ejs-mate')
const { Gpio } = require('onoff');

const PORT = process.env.PORT || 5001
const lightPin = new Gpio(529, 'out');
const redPin = new Gpio(530, 'out');  
const greenPin = new Gpio(534, 'out'); 
const bluePin = new Gpio(535, 'out');

const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json())


app.set('view engine','ejs')
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('toggleLight', (state) => {
        lightPin.writeSync(state ? 1 : 0); 
    });

    socket.on('changeColor', (color) => {
        const { r, g, b } = color;
        redPin.writeSync(r ? 1 : 0);
        greenPin.writeSync(g ? 1 : 0);
        bluePin.writeSync(b ? 1 : 0);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
app.use('/pi',pi)
app.get('/',(re,res)=>res.render('home'))

app.listen(PORT,()=>console.log(`listening on port ${PORT}!`))
  
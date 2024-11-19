const express = require('express')
const app =  express()
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
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


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('rgb', (rgb) => {
        const parsedColor = parseInt(color.replace('#', ''), 16);
        const r = ( parsedColor & 0xff0000 ) >> 16
        const g = ( parsedColor & 0x00ff00 ) >>8
        const b = parsedColor & 0x0000ff
        console.log(`${color}=> r : ${r} || g : ${g} || b : ${b}`)
    });
    socket.on('ACval',(val)=>{
        console.log('ACval : ',val )
    })
});


app.get('/',(re,res)=>res.render('home',{title:"home"}))
app.use('/pi',pi)
app.get('/camera',(req,res)=>{
    res.render('sensors/camera')
})
app.get('/ac',(req,res)=>{
    res.render('devices/ac.ejs')
})
app.post('/camera',(req,res)=>{
    exec('libcamera-jpeg -o public/images/image.jpeg', (error, stdout, stderr) => {
        res.redirect('/camera')
      });
})


server.listen(PORT,'0.0.0.0',()=>console.log(`listening on port ${PORT}!`))
  

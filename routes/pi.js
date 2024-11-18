const express = require('express')
const router = express.Router();
const toggle = require('../hardware/internal/lights')
router.route('/').get((req,res)=>{
    res.status(200).render('devices/pi',{title:"pi"})
})
// router.route('/camera').get((req,res)=>res.render('camera'))
router.route('/lights')
.get((req,res)=>res.render('devices/pi/lights',{title:"lights"}))
.post((req,res)=>{
    toggle()
    res.redirect('/pi/lights')
})
router.route('/rgblights')
.get((req,res)=>{
    res.render('devices/pi/rgblights')
})

module.exports = router
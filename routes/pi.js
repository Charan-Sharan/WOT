const express = require('express')
const router = express.Router();
const toggle = require('../hardware/lights')
router.route('/').get((req,res)=>{
    res.status(200).render('devices/pi')
})
// router.route('/camera').get((req,res)=>res.render('camera'))
router.route('/lights')
.get((req,res)=>res.render('devices/pi/lights'))
.post((req,res)=>{
    toggle()
    res.redirect('/pi/lights')
})

module.exports = router
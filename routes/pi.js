const express = require('express')
const router = express.Router();

router.route('/').get((req,res)=>{
    res.status(200).render('devices/pi')
})
router.route('/camera').get((req,res)=>res.render('camera'))
router.route('/lights').get((req,res)=>res.render('devices/pi/lights'))

module.exports = router
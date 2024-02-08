const express = require('express');
const router = express.Router();

var Publishable_Key = process.env.Publishable_Key
var Secret_Key = process.env.Secret_Key
const stripe = require("stripe")(Secret_Key) 


router.get('/', function(req, res){
	res.render('payStripe', {
	key: Publishable_Key
	})
})



module.exports = router;

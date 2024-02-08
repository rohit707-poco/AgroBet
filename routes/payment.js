const express = require('express');
const router = express.Router();

var Publishable_Key = process.env.Publishable_Key
var Secret_Key = process.env.Secret_Key
const stripe = require("stripe")(Secret_Key) 
const bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/',async(req, res)=>{
	const customer = stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken,
		name: req.session.isAuth.name,
		address: {
			line1: 'TC 9/4 Old MES colony',
			postal_code: '452331',
			city: 'Indore',
			state: 'Madhya Pradesh',
			country: 'India',
		}
	})
	const paymentIndent = await stripe.paymentIntents.create({
		amount : req.session.isAuth.gTotal*100,
		currency : "inr",
		customer : customer.id,
		payment_method_types : ['card']
	});
	res.render("paid");

});

// router.post('/', function(req, res){


// 	// Moreover you can take more details from user
// 	// like Address, Name, etc from form
// 	stripe.customers.create({
// 		email: req.body.stripeEmail,
// 		source: req.body.stripeToken,
// 		name: req.session.isAuth.name,
// 		address: {
// 			line1: 'TC 9/4 Old MES colony',
// 			postal_code: '452331',
// 			city: 'Indore',
// 			state: 'Madhya Pradesh',
// 			country: 'India',
// 		}
// 	})
// 	.then((customer) => {

// 		return stripe.PaymentIntent
// 		({
// 			customer: customer.id,
// 			amount: req.session.isAuth.gTotal * 100,	 // Charging Rs 25
// 			description: 'Web Development Product',
// 			currency: 'inr'
// 		});
// 	})
// 	.then((charges) => {
// 		res.render("index") // If no error occurs
// 	})
// 	.catch((err) => {
// 		res.send(err)	 // If some error occurs
// 	});
// })

module.exports = router;

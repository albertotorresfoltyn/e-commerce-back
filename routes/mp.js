const express = require ('express');
const router = express.Router();

//can apply this middlewares here
//controllers: 
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require ("../controllers/user")
const { generateToken, processPayment } = require ("../controllers/braintree")

//we need a controller method to generate a token when we get a request to the route
router.get('/mercadopago/getToken/:userId', requireSignin, isAuth, (req, res) => {
    res.json({ok: true})
})

//we also need to have the route parameter:
router.param("userId", userById)


module.exports = router
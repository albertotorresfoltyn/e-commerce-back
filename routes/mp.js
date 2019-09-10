const express = require ('express');
const router = express.Router();
const mercadopago = require ('mercadopago')
 
const{ requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require ("../controllers/user");
const { generateToken } = require ("../controllers/mp")

mercadopago.configure({
    
    client_id: process.env.CLIENT_ID ,
    client_secret:process.env.CLIENT_SECRET  
});



router.post("/test", requireSignin, isAuth, isAdmin, (req, res) => {
    
    mercadopago.payment.create({
        description: 'Buying a PS4',
        transaction_amount: 10500,
        payment_method_id: 'visa',
        payer: {
          email: 'test_user_55630801@testuser.com',
          identification: {
            type: 'DNI',
            number: '33636619'
          }
        }
      }).then(function (mpResponse) {
          res.json(mpResponse)
          console.log(mpResponse);
      
      }).catch(function (mpError) {
          res.json(mpError)
          console.log(mpError);
      });
    });

module.exports = router
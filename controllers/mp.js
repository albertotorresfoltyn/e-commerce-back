 const User = require("../models/user")

 const mercadopago = require ('mercadopago')

 require('dotenv').config()
 
 

 mercadopago.payment.create({
    description: 'Buying a PS4',
    transaction_amount: 10500,
    payment_method_id: 'rapipago',
    payer: {
      email: 'test_user_80602233@testuser.com',
      identification: {
        type: 'DNI',
        number: '34123123'
      }
    }
  }).then(function (mpResponse) {
    console.log(mpResponse);
  }).catch(function (mpError) {
    console.log(mpError);
  });

 
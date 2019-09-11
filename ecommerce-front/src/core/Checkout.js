import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts, getBraintreeClientToken, processPayment } from './apiCore'
import Card from './Card'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'



const Checkout = ({ products }) => {

    const [data, setData] = useState({
        sucess: false,
        clientToken: null,
        error: '',
        instance: {},
        address:''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id 
    const token = isAuthenticated() && isAuthenticated().token 

    const getToken=(userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({...data, error: data.error})
            } else {
                setData({...data, clientToken: data.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, []) 


    const getTotal = () => {
        //Array.reduce() method executes a reducer function (that you provide) on each element of the array
        //resulting in a single output value -> 
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{ showDropIn() }</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign In to checkout</button>
            </Link>
        )
    }
    
    

    const buy = () => {
            //send the nonce to your server,  nonce = data.instance.requestPaymentMethod()

            let nonce;
            let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                //console.log(data)
                nonce = data.nonce
                //once you have nonce (card type, card number) send nonce as 'paymentMethodNonce' to backend
                //and also total to be charged
                //console.log('send nonce and total to process: ', nonce, getTotal(products))
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }

                processPayment(userId, token, paymentData)
                .then(response => console.log(response))
                .catch(error => console.log(error))

            })
            .catch(error => {
               // console.log('droping error: ', error)
                setData({...data, error: error.message })
            })
    }


    const showDropIn = () => (
        <div onBlur={() => setData({...data, error:""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options= {{
                        authorization: data.clientToken
                    }} 
                        onInstance={instance => (data.instance = instance )} />

                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ): null}
        </div>
    )

    const showError = error => (
        <div className="alert- alert-danger" style={{ display: error ? "" : "none"}} >
            {error}
        </div>
    )

    return (
        <div>

            <h2>Total: ${getTotal()}</h2>
                {showError(data.error)}
                {showCheckout()}

        </div>

    )   

}

export default Checkout
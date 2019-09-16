import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
//import { authenticate as isAuth} from "../auth/index"
import { isAuthenticated } from '../auth'
import { Link } from "react-router-dom"
import { listOrders } from "./apiAdmin"

const Orders = () => {
    const [orders, setOrders ] = useState([])


    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })   
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const showOrdersLength = () => {
        if (orders.length > 0 ) {
            return (
                <h1 className="text-danger display-2">Total orders: {orders.length} </h1>
            )
        } else {
            return <h1 className="text-danger"> No orders</h1>
        }
    };
    
    return (
        <Layout title="Orders" description={`Great Day ${user.name}, you can manage all the orders here`}>
            <div className="row">
                <div className="col-md8 offset-md-2">
                    { showOrdersLength() }

                    { orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" key={oIndex} style={{ borderBottom: "5px solid indigo"}}
                            />
                        )
                    })}
                </div>
            </div>       
        </Layout>
    );

}

export default Orders;
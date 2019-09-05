import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home   from './core/Home'
import Privateroute from './auth/PrivateRoute'
import Dashboard from './user/userDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct'


const Routes = () => {
    return ( 
    //makes the props available on these componentes
    <BrowserRouter> 
        <Switch>
            <Route path="/"      exact component={Home}/>
            <Route path="/signin"exact component={Signin}/>
            <Route path="/signup"exact component={Signup}/>
            <Privateroute path="/user/dashboard" exact component={Dashboard} />
            <AdminRoute  path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/create/category"exact component={AddCategory}/>
            <AdminRoute path="/create/product" exact component={AddProduct}/>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;
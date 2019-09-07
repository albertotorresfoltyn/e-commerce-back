import { API } from '../config'
import React from 'react'

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6` , {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch (`${API}/categories`, {
        method: "GET"
    })
       .then(response =>{
           return response.json();
       })
       .catch(err => console.log(err));
   };

   export const getFilteredProducts = (skip, limit, filters = {}) => {
       const data = {
           limit, skip, filters
       };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-type":"application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
 };
import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories } from './apiCore'
import Checkbox from './Checkbox'

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        });
    };

    useEffect(() => {
        init();
    }, [])

    const handleFilters = (filters, filterBy) =>{
        console.log(filters, filterBy)
    }


    return (
        <Layout
        
            title="Shop Page" 
            description="Busqueda de Productos" 
            className="container-fluid" 
        
        >
            <div className="row">
                <div className="col-4">
            
                    <h4>Filtrar por Categoria</h4>
                        <ul>
                            <Checkbox categories={categories}  handleFilters={filters => 
                                handleFilters(filters, 'category')} />
                        </ul>
                </div>
            
                <div className="col-8"></div>
            </div>    
        </Layout>
    );
};

export default Shop
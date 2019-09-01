const formidable = require ("formidable");
const _ = require ("lodash");
const fs = require ("fs"); //read file sistems

const Product = require("../models/product");
const { errorHandler } = require ("../helpers/dbErrorHandler");

exports.productById =  (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
            req.product = product 
            // if found the prod on db we make it available on the req obj w the name of product
            next();
    });
};



exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};



exports.create = (req, res) => {
    let form = new formidable.IncomingForm() // form data will be available from form
    form.keepExtensions = true, //file we get, extension we have
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({ //send json response that something isnt ok

                error: "Image could not be uploaded"

            })
        }

        //check all fields required are included
        const {name, description, price, category, quantity, shipping} = fields
        
        if (!name || !description || !price || !category || !quantity || !shipping ){
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        

        let product = new Product(fields) //create a new product with the fields we got

        //1kb = 1000
        //1mb = 100000

        if(files.photo){ //we send the photo from the client side (postman)
            //console.log("FILES PHOTO: ", files.photo);

            if (files.photo.size > 1000000 ){
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }

            product.photo.data = fs.readFileSync(files.photo.path) //as products Schema model
            product.photo.contentType = files.photo.type
        }

        product.save((err,result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        })

    })
};

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) =>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            deletedProduct,
            message: "Product deleted successfully"
        });
    });

};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        //check all the fields
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        // UPDATING THE PRODUCTS
        let product = req.product 
        product = _.extend(product, fields)

         //1kb = 1000
        //1mb = 100000

        if(files.photo){ //we send the photo from the client side (postman)
            //console.log("FILES PHOTO: ", files.photo);

            if (files.photo.size > 1000000 ){
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }

            product.photo.data = fs.readFileSync(files.photo.path) //as products Schema model
            product.photo.contentType = files.photo.type
        }

        product.save((err,result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        })

    })
}

/**
 * sell / new arrival
 * return the products by sell = /products?sortBy=sold&order=desc&limit=4
 * return the products by arrival = /products?sortBy=createdAt&order=desc&limit=4  
 * if no params are sent, then all products are returned
 */

//our method wil return the products to front
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy =  req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    
     Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            };
            res.send(products); 
        })
    }
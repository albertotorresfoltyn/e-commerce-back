const formidable = require ("formidable");
const _ = require ("lodash");
const fs = require ("fs"); //read file sistems

const Product = require("../models/product");
const { errorHandler } = require ("../helpers/dbErrorHandler");

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
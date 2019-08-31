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

        let product = new Product(fields) //create a new product with the fields we got

        if(files.photo){ //we send the photo from the client side (postman)
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
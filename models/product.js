const mongoose = require ("mongoose");
const { ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        descriptionLg: {
            type: String,
            required: true,
            maxlength: 4000,
        },
        wayUse: {
            type: String,
            required: true,
            maxlength: 4000,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
        },
        category: {
            type: ObjectId, //moongoose schema type
            ref: 'Category', //refers to Cat model
            required: true,

        },
        quantity: {
            type: Number
        },

        sold: {
            type: Number,
            default: 0
        },
       
        photo: {
            data: Buffer,
            contentType: String
        },
        photos: [{
            data: Buffer,
            contentType: String
        }],
      
      
        shipping: { //leave open to be flexible with the users decision
            required: false,
            type: Boolean,
        },
        tags: { //leave open to be flexible with the users decision
            required: false,
            type: [String] ,
        }

    },
    { timestamps:  true}     
);

module.exports = mongoose.model("Product", productSchema);
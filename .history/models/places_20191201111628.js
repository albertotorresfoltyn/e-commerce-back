//USERS SCHEMA
const mongoose = require ('mongoose')
const crypto = require ('crypto')
const uuidv1 = require('uuid/v1') //package to generate unique strings 

const userSchema = new mongoose.Schema(
    {
    
    name: {
        type: String,
        trim: true, //any space on the beginning or enrd will be trimmed out
        requied: true, //mandatory field
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true, 
        unique: true
    },
    //we are going to save the hashed password using a virtual field to store the input on the client side
    hashed_password: {
        type: String,
        required: true,
    },

    about: {
        type: String,
        trim: true,
    },
    
    salt: String, //long unique string used later to generate the hightest password

    role:{
        type: Number, 
        default: 0
        //0 = Regular Role /  1 = admin Role
    },

    history: {
        type: Array,
        default: []
    }
}, 
    {timestamps: true}
);

//virtual fields

//me lo escondio->
userSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this.password;
    });

userSchema.methods = {
    
    authenticate: function(plainText){
        console.log(this.salt,plainText)
        console.log(this)
        
        return this.encryptPassword(plainText) === this.hashed_password;
    },


    encryptPassword: function(password) {
        if (!password) return "";
        try{
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err){
            return "";
        }
    }
};






module.exports = mongoose.model("User", userSchema);
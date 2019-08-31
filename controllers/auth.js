const User = require ('../models/user')
const jwt = require('jsonwebtoken'); //used to generate signed token
const expressJwt = require ("express-jwt"); //for authorization check
const {errorHandler} = require ('../helpers/dbErrorHandler')
const uuidv1 = require('uuid/v1')
const crypto = require ('crypto')

exports.signup = (req, res) => {
    const { password } = req.body;
    
    console.log("req.body", req.body);
    
    const salt = uuidv1()
    const hashed = {
        name: req.body.name,
        email: req.body.email,
        salt: salt,
        hashed_password:crypto
            .createHmac("sha1", salt)
            .update(password)
            .digest("hex"),
    };

    const user = new User(hashed);  //create a new user  

    user.save((err, user) => {
        if(err){
            return res.status(400).json({
               err: errorHandler(err)            
            });
        }
        //we dont want to expose user info salt/hashed password->
        
        
        res.json({
            user
        })
    })

};

exports.signin = (req, res) => {
    //find the user based on email
    
    const { email, password} = req.body;
    User.findOne({ email }, (err,user) => {
        
        if (err || !user) {
            return  res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
        }
        //if user is found make sure the email and password matches
        //create authenticate method in user model
        if (!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password don´t match" 
            }); 
        }         
        
        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire:  new Date() + 9999  });
        //return response with user and token to front end client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });

    });

};

//signout

exports.signout = (req, res) => {
    //clear the cookie from the response
    res.clearCookie('t')
    res.json({message:  "SignOut Sucess"})
}

//create middlewares to ensure route protection
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) =>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) =>{
    if (req.profile.role === 0){
        return res.status(403).json ({
            error:  "Admin resourse ! Access denied"
        });
    }
    next();

}





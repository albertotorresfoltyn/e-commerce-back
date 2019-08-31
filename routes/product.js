const express = require("express");
const router = express.Router();

const { create } = require("../controllers/product")
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require ("../controllers/user");

router.post(
    "product/create/:userId", 
    requireSignin, 
    isAdmin, 
    isAuth, 
    function(req, res) {
        res.json({
            Text:"ok"
        })
    }
        
);

//router.param("userId", userById);

module.exports = router;
const express = require ('express');
const router = express.Router();


const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require ("../controllers/user")
const { create, list } = require ("../controllers/place")
const { decreaseQuantity } = require("../controllers/product")

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory,decreaseQuantity, create)

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, list);

//we also need to have the route parameter:
router.param("userId", userById)


module.exports = router
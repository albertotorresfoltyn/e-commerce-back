const express = require ('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require ("../controllers/user")
const { create, list } = require ("../controllers/place")

router.post('/place/create/:userId', requireSignin, isAuth, create);

router.get('/place/list/:userId', requireSignin, isAuth, isAdmin, list);

//we also need to have the route parameter:
router.param("userId", userById);

module.exports = router
const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/login",(req,res)=> userController.login(req,res));

router.post("/register",(req,res)=> userController.register(req,res));

router.post("/registerDevice",(req,res)=> userController.registerDevice(req,res));

router.post("/deregisterDevice",(req,res)=> userController.deregisterDevice(req,res));


module.exports = router;
const express = require("express");
const { signup, signin } = require("../controllers/userController");
const userRouter = express.Router(); // userRouter is a router object to access router

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

module.exports = userRouter; // have to export userRouter for outside use
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI"

const signup = async (req, res) => {
    // user entry in database
    // database realated work is asynchronous

    // Existing User Check
    // Hashed Password(Encryption)
    // User Creation
    // Token Generate

    const {username, email, password} = req.body; // for directly access, request body have to converted to json(for this in index.js app.use(express.json()) have to added)
    try {
        const existingUser = await userModel.findOne({ email : email});
        if(existingUser){
            return res.status(400).json({message : "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt value for hashing

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });
        // as user is created mongodb will create uniqueID for this user.

        const token = jwt.sign({email : result.email, id : result._id }, SECRET_KEY);

        res.status(201).json({user: result, token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await userModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({message : "User not found"});
        }

        // we store the hashed password, but this time user will give real pass so we need help form bcrypt library
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, SECRET_KEY);
        res.status(201).json({user: existingUser, token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {signup, signin}
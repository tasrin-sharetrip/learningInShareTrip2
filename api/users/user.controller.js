const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { create, getUserByUserId, getUsers, updateUsers, deleteUser, getUserByUserMail} = require("./user.service");
const jwt = require("jsonwebtoken"); 

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        //res.status(200).json(req.body);

        console.log("Request body: ", req.body);

        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUsers(body, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed to update User"
                });
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    },
    login: (req, res) => { // For login user will send email & password
        const body = req.body;
        console.log(body);
        getUserByUserMail(body.email, (error, results) => {
            if(error){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid mail or password" // why password I don't get this (I think we can't give specific msg to user that's why it is like that.)
                });
            }
            // results comes from user.service callback function
            const result = compareSync(body.password, results.password); // if it is match result variable will be true
            if(result){
                // without password, generating token
                results.password = undefined;
                const token = jwt.sign({ id: results.id}, process.env.SECRET_KEY_JSONWEBTOKEN, { //{result: results}
                    expiresIn: "100h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    user: results, // own added
                    token: token
                });
            }
            else{
                return res.json({
                    success: 0,
                    message: "Invalid mail or password"
                });
            }
        });
    }
};
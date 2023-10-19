const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
}, {timestamps : true});

module.exports = mongoose.model("User", UserSchema); // for exporting user model


/*
when we add a user, mongo db will generate a userID 
this userID will refer note
*/
const SECRET_KEY = "NOTESAPI";
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization; // token is passing by headers
        if(token){
            token = token.split(" ")[1];// as we add bearer as 1st(0'th index) value, 1th will be the token
            let user = jwt.verify(token, SECRET_KEY);
            // we store email and id as token
            req.userId = user.id; // a new thing will be added to request body, it's userID (taken from user->token)
            next();
        }
        else{
            res.status(401).json({message: "Unauthorized User"});
        }
    } catch (error) { // if token is not verified then catch will be executed
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }
}

module.exports = auth;
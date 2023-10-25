const jwt = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.headers.authorization;
        if(token){
            token = token.slice(7); // it will discard "Bearer "
            jwt.verify(token, process.env.SECRET_KEY_JSONWEBTOKEN, (err, decoded) => {
                if(err){
                    res.json({
                        success: 0, 
                        message: "Invalid Token"
                    })
                }
                else{
                    next();
                }
            });
        }
        else{
            res.json({
                success: 0,
                message: "Unauthorized User"
            });
        }
    }
}


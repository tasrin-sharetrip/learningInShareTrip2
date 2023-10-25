const pool = require("../config/database");

const createUserModel = (req, res)=>{

    const createUserQuery = `

     CREATE TABLE IF NOT EXISTS registration (

      id int NOT NULL AUTO_INCREMENT,
      firstname varchar(255),
      lastname varchar(255),
      gender varchar(255),
      email varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      number varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
    );`;
  
    pool.query(createUserQuery, (err, result) => {
        if (err) {
            res.status(500).send(err); // Send an error response
        } else {
            res.send({ result });
        }
    });
  }
  
  module.exports={
    createUserModel
  }
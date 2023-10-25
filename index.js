require("dotenv").config()
const express = require("express");
const app = express(); 
const userRouter = require("./api/users/user.router");
app.use(express.json()); // to convert user request in json *** before going to router this line should be written
const {createUserModel} = require("./model/user.model");

app.use("/api/users", userRouter);
app.post("/createtable", createUserModel);

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT : ", process.env.APP_PORT);
});

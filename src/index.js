// mongodb+srv://tasrin:<password>@cluster0.ftszcju.mongodb.net/
const express = require("express"); // require("express")---> importing express library, 
const app = express(); // creating app object
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const mongoose = require("mongoose")

app.use(express.json());

//middleware
app.use((req, res, next) => {
    // log the request to show
    console.log("HTTP Method - " + req.method + " , URL - " +req.url);
    next();
})

app.use("/users", userRouter); // if request come from /user it will go to ./routes/userRoutes file

app.use("/notes", noteRouter);

// method define
app.get("/", (req, res) => { // request is coming for root
    // req & res are object
    res.status(200).send("Hello");
})

mongoose.connect("mongodb+srv://tasrin:tasrin@cluster0.ftszcju.mongodb.net/")
.then(() => {
    // app have to start now
    app.listen(5000, ()=>{
        console.log("Server started on port no. 5000");
    })
}) 
.catch((error) =>{
    console.log(error);
})



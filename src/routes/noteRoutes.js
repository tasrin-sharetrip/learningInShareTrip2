const express = require("express");
const { getNotes, createNote, updateNote, deleteNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();

noteRouter.get("/", auth, getNotes); // here getNodes is the next() function which I saw in auth.js

noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);

module.exports = noteRouter;



// in route files we only define the route response function will not be here
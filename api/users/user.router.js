const { createUser, getUserByUserId, getUsers, updateUsers, deleteUser, login} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../middlewares/token_validation");


//router.post("/", checkToken, createUser); // without authentication can't create user
router.post("/", createUser);
router.get("/", checkToken, getUsers); // without authentication can't get all users list 
router.get("/:id", checkToken, getUserByUserId);
router.put("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser); // it can be solved by id also, here controller was designed like this

router.post("/login", login); // in login we are creating token so no need for checktoken here

module.exports = router;
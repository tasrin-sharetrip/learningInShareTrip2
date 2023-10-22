const { createUser, getUserByUserId, getUsers, updateUsers, deleteUser } = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserByUserId);
router.put("/", updateUsers);
router.delete("/", deleteUser); // it can be solved by id also, here controller was designed like this

router.post("/login", )

module.exports = router;
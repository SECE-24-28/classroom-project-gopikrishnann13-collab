const express = require("express");
const { getUser, postUser, deleteUser, updateUser } = require("../controller/userController");

const router = express.Router();

router.get("/getuser", getUser);
router.post("/postUser", postUser);
router.delete("/deleteUser/:idci", deleteUser);
router.put("/updateUser/:id", updateUser);

module.exports = router;
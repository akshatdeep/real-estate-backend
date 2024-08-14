const express = require("express")
const { getAllUsers, getUpdateUsers, DeleteUsers, getUsers } = require("../controllers/userControllers")
const { isAuthenticated } = require("../middlewares/auth")

const router = express.Router()



router.get("/getAll", getAllUsers)

router.get("/getuser",isAuthenticated, getUsers)

router.post("/updateUser/:id",isAuthenticated, getUpdateUsers )

router.post("/deleteUser/:id",isAuthenticated, DeleteUsers)


module.exports = router;
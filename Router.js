const express = require("express")
const {
    GetUser,
    getSingleUser,
    RegisterUser,
    SignInUser
} = require("./Controller")
const router = express.Router()

router.route("/").get(GetUser)
router.route("/:id").get(getSingleUser)
router.route("/post").post(RegisterUser)
router.route("/signin").post(SignInUser)

module.exports = router
const express = require("express");

const { Login, Logout, createEmployee } = require("../controllers/Employee.Controller");

const router = express.Router();

router.route("/login").post(Login);
router.route("/").post(createEmployee);
router.route("/logout").get(Logout);

module.exports = router;
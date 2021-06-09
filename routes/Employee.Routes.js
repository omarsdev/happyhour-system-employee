const express = require("express");

const {} = require("../controllers/Employee.Controller");

const router = express.Router();

router.route("/login").post(Login);
router.route("/logout").get(logout);

module.exports = router;
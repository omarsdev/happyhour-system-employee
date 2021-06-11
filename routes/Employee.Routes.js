const express = require("express");

const {
  Login,
  Logout,
  createEmployee,
  getEmployees
} = require("../controllers/Employee.Controller");

const router = express.Router();

router.route("/login").post(Login);
router.route("/").post(createEmployee).get(getEmployees);
router.route("/logout").get(Logout);

module.exports = router;

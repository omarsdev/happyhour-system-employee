const express = require("express");

const {
  Login,
  Logout,
  createEmployee,
  getEmployees,
  UpdateEmployeeById
} = require("../controllers/Employee.Controller");

const router = express.Router();

router.route("/login").post(Login);
router.route("/").post(createEmployee).get(getEmployees);
router.route("/logout").get(Logout);
router.route("/:id").put(UpdateEmployeeById);

module.exports = router;

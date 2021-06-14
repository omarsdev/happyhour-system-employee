const express = require("express");

const {
    Login,
    Logout,
    createEmployee,
    getEmployees,
    getEmployeesByDepId,
    UpdateEmployeeById,
    Terminate,
    ChangePassword
} = require("../controllers/Employee.Controller");

const { protect } = require("../middleware/authorize");

const router = express.Router();

router.route("/login").post(Login);
router.route("/").post(protect, createEmployee).get(protect, getEmployees);
router.route("/logout").get(protect, Logout);
router.route("/terminate/:id").put(protect, Terminate);
router.route("/changepassword/:id").put(protect, ChangePassword);
router.route("/:id").put(protect, UpdateEmployeeById);
router.route("/department/:id").get(protect, getEmployeesByDepId);

module.exports = router;
const express = require("express");

const {
    Login,
    Logout,
    createEmployee,
    getEmployees,
    UpdateEmployeeById,
    getEmployeesByDepID,
    Terminate,
    ChangePassword
} = require("../controllers/Employee.Controller");

const { protect } = require("../middleware/authorize");

const router = express.Router();

router.route("/login").post(Login);
router.route("/").post(createEmployee).get(protect, getEmployees);
router.route("/logout").get(Logout);
router.route("/:id").put(UpdateEmployeeById).put(protect, Terminate).put(protect, ChangePassword);
router.route("/department/:id").get(getEmployeesByDepID);

module.exports = router;
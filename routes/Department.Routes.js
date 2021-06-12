const express = require("express");

const { createDepartment, getDepartmentbyId, updateDepartment, getDepartments } = require("../controllers/Department.Controller");

const router = express.Router();

router.route('/').post(createDepartment).get(getDepartments);
router.route('/:id').get(getDepartmentbyId).put(updateDepartment);

module.exports = router;
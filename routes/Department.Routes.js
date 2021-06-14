const express = require("express");

const { createDepartment, getDepartmentbyId, updateDepartment, getDepartments, getDepartmentsbyAgencyId } = require("../controllers/Department.Controller");

const router = express.Router();

router.route('/').post(createDepartment).get(getDepartments);
router.route('/:id').get(getDepartmentbyId).put(updateDepartment);
router.route('/agency/:agency_id').get(getDepartmentsbyAgencyId)

module.exports = router;
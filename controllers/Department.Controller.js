const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
    queryConnection,
    queryParamsConnection,
    queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.createDepartment = asyncHandler(async(req, res, next) => {
    const { agency_id, name } = req.body;
    // TODO add procedure 
    const dep = await queryParamsArrayConnection('INSERT INTO department(agency_id, name) VALUES (?, ?)', [agency_id, name]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.getDepartments = asyncHandler(async(req, res, next) => {
    const deps = await queryConnection('SELECT * FROM department').then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.getDepartmentbyId = asyncHandler(async(req, res, next) => {
    const dep = await queryParamsConnection('SELECT * FROM department WHERE id = ?', [req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.getDepartmentsbyAgencyId = asyncHandler(async(req, res, next) => {
    const deps = await queryParamsConnection('SELECT * FROM department WHERE agency_id = ?', [req.params.agency_id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.updateDepartment = asyncHandler(async(req, res, next) => {
    // TODO add procedure 
    const { agency_id, name } = req.body;
    const dep = await queryParamsArrayConnection('UPDATE department SET agency_id = ?, name = ? WHERE id = ?', [agency_id, name, req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});
// TODO add deleteDepartment 
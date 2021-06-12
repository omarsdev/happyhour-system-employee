const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");

exports.createDepartment = asyncHandler(async(req, res, next) => {
    const { manager_id, agency_id, name } = req.body;
    const dep = await con.query('INSERT INTO department(manager_id, agency_id, name) VALUES (?, ?, ?)', [manager_id, agency_id, name],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(200).json({
                success: true,
            });
        }
    );
});

exports.getDepartments = asyncHandler(async(req, res, next) => {
    const deps = await con.query('SELECT * FROM department',
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(200).json({
                success: true,
                data: result
            });
        }
    );
});

exports.getDepartmentbyId = asyncHandler(async(req, res, next) => {
    const deps = await con.query('SELECT * FROM department WHERE id = ?', [req.params.id],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(200).json({
                success: true,
                data: result
            });
        }
    );

});

exports.updateDepartment = asyncHandler(async(req, res, next) => {
    const { manager_id, agency_id, name } = req.body;
    const dep = await con.query('UPDATE department SET manager_id = ?, agency_id = ?, name = ? WHERE id = ?', [manager_id, agency_id, name, req.params.id],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(200).json({
                success: true,
            });
        }
    );
});
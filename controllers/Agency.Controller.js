const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");

exports.createMainAgency = asyncHandler(async(req, res, next) => {
    const { city_id, manager_id, name_en, name_ar } = req.body;
    const agency = await con.query(
        `INSERT INTO agency(city_id, manager_id, parent_agency_id, name_en, name_ar, isHQ) VALUES(?, ?, ?, ?, ?, ?)`, [city_id, manager_id, null, name_en, name_ar, true],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(201).json({
                success: true,
                data: result,
            });
        }
    );
});

exports.createSubAgency = asyncHandler(async(req, res, next) => {
    const { city_id, manager_id, name_en, name_ar } = req.body;
    const agency = await con.query(
        `INSERT INTO agency(city_id, manager_id, parent_agency_id, name_en, name_ar, isHQ) VALUES(?, ?, ?, ?)`, [city_id, manager_id, req.params.parent_id, name_en, name_ar, false],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(201).json({
                success: true,
                data: result,
            });
        }
    );
});

exports.getAgenciesById = asyncHandler(async(req, res, next) => {
    const agencies = await con.query(
        `SELECT * FROM agency WHERE parent_agency_id = ?`, [req.params.parent_id],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`), 400);
            }
            res.status(200).json({
                success: true,
                count: agencies.rows.length,
                data: result,
            });
        }
    );
});

exports.updateAgency = asyncHandler(async(req, res, next) => {
    const agency = await con.query(
        `UPDATE agency SET manager_id = ?, parent_agency_id = ?, name_en = ?, name_ar = ?, isHQ = ? WHERE id = ?`, [manager_id, parent_agency_id, name_en, name_ar, isHQ, req.params.id],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(201).json({
                success: true,
                data: result,
            });
        }
    );
});

exports.deleteAgency = asyncHandler(async(req, res, next) => {
    await con.query(
        `DELETE FROM agency WHERE id = ?`, [req.params.id],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(201).json({
                success: true,
            });
        }
    );
});
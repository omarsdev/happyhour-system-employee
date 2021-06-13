const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
    queryConnection,
    queryParamsConnection,
    queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.createMainAgency = asyncHandler(async(req, res, next) => {
    const { city_id, manager_id, name_en, name_ar } = req.body;
    const agency = await queryParamsArrayConnection(
        `INSERT INTO agency(city_id, manager_id, parent_agency_id, name_en, name_ar, isHQ) VALUES(?, ?, ?, ?, ?, ?)`, [city_id, manager_id, null, name_en, name_ar, true]).then((result) => {
        res.status(200).json({
            success: true,
            data: result,
        });
    });
});

exports.createSubAgency = asyncHandler(async(req, res, next) => {
    const { city_id, manager_id, parent_agency_id, name_en, name_ar } = req.body;
    const agency = await queryParamsArrayConnection(
        `INSERT INTO agency(city_id, manager_id, parent_agency_id, name_en, name_ar, isHQ) VALUES(?, ?, ?, ?, ?, ?)`, [city_id, manager_id, req.params.parent_id, name_en, name_ar, false]).then((result) => {
        res.status(200).json({
            success: true,
            data: result,
        });
    });
});

exports.getAgenciesById = asyncHandler(async(req, res, next) => {
    const agencies = await queryParamsConnection(
        `SELECT * FROM agency WHERE parent_agency_id = ?`, [req.params.parent_id]).then((result) => {
        /* res.status(200).json({
            success: true,
            data: result,
        }); */
    });
    res.status(200).json({
        success: true,
        data: agencies,
    });
});

exports.updateAgency = asyncHandler(async(req, res, next) => {
    const agency = await queryParamsArrayConnection(
        `UPDATE agency SET city_id = ?, manager_id = ?, parent_agency_id = ?, name_en = ?, name_ar = ?, isHQ = ? WHERE id = ?`, [city_id, manager_id, parent_agency_id, name_en, name_ar, isHQ, req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result,
        });
    });
});

exports.deleteAgency = asyncHandler(async(req, res, next) => {
    await queryParamsConnection(
        `DELETE FROM agency WHERE id = ?`, [req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
        });
    });
});
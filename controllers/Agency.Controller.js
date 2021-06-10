const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { con } = require("../config/db");

exports.createMainAgency = asyncHandler(async(req, res, next) => {
    const { manager_id, name_en, name_ar } = req.body;
    const agency = await con.query("INSERT INTO agency(manager_id, parent_agency_id, name_en, name_ar, isHQ, create_date) VALUES($1, $2, $3, $4, $5, $6)", [manager_id, null, name_en, name_ar, true, Date.now]);

    res.status(201).json({
        success: true,
        data: agency,
    });
});

exports.createSubAgency = asyncHandler(async(req, res, next) => {
    const { manager_id, name_en, name_ar } = req.body;
    const agency = await con.query("INSERT INTO agency(manager_id, parent_agency_id, name_en, name_ar, isHQ, create_date) VALUES($1, $2, $3, $4, $5, $6)", [manager_id, req.params.parent_id, name_en, name_ar, false, Date.now]);

    res.status(201).json({
        success: true,
        data: agency,
    });
});

exports.getAgenciesById = asyncHandler(async(req, res, next) => {
    const agencies = await con.query("SELECT * FROM agency WHERE parent_agency_id = $1", [req.params.parent_id]);

    console.log(agencies);

    res.status(200).json({
        success: true,
        count: agencies.rows.length,
        data: agencies,
    });
});

exports.updateAgency = asyncHandler(async(req, res, next) => {
    const agency = await con.query("UPDATE agency SET manager_id = $1, parent_agency_id = $2, name_en = $3, name_ar = $4, isHQ = $5 WHERE id = $6", [manager_id, parent_agency_id, name_en, name_ar, isHQ, req.params.id]);

    res.status(201).json({
        success: true,
        data: agency,
    });
});

exports.deleteAgency = asyncHandler(async(req, res, next) => {
    await con.query("DELETE FROM agency WHERE id = $1", [req.params.id]);

    res.status(201).json({
        success: true,
    });
});
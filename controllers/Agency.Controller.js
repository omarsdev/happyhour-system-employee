const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const {
  queryConnection,
  queryParamsConnection,
  queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.createMainAgency = asyncHandler(async (req, res, next) => {
  const { city_id, name_en, name_ar } = req.body;

  // CHECK IF CITY_ID EXISTS PROCEDURE
  const addAgencyCheck = await queryParamsConnection("call addAgencyCheck(?)", [
    city_id,
  ]).then((result) => {
    return result[0][0].isExists;
  });
  if (addAgencyCheck == -1) {
    return next(new ErrorResponse(`City Exists`, 400));
  }

  const agency = await queryParamsArrayConnection(
    `INSERT INTO agency(city_id, parent_agency_id, name_en, name_ar, isHQ) VALUES(?, ?, ?, ?, ?)`,
    [city_id, null, name_en, name_ar, true]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.createSubAgency = asyncHandler(async (req, res, next) => {
  const { city_id, name_en, name_ar } = req.body;

  const agency = await queryParamsArrayConnection(
    `INSERT INTO agency(city_id, parent_agency_id, name_en, name_ar, isHQ) VALUES(?, ?, ?, ?, ?)`,
    [city_id, req.params.parent_id, name_en, name_ar, false]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getAgencies = asyncHandler(async (req, res, next) => {
  const agencies = await queryConnection(`SELECT * FROM agency`).then(
    (result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});

exports.getAgenciesById = asyncHandler(async (req, res, next) => {
  const agencies = await queryParamsConnection(
    `SELECT * FROM agency WHERE parent_agency_id = ?`,
    [req.params.parent_id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getAgencyById = asyncHandler(async (req, res, next) => {
  const agencies = await queryParamsConnection(
    `SELECT * FROM agency WHERE id = ?`,
    [req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.updateAgency = asyncHandler(async (req, res, next) => {
  const { city_id, name_en, name_ar, isHQ } = req.body;

  // CHECK IF CITY_ID EXISTS PROCEDURE
  //TODO check this
  const updateAgencyCheck = await queryParamsConnection(
    "call updateAgencyCheck(?, ?)",
    [req.params.id, city_id]
  ).then((result) => {
    return result[0][0].isExists;
  });
  if (updateAgencyCheck == -1) {
    return next(new ErrorResponse("City is exists"));
  }

  const agency = await queryParamsArrayConnection(
    `UPDATE agency SET city_id = ?, name_en = ?, name_ar = ?, isHQ = ? WHERE id = ?`,
    [city_id, name_en, name_ar, isHQ, req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.deleteAgency = asyncHandler(async (req, res, next) => {
  const cdel = await queryParamsConnection(
    `DELETE FROM agency WHERE parent_agency_id = ?`,
    [req.params.id]
  ).then((result) => {});

  const del = await queryParamsConnection(`DELETE FROM agency WHERE id = ?`, [
    req.params.id,
  ]).then((result) => {
    res.status(200).json({
      success: true,
    });
  });
});

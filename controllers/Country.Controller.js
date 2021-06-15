const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
  queryConnection,
  queryParamsConnection,
  queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.createCountry = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar, province_code } = req.body;

  // CHECK IF NAMES EXISTS OR PROVINCCE_CODE PROCEDURE
  const addCountryCheck = await queryParamsArrayConnection(
    "call addCountryCheck(?, ?, ?)",
    [name_en, name_ar, province_code]
  ).then((result) => {
    return result[0][0].isExists;
  });
  if (addCountryCheck == -1) {
    return next(new ErrorResponse(`The name or province_code Exists`, 400));
  }

  const country = await queryParamsArrayConnection(
    `INSERT INTO country(name_en, name_ar, province_code) VALUES(?, ?, ?)`,
    [name_en, name_ar, province_code]
  ).then((result) => {
    res.status(200).json({
      success: true,
    });
  });
});

exports.getCountries = asyncHandler(async (req, res, next) => {
  const countries = await queryConnection("SELECT * FROM country").then(
    (result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});

exports.getCountryById = asyncHandler(async (req, res, next) => {
  const country = await queryParamsConnection(
    "SELECT * FROM country WHERE id = ?",
    [req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.updateCountry = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar, province_code } = req.body;

  // TODO check procedure
  const updateCountryCheck = await queryParamsArrayConnection(
    "call updateCountryCheck(?, ?, ?, ?)",
    [req.params.id, name_en, name_ar, province_code]
  ).then((result) => {
    return result[0][0].isExists;
  });
  if (updateCountryCheck == -1) {
    return next(new ErrorResponse(`The name or province_code Exists`, 400));
  }

  const country = await queryParamsArrayConnection(
    "UPDATE country SET name_en = ?, name_ar = ?, province_code = ? WHERE id = ?",
    [name_en, name_ar, province_code, req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.deleteCountry = asyncHandler(async (req, res, next) => {
  const del = await queryParamsConnection("DELETE FROM country WHERE id = ?", [
    req.params.id,
  ]).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

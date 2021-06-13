const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
  queryConnection,
  queryParamsConnection,
  queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.createCity = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar, province_code } = req.body;
  const city = await queryParamsArrayConnection(
    "INSERT INTO city(country_id, name_en, name_ar) VALUES(?, ?, ?)",
    [req.params.country_id, name_en, name_ar, province_code]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getCitiesById = asyncHandler(async (req, res, next) => {
  const cities = await queryParamsConnection(
    "SELECT * FROM city where country_id = ?",
    [req.params.country_id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      count: cities.rows.length,
      data: result,
    });
  });
});

exports.updateCity = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar } = req.body;
  const city = await queryParamsArrayConnection(
    "UPDATE city SET name_en = ?, name_ar = ? WHERE id = ?",
    [name_en, name_ar, req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.deleteCity = asyncHandler(async (req, res, next) => {
  await queryParamsConnection("DELETE FROM city WHERE id = ?", [
    req.params.id,
  ]).then((result) => {
    res.status(200).json({
      success: true,
    });
  });
});

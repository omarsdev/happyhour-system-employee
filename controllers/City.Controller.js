const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");

exports.createCity = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar, province_code } = req.body;
  const city = await con.query(
    "INSERT INTO city(country_id, name_en, name_ar, province_code) VALUES(?, ?, ?, ?)",
    [req.params.country_id, name_en, name_ar, province_code],
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

exports.getCitiesById = asyncHandler(async (req, res, next) => {
  const cities = await con.query(
    "SELECT * FROM city where country_id = ?",
    [req.params.country_id],
    (err, result) => {
      if (err) {
        return next(new ErrorResponse(`Error: ${err}`, 400));
      }
      res.status(200).json({
        success: true,
        count: cities.rows.length,
        data: result,
      });
    }
  );
});

exports.updateCity = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar } = req.body;
  const city = await con.query(
    "UPDATE city SET name_en = ?, name_ar = ? WHERE id = ?",
    [name_en, name_ar, req.params.id],
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

exports.deleteCity = asyncHandler(async (req, res, next) => {
  await con.query(
    "DELETE FROM city WHERE id = ?",
    [req.params.id],
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

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");

exports.createCountry = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar, province_code } = req.body;
  const country = await con.query(
    `INSERT INTO country(name_en, name_ar, province_code) VALUES(?, ?, ?)`,
    [name_en, name_ar, province_code],
    (err, rows, field) => {
      if (err) {
        return next(new ErrorResponse(`Error: ${err}`, 400));
      }
      res.status(200).json({
        success: true,
      });
    }
  );
});

exports.getCountries = asyncHandler(async (req, res, next) => {
  const countries = await con.query("SELECT * FROM country", (err, result) => {
    if (err) {
      return next(new ErrorResponse(`Error: ${err}`, 400));
    }
    res.status(201).json({
      success: true,
      data: rows,
    });
  });
});

exports.getCountryById = asyncHandler(async (req, res, next) => {
  const country = await con.query(
    "SELECT * FROM country WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return next(new ErrorResponse(`Error: ${err}`, 400));
      }
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});

exports.updateCountry = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar, province_code } = req.body;
  const country = await con.query(
    "UPDATE country SET name_en = ?, name_ar = ?, province_code = ? WHERE id = ?",
    [name_en, name_ar, province_code, req.params.id],
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

exports.deleteCountry = asyncHandler(async (req, res, next) => {
  const del = await con.query(
    "DELETE FROM country WHERE id = ?",
    [req.params.id],
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

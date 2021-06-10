const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { con } = require("../config/db");

exports.createCity = asyncHandler(async (req, res, next) => {
  const { name_en, name_ar, province_code } = req.body;
  const city = await con.query(
    "INSERT INTO city(country_id, name_en, name_ar, create_date) VALUES($1, $2, $3, $4)",
    [req.params.country_id, name_en, name_ar, province_code, Date.now]
  );

  res.status(201).json({
    success: true,
    data: city,
  });
});

exports.getCitiesById = asyncHandler(async (req, res, next) => {
  const cities = await con.query("SELECT * FROM city where country_id = $1", [
    req.params.country_id,
  ]);

  console.log(cities);

  res.status(200).json({
    success: true,
    count: cities.rows.length,
    data: cities,
  });
});

exports.updateCity = asyncHandler(async (req, res, next) => {
  const city = await con.query(
    "UPDATE city SET name_en = $1, name_ar = $2 WHERE id = $3",
    [name_en, name_ar, req.params.id]
  );

  res.status(201).json({
    success: true,
    data: city,
  });
});

exports.deleteCity = asyncHandler(async (req, res, next) => {
  await con.query("DELETE FROM city WHERE id = $1", [req.params.id]);

  res.status(201).json({
    success: true,
  });
});

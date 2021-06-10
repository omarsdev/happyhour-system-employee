const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { con } = require("../config/db");

exports.createCountry = asyncHandler(async(req, res, next) => {
    const { name_en, name_ar, province_code } = req.body;
    console.log(req.body);
    //TODO chenge date to be created in mysql
    const country = await con.query(`INSERT INTO country(name_en, name_ar, province_code, create_date) VALUES(${name_en}, ${name_ar}, ${province_code}, "2017-06-15 09:34:21")`, (err, rows) => {
        if (!err) {
            res.status(201).json({
                success: true,
                data: country,
            });
        }
    });

    //console.log(country);

});

exports.getCountries = asyncHandler(async(req, res, next) => {
    const countries = await con.query("SELECT * FROM country", (err, rows) => {
        if (!err) {
            res.status(201).json({
                success: true,
                data: countries.rows,
            });
        }
    });
});

exports.getCountryById = asyncHandler(async(req, res, next) => {
    const country = await con.query("SELECT * FROM country WHERE id = $1", [req.params.id]);

    if (!country) {
        return next(
            new ErrorResponse(`Country not found with id of ${req.params.id}`, 404)
        )
    }

    res.status(200).json({
        success: true,
        data: country,
    });
});

exports.updateCountry = asyncHandler(async(req, res, next) => {
    const country = await con.query("UPDATE country SET name_en = $1, name_ar = $2, province_code = $3 WHERE id = $4", [name_en, name_ar, province_code, req.params.id]);

    res.status(201).json({
        success: true,
        data: country,
    });
});

exports.deleteCountry = asyncHandler(async(req, res, next) => {
    await con.query("DELETE FROM country WHERE id = $1", [req.params.id]);

    res.status(201).json({
        success: true,
    });
});
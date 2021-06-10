const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");

exports.createCountry = asyncHandler(async(req, res, next) => {
    const { name_en, name_ar, province_code } = req.body;
    //console.log(name_en, name_ar, province_code)
    const country = await con.query(`INSERT INTO country(name_en, name_ar, province_code) VALUES('${name_en}', '${name_ar}', '${province_code}')`, function(err, rows, field) {
        if (err) {
            console.log(err);
        }
        //console.log(field);
        res.json({
            success: true,
        });
    });
    //console.log(country);

});

exports.getCountries = asyncHandler(async(req, res, next) => {
    const countries = await con.query("SELECT * FROM country", function(err, rows, field) {

        // console.log(countries)
        res.status(201).json({
            success: true,
            data: rows,
        });
    });
    console.log(countries)
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
        data: country.rows[0],
    });
});

exports.updateCountry = asyncHandler(async(req, res, next) => {
    const { name_en, name_ar, province_code } = req.body;
    try {
        const country = await con.query("UPDATE country SET name_en = $1, name_ar = $2, province_code = $3 WHERE id = $4", [name_en, name_ar, province_code, req.params.id]);

        res.status(201).json({
            success: true,
            data: country,
        });
    } catch (err) {
        console.log(err);
    }
});

exports.deleteCountry = asyncHandler(async(req, res, next) => {
    try {
        const del = await con.query("DELETE FROM country WHERE id = $1", [req.params.id]);

        res.status(201).json({
            success: true,
            data: del
        });
    } catch (err) {
        console.log(err);
    }
});
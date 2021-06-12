const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");

exports.createPosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const position = await con.query(
        `INSERT INTO position(name) VALUES(?)`, [name],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(200).json({
                success: true,
            });
        }
    );
});

exports.updatePosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const position = await con.query(
        `UPDATE position SET name = ? WHERE id = ?`, [name, req.params.id],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
            res.status(200).json({
                success: true,
            });
        }
    );
});

exports.createSubPosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const position = await con.query(
        `INSERT INTO position(name) VALUES(?)`, [name],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
        }
    );
    const position_id = await con.query(
        `SELECT id FROM position WHERE name = ?`, [name],
        (err, result) => {
            if (err) {
                return next(new ErrorResponse(`Error: ${err}`, 400));
            }
        }
    );
    const child = await con.query('INSERT INTO position_children(position_id, child_position_id) VALUES (?, ?)', [req.params.id, position_id], (err, result) => {
        if (err) {
            return next(new ErrorResponse(`Error: ${err}`, 400));
        }
        res.status(200).json({
            success: true
        });
    });
});
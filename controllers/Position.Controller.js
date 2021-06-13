const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
    queryConnection,
    queryParamsConnection,
    queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.getPositions = asyncHandler(async(req, res, next) => {
    const positions = await queryConnection(
        `SELECT * FROM position`).then((result) => {
        /* res.status(200).json({
            success: true,
            data: result
        }); */
    });
    res.status(200).json({
        success: true,
        data: positions
    });
});

exports.createPosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const position = await queryParamsConnection(
        `INSERT INTO position(name) VALUES(?)`, [name]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.updatePosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const position = await queryParamsArrayConnection(
        `UPDATE position SET name = ? WHERE id = ?`, [name, req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.createSubPosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const position = await queryParamsConnection(
        `INSERT INTO position(name) VALUES(?)`, [name]).then((result) => {
        /* res.status(200).json({
            success: true,
            data: result
        }); */
    });
    const position_id = await queryParamsConnection(
        `SELECT id FROM position WHERE name = ?`, [name]).then((result) => {
        /* res.status(200).json({
            success: true,
            data: result
        }); */
    });
    const child = await queryParamsArrayConnection('INSERT INTO position_children(position_id, child_position_id) VALUES (?, ?)', [req.params.id, position_id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});
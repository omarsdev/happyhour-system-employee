/* const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
    queryConnection,
    queryParamsConnection,
    queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.getRoles = asyncHandler(async(req, res, next) => {
    const roles = await queryConnection(
        `SELECT * FROM role`).then((result) => {});
    res.status(200).json({
        success: true,
        data: roles
    });
});

exports.createRole = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const role = await queryParamsConnection(
        `INSERT INTO role(name) VALUES (?)`, [name]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.addRoletoPosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;

    const role = await queryParamsConnection(
        `INSERT INTO role(name) VALUES (?)`, [name]).then((result) => {});

    const role = await queryParamsConnection(
        `INSERT INTO role(name) VALUES (?)`, [name]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.addRoletoEmployee = asyncHandler(async(req, res, next) => {
    const { name } = req.body;

    const role = await queryParamsConnection(
        `INSERT INTO role(name) VALUES (?)`, [name]).then((result) => {});

    const role = await queryParamsConnection(
        `INSERT INTO role(name) VALUES (?)`, [name]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
}); */
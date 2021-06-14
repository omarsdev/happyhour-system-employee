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
        `SELECT * FROM pos`).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.getPositionById = asyncHandler(async(req, res, next) => {
    const positions = await queryParamsConnection(
        `SELECT * FROM pos WHERE id = ?`, [req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.getPositionsByDepId = asyncHandler(async(req, res, next) => {
    const positions = await queryParamsConnection(
        `SELECT pos.name FROM department_positions INNER JOIN pos ON department_positions.position_id = pos.id WHERE department_positions.department_id = ?`, [req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.createPosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;



    //console.log(name);
    const position = await queryParamsConnection(
        "INSERT INTO pos(name) VALUES (?)", [name]).then((result) => {
        /* res.status(200).json({
            success: true,
            data: result
        }); */
    });

    var id;
    const pos_id = await queryParamsConnection(`SELECT id FROM pos WHERE name = ?`, [name]).then((result) => {
        /* res.status(200).json({
            success: true,
            data: result
        }); */
        id = result[0].id;
    });

    const dep_pos = await queryParamsArrayConnection(`INSERT INTO department_positions(department_id, position_id) VALUES (?, ?)`, [req.params.id, id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
    /* const position = await con.query(`INSERT INTO position(name) VALUES (${name})`, (req, res) => {
        res.status(200).json({
            success: true,
            data: res
        });
    }) */
});

exports.updatePosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    const position = await queryParamsArrayConnection(
        `UPDATE pos SET name = ? WHERE id = ?`, [name, req.params.id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });
});

exports.createSubPosition = asyncHandler(async(req, res, next) => {
    const { name } = req.body;
    //PROC
    const position = await queryParamsConnection(
        `INSERT INTO pos(name) VALUES(?)`, [name]).then((result) => {});

    var id;
    const pos_id = await queryParamsConnection(`SELECT id FROM pos WHERE name = ?`, [name]).then((result) => {

        id = result[0].id;
    });
    const child = await queryParamsArrayConnection('INSERT INTO department_positions(department_id, position_id) VALUES (?, ?)', [req.params.dep_id, id]).then((result) => {
        /* res.status(200).json({
            success: true,
            data: result
        }); */
    });
    const child2 = await queryParamsArrayConnection('INSERT INTO position_children(position_id, child_position_id) VALUES (?, ?)', [req.params.id, id]).then((result) => {
        res.status(200).json({
            success: true,
            data: result
        });
    });

});
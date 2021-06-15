const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
  queryConnection,
  queryParamsConnection,
  queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.getPositions = asyncHandler(async (req, res, next) => {
  const positions = await queryConnection(`SELECT * FROM pos`).then(
    (result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});

exports.getPositionById = asyncHandler(async (req, res, next) => {
  const positions = await queryParamsConnection(
    `SELECT * FROM pos WHERE id = ?`,
    [req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getPositionsByDepId = asyncHandler(async (req, res, next) => {
  const positions = await queryParamsConnection(
    `SELECT pos.name FROM department_positions INNER JOIN pos ON department_positions.position_id = pos.id WHERE department_positions.department_id = ?`,
    [req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.createPosition = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // TODO check and add all procedures here
  const addPositionCheck = await queryParamsConnection(
    "call addPositionCheck(?)",
    `${name}`
  ).then((result) => {
    return result[0][0].isExists;
  });

  if (addPositionCheck == 1) {
    const position = await queryParamsConnection(
      "INSERT INTO pos(name) VALUES (?)",
      [name]
    ).then((result) => {});
  }

  var id;
  const pos_id = await queryParamsConnection(
    `SELECT id FROM pos WHERE name = ?`,
    [name]
  ).then((result) => {
    id = result[0].id;
  });

  ////////
  const addDepartment_posCheck = await queryParamsArrayConnection(
    "call addDepartment_posCheck(?, ?)",
    [req.params.id, pos_id]
  ).then((result) => {
    return result[0][0].isExists;
  });

  //check this later
  if (addDepartment_posCheck == -1) {
    const dep_pos = await queryParamsArrayConnection(
      `INSERT INTO department_positions(department_id, position_id) VALUES (?, ?)`,
      [req.params.id, id]
    ).then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    });
  } else {
    return next(new ErrorResponse("Position name exists", 400));
  }
});

exports.updatePosition = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  // TODO check and add all procedures here
  const position = await queryParamsArrayConnection(
    `UPDATE pos SET name = ? WHERE id = ?`,
    [name, req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.createSubPosition = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  // TODO check and add all procedures here
  const position = await queryParamsConnection(
    `INSERT INTO pos(name) VALUES(?)`,
    [name]
  ).then((result) => {});

  var id;
  const pos_id = await queryParamsConnection(
    `SELECT id FROM pos WHERE name = ?`,
    [name]
  ).then((result) => {
    id = result[0].id;
  });
  const child = await queryParamsArrayConnection(
    "INSERT INTO department_positions(department_id, position_id) VALUES (?, ?)",
    [req.params.dep_id, id]
  ).then((result) => {});
  const child2 = await queryParamsArrayConnection(
    "INSERT INTO position_children(position_id, child_position_id) VALUES (?, ?)",
    [req.params.id, id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

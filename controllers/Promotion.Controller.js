const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
  queryConnection,
  queryParamsConnection,
  queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.getPromotions = asyncHandler(async (req, res, next) => {
  const pros = await queryConnection(`SELECT * FROM promotion`).then(
    (result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});

exports.Promote = asyncHandler(async (req, res, next) => {
  const { to_position_id } = req.body;

  const from_position_id = await queryParamsConnection(
    `SELECT position_id FROM employee WHERE id = ?`,
    [req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });

  const promote = await queryParamsArrayConnection(
    `INSERT INTO promotion(employee_id, from_position_id, to_position_id) VALUES (?, ?, ?)`,
    [req.params.id, from_position_id, to_position_id]
  ).then((result) => {
    res.status(200).json({
      success: true,
    });
  });

  const change = await queryParamsArrayConnection(
    `UPDATE employee SET position_id = ? WHERE id = ?`,
    [to_position_id, req.params.id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
  queryConnection,
  queryParamsConnection,
  queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.getAllReports = asyncHandler(async (req, res, next) => {
  const allReports = await queryConnection("SELECT * FROM report").then(
    (result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});

exports.getReportById = asyncHandler(async (req, res, next) => {
  const report = await queryParamsConnection(
    "SELECT * FROM report WHERE report_id = ?",
    [req.params.report_id]
  ).then((result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.createReport = asyncHandler(async (req, res, next) => {
  const { sender_id, receiver_id, subject, content } = req.body;

  const report = await queryParamsArrayConnection(
    `INSERT INTO report(sender_id, receiver_id, subject, content) VALUES(?, ?, ?, ?)`,
    [sender_id, receiver_id, subject, content]
  ).then((result) => {
    res.status(201).json({
      success: true,
      data: result,
    });
  });
});
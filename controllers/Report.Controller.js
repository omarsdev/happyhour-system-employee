const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");

exports.getAllReports = asyncHandler(async (req, res, next) => {
  const allReports = await con.query("SELECT * FROM report", (err, result) => {
    if (err) {
      return next(new ErrorResponse(`Error: ${err}`, 400));
    }
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getReportById = asyncHandler(async (req, res, next) => {
  const report = await con.query(
    "SELECT * FROM report WHERE report_id = ?",
    [req.params.report_id],
    (err, result) => {
      if (err) {
        return next(new ErrorResponse(`Error: ${err}`, 400));
      }
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );
});

exports.createReport = asyncHandler(async (req, res, next) => {
  const { sender_id, receiver_id, subject, content } = req.body;

  const report = await con.query(
    `INSERT INTO report(sender_id, receiver_id, subject, content) VALUES(?, ?, ?, ?)`,
    [sender_id, receiver_id, subject, content],
    (err, result) => {
      if (err) {
        return next(new ErrorResponse(`Error: ${err}`, 400));
      }
      res.status(201).json({
        success: true,
        data: result,
      });
    }
  );
});

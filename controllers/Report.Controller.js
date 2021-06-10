const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { con } = require("../config/db");

exports.getAllReports = asyncHandler(async (req, res, next) => {
  const allReports = await con.query("SELECT * FROM report", (err, rows) => {
    if (!err) {
      res.status(200).json({
        success: true,
        data: allReports,
      });
    }
  });
});

exports.getReportById = asyncHandler(async (req, res, next) => {
  const report = await con.query(
    "SELECT * FROM report WHERE report_id = $1",
    [req.params.report_id],
    (err, next) => {
      if (!err) {
        res.status(200).json({
          success: true,
          data: report,
        });
      }
    }
  );
});

exports.createReport = asyncHandler(async (req, res, next) => {
  const { sender_id, receiver_id, subject, content } = req.body;

  const report = await con.query(
    `INSERT INTO report(sender_id, receiver_id, subject, content, create_date) VALUES($1, $2, $3, $4, $5)`,
    [sender_id, receiver_id, subject, content, Date.now()],
    (err, next) => {
      if (!err) {
        res.status(201).json({
          success: true,
          data: report,
        });
      }
    }
  );
});

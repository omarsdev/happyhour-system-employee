const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const con = require("../config/db");
const {
    queryConnection,
    queryParamsConnection,
    queryParamsArrayConnection,
} = require("../utils/queryStatements");

exports.getAllReportsBySenderID = asyncHandler(async(req, res, next) => {
    const allReports = await queryConnection("SELECT * FROM report WHERE sender_id = ?", [req.params.id]).then(
        (result) => {
            res.status(200).json({
                success: true,
                data: result,
            });
        }
    );
});

exports.getAllReportsByReceiverID = asyncHandler(async(req, res, next) => {
    const allReports = await queryParamsConnection("SELECT * FROM report WHERE receiver_id = ?", [req.params.id]).then(
        (result) => {
            res.status(200).json({
                success: true,
                data: result,
            });
        }
    );
});

exports.getAllReports = asyncHandler(async(req, res, next) => {
    const allReports = await queryConnection("SELECT * FROM report").then(
        (result) => {
            res.status(200).json({
                success: true,
                data: result,
            });
        }
    );
});

exports.getReportById = asyncHandler(async(req, res, next) => {
    const report = await queryParamsConnection(
        "SELECT * FROM report WHERE report_id = ?", [req.params.report_id]
    ).then((result) => {
        /* res.status(200).json({
          success: true,
          data: result,
        }); */
    });
    res.status(200).json({
        success: true,
        data: report,
    });
});

exports.createReport = asyncHandler(async(req, res, next) => {
    const { receiver_id, subject, content } = req.body;
    console.log(req.employee);

    const report = await queryParamsArrayConnection(
        `INSERT INTO report(sender_id, receiver_id, subject, content) VALUES(?, ?, ?, ?)`, [req.employee[0].id, receiver_id, subject, content]
    ).then((result) => {
        res.status(201).json({
            success: true,
            data: result,
        });
    });
});

exports.getAllSentReports = asyncHandler(async(req, res, next) => {
    const allReports = await queryParamsConnection("SELECT * FROM report WHERE sender_id = ?", [req.employee.id]).then(
        (result) => {
            /* res.status(200).json({
              success: true,
              data: result,
            }); */
        }
    );
    res.status(200).json({
        success: true,
        data: allReports,
    });
});

exports.getAllReceivedReports = asyncHandler(async(req, res, next) => {
    const allReports = await queryParamsConnection("SELECT * FROM report WHERE receiver_id = ?", [req.employee.id]).then(
        (result) => {
            /* res.status(200).json({
              success: true,
              data: result,
            }); */
        }
    );
    res.status(200).json({
        success: true,
        data: allReports,
    });
});
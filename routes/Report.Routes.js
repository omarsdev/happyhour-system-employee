const express = require("express");

const {
  getReportById,
  getAllReports,
  createReport,
} = require("../controllers/Report.Controller");

const router = express.Router();

router.route("/").get(getAllReports).post(createReport);
router.route("/:report_id").get(getReportById);

module.exports = router;

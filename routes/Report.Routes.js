const express = require("express");

const {
    getAllReports,
    getReportById,
    createReport,
    getAllReceivedReports,
    getAllSentReports,
    getAllReportsByReceiverID,
    getAllReportsBySenderID,
} = require("../controllers/Report.Controller");

const { protect, authorize } = require("../middleware/authorize");

const router = express.Router();

router.route("/received").get(protect, getAllReceivedReports);
router.route("/sent").get(protect, getAllSentReports);
router.route("/").post(protect, authorize("CyberSecurity"), createReport).get(getAllReports);
router.route("/:report_id").get(getReportById);
router.route("/send/:id").get(getAllReportsBySenderID);
router.route("/receive/:id").get(getAllReportsByReceiverID);

module.exports = router;
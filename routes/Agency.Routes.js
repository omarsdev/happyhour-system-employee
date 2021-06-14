const express = require("express");

const {
    createMainAgency,
    getAgenciesById,
    createSubAgency,
    updateAgency,
    deleteAgency,
    getAgencies,
    getAgencyById,
} = require("../controllers/Agency.Controller");

const router = express.Router();

router.route("/").post(createMainAgency).get(getAgencies);

router.route("/parent/:parent_id").get(getAgenciesById).post(createSubAgency);

router.route("/:id").get(getAgencyById).put(updateAgency).delete(deleteAgency);

module.exports = router;
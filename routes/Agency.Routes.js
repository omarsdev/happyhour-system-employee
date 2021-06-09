const express = require("express");

const { createMainAgency, getAgenciesById, createSubAgency, updateAgency, deleteAgency } = require("../controllers/Agency.Controller");

const router = express.Router();

router
    .route("/")
    .post(createMainAgency);

router
    .route("/:parent_id")
    .get(getAgenciesById)
    .post(createSubAgency);

router
    .route("/:id")
    .put(updateAgency)
    .delete(deleteAgency);
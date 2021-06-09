const express = require("express");

const { getCitiesById, createCity, updateCity, deleteCity } = require("../controllers/City.Controller");

const {} = require("../middleware/auth");
const router = express.Router();

router
    .route("/:country_id")
    .get(getCitiesById)
    .post(createCity);

router
    .route("/:id")
    .put(updateCity)
    .delete(deleteCity);
const express = require("express");

const {
    getCitiesById,
    createCity,
    updateCity,
    deleteCity,
    getCities,
} = require("../controllers/City.Controller");

const router = express.Router();

router.route("/").get(getCities);

router.route("/country/:country_id").get(getCitiesById).post(createCity);

router.route("/:id").put(updateCity).delete(deleteCity);

module.exports = router;
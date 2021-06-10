const express = require("express");

const {
  updateCountry,
  getCountryById,
  createCountry,
  getCountries,
  deleteCountry,
} = require("../controllers/Country.Controller");

const router = express.Router();

router.route("/").get(getCountries).post(createCountry);

router
  .route("/:id")
  .get(getCountryById)
  .put(updateCountry)
  .delete(deleteCountry);

module.exports = router;

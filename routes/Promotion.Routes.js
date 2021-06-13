const express = require("express");

const { getPromotions, Promote } = require("../controllers/Promotion.Controller");

const router = express.Router();

router.route("/").post(getPromotions);

router.route("/:id").put(Promote);

module.exports = router;
const express = require("express");

const { createPosition, createSubPosition, updatePosition } = require("../controllers/Position.Controller");

const router = express.Router();

router.route("/").post(createPosition).get(getPositions);

router.route("/:id").put(updatePosition);

router.route("/subPosition/:id").post(createSubPosition);

module.exports = router;
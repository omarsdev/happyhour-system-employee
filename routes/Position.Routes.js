const express = require("express");

const { createPosition, createSubPosition, updatePosition, getPositions, getPositionsByDepId, getPositionById } = require("../controllers/Position.Controller");

const router = express.Router();

router.route("/create/:id").post(createPosition);

router.route("/").get(getPositions);

router.route("/:id").put(updatePosition).get(getPositionById);

router.route("/depID/:id").get(getPositionsByDepId);

router.route("/create/depID/:dep_id/subID/:id").post(createSubPosition);

module.exports = router;
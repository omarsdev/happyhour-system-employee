const express = require("express");

const {} = require("../controllers/Role.Controller");

const router = express.Router();

router.route("/").post(createRole);

router.route("/position/:id").post(addRole);

router.route("/:id").put(updateRole);

module.exports = router;
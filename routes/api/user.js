const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/user");
const { authenticate } = require("../../middlewares");

router.get("/current", authenticate, ctrl.getCurrentUser);

module.exports = router;

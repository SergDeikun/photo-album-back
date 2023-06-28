const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/user/");
const { authenticate, validateBody } = require("../../middlewares");
const { updateUserSchema } = require("../../schemas");

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/update",
  authenticate,
  validateBody(updateUserSchema),
  ctrl.updateUser
);

module.exports = router;

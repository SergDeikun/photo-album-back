const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../schemas");

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.get("/logout", authenticate, ctrl.logout);

module.exports = router;

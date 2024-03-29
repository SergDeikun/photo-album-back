const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/album");
const {
  authenticate,
  validateBody,
  upload,
  isValidId,
} = require("../../middlewares");

const { albumSchema, loginSchema } = require("../../schemas");

router.post(
  "/",
  authenticate,
  upload.single("backgroundURL"),
  validateBody(albumSchema),
  ctrl.createAlbum
);

router.get("/:id", authenticate, ctrl.getAlbum);

router.patch(
  "/:id/update",
  authenticate,
  isValidId,
  upload.single("backgroundURL"),
  validateBody(albumSchema),
  ctrl.updateAlbum
);

router.delete("/:id", authenticate, isValidId, ctrl.removeAlbum);

router.post(
  "/:id/access",
  validateBody(loginSchema),
  isValidId,
  ctrl.confirmUserAccess
);

router.delete(
  "/:id/remove/:viwerId",
  authenticate,
  isValidId,
  ctrl.removeViwer
);

module.exports = router;

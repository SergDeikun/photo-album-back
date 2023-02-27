const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/album");
const {
  authenticate,
  validateBody,
  upload,
  isValidId,
} = require("../../middlewares");
const { albumSchema } = require("../../schemas");

router.post(
  "/",
  authenticate,
  upload.single("backgroundURL"),
  validateBody(albumSchema),
  ctrl.createAlbum
);

router.get("/:id", authenticate, ctrl.getAlbum);

router.patch(
  "/:id",
  authenticate,
  isValidId,
  upload.single("backgroundURL"),
  validateBody(albumSchema),
  ctrl.updateAlbum
);

router.delete("/:id", authenticate, isValidId, ctrl.removeAlbum);

module.exports = router;

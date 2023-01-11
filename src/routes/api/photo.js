const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/photo");
const { photoSchema } = require("../../schemas");

const {
  authenticate,
  validateBody,
  upload,
  isValidId,
} = require("../../middlewares");

router.post(
  "/:id",
  authenticate,
  isValidId,
  upload.single("photoURL"),
  validateBody(photoSchema),
  ctrl.addPhoto
);

router.get("/:id", authenticate, isValidId, ctrl.getPhoto);

router.patch("/:id", authenticate, isValidId, ctrl.updatePhoto);

router.delete("/:id", authenticate, isValidId, ctrl.removePhoto);

module.exports = router;

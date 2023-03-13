const Joi = require("joi").extend(require("@joi/date"));

const photoSchema = Joi.object({
  place: Joi.string().allow(""),
  date: Joi.date().format("DD.MM.YYYY").utc().allow(""),
  // photoURL: Joi.string().valid("image/jpeg", "image/png").required(),
  // photoURL: Joi.string(),
  comments: Joi.string().allow(""),
  albumId: Joi.string().require(),
});

module.exports = photoSchema;

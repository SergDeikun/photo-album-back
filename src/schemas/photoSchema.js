const Joi = require("joi").extend(require("@joi/date"));

const photoSchema = Joi.object({
  place: Joi.string(),
  date: Joi.date().format("DD.MM.YYYY").utc(),
  photoURL: Joi.string(),
  comments: Joi.string(),
});

module.exports = photoSchema;

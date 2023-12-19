const Joi = require("joi");

const photoSchema = Joi.object({
  place: Joi.string().allow(""),
  date: Joi.string().allow(""),
  photoURL: Joi.string().allow(""),
  comments: Joi.string().allow(""),
});

module.exports = photoSchema;

const Joi = require("joi");

const albumSchema = Joi.object({
  name: Joi.string().required(),
  backgroundURL: Joi.string().allow(""),
});

module.exports = albumSchema;

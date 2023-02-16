const Joi = require("joi");

const albumSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = albumSchema;

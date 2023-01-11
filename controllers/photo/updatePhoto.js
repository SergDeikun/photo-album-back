const { RequestError } = require("../../helpers");
const service = require("../../services/photoService");

const updatePhoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { place, date, comments } = req.body;

    if (!id) {
      throw RequestError(404, "Not found");
    }

    const result = await service.updatePhoto(id, {
      place,
      date,
      comments,
    });

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updatePhoto;

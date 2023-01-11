const service = require("../../services/photoService");
const { RequestError } = require("../../helpers");

const getPhoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const photo = await service.getPhoto(id);

    if (!photo) {
      throw RequestError(404, "Not found");
    }

    res.json(photo);
  } catch (error) {
    next(error);
  }
};

module.exports = getPhoto;

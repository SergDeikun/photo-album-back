const { RequestError } = require("../../helpers");
const service = require("../../services/albumService");

const getAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service
      .getAlbum(id)
      .populate("photo", "place date photoURL comments ");

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAlbum;

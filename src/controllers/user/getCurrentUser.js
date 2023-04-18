const { RequestError } = require("../../helpers");
const service = require("../../services/userService");

const getCurrentUser = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const currentUser = await service
      .getCurrentUser(userId)
      // .populate("myAlbums", "name backgroundURL userId photo ")
      .populate({ path: "myAlbums", populate: { path: "photo" } });

    if (!currentUser) {
      throw RequestError(404, "Not found");
    }

    res.json(currentUser);
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrentUser;

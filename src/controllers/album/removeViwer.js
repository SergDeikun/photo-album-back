const { Album } = require("../../models");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const removeViwer = async (req, res, next) => {
  try {
    const { id: albumId, viwerId } = req.params;
    console.log(albumId);
    console.log(viwerId);

    if (!albumId || !viwerId) {
      throw RequestError(404, "Not found");
    }

    // remove viwer from the album, which is in the owner
    await Album.findByIdAndUpdate(
      albumId,
      { $pull: { viewers: { viwerId } } },
      {
        new: true,
      }
    );

    // remove album from friendsAlbums, the user with whom the album was shared

    await User.findByIdAndUpdate(
      viwerId,
      { $pull: { friendsAlbums: albumId } },
      { new: true }
    );

    res.json({ message: "viwer deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeViwer;

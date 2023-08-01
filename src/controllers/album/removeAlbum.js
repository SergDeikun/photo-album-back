const { Photo } = require("../../models");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const service = require("../../services/albumService");

const removeAlbum = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: albumId } = req.params;
    const result = await service.removeAlbum(albumId);

    if (!result) {
      throw RequestError(404, "Not found");
    }
    // TODO: замінити на service
    // const updateUser = await service.updateUser(
    //   { owner },
    //   {
    //     $pull: { myAlbums: albumId },
    //   }
    // );
    // await Photo.deleteMany({ albumId: { $in: Album.photo } });
    await Photo.deleteMany({ albumId: albumId });

    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { myAlbums: albumId } }
    );

    res.json({ message: "album deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeAlbum;

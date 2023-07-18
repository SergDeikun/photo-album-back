const { Album } = require("../../models");
const { Photo } = require("../../models");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const service = require("../../services/albumService");

// const service = require("../../services/fotoAlbum");

const removeAlbum = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const result = await service.removeAlbum(id);

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
    await User.findByIdAndUpdate({ _id: userId }, { $pull: { myAlbums: id } });
    await Photo.deleteMany({ id: { $in: Album.photo } });

    res.json({ message: "album deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeAlbum;

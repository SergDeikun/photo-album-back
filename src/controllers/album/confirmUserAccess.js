const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { Album, User } = require("../../models");

const userService = require("../../services/authService");
const albumService = require("../../services/albumService.js");

const { RequestError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const confirmUserAccess = async (req, res, next) => {
  try {
    // check user
    const { email, password } = req.body;
    const user = await userService.findUser(email);
    // .populate("friendsAlbums");

    if (!user) {
      throw RequestError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw RequestError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await userService.loginUser(user._id, token);

    // check album
    const { id } = req.params;

    const result = await albumService.getAlbum(id);

    if (!result) {
      throw RequestError(404, "Not found");
    }

    const isAlreadyShared = result.viewers.some(
      (viewer) => viewer.email === email
    );

    if (isAlreadyShared) {
      throw RequestError(401, "You already have access to this album");
    }

    const friendsAlbum = new Album({
      name: result.name,
      backgroundURL: result.backgroundURL,
      userId: result.userId,
      owner: false,
      photo: result.photo.map(
        (photoId) => new mongoose.Types.ObjectId(photoId)
      ),
    });

    // add viewer
    await Album.findByIdAndUpdate(
      // { _id: id },
      id,
      {
        $push: { viewers: { email: user.email, name: user.name } },
      },
      {
        new: true,
      }
    );

    await User.findByIdAndUpdate(
      // { _id: user.id },
      user.id,
      { $push: { friendsAlbums: friendsAlbum } },
      {
        new: true,
      }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = confirmUserAccess;

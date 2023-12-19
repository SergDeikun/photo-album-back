const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Album } = require("../../models");

const userService = require("../../services/authService");
const albumService = require("../../services/albumService.js");

const { RequestError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const confirmUserAccess = async (req, res, next) => {
  try {
    // check user
    const { email, password } = req.body;
    const user = await userService.findUser(email);

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

    // add viewer
    await Album.findByIdAndUpdate(
      { _id: id },
      { $push: { viewers: { email: user.email, name: user.name } } }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = confirmUserAccess;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const service = require("../../services/auth");
const service = require("../../services/authService");
const { RequestError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.findUser(email);

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
    await service.loginUser(user._id, token);

    // res.cookie("token", token, { httpOnly: true });
    // console.log(res.cookie("token", token, { httpOnly: true }));
    res.json({
      token,
      user: { id: user._id, email },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

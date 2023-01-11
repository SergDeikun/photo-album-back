const bcrypt = require("bcryptjs");

const service = require("../../services/authService");
// const service = require("../../services/auth");
const { RequestError } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await service.findUser(email);

    if (user) {
      throw RequestError("409", "Email in used");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await service.addUser({
      name,
      email,
      password: hashPassword,
    });

    res.json({
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;

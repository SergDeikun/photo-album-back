const service = require("../../services/userService");

const logout = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    await service.logoutUser(userId);

    res.json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;

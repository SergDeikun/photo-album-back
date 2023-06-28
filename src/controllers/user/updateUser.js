const { RequestError } = require("../../helpers");
const service = require("../../services/userService");

const updateUser = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { name, email } = req.body;

    if (!userId) {
      throw RequestError(404, "Not found");
    }

    await service.updateUser(userId, {
      name,
      email,
    });

    res.json({ user: { name, email } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;

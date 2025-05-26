const { createUser, getUserById } = require("../services/userService");
const { loginUser } = require("../services/userService");

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { user, token } = await createUser({
      firstName,
      lastName,
      email,
      password,
    });
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .status(201)
      .cookie("token", token, options)
      .json({ message: "Register successful", user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    //cookie section
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };
    res
      .status(200)
      .cookie("token", token, options)
      .json({ message: "Login successful", user });
  } catch (error) {
    next(error);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.status(200).json({ message: "success", user });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "Logout successful" });
};

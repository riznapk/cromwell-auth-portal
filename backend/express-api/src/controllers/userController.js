const { createUser } = require("../services/userService");
const { loginUser } = require("../services/userService");

exports.register = async (req, res) => {
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
    //duplidate email
    if (error.message == "User already exists") {
      return res.status(409).json({ message: error.message });
    }

    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    console.log("User logged in:", user, token);

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
    console.error("Error logging in user:", error);
    //user not found
    if (error.message == "User not found") {
      return res.status(401).json({ message: error.message });
    }
    //invalid password
    if (error.message == "Invalid password") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

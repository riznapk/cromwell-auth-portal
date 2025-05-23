const { createUser } = require("../services/userService");
const { loginUser } = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await createUser({ firstName, lastName, email, password });
    res.status(201).json(user);
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
    const user = await loginUser({ email, password });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    if (error.message == "User not found") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { is } = require("type-is");

// Function to create a new user
exports.createUser = async ({ firstName, lastName, email, password }) => {
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create the user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  // Generate a token for the user
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  // user.token = token;
  // user.password = undefined; // Remove password from the response

  return { user: { ...user, password: undefined, token }, token };
};

// Function to login a user
exports.loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (user && isPasswordValid) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // user.token = token;
    // Remove password from the response
    // user.password = undefined;

    return { user: { ...user, password: undefined, token }, token };
  } else {
    throw new Error("Invalid password");
  }
};

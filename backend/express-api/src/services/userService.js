const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { is } = require("type-is");

/**
 * Creates a new user in the database.
 * - Checks if the user already exists by email.
 * - Hashes the password before storing.
 * - Generates a JWT token upon successful creation.
 * @param {Object} userDetails - User's first name, last name, email, and password.
 * @returns {Object} Newly created user (excluding password) and a JWT token.
 */
exports.createUser = async ({ firstName, lastName, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  return { user: { ...user, password: undefined }, token };
};

/**
 * Logs in a user by verifying email and password.
 * - Retrieves user by email.
 * - Compares hashed password.
 * - Returns JWT token if credentials are valid.
 * @param {Object} loginDetails - User's email and password.
 * @returns {Object} User (excluding password) and a JWT token.
 */
exports.loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
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
    return { user: { ...user, password: undefined }, token };
  } else {
    throw new Error("Invalid password");
  }
};

/**
 * Retrieves a user's information based on their ID.
 * - Excludes the password from the returned user data.
 * @param {string} id - User ID.
 * @returns {Object} User details without the password.
 */
exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return { ...user, password: undefined };
};

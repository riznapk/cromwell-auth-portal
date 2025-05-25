const knownErrors = {
  "User already exists": 409,
  "User not found": 401,
  "Invalid password": 401,
};

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = knownErrors[err.message] || 500;
  const message = knownErrors[err.message]
    ? err.message
    : "Internal server error";

  return res.status(statusCode).json({ message });
};

module.exports = errorHandler;

const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorHandler");

dotenv.config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //to allow cookies to be sent
  })
);
app.use(express.json()); //for parsing application/json
app.use(cookieParser()); //for parsing cookies

//routes
app.use("/user", userRouter);

app.use(errorHandler); // Custom error handler middleware

app.listen(3000, () => console.log("Server running on port 3000"));

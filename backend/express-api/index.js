const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

// Middleware
app.use(express.json()); //for parsing application/json
app.use(cookieParser());

//routes
app.use("/user", userRouter);

app.listen(3000, () => console.log("Server running on port 3000"));

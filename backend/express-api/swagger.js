const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Auto-generated Swagger documentation",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; // Where to save the documentation
const endpointsFiles = ["./routes/userRoutes.js"]; // Files containing API routes

swaggerAutogen(outputFile, endpointsFiles, doc);

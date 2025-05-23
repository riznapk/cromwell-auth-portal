const express = require("express");
const router = express.Router();
const { register } = require("../controllers/userController");
const { login } = require("../controllers/userController");
const {
  validateUserLogin,
  validateUserRegister,
} = require("../middlewares/userInputValidator");

router.post("/register", validateUserRegister, register);
router.post("/login", validateUserLogin, login);

module.exports = router;

//register
//get all the data from the body --> done
//check if all the data is existing (required) --> validated using Joi
//check if the validation is correct --> validated using Joi
//check if the email is already in use  --> done
//encrypt the password -->done
//save the data to the database --> donw
//generate a token and send it to the user --> done

//login
//get all the data from the body --> done
//check if all the data is existing (required fields) --> validated using Joi
//check if the validation is correct --> validated using Joi
//Check if the user in the DB --> done
//check if the password is correct --> done
//generate a token and send it to the user --> done

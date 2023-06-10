const pool = require("../config/db");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const dotenv = require("dotenv");
const { error } = require("console");

dotenv.config({ path: path.join(__dirname, "./env") });

// POST user signup API
const signup = async (req, res) => {
  try {
    console.log(req.body);
    const contentType = req.headers["content-type"];
    if (contentType === "application/json") {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;

      if (
        passwordValidation(password) &&
        emailValidation(email) &&
        nameValidation(name)
      ) {
        const hashedPassword = await successfullyHashedPassword(
          password,
          parseInt(process.env.SALTROUNDS)
        );

        await pool
          .promise()
          .query(`INSERT INTO user (name, email, password) VALUES (?, ?, ?)`, [
            name,
            email,
            hashedPassword,
          ])
          .then(() => {
            return res.status(200).send("Successfully registered!");
          })
          .catch((err) => {
            console.log(error);
            return res.status(409).send("Email already exist");
          });
      } else {
        return res.status(400).send("Invalid password or email");
      }
    } else {
      return res.status(400).send("Invalid content type");
    }
  } catch (error) {
    console.log(error);
    return res.staus(500).send("Something went wrong");
  }
};

// Validation functions

// Name validation
const nameValidation = (name) => {
  const nameRegex = /[~`!@#$%^&*()_\-+={}\[\]:;"'<,>.?\/]+/;
  if (nameRegex.test(name) || name === "") {
    return false;
  } else {
    return true;
  }
};

// Email validation
const emailValidation = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

// Password validation
const passwordValidation = (password) => {
  let type = 0;
  if (/[A-Z]+/.test(password)) {
    type++;
  }
  if (/[a-z]+/.test(password)) {
    type++;
  }
  if (/[0-9]+/.test(password)) {
    type++;
  }
  if (/[~`!@#$%^&*()_\-+={}\[\]:;"'<,>.?\/]+/.test(password)) {
    type++;
  }
  if (type >= 3) {
    return true;
  } else {
    return false;
  }
};

// Hash password function
const successfullyHashedPassword = async (password, saltRounds) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    return "false";
  }
};

// JWT validation
const correctJWT = async (token) => {
  try {
    if (token === "") {
      return 1;
    } else {
      const decoded = jwt.verify(token, SECRET);

      const admin = await Admin();

      if (decoded.name !== admin.name || decoded.email !== admin.email) {
        return 2;
      }

      return 4;
    }
  } catch (error) {
    return 3;
  }
};

// Export functions
module.exports = {
  signup,
};

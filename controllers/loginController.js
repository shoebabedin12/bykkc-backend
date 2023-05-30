const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const emailValidation = require("../helpers/emailValidation");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.send({ error: "Please enter your email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Please enter your valid email" });
  } else if (!password) {
    return res.send({ error: "Please enter your password" });
  } else {
    let isEmailExist = await User.find({ email: email });

    if (isEmailExist.length > 0) {
      if (!isEmailExist[0].emailVerified == true) {
        return res.send({ otp: "Please verify your ID" });
      } else {
        bcrypt
          .compare(password, isEmailExist[0].password)
          .then(function (result) {
            if (result) {
              res.json({
                success: "Login Successfull",
                // email: isEmailExist.email,
                user: isEmailExist[0]
              });
            } else {
              return res.send({ error: "Password not matched" });
            }
          });
      }
    } else {
      return res.send({ error: "Email not matched" });
    }
  }
};

module.exports = loginController;

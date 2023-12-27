const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const emailValidation = require("../helpers/emailValidation");
const otpTemplate = require("../helpers/otpTemplate");
const sendEmail = require("../helpers/sendEmail");
const { aleaRNGFactory } = require("number-generator");
const upload = require("./imageController");
const multer = require("multer");

const registrationController = async (req, res) => {
  const { fullName, email, image, password, paymentID } = req.body;

  if (!fullName) {
    return res.send({ error: "Please enter your full name" });
  } 
  if (!email) {
    return res.send({ error: "Please enter your email" });
  } 
  if (!emailValidation(email)) {
    return res.send({ error: "Please enter your valid email" });
  } 
  if (!password) {
    return res.send({ error: "Please enter your password" });
  }
  if (!paymentID) {
    return res.send({ error: "Please enter your payment ID" });
  }

  try {
    let duplicateEmail = await User.find({ email: email });

    if (duplicateEmail.length > 0) {
      return res.send({ error: "Email Already exist" });
    } else {
      if (!image) {
        return res.status(400).json({ error: "No file uploaded" });
      } else {
        let base64 = image.toString("base64");

        bcrypt.hash(password, 10, async function (err, hash) {
          const user = await User.create({
            fullName,
            email,
            image,
            password: hash,
            paymentID
          });

          const generator2 = aleaRNGFactory(Date.now());
          var randomNumber = generator2.uInt32().toString().substring(0, 4);

          const randomOtpStore = await User.findOneAndUpdate(
            { email },
            { $set: { randomOtp: randomNumber, image: base64 } },
            { new: true }
          );

          sendEmail(email, randomNumber, otpTemplate);

          res.send({
            success: true,
            message: "Registration successful. Please check your email.",
            fullName: user.fullName,
            email: user.email
          });
        });
      }
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};


module.exports = registrationController;

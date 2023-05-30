const bcrypt = require("bcrypt");
const User = require("../models/usersModel");
const emailValidation = require("../helpers/emailValidation");
const otpTemplate = require("../helpers/otpTemplate");
const sendEmail = require("../helpers/sendEmail");
const { aleaRNGFactory } = require("number-generator");
const upload = require("./imageController");
const multer = require("multer");

const registrationController = async (req, res) => {
  const { fullName, email, image, password } = req.body;

  if (!fullName) {
    return res.send({ error: "Please enter your full name" });
  } else if (!email) {
    return res.send({ error: "Please enter your email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Please enter your valid email" });
  } else if (!password) {
    return res.send({ error: "Please enter your password" });
  } else {
    let duplicateEmail = await User.find({ email: email });

    if (duplicateEmail.length > 0) {
      return res.send({ error: "Email Already exist" });
    }
    if (!image) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    let base64 = image.toString("base64");

    bcrypt.hash(password, 10, async function (err, hash) {
      const user = new User({
        fullName,
        email,
        image,
        password: hash
      });

      user.save();
      const generator2 = aleaRNGFactory(Date.now());
      var randomNumber = generator2.uInt32().toString().substring(0, 4);
      const randomOtpStore = await User.findOneAndUpdate(
        { email },
        { $set: { randomOtp: randomNumber, image: base64 } },
        { new: true }
      );
      sendEmail(email, randomNumber, otpTemplate);

      res.send({
        success: "Registration successfull.lease check your email.",
        fullName: user.fullName,
        email: user.email
      });
    });
  }
};

module.exports = registrationController;

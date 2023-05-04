const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// const createToken = (id) => {
//   const jwtKey = process.env.JWT_SECRET_KEY;
//   return jwt.sign({ id }, jwtKey, { expiresIn: "3d" });
// };

const registerUser = async (req, res) => {
  // Check if email is already registered
  const { name, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email is already registered" }] });
  }
  if (!email || !name || !password)
    return res.status(400).json("All field are required");
  if (!validator.isEmail(email))
    return res.status(400).json("Email must be a valid email");
  if (!validator.isStrongPassword(password))
    return res.status(400).json("Password must be a strong password");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  try {
    await newUser.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }

  // Generate a JWT token for the new user
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  // Return the token to the client
  res.status(200).json({ _id: newUser._id, name, email, token });
};

const loginUser = async (req, res) => {
  // Check if user exists
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid email or password" }] });
    }

    // Check if password is correct
    // console.log(password, user.password);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid email or password" }] });
    }
    // console.log(user);

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    // Return the token to the client
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const auth = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password"); // Exclude the password field from the response
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server error");
  }
};
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password"); // Exclude the password field from the response
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password"); // Exclude the password field from the response
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const resetPassword = async (req, res) => {
  // Find the user with the given email
  const { email } = req.body;
  console.log(req.body);
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid email address" }] });
  }
  if (!validator.isEmail(email))
    return res.status(400).json("Email must be a valid email");

  // Generate a random password reset token
  const resetToken = Math.random().toString(36).slice(2);
  const resetTokenExpiration = Date.now() + 3600000; // Token is valid for 1 hour

  // Update the user's reset token and expiration in the database
  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  // Send a password reset email to the user
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    auth: {
      user: "oluwatobi05@zohomail.com",
      pass: "Oluwatobi@16",
    },
  });

  const mailOptions = {
    from: "no-reply<oluwatobi05@zohomail.com>",
    to: user.email,
    subject: "Password Reset Request",
    html: `<p>Hello ${user.name},</p><p>You have requested to reset your password.</p><p>Please click on the following link to reset your password:</p><p>${process.env.CLIENT_URL}/reset-password/${resetToken}</p><p>If you did not request a password reset, please ignore this email.</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ errors: [{ msg: "Failed to send password reset email" }] });
    } else {
      console.log(info);
      return res.json({ msg: "Password reset email sent successfully" });
    }
  });
};

const updatePassword = async (req, res) => {
  // Find the user with the given reset token
  const { resetToken, password } = req.body;
  const user = await userModel.findOne({ resetToken });
  const now = new Date();

  if (user.resetTokenExpiration.getTime() < now.getTime()) {
    return res.status(400).json({ errors: [{ msg: "Invalid reset token" }] });
  }
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid reset token" }] });
  }
  try {
    // Update the user's password in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    // Return a success message to the client
    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  resetPassword,
  updatePassword,
  auth,
};

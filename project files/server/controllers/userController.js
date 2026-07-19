const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= Register Controller =================
const registerController = async (req, res) => {
  try {

    console.log("========== REGISTER ==========");
    console.log("Body:", req.body);

    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      isAdmin: role === "admin",
      isDoctor: false,
    });

    await user.save();

    console.log("User Saved Successfully");
    console.log(user);

    res.status(201).send({
      success: true,
      message: "Registration Successful",
    });

  } catch (error) {

    console.log("REGISTER ERROR");
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Registration Failed",
      error: error.message,
    });

  }
};

// ================= Login Controller =================

const loginController = async (req, res) => {
  try {
    console.log("========== LOGIN REQUEST ==========");
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("Login Successful for:", user.email);

    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {

    console.log("LOGIN ERROR");
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Login Failed",
      error: error.message,
    });

  }
};

module.exports = {
  registerController,
  loginController,
};
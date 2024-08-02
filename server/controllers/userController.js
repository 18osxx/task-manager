const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Attempting to register user:", username);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("User already exists:", username);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("User registered successfully:", username);
    res.status(201).json({ result: newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Attempting to login user:", username);
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      console.log("User not found:", username);
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      console.log("Invalid credentials for user:", username);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("User logged in successfully:", username);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { registerUser, loginUser };

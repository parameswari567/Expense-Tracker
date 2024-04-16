const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Ticket Model
const User = require("../../models/User");

// Route: POST api/users/register
// Description: Register a user
// Access: Public

router.post("/register", async (req, res) => {
  try {
    let { name, email, password, passwordCheck } = req.body;
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // Validations

    if (!email || !password || !passwordCheck || !name)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    if (password.length < 5)
      return res.status(400).json({
        msg: "The password needs to be at least 5 characters in length",
      });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification" });

    if (!password.match(passw))
      return res.status(400).json({
        msg:
          "Password must contain at least one uppercase, one lowercase, and one numeric character",
      });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });

    // Hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create and Save the new user

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: POST api/users/login
// Description: Authenticate a user
// Access: Public

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validations

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, config.get("JWT_SECRET"));
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: POST api/users/tokenIsValid
// Description: Validate the token
// Access: Public

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    if (!decoded) return res.json(false);

    const user = await User.findById(decoded.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: GET api/users/
// Description: Get user data
// Access: Public

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    id: user._id,
    name: user.name,
  });
});

module.exports = router;

import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateAuthToken = (userId) => {
  return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});
};

router.post("/register", async (req, res) => {
try{
  const { username, email, password,  } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  if (username.length < 3) {
    return res.status(400).json({ message: "Username must have at least 3 characters" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  // check if the user already exists
  const existingUsername = await User.findOne({username});
  if (existingUsername) {
    return res.status(400).json({ message: "This username is already in use" });
  }

  const existingEmail = await User.findOne({email});
  if (existingEmail) {
    return res.status(400).json({ message: "This email is already in use" });
  }

  // Get random avatar
  const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  // Create a new user
  const user = new User({
    username,
    email,
    password,
    profileImage,
  });

  await user.save();

  const token = generateAuthToken(user._id);


  res.status(201).json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    }
  });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server error" });
}
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields must be filled" });
        }

        // check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateAuthToken(user._id);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            }
        });
      } catch (error) {
        console.log("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
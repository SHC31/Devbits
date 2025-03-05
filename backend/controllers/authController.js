const User = require("../models/User");
const jwt = require("jsonwebtoken");  
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User 
exports.registerUser = async function (req, res) {
    const { fullName, email, password, profileImageUrl } = req.body;

    // Validation: Check for Missing fields 
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
         // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the User
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profileImageUrl,
        });
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
}
// Login User 
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try{
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });  
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  }
  catch (err) {
    res
    .status(500)
    .json({ message: "Error logging in", error: err.message });
}
};
// Get User Info 
exports.getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
    }
    catch (err) {
        res
        .status(500)
        .json({ message: "Error getting user info", error: err.message });
    }

}
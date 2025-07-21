const User = require("../models/UserModel");

const getDeshboard = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json({ Message: "Server error" });
  }
};

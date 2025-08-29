const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
      name: user.name,
      userName: user.userName,
      role: user.role,
      id: user._id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password, name, userName, role } = req.body;

  try {
    const user = await User.signup(email, password, name, userName, role);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const users = await User.find({
      role: "user",
    });

    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  const { email, password, name, userName } = req.body;

  try {
    const user = await User.create({
      email,
      password,
      name,
      userName,
      role: "user",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { email, name, userName } = req.body;

  try {
    if (!email || !name || !userName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOneAndUpdate(
      { _id: id, role: "user" },
      { email, name, userName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete({ _id: id, role: "user" });

    if (!user) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent,
};

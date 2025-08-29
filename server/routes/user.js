const express = require("express");

const {
  loginUser,
  signupUser,
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

//get all students
router.get("/", getAllStudents);

// create a student
router.post("/", createStudent);

// delete a student
router.delete("/:id", deleteStudent);

// update a student
router.put("/:id", updateStudent);

module.exports = router;

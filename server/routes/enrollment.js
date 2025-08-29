const express = require("express");
const {
  enrollStudent,
  unenrollStudent,
  getStudentCourses,
  getCourseStudents
} = require("../controllers/enrollmentController");

const router = express.Router();

// enroll a student in a course
router.post("/enroll", enrollStudent);

// unenroll a student from a course
router.post("/unenroll", unenrollStudent);

// get all courses for a student
router.get("/student/:userId", getStudentCourses);

//get all students enrolled in a specific course
router.get("/course/:courseId", getCourseStudents);

module.exports = router;
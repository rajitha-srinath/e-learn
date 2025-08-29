const Course = require("../models/courseModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const enrollStudent = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid user or course ID" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const isAlreadyEnrolled = user.enrolledCourses.some(
      enrolledCourse => enrolledCourse.courseId.toString() === courseId
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({ error: "User is already enrolled in this course" });
    }

    user.enrolledCourses.push({
      courseId: courseId,
      enrolledAt: new Date(),
    });

    if (!course.students.includes(userId)) {
      course.students.push(userId);
    }


    course.enrolledStudents = course.students.length;

    await user.save();
    await course.save();

    res.status(200).json({
      message: "Successfully enrolled in course",
      course: {
        id: course._id,
        title: course.title,
        instructor: course.instructor
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unenrollStudent = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid user or course ID" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    user.enrolledCourses = user.enrolledCourses.filter(
      enrolledCourse => enrolledCourse.courseId.toString() !== courseId
    );

    course.students = course.students.filter(
      studentId => studentId.toString() !== userId
    );

    course.enrolledStudents = course.students.length;

    await user.save();
    await course.save();

    res.status(200).json({ message: "Successfully unenrolled from course" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(userId).populate('enrolledCourses.courseId');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      enrolledCourses: user.enrolledCourses
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseStudents = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(courseId).populate('students', 'name email userName');

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({
      course: course.title,
      students: course.students
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  enrollStudent,
  unenrollStudent,
  getStudentCourses,
  getCourseStudents
};
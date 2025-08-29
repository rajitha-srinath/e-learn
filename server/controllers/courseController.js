const Course = require("../models/courseModel");
const mongoose = require("mongoose");

const getCourses = async (req, res) => {
  const courses = await Course.find({}).sort({ createdAt: -1 });

  res.status(200).json(courses);
};

const getCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course" });
  }

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

const createCourse = async (req, res) => {
  const {
    title,
    description,
    instructor,
    duration,
    level,
    price,
    image,
    enrolledStudents,
    category,
  } = req.body;

  let emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!description) emptyFields.push("description");
  if (!instructor) emptyFields.push("instructor");
  if (!duration) emptyFields.push("duration");
  if (!level) emptyFields.push("level");
  if (!price) emptyFields.push("price");
  if (!category) emptyFields.push("category");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all fields", emptyFields });
  }

  try {
    const course = await Course.create({
      title,
      description,
      instructor,
      duration,
      level,
      price,
      image,
      enrolledStudents,
      category,
    });

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course" });
  }

  const course = await Course.findByIdAndDelete({ _id: id });

  if (!course) {
    return res.status(404).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such course" });
  }

  const course = await Course.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!course) {
    return res.status(404).json({ error: "No such course" });
  }

  res.status(200).json(course);
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
};

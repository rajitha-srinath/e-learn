require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const courseRoutes = require("./routes/course");
const userRoutes = require("./routes/user");
const enrollmentRoutes = require("./routes/enrollment");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/course", courseRoutes);
app.use("/api/user", userRoutes);
app.use("/api/enrollment", enrollmentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("connected to db & listening on port", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log(error);
  });

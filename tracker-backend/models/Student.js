const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_name: { type: String, required: true },
  age: { type: Number, required: true },
  school: { type: String, required: true },
  class: { type: String, required: true },
  year: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    audioUrl: { type: String },
    transcript: { type: String },
    subjectContentText: { type: String },
    code: { type: Number },
    categoryName: { type: String },
    label: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const Grievance = mongoose.model("Grievance", grievanceSchema);

module.exports = Grievance;

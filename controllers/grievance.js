const Grievance = require("../models/grievance");

exports.postGrievance = (req, res, next) => {
  if (!req.file) {
    const error = new Error("No audio provided.");
    error.statusCode = 422;
    throw error;
  }

  const audioUrl = req.file.path.replace("\\", "/");
  const transcript = req.body.transcript;
  const subjectContentText = req.body.subjectContentText;
  const code = req.body.code ? +req.body.code : 0;
  const categoryName = req.body.categoryName;
  const label = req.body.label;
  const status = "Open";

  // Create post in db
  const greivance = new Grievance({
    audioUrl,
    transcript,
    subjectContentText,
    code,
    categoryName,
    label,
    status,
  });

  greivance
    .save()
    .then((result) => {
      res.status(201).json({
        message: "grievance added sucessfully!",
        greivance: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

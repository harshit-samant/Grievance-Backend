const Grievance = require("../models/grievance");

exports.getGrievance = (req, res, next) => {
  const grievanceId = req.params.grievanceId;

  Grievance.findById(grievanceId)
    .then((grievance) => {
      if (!grievance) {
        const error = new Error("Could not find grievance.");
        error.statusCode = 404;
        throw error;
      }

      res
        .status(200)
        .json({ message: "Grievance fetched.", grievance: grievance });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postGrievance = (req, res, next) => {
  if (!req.file) {
    const error = new Error("No audio file provided.");
    error.statusCode = 422;
    throw error;
  }

  const audioUrl = req.file.path.replace("\\", "/");
  const transcript = req.body.transcript || "";
  const subjectContentText = req.body.subjectContentText || "";
  const code = req.body.code ? +req.body.code : 0;
  const categoryName = req.body.categoryName || "";
  const label = req.body.label || "";
  const status = "Open";

  // Create grievance in db
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

const express = require('express');

const grievanceController = require('../controllers/grievance');

const router = express.Router();

router.get('/fetch-all', grievanceController.getGrievances);

router.get('/check-status/:grievanceId', grievanceController.getGrievance);

router.post('/post', grievanceController.postGrievance);

router.put('/update-status/:grievanceId', grievanceController.updateStatus);

module.exports = router;

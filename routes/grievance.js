const express = require('express');

const grievanceController = require('../controllers/grievance');

const router = express.Router();

router.get('/check-status/:grievanceId', grievanceController.getGrievance);
router.post('/post', grievanceController.postGrievance);

module.exports = router;

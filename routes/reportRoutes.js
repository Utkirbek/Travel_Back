const express = require('express');
const router = express.Router();
const {
  addReport,
  getAllReports,
} = require('../controller/reportController');

//add a Branch
router.post('/add', addReport);

//get all Branch
router.get('/', getAllReports);

module.exports = router;

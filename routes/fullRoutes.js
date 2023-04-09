const express = require('express');
const router = express.Router();
const {
  addFull,
  getAllFulls,
} = require('../controller/fullController');

//add a Branch
router.post('/add', addFull);

//get all Branch
router.get('/', getAllFulls);

module.exports = router;

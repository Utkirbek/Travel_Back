const express = require('express');
const router = express.Router();
const {
  addSpend,
  getAllSpends,
} = require('../controller/spendController');

//add a Branch
router.post('/add', addSpend);

//get all Branch
router.get('/', getAllSpends);

module.exports = router;

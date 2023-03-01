const express = require('express');
const router = express.Router();
const {
  getAllProfit,
  dailyProfit,
} = require('../controller/profitController');

//get all Profit
router.get('/:branch/', getAllProfit);

//create new Profit
router.get('/:branch/add', dailyProfit);

module.exports = router;

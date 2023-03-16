const express = require('express');
const router = express.Router();
const {
  getAllMoney,
  addDailyMoney,
} = require('../controller/moneyController');

//get all Money
router.get('/:branch/', getAllMoney);

//create new Money
router.post('/add', addDailyMoney);

module.exports = router;

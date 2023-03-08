const express = require('express');
const router = express.Router();
const {
  users,
  kassaAndProfit,
  mainStatistics,
} = require('../controller/statisticsController');

//get  users
router.post('/users/', users);

//get  kassa and profit
router.post('/money/', kassaAndProfit);

//get  main statistics
router.post('/main/', mainStatistics);

module.exports = router;

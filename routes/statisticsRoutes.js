const express = require('express');
const router = express.Router();
const {
    users,
    kassaAndProfit

} = require('../controller/statisticsController');

//get  users
router.post('/users/', users);

//get  kassa and profit
router.post('/money/', kassaAndProfit);

module.exports = router;

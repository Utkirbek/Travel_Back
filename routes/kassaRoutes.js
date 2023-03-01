const express = require('express');
const router = express.Router();
const {
  getAllKassa,
  addDailyKassa,
} = require('../controller/kassaController');

//get all kassa
router.get('/:branch/', getAllKassa);

//create new kassa
router.get('/:branch/add', addDailyKassa);

module.exports = router;

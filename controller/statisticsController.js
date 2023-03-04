const User = require('../models/User');
const Kassa = require('../models/Kassa');
const Profit = require('../models/Profit');

const users = async (req, res) => {
  try {
    const start = new Date(req.body.startDate);

    const end = new Date(req.body.endDate);

    const users = await User.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
    res.status(200).send({
      users,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const kassaAndProfit = async (req, res) => {
  try {
    const start = new Date(req.body.startDate);

    const end = new Date(req.body.endDate);
    const kassas = await Kassa.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
    const profits = await Profit.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    res.status(200).send({
      kassas,
      profits,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  users,
  kassaAndProfit,
};

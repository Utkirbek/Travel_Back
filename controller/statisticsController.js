const User = require('../models/User');
const Kassa = require('../models/Kassa');
const Profit = require('../models/Profit');
const Tour = require('../models/Tour');
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
    let kassas;
    let profits;
    if (req.body.branch) {
      kassas = await Kassa.find({
        branch: req.body.branch,
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      });
      profits = await Profit.find({
        branch: req.body.branch,
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      });
    } else {
      kassas = await Kassa.find({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      });
      profits = await Profit.find({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      });
    }

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

const mainStatistics = async (req, res) => {
  try {
    const branch = req.body.branch;

    let tour;
    let kassa;
    let profit;

    if (branch) {
      tour = await Tour.find();
      kassa = await Kassa.find({ branch: branch });
      profit = await Profit.find({ branch: branch });
    } else {
      tour = await Tour.find();
      kassa = await Kassa.find();
      profit = await Profit.find();
    }

    let soldTickets = 0;
    let totalProfit = 0;
    let totalKassa = 0;
    let leftTickets = 0;

    for (let i = 0; i < kassa.length; i++) {
      totalKassa += kassa[i].amount;
    }

    for (let i = 0; i < profit.length; i++) {
      totalProfit += profit[i].amount;
    }

    for (let i = 0; i < tour.length; i++) {
      soldTickets +=
        tour[i].tickets.amount - tour[i].tickets.remaining;
      leftTickets += tour[i].tickets.remaining;
    }
    res.status(200).send({
      soldTickets,
      totalProfit,
      totalKassa,
      leftTickets,
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
  mainStatistics,
};

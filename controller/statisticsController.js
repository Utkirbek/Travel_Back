const User = require('../models/User');
const Money = require('../models/Money');

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
    let money;

    if (req.body.branch) {
      money = await Money.find({
        branch: req.body.branch,
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      });
    } else {
      money = await Money.find({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      });
    }

    res.status(200).send({
      money,
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
    let money;

    if (branch) {
      tour = await Tour.find();
      money = await Money.find({ branch: branch });
    } else {
      tour = await Tour.find();
      money = await Money.find();
    }

    let soldTickets = 0;
    let totalProfit = 0;
    let totalKassa = 0;
    let leftTickets = 0;

    for (let i = 0; i < money.length; i++) {
      totalKassa += money[i].kassa;
    }

    for (let i = 0; i < money.length; i++) {
      totalProfit += money[i].profit;
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

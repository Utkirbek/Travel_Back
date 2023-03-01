const Profit = require('../models/Profit');
const Branch = require('../models/Branch');

const dailyProfit = async (req, res) => {
  try {
    const branches = await Branch.find({});

    for (let i = 0; i <= branches.length - 1; i++) {
      const newProfit = new Profit({ branch: branches[i]._id });
      await newProfit.save();

      console.log('new Profit created');
    }
  } catch (err) {
    console.log('error in creating new Profit');
  }
};

const getAllProfit = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }

    const limit = parseInt(size);
    const AllProfit = await Profit.find({
      branch: req.params.branch,
    });
    const Profits = await Profit.find({ branch: req.params.branch })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('branch');
    res.send({
      Profits: Profits,
      count: Profits.length,
      totalPage: Math.ceil(AllProfit.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
module.exports = {
  getAllProfit,
  dailyProfit,
};

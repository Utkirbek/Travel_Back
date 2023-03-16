const Money = require('../models/Money');
const Branch = require('../models/Branch');

const addDailyMoney = async (req, res) => {
  try {
    const branches = await Branch.find({});
    console.log(branches);
    for (let i = 0; i <= branches.length - 1; i++) {
      const newMoney = new Money({ branch: branches[i]._id });
      await newMoney.save();

      console.log('new Money created');
    }
    res.status(200).send({
      message: 'new Money created',
    });
  } catch (err) {
    console.log('error in creating new Money');
  }
};

const getAllMoney = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }

    const limit = parseInt(size);
    const AllMoney = await Money.find({ branch: req.params.branch });
    const Moneys = await Money.find({ branch: req.params.branch })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('branch');
    res.send({
      Moneys: Moneys,
      count: Moneys.length,
      totalPage: Math.ceil(AllMoney.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllMoney,
  addDailyMoney,
};

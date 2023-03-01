const Kassa = require('../models/Kassa');
const Branch = require('../models/Branch');

const addDailyKassa = async (req, res) => {
  try {
    const branches = await Branch.find({});

    for (let i = 0; i <= branches.length - 1; i++) {
      const newKassa = new Kassa({ branch: branches[i]._id });
      await newKassa.save();

      console.log('new kassa created');
    }
  } catch (err) {
    console.log('error in creating new kassa');
  }
};

const getAllKassa = async (req, res) => {
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }

    if (!size) {
      size = 20;
    }

    const limit = parseInt(size);
    const AllKassa = await Kassa.find({ branch: req.params.branch });
    const kassas = await Kassa.find({ branch: req.params.branch })
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('branch');
    res.send({
      kassas: kassas,
      count: kassas.length,
      totalPage: Math.ceil(AllKassa.length / limit),
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getAllKassa,
  addDailyKassa,
};

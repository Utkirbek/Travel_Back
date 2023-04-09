const Spend = require('../models/Spend');

const addSpend = async (req, res) => {
  try {
    const newSpend = new Spend(req.body);
    await newSpend.save();
    res.send({ message: 'Spend Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllSpends = async (req, res) => {
  try {
    const Spends = await Spend.find({}).sort({ _id: -1 });
    res.send(Spends);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addSpend,
  getAllSpends,
};

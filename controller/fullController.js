const Full = require('../models/Full');

const addFull = async (req, res) => {
  try {
    const newFull = new Full(req.body);
    await newFull.save();
    res.send({ message: 'Full Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllFulls = async (req, res) => {
  try {
    const Fulls = await Full.find({}).sort({ _id: -1 });
    res.send(Fulls);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addFull,
  getAllFulls,
};

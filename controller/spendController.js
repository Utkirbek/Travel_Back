const Spend = require('../models/Spend');

const addSpend = async (req, res) => {
  try {
    const newSpend = req.body;
    newSpend.makkah.room.total = newSpend.makkah.room.price * newSpend.makkah.room.amount
    newSpend.makkah.food.total = newSpend.makkah.food.price * newSpend.makkah.food.amount
    newSpend.makkah.total = (newSpend.makkah.room.total + newSpend.makkah.food.total)*newSpend.makkah.days

    newSpend.madina.room.total = newSpend.madina.room.price * newSpend.madina.room.amount
    newSpend.madina.food.total = newSpend.madina.food.price * newSpend.madina.food.amount
    newSpend.madina.total = (newSpend.madina.room.total + newSpend.madina.food.total)*newSpend.madina.days

    newSpend.total = newSpend.makkah.total + newSpend.madina.total + newSpend.extra

    const spend = new Spend(newSpend);
    await spend.save();


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

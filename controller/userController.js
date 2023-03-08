const User = require('../models/User');
const Tour = require('../models/Tour');
const Kassa = require('../models/Kassa');
const Profit = require('../models/Profit');

const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const tour = await Tour.findById(req.body.tour);
    if (tour) {
      await tour.minusTickets();
    } else {
      res.status(404).send({ message: 'Tour not found!' });
    }
    const kassa = await Kassa.find({ branch: req.body.branch })
      .sort({ _id: -1 })
      .limit(1);

    if (kassa) {
      await kassa[0].addAmount(req.body.paid);
    } else {
      res.status(404).send({ message: 'Kassa not found!' });
    }
    const profit = await Profit.find({ branch: req.body.branch })
      .sort({ _id: -1 })
      .limit(1);
    let profitAmount = tour.tickets.price - req.body.price;
    if (profit) {
      await profit[0].addAmount(profitAmount);
    } else {
      res.status(404).send({ message: 'Profit not found!' });
    }

    res.send({ message: 'User Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.isAdmin = req.body.isAdmin;
      await user.save();
      res.send({ message: 'User Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'User not found!' });
  }
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, async (err) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const user = await User.findById(req.params.id);
      const tour = await Tour.findById(user.tour);
      if (tour) {
        await tour.plusTickets();
      } else {
        res.status(404).send({ message: 'Tour not found!' });
      }

      res.send({ message: 'User deleted successfully!' });
    }
  });
};
const pay = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.pay(req.body.amount);
      res.send({ message: 'User Paid Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'User not found!' });
  }
};

const refund = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.refund(req.body.amount);
      res.send({ message: 'User Refunded Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'User not found!' });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  pay,
  refund,
};

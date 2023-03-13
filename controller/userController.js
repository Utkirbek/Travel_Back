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
    const user = await User.findById(req.params.id).populate('tour');
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
      user.firstName = req.body.firstName;
      user.secondName = req.body.secondName;
      user.nationality = req.body.nationality;
      user.passportNumber = req.body.passportNumber;
      user.dateOfBirth = req.body.dateOfBirth;
      user.sex = req.body.sex;
      user.countryOfBirth = req.body.countryOfBirth;
      user.passportExpireDate = req.body.passportExpireDate;
      user.passportImage = req.body.passportImage;
      user.phone = req.body.phone;
      user.responsibleMan = req.body.responsibleMan;
      user.visaNumber = req.body.visaNumber;

      await user.save();
      res.send({ message: 'User Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'User not found!' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (user) {
      const tour = await Tour.findById(user.tour);
      if (tour) {
        await tour.addTickets();
      }
      const kassa = await Kassa.find({ branch: user.branch })
        .sort({ _id: -1 })
        .limit(1);
      if (kassa) {
        await kassa[0].minusAmount(user.paid);
      }
      const profit = await Profit.find({ branch: user.branch })
        .sort({ _id: -1 })
        .limit(1);
      let profitAmount = tour.tickets.price - user.priceDollar;

      if (profit) {
        await profit[0].minusAmount(profitAmount);
      }
      await user.remove();
      res.send({ message: 'User Deleted Successfully!' });
    } else {
      res.status(404).send({ message: 'User not found!' });
    }

  } catch (err) {
    res.status(404).send({ message: 'User not found!'+ err.message });
  }
}


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

const changeStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.changeStatus(req.body.status);
      res.send({ message: 'User Status Changed Successfully!' });
    } else {
      res.status(404).send({ message: 'User not found!' });
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
  changeStatus,
};

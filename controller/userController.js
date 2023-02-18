const User = require('../models/User');

const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ message: 'User Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ _id: -1 })
      .populate('branch');
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
      user.firstName = req.body.firstName;
      user.secondName = req.body.secondName;
      user.nationality = req.body.nationality;
      user.passportNumber = req.body.passportNumber;
      user.dateOfBirth = req.body.dateOfBirth;
      user.sex = req.body.sex;
      user.countryOfBirth = req.body.countryOfBirth;
      user.passportExpireDate = req.body.passportExpireDate;
      user.sex = req.body.sex;
      user.paid = req.body.paid;
      user.price = req.body.price;
      user.address = req.body.address;
      user.sex = req.body.sex;
      user.phone = req.body.phone;

      await user.save();
      res.send({ message: 'User Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'User not found!' });
  }
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'User Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

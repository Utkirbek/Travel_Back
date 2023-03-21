const User = require('../models/User');
const Tour = require('../models/Tour');
const Money = require('../models/Money.js');
const Branch = require('../models/Branch.js');

const writeXlsxFile = require('write-excel-file/node');

const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    newUser.setNext('contractNumber', function (err) {
      if (err)
        console.log(
          'Cannot increment the Contract Number because ',
          err
        );
    });
    const tour = await Tour.findById(req.body.tour);
    if (tour) {
      await tour.minusTickets(req.body.tourStatus);
    } else {
      res.status(404).send({ message: 'Tour not found!' });
    }
    const money = await Money.find({ branch: req.body.branch })
      .sort({ _id: -1 })
      .limit(1);
    let profitAmount = req.body.priceDollar - tour.tickets.price;
    if (money) {
      await money[0].addAmount(req.body.paid, profitAmount);
    } else {
      res.status(404).send({ message: 'Money not found!' });
    }

    res.send({ message: 'User Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users;
    if(req.body.branch){
      users = await User.find({branch: req.body.branch}).sort({ _id: -1 });
    } if(req.body.tour){
      users = await User.find({tour: req.body.tour}).sort({ _id: -1 });
    }else{
      users = await User.find().sort({ _id: -1 });
    }
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
      user.passportImage = req.body.passportImage;
      user.address = req.body.address;
      user.visaImage = req.body.visaImage;
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
        await tour.addTickets(user.tourStatus);
      }
      let profitAmount =user.priceDollar- tour.tickets.price;
      const money = await Money.find({ branch: user.branch })
        .sort({ _id: -1 })
        .limit(1);
      if (money) {
        await money[0].minusAmount(user.paid, profitAmount);
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
    const branch = await Branch.findById(user.branch);
    const money = await Money.find({ branch: user.branch })
    if (user) {
      user.pay(req.body.amount);
      if (money) {
        await money[0].addAmount(req.body.amount, 0);
      } else {
        res.status(404).send({ message: 'Money not found!' });
      }
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

const searchUser = async (req, res) => {
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: req.body.search, $options: 'i' } },
        { secondName: { $regex: req.body.search, $options: 'i' } },
        {
          responsibleMan: { $regex: req.body.search, $options: 'i' },
        },
        { phone: { $regex: req.body.search, $options: 'i' } },
      ],
    });
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const makeExcelUsersByTourId = async (req, res) => {
  try {
    const users = await User.find({ tour: req.params.id });

    const data = [
      [
        {
          value: 'Number',
          fontWeight: 'bold',
        },
        {
          value: 'Nationality',
          fontWeight: 'bold',
        },
        {
          value: 'Family Name',
          fontWeight: 'bold',
        },
        {
          value: 'Given Name',
          fontWeight: 'bold',
        },
        {
          value: 'Passport Number',
          fontWeight: 'bold',
        },
        {
          value: 'Date of Birth',
          fontWeight: 'bold',
        },
        {
          value: 'Sex',
          fontWeight: 'bold',
        },
        {
          value: 'Country of Birth',
          fontWeight: 'bold',
        },
        {
          value: 'Document Expiry Date',
          fontWeight: 'bold',
        },
      ],
    ];
    
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const row = [
        {
          value: i + 1,
        },
        {
          value: user.nationality,
        },
        {
          value: user.secondName,
        },
        {
          value: user.firstName,
        },
        {
          value: user.passportNumber,
        },
        {
          value: user.dateOfBirth,
        },
        {
          value: user.sex,
        },
        {
          value: user.countryOfBirth,
        },
        {
          value: user.passportExpireDate,
        },
      ];

      data.push(row);
    }

    await writeXlsxFile(data, {
      filePath: 'users.xlsx',
    });
    res.download('users.xlsx', (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
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
  searchUser,
  makeExcelUsersByTourId,
};

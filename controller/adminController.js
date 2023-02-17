const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const jwt = require('jsonwebtoken');
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
const Admin = require('../models/Admin');

const registerAdmin = async (req, res) => {
  try {
    const isAdded = await Admin.findOne({ email: req.body.email });
    if (isAdded) {
      return res.status(403).send({
        message: 'This Email already Added!',
      });
    } else {
      const newStaff = new Admin({
        branch: req.body.branch,
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password),
      });
      const staff = await newStaff.save();
      const token = signInToken(staff);
      res.send({
        token,
        branch: staff.branch,
        image: staff.image,
        phone: staff.phone,
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = signInToken(admin);
      res.send({
        token,
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
        role: admin.role,
        branch: admin.branch,
      });
    } else {
      res.status(401).send({
        message: 'Invalid Admin or password!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};




const addStaff = async (req, res) => {
  try {
    const isAdded = await Admin.find({ email: req.body.data.email });
    if (isAdded) {
      return res.status(500).send({
        message: 'This Email already Added!',
      });
    } else {
      const newStaff = new Admin({
        name: req.body.data.name,
        email: req.body.data.email,
        password: bcrypt.hashSync(req.body.data.password),
        phone: req.body.data.phone,
        joiningDate: req.body.data.joiningDate,
        role: req.body.data.role,
        image: req.body.data.image,
      });
      await newStaff.save();
      res.status(200).send({
        message: 'Staff Added Successfully!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const admins = await Admin.find({}).sort({ _id: -1 });
    res.send(admins);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getStaffById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.send(admin);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStaff = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.name = req.body.data.name;
      admin.email = req.body.data.email;
      admin.phone = req.body.data.phone;
      admin.role = req.body.data.role;
      admin.password = req.body.data.password
        ? bcrypt.hashSync(req.body.data.password)
        : admin.password;
      admin.image = req.body.data.image;
      const updatedAdmin = await admin.save();
      const token = signInToken(updatedAdmin);
      res.send({
        token,
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        image: updatedAdmin.image,
        joiningData: updatedAdmin.joiningData,
      });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteStaff = (req, res) => {
  Admin.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Admin Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};

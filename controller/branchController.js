const Branch = require('../models/Branch');
const Admin = require('../models/Admin');

const addBranch = async (req, res) => {
  try {
    const newBranch = new Branch(req.body);
    await newBranch.save();
    res.send({ message: 'Branch Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllBranchs = async (req, res) => {
  try {
    const Branchs = await Branch.find({}).sort({ _id: -1 });

    for (let i = 0; i < Branchs.length; i++) {
      const admins = await Admin.find({ branch: Branchs[i]._id });
      Branchs[i].admins = admins;
    }


    
    res.send(Branchs);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBranchById = async (req, res) => {
  try {
    const Branch = await Branch.findById(req.params.id);
    res.send(Branch);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    const Branch = await Branch.findById(req.params.id);
    console.log(Branch);
    if (Branch) {
      Branch.title = req.body.title;
      Branch.address = req.body.address;
      Branch.phone = req.body.phone;
      await Branch.save();
      res.send({ message: 'Branch Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Branch not found!' });
  }
};

const deleteBranch = (req, res) => {
  Branch.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Branch Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addBranch,
  getAllBranchs,
  getBranchById,
  updateBranch,
  deleteBranch,
};

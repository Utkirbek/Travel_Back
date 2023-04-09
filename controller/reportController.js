const Report = require('../models/Report');

const addReport = async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.send({ message: 'Report Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllReports = async (req, res) => {
  try {
    const Reports = await Report.find({}).sort({ _id: -1 });
    res.send(Reports);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addReport,
  getAllReports,
};

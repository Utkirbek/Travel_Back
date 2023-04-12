const Report = require('../models/Report');

const addReport = async (req, res) => {
  try {
    const newReport = req.body;
    newReport.visa.total =
      newReport.visa.price * newReport.amoutOfPeople;
    const report = new Report(newReport);
    await report.save();
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

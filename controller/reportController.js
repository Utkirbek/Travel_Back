const Report = require('../models/Report');

const addReport = async (req, res) => {
  try {
    const newReport = req.body;
    newReport.visa.total =
      +newReport.visa.price * +newReport.amountOfPeople;
    newReport.luggage.amount =
      (+newReport.luggage.number * +newReport.amountOfPeople) /
      +newReport.luggage.dollar;
    newReport.makkahAndMadina.total =
      +newReport.makkahAndMadina.amount /
      +newReport.makkahAndMadina.price;
    newReport.total =
      +newReport.ticketPrice * +newReport.amountOfPeople +
      +newReport.luggage.amount +
      +newReport.transport +
      +newReport.visa.total +
      +newReport.medicine +
      +newReport.makkahAndMadina.total;
    newReport.allMoneyTakenFromClient =
      +newReport.sellingTicketPrice * +newReport.amountOfPeople;

    newReport.profit =
      +newReport.allMoneyTakenFromClient - +newReport.total;

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

const Tour = require('../models/Tour');
const User = require('../models/User');

const addTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    await newTour.save();
    res.send({ message: 'Tour Added Successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({}).sort({ _id: -1 });
    for (let i = 0; i < tours.length; i++) {
      const users = await User.find({ tour: tours[i]._id });
      tours[i].users = users;
    }
    res.send(tours);

  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.send(tour);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (tour) {
      tour.going = req.body.going;
      tour.coming = req.body.coming;
      await tour.save();
      res.send({ message: 'Tour Updated Successfully!' });
    }
  } catch (err) {
    res.status(404).send({ message: 'Tour not found!' });
  }
};

const deleteTour = (req, res) => {
  Tour.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.send({ message: 'Tour deleted successfully!' });
    }
  });
};

module.exports = {
  addTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
};

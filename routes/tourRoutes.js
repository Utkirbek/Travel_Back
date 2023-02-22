const express = require('express');
const router = express.Router();
const {
    addTour,
    getAllTours,
    getTourById,
    updateTour,
    deleteTour,
} = require('../controller/tourController');

//add a Branch
router.post('/add', addTour);

//get all Branch
router.get('/', getAllTours);

//get a Branch
router.get('/:id', getTourById);

//update a Branch
router.put('/:id', updateTour);

//delete a Branch
router.delete('/:id', deleteTour);

module.exports = router;

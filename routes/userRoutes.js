const express = require('express');
const router = express.Router();
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controller/userController');

//add a Branch
router.post('/add', addUser);

//get all Branch
router.get('/', getAllUsers);

//get a Branch
router.get('/:id', getUserById);

//update a Branch
router.put('/:id', updateUser);

//delete a Branch
router.delete('/:id', deleteUser);

module.exports = router;

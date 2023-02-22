const express = require('express');
const router = express.Router();
const {
  addBranch,
  getAllBranchs,
  getBranchById,
  updateBranch,
  deleteBranch,
} = require('../controller/branchController');

//add a Branch
router.post('/add', addBranch);

//get all Branch
router.get('/', getAllBranchs);

//get a Branch
router.get('/:id', getBranchById);

//update a Branch
router.put('/:id', updateBranch);

//delete a Branch
router.delete('/:id', deleteBranch);

module.exports = router;

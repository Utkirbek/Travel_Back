const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Branch =
  mongoose.models.Branch || mongoose.model('Branch', branchSchema);
module.exports = Branch;

const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    admins: [],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    location: {
      lat: {
        type: Number,
        required: false,
      },
      lng: {
        type: Number,
        required: false,
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

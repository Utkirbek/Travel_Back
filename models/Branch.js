const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon =
  mongoose.models.Coupon || mongoose.model('Coupon', branchSchema);
module.exports = Coupon;

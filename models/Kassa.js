const mongoose = require('mongoose');

const kassaSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

kassaSchema.methods.addAmount = function (amount, type) {
  this.amount = +this.amount + +amount;

  this.save();
};

kassaSchema.methods.minusAmount = function (amount, type) {
  this.amount = +this.amount - +amount;

  this.save();
};
const Kassa = mongoose.model('Kassa', kassaSchema);

module.exports = Kassa;

const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema(
  {
    kassa: {
      type: Number,
      required: true,
      default: 0,
    },
    profit: {
      type: Number,
      required: true,
      default: 0,
    },
    kassas: [],
    profits: [],

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

moneySchema.methods.addAmount = function (kassa, profit) {
  this.kassa = +this.kassa + +kassa;
  this.profit = +this.profit + +profit;
  if (kassa > 0) {
    const object = {
      amount: kassa,
      date: new Date(),
    };
    this.kassas.push(object);
  }
  if (profit > 0) {
    const object = {
      amount: profit,
      date: new Date(),
    };
    this.profits.push(object);
  }
  this.save();
};

moneySchema.methods.minusAmount = function (kassa, profit) {
  this.kassa = +this.kassa - +kassa;
  this.profit = +this.profit - +profit;

  this.save();
};
const Money = mongoose.model('Money', moneySchema);

module.exports = Money;

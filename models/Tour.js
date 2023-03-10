const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    going: [
      {
        airline: {
          type: String,
          required: true,
        },
        flightName: {
          type: String,
          required: true,
        },
        flightWay: {
          type: String,
          required: true,
        },
        flightDate: {
          type: String,
          required: true,
        },
        flightTime: {
          type: String,
          required: true,
        },
        reachTime: {
          type: String,
          required: true,
        },
      },
    ],
    coming: [
      {
        airline: {
          type: String,
          required: true,
        },
        flightName: {
          type: String,
          required: true,
        },
        flightWay: {
          type: String,
          required: true,
        },
        flightDate: {
          type: String,
          required: true,
        },
        flightTime: {
          type: String,
          required: true,
        },
        reachTime: {
          type: String,
          required: true,
        },
      },
    ],
    tickets: {
      amount: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      totalMoney: {
        type: Number,
        required: true,
      },
      paidMoney: {
        type: Number,
        required: true,
      },
      remainingMoney: {
        type: Number,
        required: true,
      },
      remaining: {
        type: Number,
        required: false,
      },
      minPrice: {
        type: Number,
        required: true,
      },

    },
  },
  {
    timestamps: true,
  }
);

tourSchema.methods.minusTickets = async function () {
  this.tickets.remaining -= 1;
  await this.save();
};

tourSchema.methods.addTickets = async function () {
  this.tickets.remaining += 1;
  await this.save();
};

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

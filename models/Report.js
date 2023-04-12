const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    amountOfPeople: {
      type: Number,
      required: true,
    },
    leavingDate: {
      type: String,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    guide: {
      type: Number,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    luggage: {
      dollar: {
        type: Number,
        required: true,
      },
      number: {
        type: Number,
        required: true,
        default: 100000,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    transport: {
      type: Number,
      required: true,
    },
    visa: {
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    medicine: {
      type: Number,
      required: true,
    },
    makkahAndMadina: {
      amount: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        default: 3.75,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    total: {
      type: Number,
      required: true,
    },
    sellingTicketPrice: {
      type: Number,
      required: true,
    },
    allMoneyTakenFromClient: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    amoutOfClients: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;

const mongoose = require('mongoose');

const spendSchema = new mongoose.Schema(
  {
    amoutOfPeople: {
      type: Number,
      required: true,
    },
    makkah: {
      room: {
        amount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
      food: {
        amount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
      days: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    madina: {
      room: {
        amount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
      food: {
        amount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
      days: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    extra: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Spend = mongoose.model('Spend', spendSchema);
module.exports = Spend;

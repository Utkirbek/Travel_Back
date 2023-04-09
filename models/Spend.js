const mongoose = require('mongoose');

const spendSchema = new mongoose.Schema(
  {
    numberOfPeople: {
      type: Number,
      required: true,
    },
    makkah: {
      room: {
        number: {
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
        number: {
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
        number: {
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
        number: {
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

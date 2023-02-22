const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
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
                type: Date,
                required: true,
            },
            flightTime: {
                type: timestamps,
                required: true,
            },
            reachTime: {
                type: timestamps,
                required: true,
            },
        }

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
                type: Date,
                required: true,
            },
            flightTime: {
                type: timestamps,
                required: true,
            },
            reachTime: {
                type: timestamps,
                required: true,
            },
        }

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
        totalPrice: {
            type: Number,
            required: true,
        },
        paid: {
            type: Number,
            required: true,
        },
        remaining: {
            type: Number,
            required: true,
        },
    }
    
    
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

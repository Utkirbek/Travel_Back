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
      booked: {
        type: Number,
        required: false,
        default: 0,
      },
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
      minTicketPrice: {
        type: Number,
        required: true,
      },
      minTourPrice: {
        type: Number,
        required: true,
      },

    },
    users: {
      type: String,
      required: false,
    }
  },

  {
    timestamps: true,
  }
);

tourSchema.methods.minusTickets = async function (type) {
  if(type === 'booked'){
    this.tickets.remaining -= 1;
    this.tickets.booked += 1;
  }
  else{
    this.tickets.remaining -= 1;
  }
  
  await this.save();
};

tourSchema.methods.addTickets = async function (type) {
  if(type === 'booked'){
    this.tickets.remaining += 1;
    this.tickets.booked -= 1;
  }else{
    this.tickets.remaining += 1;
  }
  await this.save();
};

tourSchema.methods.changeTourStatus = async function (tourStatus){
  if(tourStatus=='paid'){
    this.tickets.booked -=1;
  }else{
    this.tickets.booked+=1
  }

};

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

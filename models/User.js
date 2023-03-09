const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
      enum: ['M', 'F'],
    },
    countryOfBirth: {
      type: String,
      required: true,
    },
    passportExpireDate: {
      type: String,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    paid: {
      type: Number,
      required: false,
    },
    left: {
      type: Number,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    status: {
      type: String,
      enum: ['waiting', 'accepted', 'rejected'],
      default: 'waiting',
    },
    responsibleMan: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.pay = async function (amount) {
  this.paid += amount;
  this.left -= amount;
  await this.save();
};

userSchema.methods.refund = async function (amount) {
  this.paid -= amount;
  this.left += amount;
  await this.save();
};

userSchema.methods.changeStatus = async function (status) {
  this.status = status;
  await this.save();
};

const User =
  mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

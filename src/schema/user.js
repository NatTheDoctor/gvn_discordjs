const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    level: {
      type: Number,
      default: 1,
    },
    coin: {
      type: Number,
      default: 50,
    },
    maxCoin: {
      type: Number,
      default: 100,
    },
    exp: {
      type: Number,
      default: 0,
    },
    maxExp: {
      type: Number,
      default: 165,
    },
    isDaily: {
      type: Boolean,
      default: false,
    },
    isBaKien: {
      type: Boolean,
      default: false,
    },
    status: {
      type: {
        isParanoid: {
          type: Boolean,
          default: false,
        },
        isDeceased: {
          type: Boolean,
          default: false,
        },
        isCaptive: {
          type: Boolean,
          default: false,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    },
    messageCount: {
      type: Number,
      default: 0,
    },
  })
);

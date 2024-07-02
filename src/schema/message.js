const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Message",
  new mongoose.Schema({
    messageId: {
      type: String,
      index: true,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
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
      },
    },
  })
);

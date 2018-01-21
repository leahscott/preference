const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//================================
// Poll Schema
//================================
const PollSchema = new Schema(
  {
    owner: {
      type: Number,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    expirationDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Poll", PollSchema);

const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//================================
// Poll Schema
//================================
const BallotSchema = new Schema(
  {
    poll: [{ type: Schema.Types.ObjectId, ref: 'Poll' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Ballot", BallotSchema);

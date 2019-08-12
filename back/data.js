const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema(
  {
    id: String,
    player1: String, 
    player2: String,
    rounds: [
      {
        player1: String,
        player2: String,
        winner: {
          name: String,
          field: String
        },
        inx: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
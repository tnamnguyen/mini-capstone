const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const connectionSchema = new mongoose.Schema({
  user1: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  user1Name: {
    type: String,
    required: true,
  },
  user2: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  user2Name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});
const Connection = mongoose.model("Connection", connectionSchema);
module.exports = Connection;

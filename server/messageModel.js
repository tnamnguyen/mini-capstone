const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
  user1: {
    type: ObjectId,
    ref: "user",
    
  },
  user1Name: {
    type: String,
    required: true,
   
  },
  user2: {
    type: ObjectId,
    ref: "user",
    
  },
  user2Name: {
    type: String,
    required: true,
   
  },
  message: {
    type: String,
  },

});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

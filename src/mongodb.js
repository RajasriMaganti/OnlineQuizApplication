const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
  },
    password: {
        type: String,
        required: true
    }  

},{timestamps: true});

const collection = new mongoose.model("collection", LoginSchema);
module.exports = collection;

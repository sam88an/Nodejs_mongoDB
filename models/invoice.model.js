const mongoose = require("mongoose");
const invoiceSchemma = new mongoose.Schema({
  item: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name can not exeed 100 characters"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter product price "],
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  due: {
    type: Date,
    default: Date.now,
  },
  rate: {
    type: Number,
  },
  tax: {
    type: Number,
  },
});
module.exports = mongoose.model("Invoice", invoiceSchemma);

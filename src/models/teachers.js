const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  license: { 
    type: String,
    required: true,
  },
  grade: { 
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true, 
  },
  schedule: {
    type: [[Array]], // Each cell can hold an array of classes
    default: [
      ["8:00am - 8:48am", [], [], [], [], []], // Time slot, with empty arrays for each day
      ["8:51am - 9:36am", [], [], [], [], []],
      ["9:38am - 10:23am", [], [], [], [], []],
      ["10:25am - 11:10am", [], [], [], [], []],
      ["11:12am - 11:57am", [], [], [], [], []],
      ["11:59am - 12:44pm", [], [], [], [], []],
      ["12:46pm - 1:31pm", [], [], [], [], []],
      ["1:33pm - 2:20pm", [], [], [], [], []],
    ],
  },
});

module.exports = mongoose.model("teachers", userSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

// # Log Entry
// * Title - Text
// * Description - Text
// * Comments - Text
// * Rating - scale of 1-10
// * Image - Text - URL
// * Date - dateTime
// * Latitude - Number
// * Longitude - Number

const requiredString = {
  type: String,
  required: true
};

const requiredNumber = {
  type: Number,
  required: true
};

const defaultRequiredDate = {
  type: Date,
  default: Date.now,
  required: true
};

const logEntrySchema = new Schema({
title: requiredString,
description: String,
comments: String,
image: String,
rating: {
  type: Number,
  min: 0,
  max: 10,
  default: 0
},
latitude: {
  ...requiredNumber,
  min: -90,
  max: 90
},
longitude: {
  ...requiredNumber,
  min: -180,
  max: 180
},
created_at: defaultRequiredDate,
updated_at: defaultRequiredDate,
visitDate: {
  required: true,
  type: Date,

}
}, {
  timestamps: true
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema)

module.exports = LogEntry;
const mongoose = require('mongoose');  // <-- REQUIRED!

const CompletionSchema = new mongoose.Schema({
  completed: { type: Boolean, default: false },
  reason: { type: String, default: "" }
}, { _id: false });

const TimeBlockSchema = new mongoose.Schema({
  time: String,
  activity: String,
  date: { type: String }, // for one-time
  recurrence: {
    type: {
      type: String, // 'once', 'daily', 'custom'
      default: 'once'
    },
    days: [String],
  },
  completions: {
    type: Map,
    of: CompletionSchema,
    default: {}
  }
});

module.exports = mongoose.model('TimeBlock', TimeBlockSchema);

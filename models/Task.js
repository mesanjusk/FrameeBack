const mongoose = require('mongoose');

const SMALLSchema = new mongoose.Schema({
  specific: String,
  measurable: String,
  actionable: String,
  limited: String,
  learned: String
}, { _id: false });

const TaskSchema = new mongoose.Schema({
  name: String, // Task 1, Task 2, Task 3
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  plannedHours: Number,
  loggedHours: Number,
  progress: Number, // %
  small: SMALLSchema,
  review: String,
  week: Number,
  month: Number
});

module.exports = mongoose.model('Task', TaskSchema);


const Task = require('../models/Task');

// Add getWeek prototype for Date (should be defined once in your app)
Date.prototype.getWeek = function () {
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

const addTaskLog = async (req, res) => {
  try {
    const { name, date, plannedHours, loggedHours, progress, small } = req.body;
    const week = new Date(date).getWeek();
    const month = new Date(date).getMonth() + 1;
    const task = await Task.create({
      name, user: req.userId, date, plannedHours, loggedHours, progress, small, week, month
    });
    res.json({ success: true, task });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getTasks = async (req, res) => {
  const { period, date } = req.query; // e.g. daily/weekly/monthly
  let filter = {};
  if (period && date) {
    const d = new Date(date);
    if (period === 'daily') filter.date = d;
    else if (period === 'weekly') filter.week = d.getWeek();
    else if (period === 'monthly') filter.month = d.getMonth() + 1;
  }
  const tasks = await Task.find(filter).populate('user');
  res.json({ success: true, tasks });
};

const getTasksByUser = async (req, res) => {
  const userId = req.params.userId;
  const tasks = await Task.find({ user: userId }).populate('user');
  res.json({ success: true, tasks });
};

const reviewTask = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const task = await Task.findByIdAndUpdate(id, { review }, { new: true });
  res.json({ success: true, task });
};

module.exports = {
  addTaskLog,
  getTasks,
  getTasksByUser,
  reviewTask,
};

const express = require('express');
const TimeBlock = require('../models/TimeBlock');
const router = express.Router();

// Get all time blocks
router.get('/', async (req, res) => {
  try {
    const blocks = await TimeBlock.find();
    res.json({ success: true, blocks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add a time block (with recurrence, no top-level completed/reason)
router.post('/', async (req, res) => {
  try {
    const {
      time,
      activity,
      date,
      recurrence = { type: "once", days: [] }
    } = req.body;
    const block = await TimeBlock.create({ time, activity, date, recurrence });
    res.json({ success: true, block });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update completion status for a specific date
router.put('/:id/completion', async (req, res) => {
  try {
    const { date, completed, reason } = req.body;
    const block = await TimeBlock.findById(req.params.id);
    if (!block) return res.status(404).json({ success: false, message: "Block not found" });
    block.completions.set(date, { completed, reason });
    await block.save();
    res.json({ success: true, block });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update block meta (not completion!)
router.put('/:id', async (req, res) => {
  try {
    const { time, activity, recurrence } = req.body;
    const block = await TimeBlock.findByIdAndUpdate(
      req.params.id,
      { time, activity, recurrence },
      { new: true }
    );
    res.json({ success: true, block });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a time block
router.delete('/:id', async (req, res) => {
  try {
    await TimeBlock.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const overlaySchema = new mongoose.Schema({
  field: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  fontFamily: { type: String, default: 'Arial' },
  fontSize: { type: Number, default: 24 },
  fontColor: { type: String, default: '#000000' }
});

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  baseImage: { type: String, required: true },
  overlays: [overlaySchema]
}, { timestamps: true });

module.exports = mongoose.model('Template', templateSchema);

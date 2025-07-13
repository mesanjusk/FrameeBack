const Template = require('../models/Template');
const cloudinary = require('cloudinary').v2;

exports.createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json({ success: true, template });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json({ success: true, templates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.generateImage = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ success: false, message: 'Template not found' });

    const transformations = template.overlays.map(o => ({
      overlay: {
        font_family: o.fontFamily,
        font_size: o.fontSize,
        text: req.body[o.field] || '',
        color: o.fontColor
      },
      gravity: 'north_west',
      x: o.x,
      y: o.y
    }));

    const url = cloudinary.url(template.baseImage, { transformation: transformations });
    res.json({ success: true, url });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const templateController = require('../controllers/templateController');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/', verifyToken, templateController.createTemplate);
router.get('/', verifyToken, templateController.getTemplates);
router.post('/:id/generate', verifyToken, templateController.generateImage);

module.exports = router;

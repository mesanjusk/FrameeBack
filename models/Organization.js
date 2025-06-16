const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const organizationSchema = new mongoose.Schema({
  organization_uuid: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  center_code: {
    type: String,
    required: true,
    unique: true,
  },
  organization_title: String,
  organization_type: String,
  organization_call_number: {
    type: Number,
    required: true,
    unique: true,
  },
  login_password: String,
  login_username: String,
  organization_logo: String,
  theme_color: String,
  plan_type: {
    type: String,
    enum: ['free', 'paid'],
    default: 'free',
  },
  created_by: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  domains: [String],
});

module.exports = mongoose.model('Organization', organizationSchema);

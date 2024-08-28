const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true  // Ensure username is unique
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'team_member'], // Restrict to valid roles
    default: 'team_member'
  }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  productId: { type: String, required: true },
  requestData: { type: Object, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  teamMemberId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Request', RequestSchema);

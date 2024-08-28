const mongoose = require('mongoose');
const axios = require('axios');
const Request = require('../models/requestModel');

const processRequest = async (requestId, action) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      throw new Error('Invalid RequestId format');
    }

    // Find the request directly using requestId
    const request = await Request.findById(requestId);
    if (!request) throw new Error('Request not found');

    if (action === 'approve') {
      const response = await axios.put(`https://64e0caef50713530432cafa1.mockapi.io/api/products/${request.productId}`, request.requestData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Remote API response:', response.data);
      request.status = 'approved';
    } else if (action === 'reject') {
      request.status = 'rejected';
    } else {
      throw new Error('Invalid action');
    }

    await request.save();
  } catch (error) {
    console.error('Error processing request:', error.message);
    throw new Error(error.message);
  }
};

module.exports = { processRequest };

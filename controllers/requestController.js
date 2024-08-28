const mongoose = require('mongoose');
const Request = require('../models/requestModel');
const { processRequest } = require('../services/requestService');

// Create a new request
const createRequest = async (req, res) => {
  const { productId, requestData } = req.body;
  try {
    const newRequest = new Request({
      productId,
      requestData,
      teamMemberId: req.user._id,
    });

    await newRequest.save();
    res.status(201).send('Request created');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Approve a request
const approveRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).send('Invalid request ID');
    }

    // No need to manually convert requestId; MongoDB can handle it as a string
    await processRequest(requestId, 'approve');
    res.send('Request approved');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Reject a request
const rejectRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).send('Invalid request ID');
    }

    await processRequest(requestId, 'reject');
    res.send('Request rejected');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).send('Invalid request ID');
    }

    const request = await Request.findById(requestId).populate('teamMemberId');
    if (!request) {
      return res.status(404).send('Request not found');
    }

    res.json(request);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('teamMemberId');
    res.json(requests);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Optional: filter requests based on status
const getRequestsByStatus = async (req, res) => {
  const { status } = req.params;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).send('Invalid status');
  }

  try {
    const requests = await Request.find({ status }).populate('teamMemberId');
    res.json(requests);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createRequest, approveRequest, rejectRequest, getRequest, getAllRequests, getRequestsByStatus };

 

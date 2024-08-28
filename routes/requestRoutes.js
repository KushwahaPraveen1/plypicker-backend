const express = require('express');
const router = express.Router();
const { createRequest, approveRequest, rejectRequest, getRequest, getAllRequests, getRequestsByStatus } = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a request
router.post('/request', authMiddleware, createRequest);

// Route to approve a request
router.post('/request/:requestId/approve', authMiddleware, approveRequest);

// Route to reject a request
router.post('/request/:requestId/reject', authMiddleware, rejectRequest);
// Route to get a specific request
router.get('/request/:requestId', authMiddleware, getRequest);

// Route to get all requests
router.get('/getrequests', authMiddleware, getAllRequests);

// Route to get requests by status
router.get('/getrequests/status/:status', authMiddleware, getRequestsByStatus);

module.exports = router;

const express = require('express');
const { EmergencyRequest, BloodUnit } = require('../db/models');
const router = express.Router();

// Create emergency request and auto-match blood
router.post('/create', async (req, res) => {
  try {
    const { hospitalName, bloodGroup, quantity, urgency } = req.body;

    const requestId = `REQ-${Date.now()}`;
    
    // Find available cleared blood unit
    const availableUnit = await BloodUnit.findOne({
      bloodGroup,
      status: 'available',
      testingStatus: 'cleared',
    });

    if (!availableUnit) {
      return res.status(404).json({ error: 'No available blood units for this group' });
    }

    // Create request
    const request = new EmergencyRequest({
      requestId,
      hospitalName,
      bloodGroup,
      quantity,
      urgency,
      allocatedUnitId: availableUnit._id,
      status: 'fulfilled',
      fulfilledTime: new Date(),
    });

    // Mark unit as allocated
    availableUnit.status = 'allocated';
    await availableUnit.save();
    await request.save();

    res.status(201).json({
      message: 'Emergency request fulfilled instantly',
      request,
      allocatedUnit: availableUnit,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all emergency requests
router.get('/', async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().populate('allocatedUnitId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
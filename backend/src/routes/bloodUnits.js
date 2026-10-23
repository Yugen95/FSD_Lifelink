const express = require('express');
const { BloodUnit } = require('../db/models');
const router = express.Router();

// Create a blood unit (after donation)
router.post('/create', async (req, res) => {
  try {
    const { donorId, bloodGroup, collectionDate, expiryDate } = req.body;

    const unitId = `UNIT-${Date.now()}`;
    const unit = new BloodUnit({
      unitId,
      donorId,
      bloodGroup,
      collectionDate,
      expiryDate,
    });

    await unit.save();
    res.status(201).json({ message: 'Blood unit created', unit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available units by blood group
router.get('/available/:bloodGroup', async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const units = await BloodUnit.find({
      bloodGroup,
      status: 'available',
      testingStatus: 'cleared',
    });
    res.json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update testing status
router.patch('/:unitId/test-status', async (req, res) => {
  try {
    const { unitId } = req.params;
    const { testingStatus } = req.body;

    const unit = await BloodUnit.findByIdAndUpdate(
      unitId,
      { testingStatus },
      { new: true }
    );

    res.json({ message: 'Testing status updated', unit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
const express = require('express');
const { Donor } = require('../db/models');
const router = express.Router();

// Register a new donor
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, bloodGroup, dob } = req.body;

    // Check if donor exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ error: 'Donor already registered' });
    }

    // Create new donor
    const donor = new Donor({
      name,
      email,
      phone,
      bloodGroup,
      dob,
    });

    await donor.save();
    res.status(201).json({ message: 'Donor registered successfully', donor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check donor eligibility
router.post('/:donorId/check-eligibility', async (req, res) => {
  try {
    const { donorId } = req.params;
    const donor = await Donor.findById(donorId);

    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    // Age check (18-65)
    const age = new Date().getFullYear() - new Date(donor.dob).getFullYear();
    if (age < 18 || age > 65) {
      return res.json({ eligible: false, reason: 'Age must be 18-65' });
    }

    // Last donation check (56 days minimum gap)
    if (donor.lastDonationDate) {
      const daysSinceLastDonation = Math.floor(
        (new Date() - donor.lastDonationDate) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceLastDonation < 56) {
        return res.json({
          eligible: false,
          reason: `Must wait ${56 - daysSinceLastDonation} more days`,
        });
      }
    }

    res.json({ eligible: true, reason: 'Donor is eligible' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Schedule a donation
router.post('/:donorId/schedule-donation', async (req, res) => {
  try {
    const { donorId } = req.params;
    const { scheduledDate } = req.body;

    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    // Update last donation date when they complete donation
    donor.lastDonationDate = new Date(scheduledDate);
    await donor.save();

    res.json({
      message: 'Donation scheduled successfully',
      donor,
      scheduledDate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get donor by ID
router.get('/:donorId', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.donorId);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
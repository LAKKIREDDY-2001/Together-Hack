const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Credential = require('../models/Credential');
const Skill = require('../models/Skill');
const BlockchainSimulator = require('../utils/blockchain');

// @route   GET api/credentials
// @desc    Get user credentials
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const credentials = await Credential.find({ userId: req.user.id })
      .populate('skillId', 'skillName level')
      .sort({ createdAt: -1 });

    res.json(credentials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/credentials
// @desc    Add credential (simulate AI detection)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { skillId, evidenceType, evidenceTitle, evidenceDescription, rating } = req.body;

    // Verify skill belongs to user
    const skill = await Skill.findOne({ _id: skillId, userId: req.user.id });
    if (!skill) {
      return res.status(400).json({ msg: 'Skill not found' });
    }

    // Create blockchain hash
    const block = BlockchainSimulator.createCredentialBlock(
      req.user.id,
      skillId,
      { evidenceType, evidenceTitle, evidenceDescription, rating }
    );

    const credential = new Credential({
      userId: req.user.id,
      skillId,
      evidenceType,
      evidenceTitle,
      evidenceDescription,
      rating,
      blockchainHash: block.hash
    });

    await credential.save();

    // Update skill verification score
    skill.evidenceCount += 1;
    skill.verificationScore = skill.evidenceCount === 1 
      ? rating 
      : ((skill.verificationScore * (skill.evidenceCount - 1)) + rating) / skill.evidenceCount;
    skill.lastUpdated = Date.now();
    await skill.save();

    res.json({ credential, block, skill });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/credentials/verify/:hash
// @desc    Verify credential by hash (public)
// @access  Public
router.get('/verify/:hash', async (req, res) => {
  try {
    const credential = await Credential.findOne({ blockchainHash: req.params.hash }).populate('userId', 'name email').populate('skillId', 'skillName level');

    if (!credential) {
      return res.status(404).json({ verified: false, msg: 'Credential not found' });
    }

    // Verify blockchain hash
    const isValid = BlockchainSimulator.verifyHash(credential.data || {
      userId: credential.userId._id,
      skillId: credential.skillId._id,
      evidence: {
        evidenceType: credential.evidenceType,
        evidenceTitle: credential.evidenceTitle,
        rating: credential.rating
      }
    }, credential.blockchainHash);

    res.json({ verified: isValid, credential });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

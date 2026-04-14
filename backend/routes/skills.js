const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Skill = require('../models/Skill');
const Credential = require('../models/Credential');

// @route   GET api/skills
// @desc    Get user skills
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user.id }).sort({ lastUpdated: -1 });
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/skills
// @desc    Add skill
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, level, description, category } = req.body;

    const skill = new Skill({
      userId: req.user.id,
      skillName: name,
      level,
      description,
      category: category || 'General'
    });

    await skill.save();
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/skills/:id
// @desc    Get skill details
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    if (skill.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const credentials = await Credential.find({ skillId: skill._id }).sort({ createdAt: -1 });

    res.json({ skill, credentials });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/skills/:id
// @desc    Delete a skill and its related credentials
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }

    if (skill.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Credential.deleteMany({ skillId: skill._id });
    await Skill.findByIdAndDelete(skill._id);

    res.json({ msg: 'Skill removed successfully', id: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

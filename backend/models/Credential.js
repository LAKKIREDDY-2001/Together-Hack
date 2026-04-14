const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  evidenceType: {
    type: String,
    enum: ['code_review', 'project', 'ticket', 'document'],
    required: true
  },
  evidenceTitle: String,
  evidenceDescription: String,
  rating: Number,
  blockchainHash: { type: String, required: true },
  verified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Credential', CredentialSchema);

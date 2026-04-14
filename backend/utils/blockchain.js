const crypto = require('crypto');

// Simulated blockchain verification
class BlockchainSimulator {
  static generateHash(data) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(data))
      .digest('hex');
  }

  static verifyHash(data, hash) {
    const computedHash = this.generateHash(data);
    return computedHash === hash;
  }

  static createCredentialBlock(userId, skillId, evidence) {
    const timestamp = Date.now();
    const data = {
      userId,
      skillId,
      evidence,
      timestamp
    };

    return {
      hash: this.generateHash(data),
      timestamp,
      data
    };
  }
}

module.exports = BlockchainSimulator;

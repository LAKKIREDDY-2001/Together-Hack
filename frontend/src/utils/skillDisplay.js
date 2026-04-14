export const normalizeSkillForCard = (skill) => {
  const verificationScore = skill.verificationScore || 0;
  const evidenceCount = skill.evidenceCount || 0;
  const score = skill.score ?? Math.max(60, Math.round(verificationScore * 20 + 55));
  const projects = skill.projects ?? Math.max(1, evidenceCount || 1);

  return {
    ...skill,
    id: skill.id || skill._id,
    name: skill.name || skill.skillName || 'Untitled Skill',
    description: skill.description || 'No description added yet.',
    category: skill.category || 'General',
    verified: skill.verified ?? verificationScore > 0,
    score,
    projects
  };
};

const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const jobTitlePatterns = [
  /senior (\w+)/i,
  /lead (\w+)/i,
  /principal (\w+)/i,
  /(\w+) engineer/i,
  /(\w+) developer/i,
  /(\w+) manager/i,
  /(\w+) specialist/i,
  /manager of (\w+)/i
];

const skillKeywords = [
  'react', 'angular', 'vue', 'javascript', 'typescript', 'node', 'express', 'python', 'django', 'flask', 'sql', 'mongodb', 'postgres', 
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'devops', 'ci/cd', 'jenkins', 'terraform', 'ansible',
  'leadership', 'management', 'communication', 'agile', 'scrum', 'kanban', 'negotiation', 'stakeholder', 'analytics'
];

export const extractJobTitle = (jobDesc) => {
  for (const pattern of jobTitlePatterns) {
    const match = jobDesc.match(pattern);
    if (match) {
      return match[0];
    }
  }
  // Fallback - first sentence or 4 words
  const sentences = jobDesc.split('.').filter(s => s.trim().length > 10);
  if (sentences.length > 0) {
    return sentences[0].trim().substring(0, 50);
  }
  return 'Target Job';
};

export const extractSkillsFromJob = (jobDesc) => {
  const normalizedDesc = jobDesc.toLowerCase();
  const extracted = skillKeywords.filter(keyword => normalizedDesc.includes(keyword));
  return [...new Set(extracted)].slice(0, 8); // dedupe, limit
};

export const analyzeJobDescription = (jobDesc) => {
  const targetJob = extractJobTitle(jobDesc);
  const targetSkills = extractSkillsFromJob(jobDesc);
  
  return {
    targetJob,
    targetSkills,
    skillCount: targetSkills.length,
    analysis: targetSkills.length > 0 ? `Detected ${targetSkills.length} skills: ${targetSkills.join(', ')}` : 'No specific skills detected. Roadmap will use role/department defaults.'
  };
};

export const updateUserWithAnalysis = (analysis) => {
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
  if (currentUser) {
    const updatedUser = {
      ...currentUser,
      targetJob: analysis.targetJob,
      targetSkills: analysis.targetSkills
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  }
  return null;
};


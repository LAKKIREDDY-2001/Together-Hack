// eslint-disable-next-line no-unused-vars
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
  'generative ai', 'llm', 'prompt engineering', 'rag', 'fine-tuning', 'instruct tuning', 'peft', 'rlhf',
  'amazon q', 'llamaindex', 'langchain', 'vector databases', 'amazon bedrock', 'aws ai', 'aws ai/ml', 'code generation', 'refactoring',
  'automated testing', 'software development', 'cloud computing', 'scalable applications', 'public speaking', 'technical content',
  'developer relations', 'developer communities', 'github', 'stack overflow', 'react', 'javascript', 'typescript', 'node', 'python', 'sql', 'docker', 'kubernetes',
  'aws', 'leadership', 'communication', 'mentoring', 'roadmap', 'agile', 'scrum'
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
  return [...new Set(extracted.map(s => s.charAt(0).toUpperCase() + s.slice(1).replace(/ /g, ' ')))];
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


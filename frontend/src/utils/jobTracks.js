const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const skillAliases = {
  react: ['react', 'reactjs', 'react.js'],
  javascript: ['javascript', 'js', 'ecmascript'],
  typescript: ['typescript', 'ts'],
  nodejs: ['node', 'nodejs', 'node.js'],
  generativeai: ['generative ai', 'gen ai', 'genai'],
  llm: ['llm', 'llms', 'large language model', 'large language models'],
  promptengineering: ['prompt engineering', 'prompt design'],
  rag: ['rag', 'retrieval augmented generation'],
  awsbedrock: ['aws bedrock', 'amazon bedrock', 'bedrock'],
  amazonq: ['amazon q', 'amazon q developer'],
  vectordatabases: ['vector databases', 'vector database', 'embeddings', 'vector search'],
  cloudcomputing: ['cloud', 'cloud computing', 'aws', 'azure', 'gcp'],
  leadership: ['leadership', 'mentoring', 'team leadership'],
  communication: ['communication', 'stakeholder communication', 'presentation'],
  sql: ['sql', 'postgresql', 'mysql', 'database'],
  python: ['python'],
  docker: ['docker', 'containers'],
  kubernetes: ['kubernetes', 'k8s'],
  github: ['github', 'git']
};

const levelForPoints = (points) => {
  if (points >= 35) return 'Advanced';
  if (points >= 25) return 'Intermediate';
  return 'Beginner';
};

const createSkill = (name, category, points, reason) => ({
  name,
  category,
  points,
  level: levelForPoints(points),
  reason
});

const trackCatalog = [
  {
    name: 'AI Solutions Engineer',
    categories: ['AI', 'Applied ML', 'Product Engineering'],
    keywords: ['ai', 'genai', 'llm', 'prompt', 'rag', 'bedrock', 'amazon q'],
    summary: 'Build verified proof that you can ship trustworthy AI features, not just experiment with them.',
    whyItMatters: 'This path emphasizes production-ready AI delivery, evaluation, and evidence-backed implementation.',
    skills: [
      createSkill('Generative AI', 'AI', 35, 'Core foundation for building intelligent products'),
      createSkill('LLM', 'AI', 30, 'Understand model behavior, prompting, and capability boundaries'),
      createSkill('Prompt Engineering', 'AI', 25, 'Improve output quality and reliability'),
      createSkill('RAG', 'AI', 35, 'Connect enterprise knowledge with model responses'),
      createSkill('LangChain', 'AI Tooling', 25, 'Orchestrate multi-step AI workflows'),
      createSkill('AWS Bedrock', 'Cloud AI', 30, 'Deploy managed foundation model solutions'),
      createSkill('Amazon Q', 'Developer Tools', 20, 'Use AI-assisted developer workflows'),
      createSkill('Evaluation Metrics', 'AI Quality', 20, 'Measure correctness, safety, and usefulness')
    ],
    stages: [
      { step: 1, title: 'Foundation', duration: 'Weeks 1-2', focus: 'Understand LLMs, prompting, and AI product constraints' },
      { step: 2, title: 'Build', duration: 'Weeks 3-5', focus: 'Create RAG pipelines, copilots, or internal assistants' },
      { step: 3, title: 'Verify', duration: 'Weeks 6-8', focus: 'Collect evidence, scores, and trust signals in your passport' }
    ]
  },
  {
    name: 'Full Stack Product Engineer',
    categories: ['Frontend', 'Backend', 'Delivery'],
    keywords: ['react', 'frontend', 'full stack', 'node', 'javascript', 'typescript'],
    summary: 'Show end-to-end delivery strength across UI, APIs, data, and deployment.',
    whyItMatters: 'Hiring teams want proof that you can own features from concept through production.',
    skills: [
      createSkill('React', 'Frontend', 30, 'Ship interactive user experiences'),
      createSkill('JavaScript', 'Frontend', 20, 'Core language fluency for web engineering'),
      createSkill('TypeScript', 'Frontend', 25, 'Improve reliability and maintainability'),
      createSkill('Node.js', 'Backend', 30, 'Build APIs and application services'),
      createSkill('SQL', 'Data', 20, 'Model and query application data'),
      createSkill('Docker', 'DevOps', 20, 'Package and run apps consistently'),
      createSkill('GitHub', 'Collaboration', 15, 'Track work, reviews, and proof of contribution'),
      createSkill('Cloud Computing', 'Infrastructure', 25, 'Deploy and monitor production services')
    ],
    stages: [
      { step: 1, title: 'Core Stack', duration: 'Weeks 1-2', focus: 'Strengthen frontend and backend fundamentals' },
      { step: 2, title: 'Delivery', duration: 'Weeks 3-5', focus: 'Build full features with persistence and deployment' },
      { step: 3, title: 'Proof', duration: 'Weeks 6-7', focus: 'Add projects, credentials, and outcome metrics' }
    ]
  },
  {
    name: 'Cloud Platform Engineer',
    categories: ['Infrastructure', 'Automation', 'Reliability'],
    keywords: ['cloud', 'aws', 'docker', 'kubernetes', 'devops', 'platform'],
    summary: 'Turn infrastructure knowledge into verified, portable engineering proof.',
    whyItMatters: 'Infrastructure roles reward operational maturity, automation, and measurable service reliability.',
    skills: [
      createSkill('Cloud Computing', 'Infrastructure', 30, 'Design deployable and scalable systems'),
      createSkill('AWS', 'Infrastructure', 25, 'Use managed cloud services effectively'),
      createSkill('Docker', 'Containers', 25, 'Package workloads for consistent delivery'),
      createSkill('Kubernetes', 'Containers', 35, 'Operate orchestrated workloads at scale'),
      createSkill('Node.js', 'Automation', 15, 'Support scripts and platform services'),
      createSkill('Python', 'Automation', 20, 'Automate ops and infrastructure tasks'),
      createSkill('SQL', 'Data', 10, 'Understand persistence and operational data'),
      createSkill('Communication', 'Collaboration', 10, 'Coordinate incident response and cross-team delivery')
    ],
    stages: [
      { step: 1, title: 'Infrastructure Basics', duration: 'Weeks 1-2', focus: 'Cloud, containers, and deployment fundamentals' },
      { step: 2, title: 'Automation', duration: 'Weeks 3-4', focus: 'Script workflows and standardize delivery' },
      { step: 3, title: 'Reliability Proof', duration: 'Weeks 5-6', focus: 'Document uptime, recovery, and delivery evidence' }
    ]
  },
  {
    name: 'Engineering Leader',
    categories: ['Leadership', 'Execution', 'Communication'],
    keywords: ['manager', 'lead', 'leadership', 'mentoring', 'team'],
    summary: 'Capture both technical depth and people leadership in one verified career record.',
    whyItMatters: 'Leadership roles need evidence of delivery, mentoring, and strategic clarity.',
    skills: [
      createSkill('Leadership', 'Leadership', 35, 'Guide direction, priorities, and execution'),
      createSkill('Communication', 'Leadership', 25, 'Align teams and stakeholders'),
      createSkill('Roadmap Planning', 'Execution', 25, 'Translate strategy into milestones'),
      createSkill('Agile Delivery', 'Execution', 20, 'Run healthy, iterative execution'),
      createSkill('Mentoring', 'People Growth', 25, 'Grow other engineers effectively'),
      createSkill('GitHub', 'Delivery Signals', 10, 'Review, coach, and coordinate work visibly')
    ],
    stages: [
      { step: 1, title: 'Lead Self', duration: 'Weeks 1-2', focus: 'Clarify priorities and communication rituals' },
      { step: 2, title: 'Lead Delivery', duration: 'Weeks 3-4', focus: 'Improve execution, predictability, and review quality' },
      { step: 3, title: 'Lead Others', duration: 'Weeks 5-6', focus: 'Mentor teammates and capture coaching evidence' }
    ]
  }
];

const getAliases = (value = '') => {
  const key = normalize(value);
  const aliases = skillAliases[key] || [];
  return [value, ...aliases].map(normalize).filter(Boolean);
};

const skillMatches = (source = '', target = '') => {
  const sourceAliases = getAliases(source);
  const targetAliases = getAliases(target);

  return sourceAliases.some((sourceAlias) =>
    targetAliases.some(
      (targetAlias) =>
        sourceAlias === targetAlias ||
        sourceAlias.includes(targetAlias) ||
        targetAlias.includes(sourceAlias)
    )
  );
};

const keywordScore = (track, targetJob) => {
  const normalizedJob = normalize(targetJob);
  if (!normalizedJob) return 0;

  return track.keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalize(keyword);
    return normalizedJob.includes(normalizedKeyword) ? score + 4 : score;
  }, 0);
};

const createSlidesForTrack = (track, totalPoints) => [
  {
    title: `${track.name} Roadmap`,
    body: `${track.summary} Focus first on ${track.skills.slice(0, 4).map((item) => item.name).join(', ')}.`,
    accent: 'from-sky-500 to-blue-500'
  },
  {
    title: 'Proof Strategy',
    body: 'Add projects, evidence, and verification so each skill becomes a trusted credential instead of just a claim.',
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Career Outcome',
    body: `Completing this track can unlock about ${totalPoints} verified points across your passport.`,
    accent: 'from-violet-500 to-fuchsia-500'
  }
];

const createTrackFromCatalog = (track, index) => {
  const totalPoints = track.skills.reduce((sum, item) => sum + item.points, 0);

  return {
    id: `${normalize(track.name)}-${index}`,
    jobName: track.name,
    categories: track.categories || [],
    recommendedSkills: track.skills || [],
    totalPoints,
    summary: track.summary,
    whyItMatters: track.whyItMatters,
    stages: track.stages || [],
    slides: createSlidesForTrack(track, totalPoints)
  };
};

const createTrackFromPersonalizedRoadmap = (personalizedRoadmap, targetJob) => {
  const stages = Array.isArray(personalizedRoadmap?.stages) ? personalizedRoadmap.stages : [];
  const recommendedSkills = stages.flatMap((stage) =>
    (Array.isArray(stage?.topics) ? stage.topics : []).map((topic) =>
      createSkill(topic, stage.title || 'AI Generated', 25, stage.project || `Planned for ${stage.title || 'roadmap'} stage`)
    )
  );

  const dedupedSkills = recommendedSkills.filter((skill, index, list) => {
    return index === list.findIndex((item) => skillMatches(item.name, skill.name));
  });

  const totalPoints = dedupedSkills.reduce((sum, item) => sum + item.points, 0);

  return {
    id: 'ai-personalized-track',
    jobName: targetJob || personalizedRoadmap?.targetJob || 'AI Personalized Roadmap',
    categories: ['AI Generated', 'Personalized'],
    recommendedSkills: dedupedSkills,
    totalPoints,
    summary: `Custom roadmap generated from the uploaded job description for ${targetJob || 'your next role'}.`,
    whyItMatters: 'This personalized track turns job requirements into a step-by-step, evidence-backed learning plan.',
    stages,
    slides: Array.isArray(personalizedRoadmap?.slides) ? personalizedRoadmap.slides : []
  };
};

export const buildJobTracks = (user) => {
  const targetJob = (user?.targetJob || '').trim();
  const personalizedRoadmap = user?.personalizedRoadmap;
  const rankedTracks = trackCatalog
    .map((track, index) => ({
      ...createTrackFromCatalog(track, index),
      matchScore: keywordScore(track, targetJob)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  const personalizedTrack =
    personalizedRoadmap && Array.isArray(personalizedRoadmap.stages) && personalizedRoadmap.stages.length
      ? createTrackFromPersonalizedRoadmap(personalizedRoadmap, targetJob)
      : null;

  const topTracks = rankedTracks.slice(0, 3).map(({ matchScore, ...track }) => track);

  return personalizedTrack ? [personalizedTrack, ...topTracks] : topTracks;
};

export const getTrackProgress = (skills = [], track) => {
  const recommendedSkills = Array.isArray(track?.recommendedSkills) ? track.recommendedSkills : [];

  const items = recommendedSkills.map((item) => {
    const matchedSkill = skills.find((skill) => skillMatches(skill.name, item.name));
    return {
      ...item,
      completed: Boolean(matchedSkill),
      matchedSkill
    };
  });

  const earnedPoints = items.reduce((sum, item) => sum + (item.completed ? item.points || 0 : 0), 0);
  const totalPoints = items.reduce((sum, item) => sum + (item.points || 0), 0);

  return {
    items,
    earnedPoints,
    totalPoints,
    remainingPoints: Math.max(totalPoints - earnedPoints, 0)
  };
};

export const filterSkillsForTrack = (skills = [], track) => {
  const recommendedSkills = Array.isArray(track?.recommendedSkills) ? track.recommendedSkills : [];
  const categories = Array.isArray(track?.categories) ? track.categories : [];

  if (!recommendedSkills.length && !categories.length) {
    return Array.isArray(skills) ? skills : [];
  }

  return (Array.isArray(skills) ? skills : []).filter((skill) => {
    const matchesRecommended = recommendedSkills.some((item) => skillMatches(skill.name, item.name));
    const matchesCategory = categories.some((category) => normalize(skill.category).includes(normalize(category)));
    return matchesRecommended || matchesCategory;
  });
};

export const filterCredentialsForTrack = (credentials = [], track) => {
  const recommendedSkills = Array.isArray(track?.recommendedSkills) ? track.recommendedSkills : [];
  if (!recommendedSkills.length) {
    return Array.isArray(credentials) ? credentials : [];
  }

  return (Array.isArray(credentials) ? credentials : []).filter((credential) => {
    const title = credential?.title || credential?.skillId?.skillName || '';
    return recommendedSkills.some((item) => skillMatches(title, item.name));
  });
};

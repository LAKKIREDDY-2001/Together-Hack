const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const keywordProfiles = [
  {
    keywords: ['frontend', 'ui', 'web', 'react'],
    categories: ['Frontend', 'Design'],
    skills: [
      { name: 'React', level: 'Advanced', category: 'Frontend', points: 35, reason: 'Core skill for building modern frontend applications.' },
      { name: 'JavaScript', level: 'Advanced', category: 'Frontend', points: 30, reason: 'Essential for writing strong frontend logic and interactivity.' },
      { name: 'UI Architecture', level: 'Intermediate', category: 'Frontend', points: 25, reason: 'Helps structure scalable and reusable interfaces.' }
    ]
  },
  {
    keywords: ['backend', 'api', 'server', 'node'],
    categories: ['Backend', 'DevOps'],
    skills: [
      { name: 'Node.js', level: 'Advanced', category: 'Backend', points: 35, reason: 'Important for APIs, services, and backend systems.' },
      { name: 'Database Design', level: 'Intermediate', category: 'Backend', points: 30, reason: 'Supports better data structure and performance.' },
      { name: 'API Security', level: 'Intermediate', category: 'Backend', points: 25, reason: 'Protects backend services and user data.' }
    ]
  },
  {
    keywords: ['devops', 'cloud', 'sre', 'platform'],
    categories: ['DevOps', 'Backend'],
    skills: [
      { name: 'CI/CD', level: 'Advanced', category: 'DevOps', points: 35, reason: 'Makes delivery faster and more reliable.' },
      { name: 'Cloud Infrastructure', level: 'Advanced', category: 'DevOps', points: 35, reason: 'Important for scaling and deployment confidence.' },
      { name: 'Monitoring', level: 'Intermediate', category: 'DevOps', points: 20, reason: 'Improves visibility into systems and incidents.' }
    ]
  },
  {
    keywords: ['data', 'analytics', 'analyst', 'bi'],
    categories: ['Data', 'General'],
    skills: [
      { name: 'SQL', level: 'Advanced', category: 'Data', points: 30, reason: 'Critical for querying and analyzing business data.' },
      { name: 'Analytics', level: 'Intermediate', category: 'Data', points: 25, reason: 'Helps turn data into useful decisions.' },
      { name: 'Documentation', level: 'Intermediate', category: 'General', points: 15, reason: 'Keeps findings clear and reusable.' }
    ]
  },
  {
    keywords: ['python', 'ml', 'ai', 'machinelearning'],
    categories: ['AI/ML', 'Data'],
    skills: [
      { name: 'Python', level: 'Advanced', category: 'AI/ML', points: 35, reason: 'Core language for automation, AI, and data workflows.' },
      { name: 'Data Pipelines', level: 'Intermediate', category: 'Data', points: 25, reason: 'Useful for moving and preparing data reliably.' },
      { name: 'Model Evaluation', level: 'Intermediate', category: 'AI/ML', points: 25, reason: 'Helps measure and improve AI system quality.' }
    ]
  },
  {
    keywords: ['manager', 'lead', 'leadership', 'product'],
    categories: ['Management', 'Data'],
    skills: [
      { name: 'Roadmapping', level: 'Advanced', category: 'Management', points: 30, reason: 'Helps define direction and align work.' },
      { name: 'Stakeholder Communication', level: 'Advanced', category: 'Management', points: 25, reason: 'Improves clarity and alignment across teams.' },
      { name: 'Analytics', level: 'Intermediate', category: 'Data', points: 20, reason: 'Supports prioritization with evidence.' }
    ]
  },
  {
    keywords: ['hr', 'recruit', 'talent', 'people'],
    categories: ['Management', 'General'],
    skills: [
      { name: 'Candidate Screening', level: 'Advanced', category: 'Management', points: 25, reason: 'Improves hiring consistency and speed.' },
      { name: 'Conflict Resolution', level: 'Advanced', category: 'Management', points: 30, reason: 'Builds healthier team outcomes.' },
      { name: 'Employee Engagement', level: 'Advanced', category: 'Management', points: 25, reason: 'Improves culture and retention.' }
    ]
  },
  {
    keywords: ['sales', 'account', 'businessdevelopment'],
    categories: ['Management', 'General'],
    skills: [
      { name: 'Negotiation', level: 'Advanced', category: 'Management', points: 35, reason: 'Improves deals, outcomes, and stakeholder trust.' },
      { name: 'CRM', level: 'Intermediate', category: 'General', points: 20, reason: 'Keeps customer information actionable.' },
      { name: 'Prospecting', level: 'Intermediate', category: 'General', points: 25, reason: 'Builds a stronger pipeline of opportunities.' }
    ]
  }
];

const departmentTracks = {
  engineering: [
    {
      name: 'Frontend Developer',
      categories: ['Frontend', 'Design'],
      skills: [
        { name: 'React', level: 'Advanced', category: 'Frontend', points: 35, reason: 'Build polished user interfaces and reusable components.' },
        { name: 'JavaScript', level: 'Advanced', category: 'Frontend', points: 30, reason: 'Strengthens debugging, performance, and architecture decisions.' },
        { name: 'UI Architecture', level: 'Intermediate', category: 'Frontend', points: 25, reason: 'Improves scalability and clarity across screens.' }
      ]
    },
    {
      name: 'Backend Developer',
      categories: ['Backend', 'DevOps'],
      skills: [
        { name: 'Node.js', level: 'Advanced', category: 'Backend', points: 35, reason: 'Important for APIs, services, and full-stack systems.' },
        { name: 'Database Design', level: 'Intermediate', category: 'Backend', points: 30, reason: 'Supports data quality, performance, and maintainability.' },
        { name: 'API Security', level: 'Intermediate', category: 'Backend', points: 25, reason: 'Helps protect services and production systems.' }
      ]
    },
    {
      name: 'DevOps Engineer',
      categories: ['DevOps', 'Backend'],
      skills: [
        { name: 'CI/CD', level: 'Advanced', category: 'DevOps', points: 35, reason: 'Makes releases faster, safer, and more reliable.' },
        { name: 'Cloud Infrastructure', level: 'Advanced', category: 'DevOps', points: 35, reason: 'Builds confidence in deployment and scaling.' },
        { name: 'Monitoring', level: 'Intermediate', category: 'DevOps', points: 20, reason: 'Gives visibility into incidents and system health.' }
      ]
    },
    {
      name: 'Data Engineer',
      categories: ['Data', 'Backend', 'AI/ML'],
      skills: [
        { name: 'Python', level: 'Advanced', category: 'AI/ML', points: 35, reason: 'Useful for automation, pipelines, and data work.' },
        { name: 'SQL', level: 'Advanced', category: 'Data', points: 25, reason: 'Critical for analytics, reporting, and data optimization.' },
        { name: 'ETL Pipelines', level: 'Intermediate', category: 'Data', points: 30, reason: 'Improves dependable movement of business data.' }
      ]
    }
  ],
  hr: [
    {
      name: 'HR Manager',
      categories: ['Management'],
      skills: [
        { name: 'Employee Engagement', level: 'Advanced', category: 'Management', points: 25, reason: 'Improves retention, morale, and culture.' },
        { name: 'Conflict Resolution', level: 'Advanced', category: 'Management', points: 30, reason: 'Builds healthier teams and trust.' },
        { name: 'Policy Communication', level: 'Intermediate', category: 'Management', points: 20, reason: 'Creates clarity across the organization.' }
      ]
    },
    {
      name: 'Talent Acquisition Specialist',
      categories: ['Management', 'General'],
      skills: [
        { name: 'Candidate Screening', level: 'Advanced', category: 'Management', points: 25, reason: 'Improves hiring consistency and quality.' },
        { name: 'Interview Design', level: 'Intermediate', category: 'Management', points: 20, reason: 'Creates better evaluation systems.' },
        { name: 'Employer Branding', level: 'Intermediate', category: 'General', points: 20, reason: 'Attracts stronger candidates and trust.' }
      ]
    }
  ],
  sales: [
    {
      name: 'Sales Executive',
      categories: ['Management', 'General'],
      skills: [
        { name: 'Negotiation', level: 'Advanced', category: 'Management', points: 35, reason: 'Improves win rate and deal quality.' },
        { name: 'CRM', level: 'Intermediate', category: 'General', points: 20, reason: 'Keeps customer data organized and actionable.' },
        { name: 'Prospecting', level: 'Intermediate', category: 'General', points: 25, reason: 'Builds a stronger opportunity pipeline.' }
      ]
    },
    {
      name: 'Account Manager',
      categories: ['Management', 'General', 'Data'],
      skills: [
        { name: 'Client Retention', level: 'Advanced', category: 'Management', points: 30, reason: 'Strengthens long-term revenue and trust.' },
        { name: 'Relationship Management', level: 'Advanced', category: 'Management', points: 25, reason: 'Creates better customer outcomes.' },
        { name: 'Analytics', level: 'Intermediate', category: 'Data', points: 20, reason: 'Supports smarter account decisions.' }
      ]
    }
  ]
};

const fallbackTracks = [
  {
    name: 'Product Manager',
    categories: ['Management', 'Data'],
    skills: [
      { name: 'Roadmapping', level: 'Advanced', category: 'Management', points: 30, reason: 'Helps define direction and ship outcomes clearly.' },
      { name: 'Stakeholder Communication', level: 'Advanced', category: 'Management', points: 25, reason: 'Builds alignment across teams.' },
      { name: 'Analytics', level: 'Intermediate', category: 'Data', points: 20, reason: 'Supports prioritization with evidence.' }
    ]
  },
  {
    name: 'Business Analyst',
    categories: ['Data', 'General'],
    skills: [
      { name: 'SQL', level: 'Intermediate', category: 'Data', points: 25, reason: 'Unlocks deeper analysis and reporting.' },
      { name: 'Requirements Gathering', level: 'Advanced', category: 'General', points: 20, reason: 'Improves clarity before execution.' },
      { name: 'Documentation', level: 'Intermediate', category: 'General', points: 15, reason: 'Creates clear reusable knowledge.' }
    ]
  }
];

const roleStages = {
  employee: [
    'Learn the foundations and tools used in this job.',
    'Practice with smaller tasks that build confidence and proof.',
    'Turn the learning into visible outcomes on real work.'
  ],
  manager: [
    'Understand how this job track creates business value.',
    'Apply the capabilities in team reviews, planning, and delivery.',
    'Scale the learning into repeatable coaching and team systems.'
  ]
};

const scoreTrackMatch = (track, targetJob) => {
  const normalizedJob = normalize(targetJob);
  if (!normalizedJob) return 0;

  let score = 0;

  if (normalizedJob.includes(normalize(track.name))) {
    score += 12;
  }

  track.skills.forEach((skill) => {
    const skillName = normalize(skill.name);
    if (normalizedJob.includes(skillName) || skillName.includes(normalizedJob)) {
      score += 4;
    }
  });

  track.categories.forEach((category) => {
    const categoryName = normalize(category);
    if (normalizedJob.includes(categoryName) || categoryName.includes(normalizedJob)) {
      score += 5;
    }
  });

  return score;
};

const getProfileFromTargetJob = (targetJob, departmentTracksForUser) => {
  const normalizedJob = normalize(targetJob);
  if (!normalizedJob) return null;

  let bestProfile = null;
  let bestScore = 0;

  keywordProfiles.forEach((profile) => {
    const score = profile.keywords.reduce((sum, keyword) => {
      const normalizedKeyword = normalize(keyword);
      return normalizedJob.includes(normalizedKeyword) ? sum + 5 : sum;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestProfile = profile;
    }
  });

  if (bestProfile) {
    return {
      name: targetJob,
      categories: bestProfile.categories,
      skills: bestProfile.skills
    };
  }

  const sortedDepartmentTracks = [...departmentTracksForUser]
    .map((track) => ({ track, score: scoreTrackMatch(track, targetJob) }))
    .sort((a, b) => b.score - a.score);

  if (sortedDepartmentTracks[0]?.score > 0) {
    return {
      name: targetJob,
      categories: sortedDepartmentTracks[0].track.categories,
      skills: sortedDepartmentTracks[0].track.skills
    };
  }

  return null;
};

export const buildJobTracks = (user) => {
  const department = (user?.department || '').toLowerCase();
  const role = (user?.role || 'employee').toLowerCase();
  const targetJob = (user?.targetJob || '').trim();
  const trackSource = departmentTracks[department] || fallbackTracks;

  const primaryTrack = targetJob ? getProfileFromTargetJob(targetJob, trackSource) : null;

  const candidates = [primaryTrack, ...trackSource.filter((track) => normalize(track.name) !== normalize(targetJob))].filter(Boolean).slice(0, 4);

  return candidates.map((track, index) => {
    const totalPoints = track.skills.reduce((sum, item) => sum + item.points, 0);

    return {
      id: `${normalize(track.name)}-${index}`,
      jobName: track.name,
      categories: track.categories,
      recommendedSkills: track.skills,
      totalPoints,
      summary: `${track.name} roadmap for a ${role} in ${department || 'your department'}.`,
      whyItMatters: `${track.name} can unlock stronger growth, clearer direction, and more visible proof of progress for your career path.`,
      stages: (roleStages[role] || roleStages.employee).map((focus, stageIndex) => ({
        step: stageIndex + 1,
        title: ['Foundation', 'Practice', 'Proof'][stageIndex],
        duration: `Week ${stageIndex * 2 + 1}-${stageIndex * 2 + 2}`,
        focus
      })),
      slides: [
        {
          title: `${track.name} Roadmap`,
          body: `This roadmap is built around your target job and role so you can learn the right skills with purpose.`,
          accent: 'from-sky-500 to-cyan-500'
        },
        {
          title: `Skills To Focus On`,
          body: `A strong ${track.name} should focus on ${track.skills.map((item) => item.name).join(', ')}.`,
          accent: 'from-emerald-500 to-teal-500'
        },
        {
          title: `What You Can Unlock`,
          body: `Completing this roadmap can earn about ${totalPoints} points and move your dashboard progress forward in a meaningful way.`,
          accent: 'from-violet-500 to-fuchsia-500'
        }
      ]
    };
  });
};

export const getTrackProgress = (skills, track) => {
  const items = track.recommendedSkills.map((recommendation) => {
    const matchedSkill = skills.find((skill) => {
      const skillName = normalize(skill.name || skill.skillName);
      const recommendationName = normalize(recommendation.name);
      return skillName === recommendationName || skillName.includes(recommendationName) || recommendationName.includes(skillName);
    });

    return {
      ...recommendation,
      completed: Boolean(matchedSkill),
      matchedSkill
    };
  });

  const earnedPoints = items.filter((item) => item.completed).reduce((sum, item) => sum + item.points, 0);
  const totalPoints = items.reduce((sum, item) => sum + item.points, 0);

  return {
    items,
    earnedPoints,
    totalPoints,
    remainingPoints: totalPoints - earnedPoints
  };
};

export const filterSkillsForTrack = (skills, track) =>
  skills.filter((skill) => {
    const skillName = normalize(skill.name || skill.skillName);
    const category = normalize(skill.category || '');

    const matchesSkill = track.recommendedSkills.some((recommendation) => {
      const recommendationName = normalize(recommendation.name);
      return skillName === recommendationName || skillName.includes(recommendationName) || recommendationName.includes(skillName);
    });

    const matchesCategory = track.categories.some((item) => normalize(item) === category);
    return matchesSkill || matchesCategory;
  });

export const filterCredentialsForTrack = (credentials, track) =>
  credentials.filter((credential) => {
    const title = normalize(credential.title || '');
    const issuer = normalize(credential.issuer || '');

    return track.recommendedSkills.some((recommendation) => {
      const recommendationName = normalize(recommendation.name);
      return title.includes(recommendationName) || issuer.includes(recommendationName);
    });
  });

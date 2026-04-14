const roleSkillMap = {
  employee: [
    {
      name: 'Communication',
      level: 'Intermediate',
      category: 'Management',
      points: 20,
      reason: 'Helps you present progress, collaborate, and document work clearly.'
    },
    {
      name: 'Python',
      level: 'Intermediate',
      category: 'AI/ML',
      points: 35,
      reason: 'Useful for automation, data tasks, scripting, and technical problem solving.'
    },
    {
      name: 'Project Ownership',
      level: 'Advanced',
      category: 'Management',
      points: 25,
      reason: 'Shows initiative and the ability to deliver meaningful outcomes.'
    },
    {
      name: 'Problem Solving',
      level: 'Advanced',
      category: 'General',
      points: 30,
      reason: 'A core capability that improves quality and delivery across any role.'
    }
  ],
  manager: [
    {
      name: 'Leadership',
      level: 'Advanced',
      category: 'Management',
      points: 40,
      reason: 'Builds stronger teams, direction, and accountability.'
    },
    {
      name: 'People Management',
      level: 'Advanced',
      category: 'Management',
      points: 35,
      reason: 'Helps with coaching, feedback, and team growth.'
    },
    {
      name: 'Strategic Planning',
      level: 'Expert',
      category: 'Management',
      points: 45,
      reason: 'Improves roadmap thinking, prioritization, and long-term execution.'
    },
    {
      name: 'Analytics',
      level: 'Intermediate',
      category: 'Data',
      points: 25,
      reason: 'Supports better decisions through metrics and trend analysis.'
    }
  ]
};

const departmentSkillMap = {
  engineering: [
    {
      name: 'React',
      level: 'Advanced',
      category: 'Frontend',
      points: 30,
      reason: 'Important for building modern user interfaces quickly and reliably.'
    },
    {
      name: 'Node.js',
      level: 'Intermediate',
      category: 'Backend',
      points: 30,
      reason: 'Useful for APIs, services, and full-stack development.'
    },
    {
      name: 'DevOps',
      level: 'Intermediate',
      category: 'DevOps',
      points: 35,
      reason: 'Improves deployment quality, automation, and production confidence.'
    }
  ],
  hr: [
    {
      name: 'Employee Engagement',
      level: 'Advanced',
      category: 'Management',
      points: 25,
      reason: 'Supports retention, culture, and healthy team dynamics.'
    },
    {
      name: 'Conflict Resolution',
      level: 'Advanced',
      category: 'Management',
      points: 30,
      reason: 'Helps create better workplace outcomes and trust.'
    }
  ],
  sales: [
    {
      name: 'Negotiation',
      level: 'Advanced',
      category: 'Management',
      points: 35,
      reason: 'Improves conversion, deals, and stakeholder alignment.'
    },
    {
      name: 'CRM',
      level: 'Intermediate',
      category: 'General',
      points: 20,
      reason: 'Keeps customer information organized and actionable.'
    }
  ]
};

const normalize = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

export const getRoleRecommendations = (user) => {
  const role = (user?.role || 'employee').toLowerCase();
  const department = (user?.department || '').toLowerCase();

  const roleSkills = roleSkillMap[role] || roleSkillMap.employee;
  const departmentSkills = departmentSkillMap[department] || [];

  const merged = [...roleSkills, ...departmentSkills];
  const unique = [];
  const seen = new Set();

  merged.forEach((item) => {
    const key = normalize(item.name);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  });

  return unique;
};

export const getRecommendationProgress = (skills, recommendations) => {
  const completed = recommendations.map((recommendation) => {
    const matchedSkill = skills.find((skill) => {
      const skillName = normalize(skill.name || skill.skillName);
      const recommendationName = normalize(recommendation.name);
      return (
        skillName === recommendationName ||
        skillName.includes(recommendationName) ||
        recommendationName.includes(skillName)
      );
    });

    return {
      ...recommendation,
      completed: Boolean(matchedSkill),
      matchedSkill
    };
  });

  const earnedPoints = completed
    .filter((item) => item.completed)
    .reduce((sum, item) => sum + item.points, 0);
  const totalPoints = completed.reduce((sum, item) => sum + item.points, 0);

  return {
    items: completed,
    earnedPoints,
    totalPoints,
    remainingPoints: totalPoints - earnedPoints
  };
};

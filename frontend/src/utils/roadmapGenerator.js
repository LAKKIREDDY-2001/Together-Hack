export const generateRoadmapSlides = (skills, targetJob) => [
  {
    title: `${targetJob} Skill Roadmap`,
    body: `Your personalized roadmap for ${targetJob} based on the job analysis. Focus on these key skills: ${skills.slice(0,5).join(', ')}.`,
    accent: 'from-sky-500 to-blue-500'
  },
  {
    title: 'Priority Skills (High Impact)',
    body: `Master these first for quick progress:\n\n${skills.slice(0,6).map(s => `• ${s}`).join('\n')}`,
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Learning Path',
    body: '1. Watch tutorials (YouTube/Udemy)\n2. Build small projects\n3. Add to portfolio\n4. Practice interviews\n5. Apply & iterate',
    accent: 'from-purple-500 to-violet-500'
  },
  {
    title: 'Time Allocation',
    body: `Daily: 1 hour practice\nWeekly: 1 project milestone\nMonthly: 1 new skill certification\n\nTotal time: ${skills.length * 20} hours to proficiency`,
    accent: 'from-orange-500 to-rose-500'
  },
  {
    title: 'Success Metrics',
    body: `• ${skills.length} skills added to passport\n• ${skills.length * 10} roadmap points\n• Portfolio projects\n• Mock interview confidence`,
    accent: 'from-indigo-500 to-purple-500'
  }
];

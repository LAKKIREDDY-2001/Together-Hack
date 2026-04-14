export const createAIRoadmap = (_user, track) => ({
  title: `${track.jobName} AI Roadmap`,
  summary: track.summary,
  whyItMatters: track.whyItMatters,
  points: track.totalPoints,
  stages: track.stages,
  slides: track.slides
});

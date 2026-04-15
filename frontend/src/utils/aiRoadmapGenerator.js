const skillLearningPaths = {
  'Generative AI': {
    topics: ['LLMs basics', 'Prompt engineering', 'RAG patterns', 'Fine-tuning', 'Evaluation metrics'],
    resources: ['OpenAI docs', 'HuggingFace course', 'Andrew Ng course', 'LangChain tutorials'],
    projects: ['Chatbot', 'Text summarizer', 'Image generator'],
    duration: '4 weeks'
  },
  'LLM': {
    topics: ['Transformer architecture', 'Tokenization', 'Inference optimization', 'Multi-modal models'],
    resources: ['"Attention is All You Need" paper', 'LLM University', 'HuggingFace transformers'],
    projects: ['Custom tokenizer', 'Model comparison benchmark'],
    duration: '3 weeks'
  },
  'Prompt Engineering': {
    topics: ['Zero-shot', 'Few-shot', 'Chain of Thought', 'Role-playing prompts', 'Temperature tuning'],
    resources: ['Prompt Engineering Guide', 'OpenAI cookbook', 'LearnPrompting.org'],
    projects: ['Prompt optimizer tool', 'Prompt A/B testing'],
    duration: '2 weeks'
  },
  'RAG': {
    topics: ['Retrieval methods', 'Vector embeddings', 'Chunking strategies', 'Re-ranking', 'Hybrid search'],
    resources: ['LangChain RAG tutorial', 'Pinecone/LangChain course', 'Weaviate docs'],
    projects: ['Document Q&A system', 'RAG pipeline with custom retriever'],
    duration: '3 weeks'
  },
  'Amazon Q': {
    topics: ['Amazon Q Developer', 'Code generation', 'Refactoring', 'Testing assistance', 'IDE integration'],
    resources: ['AWS docs', 'Amazon Q workshops', 'GitHub samples'],
    projects: ['Q-assisted app', 'Code review bot'],
    duration: '1 week'
  },
  'LangChain': {
    topics: ['Chains', 'Agents', 'Memory', 'Callbacks', 'LCEL'],
    resources: ['LangChain docs', 'DeepLearning.AI course', 'YouTube tutorials'],
    projects: ['Agentic workflow', 'Multi-tool agent'],
    duration: '3 weeks'
  },
  'AWS Bedrock': {
    topics: ['Model access', 'Custom models', 'Guardrails', 'Agent integrations', 'Provisioned throughput'],
    resources: ['AWS Bedrock docs', 'Bedrock workshops', 'GitHub examples'],
    projects: ['Bedrock chatbot', 'RAG with Bedrock'],
    duration: '2 weeks'
  },
  'Leadership': {
    topics: ['Vision setting', 'Team motivation', 'Decision making', 'Delegation', 'Feedback loops'],
    resources: ['High Output Management', 'Crucial Conversations', 'TED talks'],
    projects: ['Team project lead', 'Mentor junior'],
    duration: 'Ongoing'
  }
  // Add more skill plans
};

export const generateAIPersonalizedRoadmap = (skills, targetJob) => {
  const slides = [];
  const stages = [];
  let totalDuration = 0;

  skills.slice(0, 12).forEach((skill, index) => {
    const plan = skillLearningPaths[skill] || {
      topics: [`Master ${skill}`],
      resources: ['Online tutorials', 'Practice projects'],
      projects: [`${skill} project`],
      duration: '2 weeks'
    };

    stages.push({
      step: index + 1,
      title: skill,
      duration: plan.duration,
      topics: plan.topics.slice(0, 3),
      resources: plan.resources.slice(0, 2),
      project: plan.projects[0]
    });

    totalDuration += parseInt(plan.duration) || 2;
  });

  slides.push({
    title: `${targetJob} Roadmap`,
    body: `AI-generated personalized roadmap covering ${skills.length} skills. Total time: ${totalDuration} weeks.`,
    accent: 'from-sky-500 to-blue-500'
  });

  skills.slice(0, 8).forEach((skill, index) => {
    const plan = skillLearningPaths[skill] || skillLearningPaths['Generative AI'];
    slides.push({
      title: `${skill} Learning Plan`,
      body: `Topics: ${plan.topics.join(', ')}\nResources: ${plan.resources.join(', ')}\nProject: ${plan.projects[0]}`,
      accent: `from-emerald-${500 + index * 50} to-teal-${500 + index * 50}`
    });
  });

  slides.push({
    title: 'Next Steps',
    body: '1. Pick first skill\n2. Follow plan\n3. Build project\n4. Add to passport\n5. Repeat!',
    accent: 'from-purple-500 to-indigo-500'
  });

  return {
    slides,
    stages,
    totalDuration,
    targetSkills: skills,
    targetJob
  };
};

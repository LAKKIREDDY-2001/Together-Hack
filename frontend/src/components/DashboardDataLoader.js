import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { skillsApi, credentialsApi } from '../utils/api';
import { normalizeSkillForCard } from '../utils/skillDisplay';

const demoSkills = [
  normalizeSkillForCard({
    id: 1,
    name: 'React',
    level: 'Advanced',
    description: 'Built responsive UI flows and reusable component systems',
    verified: true,
    category: 'Frontend',
    score: 94,
    projects: 4,
    lastUpdated: new Date().toISOString()
  }),
  normalizeSkillForCard({
    id: 2,
    name: 'Node.js',
    level: 'Intermediate',
    description: 'Created backend APIs and service integrations',
    verified: true,
    category: 'Backend',
    score: 86,
    projects: 3,
    lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }),
  normalizeSkillForCard({
    id: 3,
    name: 'Generative AI',
    level: 'Intermediate',
    description: 'Prototyped AI copilots and roadmap generators',
    verified: false,
    category: 'AI',
    score: 82,
    projects: 2,
    lastUpdated: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  })
];

const demoCredentials = [
  {
    id: 'demo-credential-1',
    title: 'React Skill Verification',
    issuer: 'Skill Passport',
    date: new Date().toLocaleDateString(),
    createdAt: new Date().toISOString(),
    hash: 'demo-react-hash',
    link: '/skills/1'
  },
  {
    id: 'demo-credential-2',
    title: 'Node.js API Delivery Evidence',
    issuer: 'Skill Passport',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    hash: 'demo-node-hash',
    link: '/skills/2'
  }
];

const useDashboardData = () => {
  const [skills, setSkills] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login');
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const [skillsResult, credentialsResult] = await Promise.allSettled([
        skillsApi.getSkills(),
        credentialsApi.getCredentials()
      ]);

      const skillsLoaded = skillsResult.status === 'fulfilled';
      const credentialsLoaded = credentialsResult.status === 'fulfilled';

      if (skillsLoaded) {
        setSkills(
          skillsResult.value.data.map((skill) => normalizeSkillForCard(skill))
        );
      }

      if (credentialsLoaded) {
        setCredentials(
          credentialsResult.value.data.map((credential) => ({
            ...credential,
            id: credential._id,
            title: credential.evidenceTitle || credential.skillId?.skillName || 'Credential',
            issuer: credential.skillId?.level || 'Skill Passport',
            date: new Date(credential.createdAt).toLocaleDateString(),
            hash: credential.blockchainHash,
            link: `/skills/${credential.skillId?._id || credential.skillId}`
          }))
        );
      }

      if (!skillsLoaded && !credentialsLoaded) {
        toast.error('Backend unavailable. Showing demo passport data.');
        setSkills(demoSkills);
        setCredentials(demoCredentials);
      } else {
        if (!skillsLoaded) {
          toast.error('Could not load skills right now.');
        }
        if (!credentialsLoaded) {
          setCredentials([]);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  return { skills, credentials, loading };
};

export default useDashboardData;

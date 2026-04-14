import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { skillsApi, credentialsApi } from '../utils/api';
import { normalizeSkillForCard } from '../utils/skillDisplay';

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
      try {
        const [skillsRes, credsRes] = await Promise.all([
          skillsApi.getSkills(),
          credentialsApi.getCredentials()
        ]);
        setSkills(
          skillsRes.data.map((skill) => normalizeSkillForCard(skill))
        );
        setCredentials(
          credsRes.data.map((credential) => ({
            ...credential,
            id: credential._id,
            title: credential.evidenceTitle || credential.skillId?.skillName || 'Credential',
            issuer: credential.skillId?.level || 'Skill Passport',
            date: new Date(credential.createdAt).toLocaleDateString(),
            hash: credential.blockchainHash,
            link: `/skills/${credential.skillId?._id || credential.skillId}`
          }))
        );
      } catch (err) {
        toast.error('Failed to load data');
        setSkills([
          normalizeSkillForCard({ id: 1, name: 'React', level: 'Advanced', description: 'Mastery in React Hooks', verified: true, category: 'Frontend', score: 94, projects: 4 }),
          normalizeSkillForCard({ id: 2, name: 'Node.js', level: 'Intermediate', description: 'Backend development', verified: false, category: 'Backend', score: 79, projects: 2 }),
        ]);
      }
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  return { skills, credentials, loading };
};

export default useDashboardData;

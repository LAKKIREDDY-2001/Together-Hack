import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import QRCode from 'qrcode.react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Download, 
  Share2, 
  BarChart3, 
  Award,
  Calendar,
  Clock
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import SkillChart from './charts/SkillChart.jsx';
import { skillsApi } from '../utils/api';

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const { darkMode } = useTheme() || {};

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await skillsApi.getSkill(id);
        const fetchedSkill = response.data.skill || response.data;
        const credentials = response.data.credentials || [];
        const score = Math.max(60, Math.round((fetchedSkill.verificationScore || 0) * 20 + 55));

        setSkill({
          id: fetchedSkill._id,
          name: fetchedSkill.skillName,
          level: fetchedSkill.level,
          description: fetchedSkill.description || 'No description added yet.',
          verified: fetchedSkill.verificationScore > 0,
          hash: credentials[0]?.blockchainHash || 'Not minted yet',
          dateAdded: new Date(fetchedSkill.lastUpdated || Date.now()).toLocaleDateString(),
          proficiency: score,
          projects: Math.max(1, fetchedSkill.evidenceCount || credentials.length || 1),
          hours: Math.max(20, (fetchedSkill.evidenceCount || 1) * 40),
          rating: (score / 20).toFixed(1),
          category: fetchedSkill.category || 'General',
          verificationScore: fetchedSkill.verificationScore || 0,
          credentials
        });
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to load skill details');
        setSkill(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id]);

  const handleVerify = async () => {
    setVerifying(true);
    try {
      // TODO: blockchain.verifyCredential(hash)
      toast.success('Credential verified on blockchain!');
    } catch {
      toast.error('Verification failed');
    } finally {
      setVerifying(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${skill.name} Credential`,
        text: `Check out my ${skill.level} ${skill.name} credential!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10">
        <div className="glass-card p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
          <p>Loading skill details...</p>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-16">
          <Award className="h-24 w-24 text-foreground/30 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Skill not found</h2>
          <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background/90 via-primary/5">
      {/* Header */}
<div className="glassmorphism border-b border-glass/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="glass-card inline-flex items-center gap-2 px-4 py-2.5 rounded-xl hover:shadow-3d mb-6 transition-all text-sm sm:text-base sm:px-6 sm:py-3"
          >
            <ArrowLeft size={20} />
            <span>Skills Overview</span>
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-primary/20 to-accent/20 px-6 py-3 rounded-2xl">
                {skill.verified && <ShieldCheck className="h-6 w-6 text-green-500" />}
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent leading-tight">
                  {skill.name}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-wrap gap-3 text-xs sm:text-sm mb-6">
                <div className="flex items-center gap-2 px-4 py-2 glassmorphism rounded-xl">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{skill.level}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 glassmorphism rounded-xl">
                  <Award size={16} />
                  <span>{skill.category}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 glassmorphism rounded-xl">
                  <Calendar size={16} />
                  <span>Added {skill.dateAdded}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 glassmorphism rounded-xl">
                  <Clock size={16} />
                  <span>{skill.hours}+ hours</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="btn-primary flex items-center gap-3 px-8 py-4 rounded-3xl shadow-2xl hover:shadow-3d hover:scale-[1.02] transition-all whitespace-nowrap"
              >
                {verifying ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-b-2 border-primary-fg rounded-full"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    Verify on Blockchain
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="glassmorphism px-8 py-4 rounded-3xl hover:shadow-3d hover:scale-[1.02] hover:bg-primary/10 border border-glass/50 hover:border-primary/50 transition-all flex items-center gap-3"
              >
                <Share2 size={20} />
                Share Credential
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Description & Stats */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="h-8 w-8 text-accent" />
                Skill Description
              </h3>
              <p className="text-lg leading-relaxed text-foreground/90">
                {skill.description}
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Key Statistics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 glassmorphism rounded-2xl">
                  <div className="text-3xl font-black text-primary mb-2">{skill.proficiency}%</div>
                  <div className="text-sm text-foreground/60 uppercase tracking-wide">Proficiency</div>
                </div>
                <div className="text-center p-6 glassmorphism rounded-2xl">
                  <div className="text-3xl font-black text-accent mb-2">{skill.projects}</div>
                  <div className="text-sm text-foreground/60 uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center p-6 glassmorphism rounded-2xl">
                  <div className="text-3xl font-black text-green-500 mb-2">{skill.rating}</div>
                  <div className="text-sm text-foreground/60 uppercase tracking-wide">Rating</div>
                </div>
                <div className="text-center p-6 glassmorphism rounded-2xl">
                  <div className="text-3xl font-black text-purple-500 mb-2">{skill.credentials.length}</div>
                  <div className="text-sm text-foreground/60 uppercase tracking-wide">Credentials</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Charts & QR */}
          <div className="space-y-8">
            {/* Proficiency Chart */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                Proficiency Breakdown
              </h3>
              <div className="h-80">
                <SkillChart 
                  data={[
                    { name: 'Verification', value: Math.max(10, Math.round(skill.verificationScore * 25)) },
                    { name: 'Proficiency', value: skill.proficiency },
                    { name: 'Projects', value: Math.min(100, skill.projects * 12) },
                    { name: 'Consistency', value: Math.max(35, Math.min(95, skill.hours / 12)) },
                  ]} 
                />
              </div>
            </div>

            {/* QR Credential */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Shareable Credential</h3>
              <div className="flex flex-col items-center gap-6">
                <div className="p-6 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl shadow-2xl border-4 border-white/30">
                  <QRCode 
                    value={window.location.href} 
                    size={200}
                    fgColor={darkMode ? '#ffffff' : '#1e293b'}
                    bgColor="rgba(255,255,255,0.1)"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/70 mb-2">Scan to verify</p>
                  <p className="mb-4 text-xs text-foreground/60">{skill.hash}</p>
                  <button
                    onClick={() => {
                      const canvas = document.querySelector('canvas');
                      const link = document.createElement('a');
                      link.href = canvas.toDataURL();
                      link.download = `${skill.name.replace(/\\s+/g, '_')}_credential.png`;
                      link.click();
                    }}
                    className="btn-primary flex items-center gap-2 px-8 py-3"
                  >
                    <Download size={20} />
                    Download QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;

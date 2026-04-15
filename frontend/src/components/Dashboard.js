import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, TrendingUp, Award, Users, Search, ArrowUpDown, SlidersHorizontal, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';
import SkillCard3D from './ui/SkillCard3D';
import CredentialCard from './CredentialCard';
import AnalyticsChart from './AnalyticsChart';
import useDashboardData from './DashboardDataLoader';
import { getRoleRecommendations } from '../utils/roleRecommendations';
import { createAIRoadmap } from '../utils/aiRoadmap';
import RoadmapCoachModal from './RoadmapCoachModal';
import { skillsApi } from '../utils/api';
import { buildJobTracks, filterCredentialsForTrack, filterSkillsForTrack, getTrackProgress } from '../utils/jobTracks';
import { analyzeJobDescription, updateUserWithAnalysis } from '../utils/jobAnalyzer';
import { generateAIPersonalizedRoadmap } from '../utils/aiRoadmapGenerator';

const Dashboard = () => {
  const { skills, credentials, loading } = useDashboardData();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme() || {};
  const [activeTab, setActiveTab] = useState('skills');
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [showRoadmapCoach, setShowRoadmapCoach] = useState(false);
  const [localSkills, setLocalSkills] = useState([]);
  const [deletingSkillId, setDeletingSkillId] = useState(null);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
  // eslint-disable-next-line no-unused-vars
  const fallbackRecommendations = getRoleRecommendations(currentUser);
  const jobTracks = useMemo(() => {
    const tracks = buildJobTracks(currentUser);
    return Array.isArray(tracks) ? tracks : [];
  }, [currentUser]);

const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    try {
      const result = analyzeJobDescription(jobDescription);
      setAnalysis(result);
      toast.success(`AI analyzed ${result.skillCount} skills: ${result.targetSkills.slice(0,3).join(', ')}...`);
    } catch (error) {
      toast.error('Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

const handleUpdateRoadmap = () => {
    if (!analysis) return;
    const updatedUser = updateUserWithAnalysis(analysis);
    if (updatedUser) {
      const personalizedRoadmap = generateAIPersonalizedRoadmap(analysis.targetSkills, analysis.targetJob);
      updatedUser.personalizedRoadmap = personalizedRoadmap;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('AI roadmap with per-skill plans created! Click roadmap tabs below.');
      // Reload tracks
      window.location.reload();
    } else {
      toast.error('Could not update user data');
    }
  };
  const activeTrack = jobTracks.find((track) => track.id === activeTrackId) || jobTracks[0] || null;
  const recommendationProgress = activeTrack
    ? getTrackProgress(localSkills, activeTrack)
    : { items: [], earnedPoints: 0, totalPoints: 0, remainingPoints: 0 };
  const aiRoadmap = activeTrack ? createAIRoadmap(currentUser, activeTrack) : null;

  useEffect(() => {
    setLocalSkills(skills);
  }, [skills]);

  useEffect(() => {
    if (!currentUser?.id || (!currentUser?.targetSkill && !currentUser?.targetJob)) return;
    const key = `roadmap_intro_seen_${currentUser.id}`;
    if (localStorage.getItem(key) !== 'true') {
      setShowRoadmapCoach(true);
    }
  }, [currentUser?.id, currentUser?.targetSkill, currentUser?.targetJob]);

  useEffect(() => {
    if (!activeTrackId && jobTracks[0]) {
      setActiveTrackId(jobTracks[0].id);
    }
  }, [activeTrackId, jobTracks]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const closeRoadmapCoach = () => {
    if (currentUser?.id) {
      localStorage.setItem(`roadmap_intro_seen_${currentUser.id}`, 'true');
    }
    setShowRoadmapCoach(false);
  };

  const handleDeleteSkill = async (skill) => {
    const confirmed = window.confirm(`Remove "${skill.name}" from your skill passport?`);
    if (!confirmed) return;

    try {
      setDeletingSkillId(skill.id);
      await skillsApi.deleteSkill(skill.id);
      setLocalSkills((current) => current.filter((item) => item.id !== skill.id));
      toast.success('Skill removed successfully');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to remove skill');
    } finally {
      setDeletingSkillId(null);
    }
  };

  const scopedSkills = useMemo(
    () => (activeTrack ? filterSkillsForTrack(localSkills, activeTrack) : Array.isArray(localSkills) ? localSkills : []),
    [activeTrack, localSkills]
  );

  const scopedCredentials = useMemo(
    () => (activeTrack ? filterCredentialsForTrack(credentials, activeTrack) : Array.isArray(credentials) ? credentials : []),
    [activeTrack, credentials]
  );

  const filteredSkills = useMemo(() => {
    const result = scopedSkills
      .filter((skill) => {
        const matchesQuery =
          skill.name.toLowerCase().includes(query.toLowerCase()) ||
          skill.description.toLowerCase().includes(query.toLowerCase()) ||
          (skill.category || '').toLowerCase().includes(query.toLowerCase());
        const matchesLevel = levelFilter === 'All' || skill.level === levelFilter;
        return matchesQuery && matchesLevel;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return (b.score || 0) - (a.score || 0);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'level') return a.level.localeCompare(b.level);
        return new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0);
      });

    return result;
  }, [scopedSkills, query, levelFilter, sortBy]);

  const totalScore = localSkills.length
    ? Math.round(localSkills.reduce((sum, skill) => sum + (skill.score || 0), 0) / localSkills.length)
    : 0;
  const verifiedSkills = localSkills.filter((skill) => skill.verified).length;
  const newThisWeek = localSkills.filter((skill) => {
    if (!skill.lastUpdated) return false;
    return Date.now() - new Date(skill.lastUpdated).getTime() <= 7 * 24 * 60 * 60 * 1000;
  }).length;
  const passportStrength = localSkills.length ? Math.min(100, Math.round((verifiedSkills / localSkills.length) * 70 + totalScore * 0.3)) : 0;
  const careerMomentum = Math.min(100, Math.round((newThisWeek * 20) + ((recommendationProgress.earnedPoints / Math.max(recommendationProgress.totalPoints, 1)) * 40) + (scopedCredentials.length * 8)));
  const trustIndex = Math.min(100, Math.round((scopedCredentials.length * 18) + (verifiedSkills * 10)));
  const nextMilestone = recommendationProgress.items.find((item) => !item.completed);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {showRoadmapCoach && aiRoadmap ? <RoadmapCoachModal roadmap={aiRoadmap} onClose={closeRoadmapCoach} /> : null}
      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b border-glass/50 backdrop-blur-xl">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-4 lg:justify-start gap-4 w-full lg:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center lg:text-left">
              {currentUser?.name ? `${currentUser.name}'s Dashboard` : 'Dashboard'}
            </h1>
            <div className="flex bg-glass/30 rounded-xl sm:rounded-2xl p-1 w-full lg:w-auto mx-auto lg:mx-0 min-h-[44px]">
              {['skills', 'credentials', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 flex-1 text-xs sm:text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-primary text-primary-fg rounded-lg mx-0.5 shadow-xl'
                      : 'text-foreground/70 hover:text-foreground hover:bg-glass/50'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end space-x-2 lg:space-x-4 w-full lg:w-auto">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl sm:rounded-2xl glassmorphism hover:shadow-3d transition-all flex-shrink-0"
              title="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Link
              to="/add-skill"
              className="btn-primary flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap"
            >
              <Plus size={16} />
              Add Skill
            </Link>
            <button
              onClick={handleLogout}
              className="glassmorphism px-3 py-2 rounded-xl sm:rounded-2xl hover:bg-red-500/20 hover:text-red-400 transition-all flex items-center gap-1 text-sm"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="glass-card p-8 text-center group hover:shadow-3d transition-all">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">{localSkills.length} Skills</h3>
            <p className="text-foreground/60 text-sm">Total acquired</p>
          </div>
          <div className="glass-card p-8 text-center group hover:shadow-3d transition-all">
            <Award className="h-12 w-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">{verifiedSkills} Verified</h3>
            <p className="text-foreground/60 text-sm">Blockchain certified</p>
          </div>
          <div className="glass-card p-8 text-center group hover:shadow-3d transition-all">
            <Users className="h-12 w-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">{totalScore} Points</h3>
            <p className="text-foreground/60 text-sm">Skill score</p>
          </div>
          <div className="glass-card p-8 text-center group hover:shadow-3d transition-all">
            <TrendingUp className="h-12 w-12 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">+{newThisWeek} this week</h3>
            <p className="text-foreground/60 text-sm">New skills</p>
          </div>
        </div>

        <div className="mb-12 grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-3xl border border-glass/40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Passport Integrity</p>
                <h2 className="mt-2 text-2xl font-bold">Verified Credential Identity</h2>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-right backdrop-blur">
                <div className="text-xs text-slate-300">Trust Index</div>
                <div className="text-2xl font-bold text-emerald-300">{trustIndex}%</div>
              </div>
            </div>
            <p className="max-w-2xl text-sm text-slate-300">
              Your Skill Passport combines project proof, verification evidence, and roadmap progress into a tamper-resistant career story.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-300">Passport Strength</div>
                <div className="mt-2 text-3xl font-bold">{passportStrength}%</div>
                <div className="mt-1 text-sm text-slate-300">Based on verification and average skill score</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-300">Career Momentum</div>
                <div className="mt-2 text-3xl font-bold">{careerMomentum}%</div>
                <div className="mt-1 text-sm text-slate-300">Measures recent additions and roadmap completion</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-300">Evidence Vault</div>
                <div className="mt-2 text-3xl font-bold">{scopedCredentials.length}</div>
                <div className="mt-1 text-sm text-slate-300">Verified artifacts linked to this role path</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-white/80 to-primary/10 p-6 shadow-xl dark:from-slate-900/80 dark:to-primary/10">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Opportunity Snapshot</h2>
            </div>
            <div className="space-y-4 text-sm">
              <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-950/40">
                <div className="text-foreground/60">Active Track</div>
                <div className="mt-1 text-lg font-semibold">{activeTrack?.jobName || 'No track selected'}</div>
              </div>
              <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-950/40">
                <div className="text-foreground/60">Next Milestone</div>
                <div className="mt-1 font-semibold">{nextMilestone?.name || 'All recommended skills completed'}</div>
                <div className="mt-1 text-foreground/70">{nextMilestone?.reason || 'Your current track is fully covered by your passport.'}</div>
              </div>
              <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-950/40">
                <div className="text-foreground/60">Unique Edge</div>
                <div className="mt-1 text-foreground/80">
                  This dashboard doesn&apos;t just list skills. It maps proof, trust, and role readiness together so judges can see verified growth, not generic profile data.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'skills' && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
            {/* Job Analyzer */}
            <div className="mb-12 rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-white/60 to-primary/10 p-8">
              <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    AI Job Analyzer
                  </h3>
                  <p className="text-foreground/70 mb-4">Paste a job description and AI will analyze required skills & build your personal roadmap</p>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description here... (Senior React Developer required React 18+, Node.js, TypeScript, AWS..."
                    className="w-full h-32 p-4 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAnalyzeJob}
                    disabled={!jobDescription.trim() || analyzing}
                    className="btn-primary px-6 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Analyze Job
                      </>
                    )}
                  </button>
                  {analysis && (
                    <button
                      onClick={handleUpdateRoadmap}
                      className="glass-card px-6 py-3 font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      Update Roadmap
                    </button>
                  )}
                </div>
              </div>
              
              {analysis && (
                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-400/30">
                  <h4 className="font-bold text-lg mb-3">Analysis Results</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-1 block">Target Job</label>
                      <div className="font-bold text-xl bg-white/80 px-4 py-2 rounded-xl dark:bg-slate-900/80">
                        {analysis.targetJob}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-1 block">Detected Skills ({analysis.skillCount})</label>
                      <div className="flex flex-wrap gap-2">
                        {analysis.targetSkills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground/80">{analysis.analysis}</p>
                </div>
              )}
            </div>

            {/* AI Roadmap */}
            <div className="mb-8 rounded-3xl border border-glass/40 bg-gradient-to-r from-violet-500/10 via-sky-500/10 to-emerald-500/10 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary dark:bg-slate-900/60">
                    <Sparkles className="h-4 w-4" />
                    AI Roadmap
                  </div>
                  <h2 className="text-2xl font-bold">{aiRoadmap?.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-foreground/70">{aiRoadmap?.whyItMatters}</p>
                </div>
                <button
                  onClick={() => setShowRoadmapCoach(true)}
                  disabled={!aiRoadmap}
                  className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  View Motivation Slides
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {jobTracks.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveTrackId(track.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      activeTrack?.id === track.id
                        ? 'bg-primary text-primary-fg shadow-lg'
                        : 'bg-white/70 text-foreground/75 hover:bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    {track.jobName}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 rounded-3xl border border-glass/40 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-emerald-500/10 p-6">
              <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Role-Based Skill Roadmap</h2>
                  <p className="text-sm text-foreground/70">
                    Suggestions for {activeTrack?.jobName || currentUser?.role || 'employee'}
                    {currentUser?.department ? ` • ${currentUser.department}` : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-slate-900/60">
                    <div className="text-foreground/60">Earned</div>
                    <div className="text-xl font-bold text-emerald-500">{recommendationProgress.earnedPoints} pts</div>
                  </div>
                  <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-slate-900/60">
                    <div className="text-foreground/60">Remaining</div>
                    <div className="text-xl font-bold text-primary">{recommendationProgress.remainingPoints} pts</div>
                  </div>
                  <div className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-slate-900/60">
                    <div className="text-foreground/60">Completed</div>
                    <div className="text-xl font-bold">{recommendationProgress.items.filter((item) => item.completed).length}/{recommendationProgress.items.length}</div>
                  </div>
                </div>
              </div>
              <div className="mb-5 h-3 overflow-hidden rounded-full bg-white/60 dark:bg-slate-900/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all"
                  style={{
                    width: `${recommendationProgress.totalPoints ? (recommendationProgress.earnedPoints / recommendationProgress.totalPoints) * 100 : 0}%`
                  }}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recommendationProgress.items.map((item) => (
                  <div
                    key={item.name}
                    className={`rounded-2xl border p-4 transition-all ${
                      item.completed
                        ? 'border-emerald-400/40 bg-emerald-500/10'
                        : 'border-glass/40 bg-white/60 dark:bg-slate-900/50'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-foreground/60">{item.level} • {item.category}</div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.completed ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300' : 'bg-primary/15 text-primary'}`}>
                        {item.completed ? 'Completed' : `+${item.points} pts`}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70">{item.reason}</p>
                    {item.completed && item.matchedSkill ? (
                      <p className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                        Added as {item.matchedSkill.name}
                      </p>
                    ) : (
                      <p className="mt-3 text-xs font-medium text-primary">
                        Add this skill to earn {item.points} points
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Your Skills</h2>
              <Link to="/add-skill" className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm whitespace-nowrap">
                <Plus size={16} /> New Skill
              </Link>
            </div>
            <div className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
              <div className="glassmorphism flex items-center gap-3 rounded-2xl px-4 py-3">
                <Search className="h-4 w-4 text-foreground/50" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by skill, description, or category"
                  className="w-full bg-transparent outline-none placeholder:text-foreground/50"
                />
              </div>
              <div className="glassmorphism flex items-center gap-3 rounded-2xl px-4 py-3">
                <SlidersHorizontal className="h-4 w-4 text-foreground/50" />
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  <option>All</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
              <div className="glassmorphism flex items-center gap-3 rounded-2xl px-4 py-3">
                <ArrowUpDown className="h-4 w-4 text-foreground/50" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="latest">Latest</option>
                  <option value="score">Highest score</option>
                  <option value="name">Name</option>
                  <option value="level">Level</option>
                </select>
              </div>
            </div>
            {filteredSkills.length === 0 ? (
              <div className="text-center py-20">
                <Award className="h-24 w-24 text-foreground/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">{scopedSkills.length === 0 ? 'No skills for this job track yet' : 'No matching skills'}</h3>
                <p className="text-foreground/60 mb-6">
                  {scopedSkills.length === 0 ? 'Add skills that fit this target job and the roadmap will update here.' : 'Try changing the search or filter to see more results.'}
                </p>
                <Link to="/add-skill" className="btn-primary">
                  {scopedSkills.length === 0 ? 'Add Track Skill' : 'Add Another Skill'}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className={deletingSkillId === skill.id ? 'opacity-60 pointer-events-none' : ''}>
                    <SkillCard3D skill={skill} onDelete={handleDeleteSkill} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'credentials' && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">Your Credentials</h2>
            {scopedCredentials.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-glass/50 p-12 text-center text-foreground/60">
                Credentials for the selected job track will appear here once you verify matching skills.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scopedCredentials.map((credential, index) => (
                  <CredentialCard key={index} credential={credential} />
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Analytics</h2>
            <p className="mb-6 text-sm text-foreground/60">
              Showing analytics for {activeTrack?.jobName || 'your selected job track'}.
            </p>
            <AnalyticsChart skills={scopedSkills} credentials={scopedCredentials} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

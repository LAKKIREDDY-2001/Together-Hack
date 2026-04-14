import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Check, Upload, Star, Layers, Sparkles } from 'lucide-react';
import { skillsApi } from '../utils/api';
import SkillCard3D from './ui/SkillCard3D';
import { getRoleRecommendations } from '../utils/roleRecommendations';
import { normalizeSkillForCard } from '../utils/skillDisplay';

const AddSkill = () => {
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    description: '',
    category: 'General',
    proof: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const categories = ['General', 'Frontend', 'Backend', 'Data', 'DevOps', 'Design', 'Management', 'AI/ML'];
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
  const suggestions = getRoleRecommendations(currentUser).slice(0, 4);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proof: e.target.files[0] });
  };

  const applySuggestion = (suggestion) => {
    setFormData((current) => ({
      ...current,
      name: suggestion.name,
      level: suggestion.level,
      category: suggestion.category,
      description: current.description || suggestion.reason
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.level.trim() || !formData.description.trim()) {
      toast.error('Please fill all required fields (no whitespace only)');
      return;
    }
    console.log('Trimmed formData.level:', `"${formData.level}"`);
    console.log('Form data:', formData); // Debug log
    setLoading(true);
    try {
      const skillData = {
        name: formData.name,
        level: formData.level,
        description: formData.description,
        category: formData.category
      };
      await skillsApi.addSkill(skillData);
      toast.success('Skill added successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Add skill error:', err);
      toast.error('Failed to add skill: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  const previewSkill = normalizeSkillForCard({
    id: 'preview',
    name: formData.name || 'Python',
    level: formData.level || 'Intermediate',
    description: formData.description || 'Describe your experience, certifications, and projects to generate a polished skill card preview.',
    category: formData.category || 'General',
    verificationScore: 0,
    evidenceCount: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Back Header */}
        <button
          onClick={() => navigate('/dashboard')}
          className="glassmorphism mb-8 p-3 rounded-2xl hover:shadow-3d flex items-center gap-2 transition-all w-fit"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Form Card */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 p-4 rounded-3xl mb-6">
                <Star className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary bg-clip-text text-transparent">
                  Add New Skill
                </h1>
              </div>
              <p className="text-foreground/70 max-w-md mx-auto">
                Document your skills and generate blockchain credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
            {/* Skill Name */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                Skill Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-5 rounded-3xl border-2 border-glass/50 bg-glass/50 backdrop-blur-xl focus:border-primary focus:outline-none transition-all text-xl placeholder:text-foreground/40"
                placeholder="React JavaScript Development"
                required
              />
              <p className="mt-2 text-xs text-foreground/60">
                Keep it specific: for example `Python Automation`, `React Architecture`, or `AWS Deployment`.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Layers size={16} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-3xl border-2 border-glass/50 bg-glass/50 backdrop-blur-xl focus:border-primary focus:outline-none transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-semibold mb-3">Proficiency Level</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {levels.map((level) => (
                  <label key={level} className="relative">
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      className="sr-only peer"
                      checked={formData.level === level}
                      onChange={handleChange}
                    />
                    <div
                      className={`p-5 rounded-2xl text-center cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] border-2 group ${
                        formData.level === level
                          ? 'bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 border-blue-700 shadow-2xl'
                          : 'glassmorphism border-glass/30 hover:border-primary/30 bg-white/55 dark:bg-slate-900/45'
                      }`}
                    >
                      <div className={`font-bold text-lg ${formData.level === level ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {level}
                      </div>
                      <div className={`text-sm ${formData.level === level ? 'text-blue-100' : 'text-slate-600 dark:text-slate-300'}`}>
                        {level.toLowerCase()}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-3">Description & Proof</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-6 py-5 rounded-3xl border-2 border-glass/50 bg-glass/50 backdrop-blur-xl focus:border-primary focus:outline-none transition-all resize-vertical placeholder:text-foreground/40"
                placeholder="Describe your experience, projects completed, duration, etc..."
                required
              />
              <div className="mt-2 flex items-center justify-between text-xs text-foreground/60">
                <span>Show evidence, impact, and tools used.</span>
                <span>{formData.description.length}/240</span>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                Proof of Skill (PDF/Certificate/Image) 
                {formData.proof && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </label>
              <div className="glassmorphism p-8 rounded-3xl border-2 border-dashed border-glass/50 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden peer"
                  accept=".pdf,.jpg,.jpeg,.png"
                  id="proof-upload"
                />
                <label htmlFor="proof-upload" className="cursor-pointer flex flex-col items-center gap-4 w-full peer-disabled:cursor-not-allowed">
                  {formData.proof ? (
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 border-2 border-dashed border-glass/50 rounded-2xl flex items-center justify-center group-hover:border-primary/50 transition-all">
                      <Upload className="h-8 w-8 text-foreground/40 group-hover:text-primary transition-all" />
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-semibold">
                      {formData.proof ? `File selected: ${formData.proof.name}` : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-sm text-foreground/60">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 glassmorphism py-5 px-8 rounded-2xl font-semibold hover:shadow-3d transition-all border border-glass/50 hover:border-primary/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary py-5 px-8 font-semibold shadow-2xl disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Skill...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Add & Verify Skill
                  </>
                )}
              </button>
            </div>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Recommended For Your Role</h2>
              </div>
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.name}
                    type="button"
                    onClick={() => applySuggestion(suggestion)}
                    className="w-full rounded-2xl border border-glass/40 bg-white/50 p-4 text-left transition-all hover:shadow-lg dark:bg-slate-900/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{suggestion.name}</div>
                        <div className="text-xs text-foreground/60">{suggestion.level} • {suggestion.category}</div>
                      </div>
                      <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
                        +{suggestion.points} pts
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-bold">Live Preview</h2>
              </div>
              <p className="mb-6 text-sm text-foreground/70">
                See how your skill card will look on the dashboard before saving it.
              </p>
              <SkillCard3D skill={previewSkill} />
            </div>

            <div className="glass-card p-6">
              <h3 className="mb-4 text-lg font-bold">Helpful Tips</h3>
              <div className="space-y-3 text-sm text-foreground/70">
                <p>Use a clear skill title so recruiters and managers can scan it quickly.</p>
                <p>Add a short description focused on outcomes, tools, and real project work.</p>
                <p>Upload proof to make the card feel verified and more trustworthy.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;

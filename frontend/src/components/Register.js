import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../utils/api';
import { Mail, Lock, User, Eye, EyeOff, Briefcase, Building2, Target, Rocket } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    department: 'engineering',
    targetJob: '',
    targetSkill: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const { darkMode } = useTheme() || { darkMode: false };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await authApi.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-background">
      <div className="w-full max-w-md">
        <div className="glass-card text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
            Skill Passport
          </h1>
          <p className="text-foreground/70">Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="glass-card space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-glass/30 rounded-lg transition-all"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="engineering">Engineering</option>
                <option value="hr">HR</option>
                <option value="sales">Sales</option>
                <option value="operations">Operations</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Skill</label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <input
                type="text"
                name="targetSkill"
                value={formData.targetSkill}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Example: React, Leadership, Python"
                required
              />
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              We’ll use this to build your personalized learning roadmap.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Job</label>
            <div className="relative">
              <Rocket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <input
                type="text"
                name="targetJob"
                value={formData.targetJob}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-glass/50 bg-glass/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Example: Frontend Developer, HR Manager"
                required
              />
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              We’ll build clickable roadmap options around this job goal.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          
          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

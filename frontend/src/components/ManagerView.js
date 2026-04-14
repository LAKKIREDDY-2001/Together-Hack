import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Search, Filter as FilterIcon, Download } from 'lucide-react';

const ManagerView = () => {
  // Mock data
  const skillDistribution = [
    { name: 'JavaScript', users: 45, skills: 120 },
    { name: 'React', users: 38, skills: 95 },
    { name: 'Node.js', users: 25, skills: 68 },
    { name: 'Python', users: 22, skills: 54 },
    { name: 'Blockchain', users: 18, skills: 42 },
  ];

  const proficiencyData = [
    { name: 'Beginner', value: 35 },
    { name: 'Intermediate', value: 42 },
    { name: 'Advanced', value: 18 },
    { name: 'Expert', value: 5 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', skills: 12, verified: 8, score: 92 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', skills: 8, verified: 6, score: 87 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', skills: 15, verified: 12, score: 95 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (filter === 'verified') {
      return user.verified > 0;
    }

    if (filter === 'high-score') {
      return user.score >= 90;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 to-blue-50/50 dark:from-slate-900/80 dark:to-blue-900/50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="glass-card p-8 mb-12 rounded-3xl flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
              Manager Analytics
            </h1>
            <p className="text-2xl text-foreground/80 font-light">Platform-wide skill insights & user performance</p>
          </div>
          <div className="flex items-center gap-4">
              <div className="glassmorphism p-3 rounded-2xl flex items-center gap-3">
                <BarChart className="h-6 w-6 text-accent" />
                <div>
                  <div className="font-bold text-xl">2.3k</div>
                  <div className="text-xs text-foreground/70">Total Skills</div>
                </div>
              </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Distribution Bar */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <BarChart className="h-8 w-8 text-primary" />
                Top Skills Distribution
              </h3>
              <FilterIcon className="h-6 w-6 text-foreground/50 cursor-pointer hover:text-foreground transition-colors" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillDistribution}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} />
                <Tooltip />
                <Bar dataKey="skills" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Proficiency Pie */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <PieChart className="h-8 w-8 text-green-500" />
                Proficiency Levels
              </h3>
              <div className="text-right">
                <div className="font-bold text-3xl">23k</div>
                <div className="text-sm text-foreground/70">Total Users</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="45%" height={250}>
                <PieChart>
                  <Pie
                    data={proficiencyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {proficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="w-1/2 space-y-3">
                {proficiencyData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <div>
                      <div className="font-semibold">{entry.name}</div>
                      <div className="text-sm text-foreground/60">{entry.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-glass/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <BarChart className="h-8 w-8 text-primary" />
                Top Users
              </h3>
              <div className="flex items-center gap-3">
                <div className="glassmorphism px-4 py-2 rounded-2xl flex items-center gap-2 flex-1 lg:w-80">
                  <Search className="h-4 w-4 text-foreground/50" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent outline-none w-full text-foreground placeholder:text-foreground/50"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="glassmorphism px-4 py-2 rounded-2xl text-foreground"
                >
                  <option value="all">All Users</option>
                  <option value="verified">Verified Only</option>
                  <option value="high-score">High Score</option>
                </select>
                <button className="glassmorphism p-3 rounded-2xl hover:shadow-3d hover:scale-105 transition-all">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass/20">
                  <th className="text-left p-6 font-semibold text-foreground/80">User</th>
                  <th className="text-left p-6 font-semibold text-foreground/80">Total Skills</th>
                  <th className="text-left p-6 font-semibold text-foreground/80">Verified</th>
                  <th className="text-left p-6 font-semibold text-foreground/80">Score</th>
                  <th className="text-left p-6 font-semibold text-foreground/80">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-glass/10 hover:bg-glass/30 transition-all">
                    <td className="p-6 font-semibold flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-foreground/60">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-6">{user.skills}</td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-500 font-semibold">
                        {user.verified}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="w-20 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm px-3 py-1 rounded-full font-bold">
                        {user.score}%
                      </div>
                    </td>
                    <td className="p-6 text-foreground/70">2 days ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerView;

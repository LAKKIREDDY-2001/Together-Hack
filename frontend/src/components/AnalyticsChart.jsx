import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const AnalyticsChart = ({ skills = [], credentials = [] }) => {
  const now = new Date();
  const monthLabels = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleString('en-US', { month: 'short' }),
      skills: 0,
      verified: 0
    };
  });

  const lineData = monthLabels.map((entry) => {
    const skillsCount = skills.filter((skill) => {
      const skillDate = new Date(skill.lastUpdated || Date.now());
      return `${skillDate.getFullYear()}-${skillDate.getMonth()}` === entry.key;
    }).length;

    const verifiedCount = credentials.filter((credential) => {
      const credentialDate = new Date(credential.createdAt || Date.now());
      return `${credentialDate.getFullYear()}-${credentialDate.getMonth()}` === entry.key;
    }).length;

    return {
      month: entry.month,
      skills: skillsCount,
      verified: verifiedCount
    };
  });

  const barData = (skills.length ? skills : [
    { name: 'No skills yet', score: 0 }
  ])
    .slice()
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 6)
    .map((skill) => ({
      name: skill.name,
      proficiency: skill.score || 0
    }));

  return (
    <div className="w-full">
      <div className="glass-card p-3 sm:p-4 rounded-2xl mb-4">
        <h3 className="text-sm sm:text-base font-bold mb-3">Skill Growth</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={11} width={35} allowDecimals={false} />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: '10px' }} iconSize={10} />
              <Line type="monotone" dataKey="skills" stroke="#3b82f6" strokeWidth={2} name="Skills" dot={false} connectNulls={true} />
              <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={2} name="Verified" dot={false} connectNulls={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card p-3 sm:p-4 rounded-2xl">
        <h3 className="text-sm sm:text-base font-bold mb-3">Proficiency Breakdown</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={8} fontSize={11} angle={-45} textAnchor="end" height={60} />
              <YAxis axisLine={false} tickLine={false} tickMargin={8} fontSize={11} width={35} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="proficiency" fill="#3b82f6" radius={[3,3,0,0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;

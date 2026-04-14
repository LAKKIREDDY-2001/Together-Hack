import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Star, Shield, ExternalLink, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { normalizeSkillForCard } from '../../utils/skillDisplay';

const SkillCard3D = ({ skill, onDelete }) => {
  const cardSkill = normalizeSkillForCard(skill);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(x, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width - 0.5) * 10;
    const yPct = (mouseY / height - 0.5) * 10;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getLevelColor = (level) => {
    const colors = {
      Beginner: 'from-yellow-400 to-orange-500',
      'Intermediate': 'from-blue-400 to-indigo-500',
      Advanced: 'from-emerald-400 to-teal-500',
      Expert: 'from-purple-500 to-pink-500'
    };
    return colors[level] || 'from-gray-400 to-gray-500';
  };

  const score = cardSkill.score;
  const projects = cardSkill.projects;

  return (
    <motion.div
      className="group relative perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY,
          transformPerspective: 1000 
        }}
        className="relative w-full h-80 bg-gradient-to-br from-sky-50/95 via-white/90 to-cyan-100/80 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-sky-950/80 backdrop-blur-xl border border-sky-200/70 dark:border-slate-700/80 rounded-3xl shadow-2xl hover:shadow-3d hover:shadow-sky-400/20 transition-all duration-500 cursor-pointer overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shine effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shine 1s infinite'
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 h-full p-8 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/75 dark:bg-slate-900/65 rounded-2xl backdrop-blur-sm border border-sky-200 dark:border-slate-700 shadow-sm">
              {skill.verified && <Shield className="h-4 w-4 text-green-400 fill-green-400" />}
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md bg-gradient-to-r ${getLevelColor(cardSkill.level)}`}>
                {cardSkill.level}
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              {cardSkill.name}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3 mb-6">
              {cardSkill.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 dark:text-sky-200">
              <span className="rounded-full bg-sky-100 px-3 py-1 dark:bg-slate-800">{cardSkill.category}</span>
              <span className="rounded-full bg-white/80 px-3 py-1 dark:bg-slate-900/70">{score}% score</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-sky-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-lg">{(score / 20).toFixed(1)}</span>
              </div>
              <div className="text-xs font-medium text-sky-700 dark:text-sky-300">{projects} projects</div>
            </div>
            
            <Link
              to={`/skills/${cardSkill.id}`}
              className="group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 p-2 rounded-2xl bg-sky-100/80 hover:bg-sky-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 backdrop-blur-sm text-slate-800 dark:text-white"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Floating badges */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-2">
          {onDelete ? (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onDelete(cardSkill);
              }}
              className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg text-white hover:scale-105 transition-transform"
              title="Remove skill"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          ) : null}
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Star className="h-6 w-6 text-white fill-white" />
          </div>
        </div>

        {/* Glass overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default SkillCard3D;

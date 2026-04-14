import React from 'react';
import { ExternalLink } from 'lucide-react';

const CredentialCard = ({ credential }) => {
  const hashPreview = credential.hash ? `${credential.hash.slice(0, 8)}...` : 'Unavailable';

  return (
    <div className="glass-card p-6 rounded-2xl hover:shadow-3d transition-all group">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <div className="w-6 h-6 bg-white/20 rounded-sm"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{credential.title}</h3>
          <p className="text-sm text-foreground/70 mb-2">{credential.issuer}</p>
          <div className="flex items-center gap-2 text-xs bg-primary/10 px-3 py-1 rounded-full">
            <span className="font-semibold">{credential.date}</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1 text-xs text-foreground/60">
          <span>Hash: {hashPreview}</span>
        </div>
        <a href={credential.link || '#'} className="p-2 rounded-xl hover:bg-glass/50 transition-all">
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default CredentialCard;

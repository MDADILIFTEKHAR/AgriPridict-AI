import React, { useState } from 'react';
import { 
  Landmark, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  IndianRupee, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { GovtScheme, UserRole } from '../../types';

interface GovtSchemesModuleProps {
  schemes: GovtScheme[];
  currentRole: UserRole;
}

export const GovtSchemesModule: React.FC<GovtSchemesModuleProps> = ({ schemes, currentRole }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filtered = schemes.filter(s => {
    const roleMatches = s.eligibleRoles.includes(currentRole);
    const catMatches = filterCategory === 'All' || s.category === filterCategory;
    return roleMatches && catMatches;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">AI Government Schemes & Subsidy Matcher</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Recommends PM-KISAN, PMFBY crop insurance, PM-KUSUM solar subsidies & interest subvention loans.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2">
          {['All', 'Subsidy', 'Insurance', 'Equipment', 'Loan'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((scheme) => (
          <div 
            key={scheme.id}
            className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  {scheme.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">Deadline: {scheme.deadline}</span>
              </div>

              <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors mb-2">
                {scheme.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {scheme.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Subsidy Covered:</span>
                  <span className="font-bold text-emerald-400 text-sm">{scheme.subsidyPct}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Max Support:</span>
                  <span className="font-bold text-amber-300 text-sm">₹{scheme.maxAmountINR.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <a 
              href={scheme.applicationUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-md shadow-amber-950/40"
            >
              <span>Apply on Direct Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

    </div>
  );
};

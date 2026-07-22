import React from 'react';
import { 
  Users, 
  Landmark, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types';

interface RoleViewportsProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleViewports: React.FC<RoleViewportsProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Multi-Role Enterprise Portal Viewports</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Custom RBAC views tailored for FPOs, Agricultural Govt Officers, Banks, and Agribusiness Enterprises.
          </p>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          {(['farmer', 'fpo', 'govt', 'bank', 'agribusiness'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider text-[10px] transition-all ${
                currentRole === r
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Role View Content */}
      {currentRole === 'fpo' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Associated FPO Members</span>
              <span className="text-3xl font-black text-white">1,240 Farmers</span>
              <span className="text-xs text-emerald-400 font-semibold block mt-1">+85 New Registrations</span>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Aggregate Land Area</span>
              <span className="text-3xl font-black text-emerald-400">14,850 Acres</span>
              <span className="text-xs text-slate-400 block mt-1">Ludhiana & Patiala Clusters</span>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Bulk Input Savings</span>
              <span className="text-3xl font-black text-amber-400">₹18.4 Lakhs</span>
              <span className="text-xs text-slate-400 block mt-1">Group Fertilizer Purchase Discount</span>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'govt' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">State Crop Health Index</span>
              <span className="text-3xl font-black text-white">88.4 / 100</span>
              <span className="text-xs text-emerald-400 font-semibold block mt-1">Satellite Telemetry Verified</span>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">PM-KISAN Disbursement</span>
              <span className="text-3xl font-black text-emerald-400">94.2% Complete</span>
              <span className="text-xs text-slate-400 block mt-1">₹42.8 Crore Disbursed</span>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Regional Drought Risk</span>
              <span className="text-3xl font-black text-emerald-400">Low Risk</span>
              <span className="text-xs text-slate-400 block mt-1">Canal Water Levels Normal</span>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'bank' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Agri Credit Score Index</span>
              <span className="text-3xl font-black text-white">780 / 900</span>
              <span className="text-xs text-emerald-400 font-semibold block mt-1">Low Default Probability (1.2%)</span>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">PMFBY Insurance Coverage</span>
              <span className="text-3xl font-black text-emerald-400">₹2.45 Crore</span>
              <span className="text-xs text-slate-400 block mt-1">12.5 Acres Verified by Satellite</span>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Pre-Approved KCC Limit</span>
              <span className="text-3xl font-black text-amber-400">₹6.5 Lakhs</span>
              <span className="text-xs text-slate-400 block mt-1">Kisan Credit Card Fast-Track</span>
            </div>
          </div>
        </div>
      )}

      {(currentRole === 'farmer' || currentRole === 'agribusiness') && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800">
          <h3 className="text-base font-extrabold text-white mb-2">Individual Farmer & Enterprise Portal Viewport Active</h3>
          <p className="text-xs text-slate-400">
            Switch roles using the top navbar or the buttons above to preview specialized dashboards.
          </p>
        </div>
      )}

    </div>
  );
};

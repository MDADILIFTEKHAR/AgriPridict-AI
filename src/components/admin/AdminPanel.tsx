import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Database, 
  Cpu, 
  Server, 
  Sparkles, 
  Lock, 
  CheckCircle2 
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">System Health & AI Telemetry Admin Control</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time monitoring of Gemini LLM API latency, Redis cache hit ratio, database pool status, and security audit logs.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>System Uptime: 99.98%</span>
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-3xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>AI Model Latency</span>
          </div>
          <span className="text-2xl font-black text-white">124 ms</span>
          <span className="text-[11px] text-emerald-400 block mt-1">Gemini 2.0 Vision API</span>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Database className="w-4 h-4 text-blue-400" />
            <span>Redis Cache Hit Rate</span>
          </div>
          <span className="text-2xl font-black text-white">96.8%</span>
          <span className="text-[11px] text-blue-400 block mt-1">Upstash Redis Cluster</span>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Server className="w-4 h-4 text-purple-400" />
            <span>FastAPI Workers</span>
          </div>
          <span className="text-2xl font-black text-white">8 Active</span>
          <span className="text-[11px] text-purple-400 block mt-1">Railway Cloud Deployment</span>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Security Status</span>
          </div>
          <span className="text-2xl font-black text-emerald-400">Strict</span>
          <span className="text-[11px] text-slate-400 block mt-1">JWT + RBAC + Rate Limited</span>
        </div>

      </div>

      {/* API Audit Log Table */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800">
        <h3 className="text-base font-extrabold text-white mb-4">Recent System API Audit Logs</h3>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <span className="text-emerald-400">[2026-07-21 21:50:20] POST /api/v1/disease/detect - 200 OK (118ms)</span>
            <span className="text-slate-500">IP: 103.24.12.5</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <span className="text-blue-400">[2026-07-21 21:49:15] GET /api/v1/weather/open-meteo - 200 OK (84ms)</span>
            <span className="text-slate-500">IP: 103.24.12.5</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <span className="text-purple-400">[2026-07-21 21:45:02] POST /api/v1/ai/chat-multilingual - 200 OK (210ms)</span>
            <span className="text-slate-500">IP: 49.207.18.9</span>
          </div>
        </div>
      </div>

    </div>
  );
};

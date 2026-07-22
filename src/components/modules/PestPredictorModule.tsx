import React from 'react';
import { 
  Bug, 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Thermometer, 
  CloudRain,
  Info
} from 'lucide-react';
import { PestAlert } from '../../types';

interface PestPredictorModuleProps {
  pestAlerts: PestAlert[];
}

export const PestPredictorModule: React.FC<PestPredictorModuleProps> = ({ pestAlerts }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Bug className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl font-extrabold text-white">Predictive Pest Outbreak Early Radar</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Combines weather humidity, crop stage vector, and seasonal spore telemetry to predict attacks before they happen.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 font-mono text-xs border border-rose-500/30 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>XGBoost Predictive Engine Active</span>
        </span>
      </div>

      {/* Grid of Active Pest Threat Vectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pestAlerts.map((alert) => {
          const isHighRisk = alert.riskScore > 70;
          return (
            <div 
              key={alert.id}
              className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between space-y-4 transition-all ${
                isHighRisk 
                  ? 'border-rose-500/40 bg-rose-950/20 shadow-xl shadow-rose-950/20' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Crop: {alert.crop}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-black rounded-full ${
                    isHighRisk ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    Risk: {alert.riskScore}%
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white mb-1">{alert.pestName}</h3>
                <div className="text-xs text-slate-400 mb-4">Stage: {alert.affectedStage}</div>

                {/* Risk Bar */}
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
                  <div 
                    className={`h-full rounded-full ${isHighRisk ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${alert.riskScore}%` }}
                  />
                </div>

                {/* Weather Vector */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1 mb-3">
                  <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                    <span>Weather Vector Driver:</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{alert.weatherFactor}</p>
                </div>

                {/* Recommended Action */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1">
                  <span className="font-bold text-emerald-300 block">🛡️ Recommended Spray:</span>
                  <span className="text-white font-semibold block">{alert.recommendedPesticide}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                <strong>Preventative Measure:</strong> {alert.preventativeMeasures}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

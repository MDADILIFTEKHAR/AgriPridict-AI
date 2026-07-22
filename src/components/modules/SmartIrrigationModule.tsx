import React from 'react';
import { 
  Droplets, 
  CloudRain, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  HelpCircle 
} from 'lucide-react';

export const SmartIrrigationModule: React.FC = () => {
  const weeklySchedule = [
    { day: 'Monday', duration: '45 mins', liters: 1200, status: 'Completed' },
    { day: 'Tuesday', duration: '0 mins', liters: 0, status: 'Paused (Rain Expected)' },
    { day: 'Wednesday', duration: '30 mins', liters: 800, status: 'Scheduled' },
    { day: 'Thursday', duration: '0 mins', liters: 0, status: 'Paused (Rain Expected)' },
    { day: 'Friday', duration: '40 mins', liters: 1100, status: 'Scheduled' },
    { day: 'Saturday', duration: '30 mins', liters: 800, status: 'Scheduled' },
    { day: 'Sunday', duration: '0 mins', liters: 0, status: 'Soil Moisture High' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="w-6 h-6 text-teal-400" />
            <h2 className="text-xl font-extrabold text-white">Smart Evapotranspiration Irrigation Advisor</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculates daily crop water stress (ETc) using solar radiation, humidity, and root depth telemetry.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 font-mono text-xs border border-teal-500/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>35% Water Savings Active</span>
        </span>
      </div>

      {/* Water Stats & Recommendation Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Today's Water Quota</span>
            <span className="text-3xl font-black text-white">0 Liters</span>
            <span className="text-xs text-emerald-400 font-semibold block mt-1">✓ Rain Forecast (14.2mm) Meets Requirement</span>
          </div>
          <div className="mt-4 p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
            Water pump auto-cutoff triggered for 48 hours.
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Optimal Pump Window</span>
            <span className="text-2xl font-black text-amber-400">06:00 AM – 08:00 AM</span>
            <span className="text-xs text-slate-400 block mt-1">Minimizes evaporation loss by 28%</span>
          </div>
          <div className="mt-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Method: Drip Irrigation System (88% Efficiency)
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Weekly Water Saved</span>
            <span className="text-3xl font-black text-teal-400">4,200 Liters</span>
            <span className="text-xs text-slate-400 block mt-1">Equivalent to ₹1,450 electricity savings</span>
          </div>
          <div className="mt-4 p-3 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-300">
            Solar Pump Battery Level: 94%
          </div>
        </div>

      </div>

      {/* Weekly Schedule Table */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800">
        <h3 className="text-base font-extrabold text-white mb-4">7-Day Irrigation Schedule & Water Quota</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Day</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Water Volume</th>
                <th className="py-3 px-4">AI Advisory Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {weeklySchedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.day}</td>
                  <td className="py-3 px-4 font-mono">{row.duration}</td>
                  <td className="py-3 px-4 font-mono text-teal-400">{row.liters} L</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      row.status.includes('Paused') 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

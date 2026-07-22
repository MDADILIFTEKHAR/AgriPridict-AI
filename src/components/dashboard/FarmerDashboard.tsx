import React from 'react';
import { 
  Sprout, 
  CloudSun, 
  Bug, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Droplets, 
  Sparkles,
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Farm, WeatherData, PestAlert, MarketCommodity, IndianLanguage, UserRole } from '../../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface FarmerDashboardProps {
  farms: Farm[];
  weather: WeatherData;
  pestAlerts: PestAlert[];
  marketCommodities: MarketCommodity[];
  currentLang: IndianLanguage;
  currentRole: UserRole;
  onNavigateTab: (tab: any) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  farms,
  weather,
  pestAlerts,
  marketCommodities,
  currentLang,
  currentRole,
  onNavigateTab,
}) => {
  const primaryFarm = farms[0] || { healthScore: 92, name: 'Greenfield Farm', cropType: 'Wheat' };

  // Sample yield progression chart data
  const healthHistory = [
    { week: 'Wk 1', health: 85, soilMoisture: 60 },
    { week: 'Wk 2', health: 88, soilMoisture: 65 },
    { week: 'Wk 3', health: 86, soilMoisture: 58 },
    { week: 'Wk 4', health: 91, soilMoisture: 72 },
    { week: 'Wk 5', health: 94, soilMoisture: 68 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Banner: Farm Overview & Quick AI Score */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-emerald-500/30 p-6 lg:p-8 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AgriPredict AI Health Monitor — Active</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="shimmer-text">Sardar Gurdeep Singh</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              AI analysis confirms high vitality for <span className="font-semibold text-emerald-400">{primaryFarm.name}</span>. Next 48h weather radar indicates rain; irrigation paused to save 1,400L water.
            </p>
          </div>

          {/* Health Index Ring Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-emerald-500/30 bg-slate-900/60 shadow-xl">
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray={`${primaryFarm.healthScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-white">{primaryFarm.healthScore}</span>
                <span className="text-[9px] font-bold text-emerald-400 uppercase">INDEX</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-white">Optimal Condition</div>
              <div className="text-[11px] text-slate-400">Soil Moisture: 68% (Ideal)</div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                No Critical Disease Spores
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Weather Summary Card */}
        <div 
          onClick={() => onNavigateTab('weather')}
          className="glass-card rounded-2xl p-5 border border-slate-800/80 cursor-pointer hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Weather</span>
            <CloudSun className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{weather.temp}°C</span>
            <span className="text-xs text-slate-400">{weather.condition}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2.5">
            <span>Rainfall: <strong className="text-slate-200">{weather.rainfallMm} mm</strong></span>
            <span>Humidity: <strong className="text-slate-200">{weather.humidity}%</strong></span>
          </div>
        </div>

        {/* Disease Risk Card */}
        <div 
          onClick={() => onNavigateTab('disease')}
          className="glass-card rounded-2xl p-5 border border-slate-800/80 cursor-pointer hover:border-amber-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Disease Radar</span>
            <AlertTriangle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">Moderate</span>
            <span className="text-xs text-slate-400">Yellow Rust Spores</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2.5">
            <span>Scanner: <strong className="text-emerald-400">AI Active</strong></span>
            <span className="text-amber-400 font-semibold">1 Action Needed</span>
          </div>
        </div>

        {/* Market Price Card */}
        <div 
          onClick={() => onNavigateTab('market')}
          className="glass-card rounded-2xl p-5 border border-slate-800/80 cursor-pointer hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wheat Mandi Price</span>
            <TrendingUp className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">₹2,480</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center">
              +₹70 <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2.5">
            <span>Forecast (7d): <strong className="text-emerald-300">₹2,560</strong></span>
            <span className="text-xs text-emerald-400 font-medium">Best Sell Window</span>
          </div>
        </div>

        {/* Yield & Financial Card */}
        <div 
          onClick={() => onNavigateTab('yield')}
          className="glass-card rounded-2xl p-5 border border-slate-800/80 cursor-pointer hover:border-blue-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Est. Production</span>
            <Sprout className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">28.5 Tons</span>
            <span className="text-xs text-slate-400">Wheat (12.5 Ac)</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2.5">
            <span>Net Profit: <strong className="text-emerald-400">₹4,82,000</strong></span>
            <span className="text-emerald-400 font-semibold">Low Risk</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Chart & AI Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Farm Health Trend Chart */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-white">Farm Health Telemetry & Soil Dynamics</h3>
              <p className="text-xs text-slate-400">5-Week historical spectral score & root moisture</p>
            </div>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-slate-800 text-emerald-300 border border-slate-700">
              Live Satellite Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthHistory}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[40, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="health" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" name="Health Score" />
                <Area type="monotone" dataKey="soilMoisture" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMoisture)" name="Soil Moisture %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Action Recommendations */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-extrabold text-white">AI Recommendations</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-amber-200">Yellow Rust Alert (Wheat)</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Spray Propiconazole 25% EC (1 ml/L) within 3 days before expected humidity rise.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                <Droplets className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-200">Irrigation Recommendation</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Skip irrigation today. Expected 14mm rainfall will meet field moisture quota.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-blue-200">Market Price Strategy</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Hold 40% stock till Feb 15. Prices expected to cross ₹2,600/quintal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigateTab('chatbot')}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald-950/50"
          >
            <span>Ask AI Assistant for Custom Plan</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

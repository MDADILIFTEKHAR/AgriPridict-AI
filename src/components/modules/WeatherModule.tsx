import React, { useState } from 'react';
import { 
  CloudSun, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Sun, 
  AlertTriangle, 
  RefreshCw, 
  Droplets, 
  Sparkles,
  ShieldAlert,
  Search
} from 'lucide-react';
import { WeatherData } from '../../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface WeatherModuleProps {
  weather: WeatherData;
  onRefreshWeather: (location: string) => void;
}

export const WeatherModule: React.FC<WeatherModuleProps> = ({ weather, onRefreshWeather }) => {
  const [searchLocation, setSearchLocation] = useState(weather.city);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFetchOpenMeteo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRefreshing(true);
    setTimeout(() => {
      onRefreshWeather(searchLocation);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Open-Meteo Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white">Weather Intelligence & Micro-Climate Telemetry</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Open-Meteo API & NASA POWER satellite weather model for hyper-local rain, heatwave & drought risks.
          </p>
        </div>

        <form onSubmit={handleFetchOpenMeteo} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Enter District / City..."
              className="w-full glass-input text-xs rounded-xl pl-9 pr-3 py-2"
            />
          </div>
          <button 
            type="submit"
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-950/40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Open-Meteo</span>
          </button>
        </form>
      </div>

      {/* Main Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Weather Spotlight Card */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 lg:p-8 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live Radar Station</span>
              <h3 className="text-2xl font-black text-white">{weather.city}</h3>
              <span className="text-xs text-slate-400 font-mono">Lat: 30.90 / Lng: 75.85</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl glass-card border border-amber-500/30">
              <CloudSun className="w-10 h-10 text-amber-400" />
              <div>
                <span className="text-3xl font-black text-white">{weather.temp}°C</span>
                <span className="text-[11px] text-slate-400 block">{weather.condition}</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <CloudRain className="w-4 h-4 text-blue-400" />
                <span>Rainfall</span>
              </div>
              <span className="text-lg font-black text-white">{weather.rainfallMm} mm</span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Droplets className="w-4 h-4 text-teal-400" />
                <span>Humidity</span>
              </div>
              <span className="text-lg font-black text-white">{weather.humidity}%</span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span>Wind Speed</span>
              </div>
              <span className="text-lg font-black text-white">{weather.windSpeed} km/h</span>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>UV Index</span>
              </div>
              <span className="text-lg font-black text-white">{weather.uvIndex} / 10</span>
            </div>
          </div>

          {/* Weekly Precipitation Forecast Chart */}
          <div className="mt-4">
            <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">7-Day Precipitation Outlook (mm)</h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weather.weeklyForecast}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="rainMm" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Rainfall (mm)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Weather Risk & Advisory Panel */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">AI Climate Advisory</h3>
            </div>

            {/* Drought Risk Indicator */}
            <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Drought Index</span>
                <span className="font-bold text-emerald-400">Low Risk ({weather.droughtRiskPct}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
                  style={{ width: `${weather.droughtRiskPct}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Ground moisture reserve is sufficient for next 10 days.
              </p>
            </div>

            {/* Heatwave & Storm Alerts */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                <CloudRain className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-blue-200">Thunderstorm Advisory</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Heavy shower expected Thursday (25.4mm). Drain low-lying field patches.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                <Sun className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-200">Solar UV Protection</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    UV Index at 7.8. Schedule field spraying before 10 AM or after 4 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 font-mono">
            🛰️ NASA POWER Telemetry Synced
          </div>
        </div>

      </div>

    </div>
  );
};

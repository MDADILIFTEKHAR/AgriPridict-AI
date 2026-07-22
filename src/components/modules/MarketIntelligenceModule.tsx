import React, { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle2,
  Search
} from 'lucide-react';
import { MarketCommodity } from '../../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface MarketIntelligenceModuleProps {
  commodities: MarketCommodity[];
}

export const MarketIntelligenceModule: React.FC<MarketIntelligenceModuleProps> = ({ commodities }) => {
  const [selectedCommodity, setSelectedCommodity] = useState<MarketCommodity>(commodities[0]);

  // Sample price forecast trend data
  const priceTrendData = [
    { date: 'Jan 1', current: 2380, forecast: 2380 },
    { date: 'Jan 10', current: 2410, forecast: 2420 },
    { date: 'Jan 20', current: 2450, forecast: 2460 },
    { date: 'Today', current: selectedCommodity.currentPricePerQuintal, forecast: selectedCommodity.currentPricePerQuintal },
    { date: '+7 Days', forecast: selectedCommodity.forecast7Days },
    { date: '+15 Days', forecast: selectedCommodity.forecast7Days + 50 },
    { date: '+30 Days', forecast: selectedCommodity.forecast30Days },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Agmarknet Market Intelligence & Price Forecasting</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time APMC mandi prices, 30-day Prophet price prediction engine, and best sell window advisor.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agmarknet API Synced</span>
        </span>
      </div>

      {/* Main Grid: Commodity Selector, Chart, Nearby Mandis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Commodity Mandi List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tracked Commodities</h3>

          <div className="space-y-3">
            {commodities.map((item) => {
              const isRising = item.currentPricePerQuintal > item.previousPrice;
              const isSelected = selectedCommodity.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCommodity(item)}
                  className={`p-4 rounded-2xl glass-card border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-950/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-extrabold text-white">{item.crop}</span>
                    <span className="text-xs font-mono text-slate-400">{item.marketName}</span>
                  </div>
                  
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-black text-white">₹{item.currentPricePerQuintal} <span className="text-xs text-slate-400 font-normal">/ Qtl</span></span>
                    <span className={`text-xs font-bold flex items-center gap-0.5 ${isRising ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isRising ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {isRising ? '+' : ''}₹{item.currentPricePerQuintal - item.previousPrice}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Columns: Price Trend Chart & Sell Advisor */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Price Forecast Line Chart */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">Prophet AI Price Trend</span>
                <h3 className="text-lg font-black text-white">{selectedCommodity.crop} — 30-Day Forecast</h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">30-Day Expected Peak</span>
                <span className="text-base font-black text-emerald-400">₹{selectedCommodity.forecast30Days}/Qtl</span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrendData}>
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" name="Predicted Price (₹)" />
                  <Line type="monotone" dataKey="current" stroke="#60a5fa" strokeWidth={3} name="Historical Price (₹)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sell Window & Nearby Mandis Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Best Sell Window Banner */}
            <div className="glass-panel rounded-3xl p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-teal-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>AI Recommended Sell Window</span>
                </div>
                <div className="text-base font-extrabold text-white mb-2">{selectedCommodity.bestSellWindow}</div>
                <p className="text-[11px] text-slate-300">
                  AI analysis recommends holding 40% of harvest to capture peak demand premium.
                </p>
              </div>
              <div className="mt-3 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                High Export Demand Signal
              </div>
            </div>

            {/* Nearby Mandi Price Comparison */}
            <div className="glass-panel rounded-3xl p-5 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">Nearby Mandi Comparison</h4>
              <div className="space-y-2">
                {selectedCommodity.nearbyMarkets.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 text-xs">
                    <span className="text-slate-300">{m.name} ({m.distanceKm} km)</span>
                    <span className="font-mono font-bold text-emerald-400">₹{m.pricePerQuintal}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

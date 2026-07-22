import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  IndianRupee, 
  Percent, 
  AlertOctagon, 
  Sparkles, 
  Calculator,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const YieldEngineModule: React.FC = () => {
  // Interactive Simulation Sliders State
  const [acres, setAcres] = useState(12.5);
  const [targetCrop, setTargetCrop] = useState('Wheat');
  const [fertilizerBudgetPerAcre, setFertilizerBudgetPerAcre] = useState(4500);
  const [expectedPricePerQuintal, setExpectedPricePerQuintal] = useState(2480);

  // Dynamic Yield Calculation Math
  const tonsPerAcre = targetCrop === 'Wheat' ? 2.28 : targetCrop === 'Rice' ? 2.10 : 1.45;
  const estimatedTons = acres * tonsPerAcre;
  const quintals = estimatedTons * 10; // 1 Ton = 10 Quintals
  const grossRevenue = quintals * expectedPricePerQuintal;
  const totalExpenses = (fertilizerBudgetPerAcre + 6200) * acres; // Fertilizer + Labor/Water
  const netProfit = grossRevenue - totalExpenses;
  const riskIndexPct = Math.max(5, Math.min(85, Math.round(100 - (fertilizerBudgetPerAcre / 80))));

  const financialData = [
    { category: 'Wheat 12.5 Ac', Revenue: grossRevenue, Cost: totalExpenses, Profit: netProfit },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">AI Yield & Financial Profitability Engine</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate crop production, input costs, net income, and financial risk mitigation strategies.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 font-mono text-xs border border-blue-500/30 flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5" />
          <span>Real-time Financial Calculator</span>
        </span>
      </div>

      {/* Main Grid: Interactive Sliders & Output Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Simulation Sliders */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Scenario Parameters</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select Crop</label>
            <select 
              value={targetCrop}
              onChange={(e) => setTargetCrop(e.target.value)}
              className="w-full glass-input text-xs rounded-xl px-3 py-2 bg-slate-900"
            >
              <option value="Wheat">Wheat (गेहूं)</option>
              <option value="Rice">Basmati Rice (धान)</option>
              <option value="Cotton">Cotton (कपास)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Total Farm Area</span>
              <span className="text-emerald-400 font-bold">{acres} Acres</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="50" 
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Input Cost per Acre (INR)</span>
              <span className="text-emerald-400 font-bold">₹{fertilizerBudgetPerAcre.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="12000" 
              step="500"
              value={fertilizerBudgetPerAcre}
              onChange={(e) => setFertilizerBudgetPerAcre(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Expected Selling Price (₹/Quintal)</span>
              <span className="text-emerald-400 font-bold">₹{expectedPricePerQuintal.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1800" 
              max="5000" 
              step="50"
              value={expectedPricePerQuintal}
              onChange={(e) => setExpectedPricePerQuintal(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block">💡 AI Optimization Tip:</span>
            <span>Increasing organic fertilizer by ₹800/acre lowers disease risk score by 18%.</span>
          </div>
        </div>

        {/* Right Column: Calculated Results & Financial Chart */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Result Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="glass-panel rounded-3xl p-5 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Est. Harvest Yield</span>
              <span className="text-2xl font-black text-white">{estimatedTons.toFixed(1)} Tons</span>
              <span className="text-xs text-slate-400 block mt-1">({quintals.toFixed(0)} Quintals total)</span>
            </div>

            <div className="glass-panel rounded-3xl p-5 border border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Gross Revenue</span>
              <span className="text-2xl font-black text-emerald-400">₹{grossRevenue.toLocaleString('en-IN')}</span>
              <span className="text-xs text-emerald-300/80 block mt-1">@ ₹{expectedPricePerQuintal}/Qtl</span>
            </div>

            <div className="glass-panel rounded-3xl p-5 border border-emerald-500/30 bg-emerald-950/20">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">Estimated Net Profit</span>
              <span className="text-2xl font-black text-white">₹{netProfit.toLocaleString('en-IN')}</span>
              <span className="text-xs text-emerald-400 font-semibold block mt-1">Margin: {((netProfit / grossRevenue) * 100).toFixed(1)}%</span>
            </div>

          </div>

          {/* Bar Chart Visualization */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 mb-4 uppercase tracking-wider">Financial Breakdown: Revenue vs Expenses vs Profit</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData}>
                  <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="Revenue" fill="#10b981" radius={[6, 6, 0, 0]} name="Gross Revenue (₹)" />
                  <Bar dataKey="Cost" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Input Cost (₹)" />
                  <Bar dataKey="Profit" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Net Profit (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

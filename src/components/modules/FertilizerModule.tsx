import React, { useState } from 'react';
import { 
  TestTube2, 
  Sparkles, 
  CheckCircle2, 
  Leaf, 
  ShieldCheck,
  Scale
} from 'lucide-react';

export const FertilizerModule: React.FC = () => {
  const [soilType, setSoilType] = useState('Alluvial');
  const [cropStage, setCropStage] = useState('Tillering');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TestTube2 className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-extrabold text-white">Precision Fertilizer & Soil N-P-K Balancer</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculates custom Nitrogen, Phosphorus, and Potassium dosages to prevent soil degradation and maximize yield.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 font-mono text-xs border border-purple-500/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Soil Health Index: 8.2 / 10</span>
        </span>
      </div>

      {/* Inputs & Soil Spectrum Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* N-P-K Meter Card */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">Soil Nutrient Spectrum</h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Nitrogen (N)</span>
                <span className="text-emerald-400 font-bold">140 kg/ha (Medium)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-3/5 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Phosphorus (P)</span>
                <span className="text-amber-400 font-bold">18 kg/ha (Low Deficit)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-2/5 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Potassium (K)</span>
                <span className="text-purple-400 font-bold">210 kg/ha (Optimal)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 w-4/5 rounded-full" />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
            Soil Organic Carbon (SOC): <strong className="text-emerald-400">0.72% (Good)</strong>
          </div>
        </div>

        {/* AI Customized Fertilizer Plan */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Customized Fertilizer Schedule (Wheat - Tillering Stage)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Synthetic Dose */}
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">Commercial Plan</span>
              <div className="text-sm font-black text-white">Urea (46% N) + DAP (18:46)</div>
              <div className="text-xs text-slate-300">Dosage: 45 kg Urea + 25 kg DAP per acre</div>
              <div className="text-[11px] text-purple-200">Timing: Apply during 1st irrigation (21 days after sowing).</div>
            </div>

            {/* Organic Alternative */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Bio-Organic Plan</span>
              <div className="text-sm font-black text-white">Vermicompost + Azotobacter Bio-Fertilizer</div>
              <div className="text-xs text-slate-300">Dosage: 200 kg Vermicompost + 2 kg Azotobacter/acre</div>
              <div className="text-[11px] text-emerald-200">Benefits: Increases microbial activity and water retention.</div>
            </div>

          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <Leaf className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-white">Soil Health Note:</strong> Avoid over-applying Urea in humid weather to prevent leaf burn and fungal spores.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

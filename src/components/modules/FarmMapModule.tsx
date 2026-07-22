import React, { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Layers, 
  Compass, 
  Maximize2, 
  Ruler, 
  CheckCircle2, 
  Sprout, 
  Calendar, 
  Sparkles,
  Info
} from 'lucide-react';
import { Farm } from '../../types';

interface FarmMapModuleProps {
  farms: Farm[];
  onAddFarm: (farm: Farm) => void;
}

export const FarmMapModule: React.FC<FarmMapModuleProps> = ({ farms, onAddFarm }) => {
  const [selectedFarm, setSelectedFarm] = useState<Farm>(farms[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Farm Form State
  const [newFarmName, setNewFarmName] = useState('');
  const [newCropType, setNewCropType] = useState('Wheat');
  const [newArea, setNewArea] = useState('10');
  const [newLocation, setNewLocation] = useState('Amritsar, Punjab');

  const handleRegisterFarm = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Farm = {
      id: `farm-${Date.now()}`,
      name: newFarmName || 'New Registered Acres',
      location: newLocation,
      coordinates: [31.634, 74.8723],
      areaAcres: parseFloat(newArea) || 10,
      cropType: newCropType,
      sowingDate: new Date().toISOString().split('T')[0],
      soilType: 'Alluvial',
      irrigationType: 'Drip',
      healthScore: 88,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    };
    onAddFarm(created);
    setSelectedFarm(created);
    setShowAddModal(false);
    setNewFarmName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Interactive Farm GPS & Polygon Telemetry</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Satellite geo-tagging, boundary layout, soil zoning, and crop canopy health indices.
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald-950/40"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Register New Field GPS</span>
        </button>
      </div>

      {/* Main Map View & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Simulated Satellite Map Canvas */}
        <div className="lg:col-span-2 relative glass-panel rounded-3xl overflow-hidden border border-slate-800 h-[480px]">
          
          {/* Simulated Satellite View Background */}
          <div className="absolute inset-0 bg-slate-950 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

          {/* Satellite Map Mock Image Container with Field Overlay */}
          <div className="relative w-full h-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <img 
              src={selectedFarm.image}
              alt="Farm satellite view"
              className="w-full h-full object-cover opacity-65 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

            {/* Field Boundary Vector Simulation */}
            <div className="absolute w-72 h-56 border-2 border-dashed border-emerald-400 bg-emerald-500/20 backdrop-blur-xs rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
              <div className="text-center p-3 glass-card rounded-2xl border border-emerald-400/40 shadow-xl">
                <span className="text-xs font-bold text-emerald-300 block">{selectedFarm.name}</span>
                <span className="text-[10px] text-slate-300 font-mono">
                  GPS: {selectedFarm.coordinates[0]}, {selectedFarm.coordinates[1]}
                </span>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Boundary Verified (NDVI 0.84)</span>
                </div>
              </div>
            </div>

            {/* Map Telemetry Floating Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="px-3 py-1.5 rounded-xl glass-panel text-[11px] font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>Sentinel-2 Satellite Feed (10m Res)</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl glass-panel text-[10px] font-bold text-slate-300 border border-slate-700">
                Area: {selectedFarm.areaAcres} Acres
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/30 text-emerald-300 text-[10px] font-bold border border-emerald-500/50">
                Soil: {selectedFarm.soilType}
              </span>
            </div>
          </div>
        </div>

        {/* Registered Farms List & Selected Metadata */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Registered Parcels</h3>
          
          <div className="space-y-3">
            {farms.map((f) => (
              <div
                key={f.id}
                onClick={() => setSelectedFarm(f)}
                className={`p-4 rounded-2xl glass-card border cursor-pointer transition-all ${
                  selectedFarm.id === f.id
                    ? 'border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-950/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-extrabold text-white">{f.name}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {f.cropType}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>📍 {f.location}</span>
                  <span className="font-semibold text-slate-200">{f.areaAcres} Acres</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px]">
                  <span className="text-slate-400">Health Index: <strong className="text-emerald-400">{f.healthScore}/100</strong></span>
                  <span className="text-slate-400">Irrigation: <strong className="text-slate-200">{f.irrigationType}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Register Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-emerald-500/40 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">Register Field GPS</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterFarm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Field Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Green Valley Plot #3"
                  value={newFarmName}
                  onChange={(e) => setNewFarmName(e.target.value)}
                  className="w-full glass-input text-xs rounded-xl px-3 py-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Crop Type</label>
                  <select 
                    value={newCropType}
                    onChange={(e) => setNewCropType(e.target.value)}
                    className="w-full glass-input text-xs rounded-xl px-3 py-2.5 bg-slate-900"
                  >
                    <option value="Wheat">Wheat (गेहूं)</option>
                    <option value="Basmati Rice">Basmati Rice (चावल)</option>
                    <option value="Cotton">Cotton (कपास)</option>
                    <option value="Sugarcane">Sugarcane (गन्ना)</option>
                    <option value="Mustard">Mustard (सरसों)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Area (Acres)</label>
                  <input 
                    type="number"
                    required
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full glass-input text-xs rounded-xl px-3 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">District / Location</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Ludhiana, Punjab"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full glass-input text-xs rounded-xl px-3 py-2.5"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald-950/50 mt-2"
              >
                Confirm Field Registration
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

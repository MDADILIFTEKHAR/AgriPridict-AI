import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  CloudSun, 
  Scan, 
  Bug, 
  TrendingUp, 
  Store, 
  Droplets, 
  TestTube2, 
  Landmark, 
  Bot, 
  BellRing, 
  Users, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { IndianLanguage, UserRole } from '../../types';
import { UI_TRANSLATIONS } from '../../data/mockData';

export type ActiveTab = 
  | 'dashboard'
  | 'farms'
  | 'weather'
  | 'disease'
  | 'pest'
  | 'yield'
  | 'market'
  | 'irrigation'
  | 'fertilizer'
  | 'schemes'
  | 'chatbot'
  | 'notifications'
  | 'roles'
  | 'admin';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLang: IndianLanguage;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentLang,
  isOpen,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const menuItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'farms', label: t.farms, icon: MapPin },
    { id: 'weather', label: t.weather, icon: CloudSun, badge: 'Live' },
    { id: 'disease', label: t.disease, icon: Scan, badge: 'AI Vision' },
    { id: 'pest', label: t.pest, icon: Bug },
    { id: 'yield', label: t.yield, icon: TrendingUp },
    { id: 'market', label: t.market, icon: Store, badge: 'Prices' },
    { id: 'irrigation', label: t.irrigation, icon: Droplets },
    { id: 'fertilizer', label: t.fertilizer, icon: TestTube2 },
    { id: 'schemes', label: t.schemes, icon: Landmark, badge: 'Subsidies' },
    { id: 'chatbot', label: t.aiAssistant, icon: Bot, badge: '15 Langs' },
    { id: 'notifications', label: t.notifications, icon: BellRing },
    { id: 'roles', label: t.roleViewports, icon: Users },
    { id: 'admin', label: t.adminPanel, icon: ShieldCheck },
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 w-64 glass-panel border-r border-slate-800/80 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } flex flex-col justify-between p-4 overflow-y-auto`}
    >
      <div className="space-y-6">
        
        {/* Category Header */}
        <div className="px-3 pt-2 flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400/80">
            Platform Modules
          </span>
          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
            14 Apps
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600/30 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md ${
                    isActive 
                      ? 'bg-emerald-400 text-slate-950' 
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Pro Banner Bottom */}
      <div className="mt-6 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 shadow-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-300">Hackathon Pitch Ready</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
          Powered by Gemini 2.0 AI, Open-Meteo Weather telemetry & Agmarknet market data.
        </p>
        <button 
          onClick={() => onTabChange('chatbot')}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-950/50"
        >
          <span>Launch AI Assistant</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};

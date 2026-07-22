import React, { useState } from 'react';
import { 
  Sprout, 
  Globe, 
  UserCheck, 
  Bell, 
  Search, 
  Sparkles, 
  Sun, 
  Moon, 
  ShieldAlert, 
  Menu, 
  X,
  CheckCircle2
} from 'lucide-react';
import { IndianLanguage, UserRole, NotificationItem } from '../../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../../data/mockData';

interface NavbarProps {
  currentLang: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  notifications: NotificationItem[];
  onNotificationClick: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentRole,
  onRoleChange,
  notifications,
  onNotificationClick,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];
  const unreadCount = notifications.filter(n => !n.read).length;

  const rolesList: { role: UserRole; label: string; icon: string }[] = [
    { role: 'farmer', label: 'Farmer (किसान)', icon: '👨‍🌾' },
    { role: 'fpo', label: 'FPO Admin (किसान उत्पादक संगठन)', icon: '🏬' },
    { role: 'govt', label: 'Agricultural Officer (कृषि अधिकारी)', icon: '🏛️' },
    { role: 'bank', label: 'Bank / Insurance Assessor', icon: '🏦' },
    { role: 'agribusiness', label: 'Agribusiness Enterprise', icon: '🏭' },
  ];

  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Section: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 lg:hidden transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-teal-400 shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  {t.appTitle}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  PRO AI v2.5
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder={t.askAi}
              className="w-full glass-input text-sm rounded-xl pl-9 pr-4 py-2 focus:ring-2 focus:ring-emerald-500/40 transition-all placeholder:text-slate-500"
            />
            <span className="absolute right-3 top-2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 rounded border border-slate-700">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right Controls: Language, Role Switcher, Notification Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 15 Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsRoleDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-200 transition-all hover:border-emerald-500/50"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{currentLangObj.flag}</span>
              <span>{currentLangObj.nativeName}</span>
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto glass-panel rounded-2xl p-2 border border-slate-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Language ({LANGUAGES.length} Indian Languages)
                </div>
                <div className="mt-1 space-y-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        currentLang === lang.code
                          ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName} ({lang.name})</span>
                      </span>
                      {currentLang === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-all hover:shadow-lg hover:shadow-emerald-950/50"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span className="capitalize hidden md:inline">Role: {currentRole}</span>
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl p-2 border border-slate-700/80 shadow-2xl z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Switch User Portal Role
                </div>
                <div className="mt-1 space-y-1">
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        onRoleChange(r.role);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left transition-colors ${
                        currentRole === r.role
                          ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{r.icon}</span>
                        <span>{r.label}</span>
                      </span>
                      {currentRole === r.role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={() => {
              onNotificationClick();
              setShowNotifDrawer(!showNotifDrawer);
            }}
            className="relative p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/60 text-slate-300 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};

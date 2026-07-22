import React, { useState } from 'react';
import { 
  BellRing, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  CloudRain, 
  TrendingUp, 
  Bug,
  Sparkles
} from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationCenterModuleProps {
  notifications: NotificationItem[];
}

export const NotificationCenterModule: React.FC<NotificationCenterModuleProps> = ({ notifications }) => {
  const [simulatedChannel, setSimulatedChannel] = useState<'whatsapp' | 'sms' | 'email'>('whatsapp');
  const [sentSuccessMsg, setSentSuccessMsg] = useState<string | null>(null);

  const handleSimulateAlertDispatch = (notif: NotificationItem) => {
    setSentSuccessMsg(`Successfully dispatched ${simulatedChannel.toUpperCase()} alert for: "${notif.title}"`);
    setTimeout(() => setSentSuccessMsg(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl font-extrabold text-white">Multi-Channel Emergency Alert Dispatcher</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Instant SMS, WhatsApp, Telegram, Email & Push Notification broadcasting engine for extreme weather & pest alerts.
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSimulatedChannel('whatsapp')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              simulatedChannel === 'whatsapp' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => setSimulatedChannel('sms')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              simulatedChannel === 'sms' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            SMS
          </button>
          <button
            onClick={() => setSimulatedChannel('email')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              simulatedChannel === 'email' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Email
          </button>
        </div>
      </div>

      {sentSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{sentSuccessMsg}</span>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <div 
            key={item.id}
            className="glass-panel rounded-3xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-2xl shrink-0 ${
                item.type === 'weather' ? 'bg-blue-500/20 text-blue-400' :
                item.type === 'market' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {item.type === 'weather' ? <CloudRain className="w-5 h-5" /> :
                 item.type === 'market' ? <TrendingUp className="w-5 h-5" /> : <Bug className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-extrabold text-white">{item.title}</h3>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-slate-800 text-slate-300">
                    {item.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-xl">{item.message}</p>
                <span className="text-[10px] text-slate-500 block mt-1">{item.timestamp}</span>
              </div>
            </div>

            <button
              onClick={() => handleSimulateAlertDispatch(item)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulate Broadcast</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

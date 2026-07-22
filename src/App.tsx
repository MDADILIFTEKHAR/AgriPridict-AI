import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { FarmerDashboard } from './components/dashboard/FarmerDashboard';
import { FarmMapModule } from './components/modules/FarmMapModule';
import { WeatherModule } from './components/modules/WeatherModule';
import { DiseaseScannerModule } from './components/modules/DiseaseScannerModule';
import { PestPredictorModule } from './components/modules/PestPredictorModule';
import { YieldEngineModule } from './components/modules/YieldEngineModule';
import { MarketIntelligenceModule } from './components/modules/MarketIntelligenceModule';
import { SmartIrrigationModule } from './components/modules/SmartIrrigationModule';
import { FertilizerModule } from './components/modules/FertilizerModule';
import { GovtSchemesModule } from './components/modules/GovtSchemesModule';
import { MultilingualAIBot } from './components/modules/MultilingualAIBot';
import { NotificationCenterModule } from './components/modules/NotificationCenterModule';
import { RoleViewports } from './components/roles/RoleViewports';
import { AdminPanel } from './components/admin/AdminPanel';

import { IndianLanguage, UserRole, Farm, WeatherData } from './types';
import { 
  INITIAL_FARMS, 
  INITIAL_WEATHER, 
  INITIAL_PEST_ALERTS, 
  INITIAL_MARKET_COMMODITIES, 
  INITIAL_SCHEMES, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [currentLang, setCurrentLang] = useState<IndianLanguage>('en');
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Application State Data
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const handleAddFarm = (newFarm: Farm) => {
    setFarms(prev => [newFarm, ...prev]);
  };

  const handleRefreshWeather = (location: string) => {
    setWeather(prev => ({
      ...prev,
      city: location,
      temp: parseFloat((24 + Math.random() * 8).toFixed(1)),
      humidity: Math.round(50 + Math.random() * 30),
      rainfallMm: parseFloat((Math.random() * 20).toFixed(1)),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Fixed Header Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        notifications={notifications}
        onNotificationClick={() => setActiveTab('notifications')}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Layout with Sidebar */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          currentLang={currentLang}
          isOpen={isSidebarOpen}
        />

        {/* Dynamic Viewport Container */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-full">
          {activeTab === 'dashboard' && (
            <FarmerDashboard
              farms={farms}
              weather={weather}
              pestAlerts={INITIAL_PEST_ALERTS}
              marketCommodities={INITIAL_MARKET_COMMODITIES}
              currentLang={currentLang}
              currentRole={currentRole}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'farms' && (
            <FarmMapModule farms={farms} onAddFarm={handleAddFarm} />
          )}

          {activeTab === 'weather' && (
            <WeatherModule weather={weather} onRefreshWeather={handleRefreshWeather} />
          )}

          {activeTab === 'disease' && (
            <DiseaseScannerModule />
          )}

          {activeTab === 'pest' && (
            <PestPredictorModule pestAlerts={INITIAL_PEST_ALERTS} />
          )}

          {activeTab === 'yield' && (
            <YieldEngineModule />
          )}

          {activeTab === 'market' && (
            <MarketIntelligenceModule commodities={INITIAL_MARKET_COMMODITIES} />
          )}

          {activeTab === 'irrigation' && (
            <SmartIrrigationModule />
          )}

          {activeTab === 'fertilizer' && (
            <FertilizerModule />
          )}

          {activeTab === 'schemes' && (
            <GovtSchemesModule schemes={INITIAL_SCHEMES} currentRole={currentRole} />
          )}

          {activeTab === 'chatbot' && (
            <MultilingualAIBot currentLang={currentLang} onLanguageChange={setCurrentLang} />
          )}

          {activeTab === 'notifications' && (
            <NotificationCenterModule notifications={notifications} />
          )}

          {activeTab === 'roles' && (
            <RoleViewports currentRole={currentRole} onRoleChange={setCurrentRole} />
          )}

          {activeTab === 'admin' && (
            <AdminPanel />
          )}
        </main>

      </div>
    </div>
  );
}

export default App;

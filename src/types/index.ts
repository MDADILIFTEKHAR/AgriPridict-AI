export type UserRole = 'farmer' | 'fpo' | 'govt' | 'bank' | 'agribusiness';

export type IndianLanguage = 
  | 'en' // English
  | 'hi' // Hindi
  | 'ur' // Urdu
  | 'bn' // Bengali
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'pa' // Punjabi
  | 'or' // Odia
  | 'as' // Assamese
  | 'sa' // Sanskrit
  | 'mai'; // Maithili

export interface LanguageInfo {
  code: IndianLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number]; // [lat, lng]
  areaAcres: number;
  cropType: string;
  sowingDate: string;
  soilType: 'Alluvial' | 'Black Cotton' | 'Red Soil' | 'Laterite' | 'Sandy Loam';
  irrigationType: 'Drip' | 'Sprinkler' | 'Canal' | 'Rainfed';
  healthScore: number; // 0 - 100
  image: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  rainfallMm: number;
  windSpeed: number;
  uvIndex: number;
  condition: string;
  icon: string;
  heatwaveAlert: boolean;
  droughtRiskPct: number;
  hourlyForecast: Array<{ time: string; temp: number; rainChance: number }>;
  weeklyForecast: Array<{ day: string; high: number; low: number; rainMm: number; condition: string }>;
}

export interface DiseaseResult {
  diseaseName: string;
  cropName: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  confidence: number;
  description: string;
  recommendedMedicine: string;
  dosage: string;
  organicRemedy: string;
  preventionSteps: string[];
}

export interface PestAlert {
  id: string;
  crop: string;
  pestName: string;
  riskScore: number; // 0-100
  affectedStage: string;
  recommendedPesticide: string;
  preventativeMeasures: string;
  weatherFactor: string;
}

export interface MarketCommodity {
  id: string;
  crop: string;
  marketName: string;
  state: string;
  currentPricePerQuintal: number;
  previousPrice: number;
  forecast7Days: number;
  forecast30Days: number;
  demandTrend: 'Rising' | 'Stable' | 'Falling';
  bestSellWindow: string;
  nearbyMarkets: Array<{ name: string; distanceKm: number; pricePerQuintal: number }>;
}

export interface YieldForecast {
  estimatedProductionTons: number;
  estimatedRevenueINR: number;
  estimatedCostsINR: number;
  netProfitINR: number;
  lossRiskPct: number;
  factors: Array<{ factor: string; impact: string }>;
}

export interface IrrigationPlan {
  dailyWaterRequirementLiters: number;
  recommendedTimes: string[];
  weeklySchedule: Array<{ day: string; durationMinutes: number; litersNeeded: number }>;
  savingsTip: string;
}

export interface FertilizerPlan {
  npkRatioCurrent: string; // e.g. "12-8-10"
  npkTarget: string; // e.g. "20-10-10"
  recommendedFertilizer: string;
  applicationRateKgPerAcre: number;
  timing: string;
  organicAlternative: string;
}

export interface GovtScheme {
  id: string;
  title: string;
  category: 'Subsidy' | 'Insurance' | 'Loan' | 'Equipment';
  subsidyPct: number;
  maxAmountINR: number;
  eligibleRoles: UserRole[];
  deadline: string;
  applicationUrl: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'weather' | 'disease' | 'market' | 'scheme' | 'system';
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  language: IndianLanguage;
  timestamp: string;
  imageUrl?: string;
  audioUrl?: string;
}

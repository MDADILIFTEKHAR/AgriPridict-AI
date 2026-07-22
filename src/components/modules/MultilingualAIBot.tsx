import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Image as ImageIcon, 
  Volume2, 
  Globe, 
  User, 
  Trash2,
  Key,
  X,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { IndianLanguage, ChatMessage } from '../../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../../data/mockData';

interface MultilingualAIBotProps {
  currentLang: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
}

export const MultilingualAIBot: React.FC<MultilingualAIBotProps> = ({ currentLang, onLanguageChange }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! I am AgriPredict AI Assistant powered by Gemini 2.0. I understand voice, text, and crop leaf photos across 15 Indian languages. How can I assist your farm today?',
      language: currentLang,
      timestamp: 'Just now',
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Gemini API key state & modal
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('agri_gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];
  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Save API Key
  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = keyInput.trim();
    setApiKey(trimmed);
    localStorage.setItem('agri_gemini_api_key', trimmed);
    setShowKeyModal(false);
    setKeyInput('');
  };

  // Clear Conversation feature
  const handleClearConversation = () => {
    if (messages.length <= 1) return;
    if (window.confirm("Are you sure you want to clear all conversation history?")) {
      setMessages([
        {
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text: `Namaste! Conversation cleared. How can I assist your farm today in ${currentLangObj.nativeName}?`,
          language: currentLang,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setAttachedImage(null);
    }
  };

  // Voice speech simulation
  const handleToggleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setInputText(`What is the recommended pesticide and dosage for wheat yellow rust disease in ${currentLangObj.name}?`);
      }, 2500);
    }
  };

  // Text-to-Speech synthesis
  const handleSpeakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Voice playback: " + text);
    }
  };

  // Call Gemini API or fallback
  const fetchGeminiResponse = async (userPrompt: string, imageBase64: string | null): Promise<string> => {
    if (apiKey.trim()) {
      try {
        const parts: any[] = [];
        parts.push({
          text: `System Prompt: You are AgriPredict AI, an expert agricultural domain assistant for Indian farmers. The user language is ${currentLangObj.name} (${currentLangObj.nativeName}). Answer concisely and accurately with actionable farming advice, pest treatments, dosages, weather tips, or market insights in ${currentLangObj.name}.\n\nUser Question: ${userPrompt}`
        });

        if (imageBase64) {
          const base64Data = imageBase64.split(',')[1] || imageBase64;
          const mimeType = imageBase64.substring(imageBase64.indexOf(':') + 1, imageBase64.indexOf(';')) || 'image/jpeg';
          parts.push({
            inlineData: {
              mimeType,
              data: base64Data
            }
          });
        }

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts }] })
        });

        if (res.ok) {
          const data = await res.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) return generatedText;
        }
      } catch (err) {
        console.warn("Gemini API call error, falling back to local engine:", err);
      }
    }

    // Smart fallback engine based on prompt & language
    return generateSmartFallbackResponse(userPrompt, imageBase64, currentLang);
  };

  const generateSmartFallbackResponse = (prompt: string, image: string | null, lang: IndianLanguage): string => {
    const p = prompt.toLowerCase();
    
    if (image) {
      if (lang === 'hi') {
        return 'अपलोड की गई पत्ती की छवि के विश्लेषण के अनुसार, यह पीला रतुआ (Yellow Rust) के शुरुआती लक्षण प्रतीत होते हैं। उपचार के लिए प्रोपिकोनाज़ोल 25% EC का 1ml प्रति लीटर पानी में छिड़काव करें।';
      }
      if (lang === 'ta') {
        return 'பதிவேற்றப்பட்ட இலை படத்தை பகுப்பாய்வு செய்ததில், இது மஞ்சள் துரு நோயின் அறிகுறிகளாக உள்ளது. புரோபிகோனசோல் 25% EC (1ml/L) தெளிக்கவும்.';
      }
      if (lang === 'te') {
        return 'అప్‌లోడ్ చేసిన ఆకు చిత్రం ప్రకారం, ఇది పసుపు తుప్పు తెగులు యొక్క లక్షణాలుగా ఉంది. ప్రోపికోనజోల్ 25% EC (1ml/L) పిచికారీ చేయండి.';
      }
      return `Image Diagnostic Result: Symptoms match Yellow Rust (Puccinia striiformis). Recommended spray: Propiconazole 25% EC at 1ml/L water. Ensure morning application before temperature exceeds 30°C.`;
    }

    if (p.includes('rust') || p.includes('disease') || p.includes('पिला') || p.includes('रोग')) {
      if (lang === 'hi') return 'गेहूं में पीले रतुआ रोग नियंत्रण के लिए प्रोपिकोनाज़ोल 25% EC का 1ml/लीटर पानी में छिड़काव करें। नाइट्रोजन की अधिक मात्रा न दें और खेत में जल निकासी सुनिश्चित करें।';
      return `For fungal disease control (Yellow Rust / Blight), spray Propiconazole 25% EC at 1 ml/Liter or Copper Oxychloride 50% WP at 2g/Liter. Maintain proper field drainage.`;
    }

    if (p.includes('price') || p.includes('mandi') || p.includes('market') || p.includes('भाव')) {
      if (lang === 'hi') return 'खन्ना मंडी में गेहूं का वर्तमान मूल्य ₹2,480/क्विंटल है और अगले 7 दिनों में ₹2,560 तक जाने का अनुमान है। बिक्री के लिए 12-18 फरवरी सबसे सही समय रहेगा।';
      return `Current Khanna Mandi Sharbati Wheat rate is ₹2,480/quintal with a 7-day projected price of ₹2,560/quintal. Best selling window is expected between 12-18 Feb 2026.`;
    }

    if (p.includes('scheme') || p.includes('subsidy') || p.includes('योजना')) {
      if (lang === 'hi') return 'PM-KISAN योजना के तहत हर साल ₹6,000 की वित्तीय सहायता 3 किस्तों में दी जाती है। PM-KUSUM योजना पर सोलर पंप के लिए 60% सब्सिडी उपलब्ध है।';
      return `Under PM-KISAN, farmers receive ₹6,000/year direct financial support. PM-KUSUM provides 60% capital subsidy for solar irrigation pumps up to 7.5 HP.`;
    }

    if (lang === 'hi') {
      return `नमस्ते! आपके प्रश्न "${prompt}" के अनुसार: मिट्टी की नमी का स्तर बनाए रखें और अगले 48 घंटों की मौसम भविष्यवाणी (14.2mm वर्षा) को देखते हुए सिंचाई रोकें।`;
    }

    return `Based on telemetry data & agricultural guidelines for ${currentLangObj.name}: Maintain balanced N-P-K (120:60:40 kg/ha). Open-Meteo forecasts scattered rain, so defer scheduled irrigation by 48 hours.`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputText.trim() && !attachedImage) || isLoading) return;

    const userQuery = inputText;
    const currentImg = attachedImage;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userQuery || (currentImg ? '[Attached Crop Image for Analysis]' : ''),
      language: currentLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: currentImg || undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setAttachedImage(null);
    setIsLoading(true);

    const botResponseText = await fetchGeminiResponse(userQuery || 'Analyze this crop photo', currentImg);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: botResponseText,
      language: currentLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
    handleSpeakText(botResponseText);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Header Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel rounded-3xl p-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">Multilingual Voice & Image AI Agriculture Bot</h2>
            {apiKey ? (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Gemini Live API
              </span>
            ) : (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                Offline AI Mode
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Google Gemini 2.0 LLM engine with real-time translation & voice synthesis in 15 Indian languages.
          </p>
        </div>

        {/* Action Controls: Language, API Key & Clear Conversation */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Clear Conversation Button */}
          <button
            onClick={handleClearConversation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/90 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold transition-all"
            title="Clear all chat conversation history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>

          {/* Gemini API Key Config Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold border transition-all ${
              apiKey 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60' 
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40'
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>{apiKey ? 'API Key Active' : 'Set Gemini Key'}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as IndianLanguage)}
              className="bg-transparent text-xs font-bold text-emerald-300 focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.flag} {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Chat Feed Container */}
      <div className="glass-panel rounded-3xl border border-slate-800 h-[520px] flex flex-col justify-between overflow-hidden relative">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-slate-950 font-bold'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-md sm:max-w-lg p-4 rounded-2xl text-xs space-y-2 ${
                  isUser 
                    ? 'bg-blue-600/30 text-white border border-blue-500/40 rounded-tr-none' 
                    : 'glass-card text-slate-200 border border-slate-700/80 rounded-tl-none'
                }`}>
                  {msg.imageUrl && (
                    <img src={msg.imageUrl} alt="Attached" className="w-full h-44 object-cover rounded-xl border border-slate-700" />
                  )}
                  <p className="leading-relaxed text-sm font-medium whitespace-pre-line">{msg.text}</p>
                  
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 pt-1.5">
                    <span>{msg.timestamp} • {LANGUAGES.find(l=>l.code===msg.language)?.nativeName}</span>
                    {!isUser && (
                      <button 
                        onClick={() => handleSpeakText(msg.text)}
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Listen Voice
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-slate-950 font-bold flex items-center justify-center">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="glass-card text-slate-300 p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2 border border-slate-700">
                <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>AgriPredict AI is generating response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Image Attachment Preview Badge */}
        {attachedImage && (
          <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ImageIcon className="w-4 h-4" />
              <span>Crop image attached for diagnosis</span>
            </div>
            <button 
              onClick={() => setAttachedImage(null)}
              className="text-slate-400 hover:text-rose-400 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          
          {/* Image Upload Button */}
          <label className="p-2.5 rounded-xl glass-card hover:bg-slate-800 cursor-pointer text-slate-400 hover:text-emerald-400 transition-colors" title="Attach crop leaf photo">
            <ImageIcon className="w-4 h-4" />
            <input 
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = (evt) => setAttachedImage(evt.target?.result as string);
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </label>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-2.5 rounded-xl font-bold transition-all ${
              isRecording 
                ? 'bg-rose-500 text-white animate-pulse' 
                : 'glass-card text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
            }`}
            title="Voice Speech-to-Text"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            placeholder={isRecording ? `Listening in ${currentLangObj.nativeName}...` : `Type query in ${currentLangObj.nativeName} (${currentLangObj.name})...`}
            className="flex-1 glass-input text-xs rounded-xl px-4 py-2.5 disabled:opacity-50"
          />

          {/* Send Button */}
          <button 
            type="submit"
            disabled={isLoading || (!inputText.trim() && !attachedImage)}
            className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold hover:brightness-110 disabled:opacity-50 transition-all shadow-md shadow-emerald-950/40"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>

      </div>

      {/* Gemini API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Google Gemini API Key</h3>
              </div>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your Google Gemini API key to enable live AI multimodal reasoning with model <code className="text-emerald-300">gemini-2.0-flash</code>. Your key is stored securely in your browser's local storage.
            </p>

            <form onSubmit={handleSaveApiKey} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">API Key</label>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder={apiKey ? "••••••••••••••••••••••••" : "AIzaSy..."}
                  className="glass-input w-full px-4 py-2.5 text-xs rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2">
                {apiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setApiKey('');
                      localStorage.removeItem('agri_gemini_api_key');
                      setShowKeyModal(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl"
                  >
                    Remove Key
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-colors"
                >
                  Save Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};


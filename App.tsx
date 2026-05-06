import React, { useState, useEffect, useRef } from 'react';
import { FormData, GenerationResult, HistoryItem } from './types';
import { NICHE_SUGGESTIONS, NICHE_SUGGESTIONS_EN, ZODIAC_OPTIONS, GENDER_OPTIONS, TOPIC_OPTIONS, SUB_TOPICS, MARITAL_STATUS_OPTIONS, TRANSLATIONS, ZODIAC_OPTIONS_EN, GENDER_OPTIONS_EN, TOPIC_OPTIONS_EN, MARITAL_STATUS_OPTIONS_EN } from './constants';
import { generateFengShuiTextStream, generateFengShuiAudio } from './services/geminiService';
import NeonButton from './components/NeonButton';
import HistorySidebar from './components/HistorySidebar';
import ReactMarkdown from 'react-markdown';

// Icons
const IconSparkles = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const IconDownload = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const IconHistory = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconPlay = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>;
const IconPause = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>;
const IconMap = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconBriefcase = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconYinYang = () => <svg className="w-6 h-6 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2-8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm4-8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm-2-2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"/></svg>;
const IconGift = () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>;
const IconKey = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>;
const IconLock = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const IconLogout = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const IconNext = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>;
const IconMusic = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>;

const LOGO_URL = "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000&auto=format&fit=crop";

// PARTICLE INTERFACE
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

interface Particle {
  id: number;
  x: number; // origin x
  y: number; // origin y
  tx: number; // translate x
  ty: number; // translate y
  color: string;
  size: number;
}

function App() {
  // Lock State
  const [isLocked, setIsLocked] = useState(true);
  const [unlockCode, setUnlockCode] = useState('');
  const [unlockError, setUnlockError] = useState(false);
  
  // Fireworks State
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Starfield State
  const [stars, setStars] = useState<Star[]>([]);
  
  // Language State
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const t = TRANSLATIONS[lang];

  // App State
  const [formData, setFormData] = useState<FormData>({
    language: lang, // Optional: tracking language in form
    fullName: '',
    dob: '',
    location: '',
    currentJob: '', 
    zodiac: ZODIAC_OPTIONS[0],
    gender: GENDER_OPTIONS[0],
    maritalStatus: MARITAL_STATUS_OPTIONS[0],
    topic: TOPIC_OPTIONS[0],
    superChat: ''
  });
  
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextTopic, setNextTopic] = useState<string | null>(null);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Check LocalStorage for Unlock Status
  useEffect(() => {
    const isAppUnlocked = localStorage.getItem('is_app_unlocked') === 'true';
    if (isAppUnlocked) {
      setIsLocked(false);
    }

    const saved = localStorage.getItem('phongthuy_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }

    // Initialize Stars - Reduced count for performance
    const initialStars: Star[] = [];
    const starCount = window.innerWidth < 768 ? 30 : 60; // Responsive star count
    for (let i = 0; i < starCount; i++) {
      initialStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 5 + 3
      });
    }
    setStars(initialStars);
  }, []);

  // Auto-play audio when available
  useEffect(() => {
    if (audioUrl && audioRef.current) {
        const timer = setTimeout(() => {
            const playPromise = audioRef.current?.play();
            if (playPromise !== undefined) {
                playPromise
                .then(() => setIsPlaying(true))
                .catch(err => {
                    console.warn("Auto-play blocked:", err);
                    // Do not alert on auto-play block, just let user press play
                    setIsPlaying(false);
                });
            }
        }, 500); // Small delay to ensure render
        return () => clearTimeout(timer);
    }
  }, [audioUrl]);

  // Auto Fireworks Background Effect
  useEffect(() => {
    if (!isLocked) return;

    const interval = setInterval(() => {
        // Create random explosion in the background (silent)
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.5); // Upper half
        triggerExplosion(x, y, false);
    }, 2000); // Increased interval

    return () => clearInterval(interval);
  }, [isLocked]);

  const triggerExplosion = (x = window.innerWidth / 2, y = window.innerHeight / 2, playSound = true) => {
    // 1. Play Sound
    if (playSound) {
      const audio = new Audio("https://www.soundjay.com/mechanical/sounds/fireworks-1.mp3");
      audio.volume = 0.5; 
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play prevented", e));
    }

    // 2. Generate Particles
    const newParticles: Particle[] = [];
    const colors = ['#FF003C', '#FFD700', '#04D9FF', '#BC13FE', '#FFFFFF'];
    const particleCount = playSound ? 40 : 20; // Reduced count

    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 250 + 50; // Distance traveled
        newParticles.push({
            id: Date.now() + i + Math.random(),
            x: x,
            y: y,
            tx: Math.cos(angle) * velocity,
            ty: Math.sin(angle) * velocity,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 6 + 2
        });
    }

    setParticles(prev => [...prev, ...newParticles]);

    // Cleanup after animation
    setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1100);
  };

  const handleUnlock = () => {
    triggerExplosion(window.innerWidth / 2, window.innerHeight / 2, true);
    if (unlockCode.trim().toUpperCase() === 'LIXITET') {
      setTimeout(() => {
          setIsLocked(false);
          localStorage.setItem('is_app_unlocked', 'true');
      }, 800);
    } else {
      setUnlockError(true);
      setTimeout(() => setUnlockError(false), 800);
    }
  };
  
  const handleLogout = () => {
    setIsLocked(true);
    localStorage.removeItem('is_app_unlocked');
  };

  const handleInputFocus = () => {
    triggerExplosion(window.innerWidth / 2, window.innerHeight / 3, true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNicheClick = (niche: string) => {
    if (selectedNiche === niche) {
      setSelectedNiche(null);
    } else {
      setSelectedNiche(niche);
      setFormData(prev => ({ ...prev, topic: niche }));
    }
  };

  const handleGenerate = async (dataOverride?: FormData) => {
    const currentData = dataOverride || formData;
    setLoading(true);
    setResult({ text: "" }); // Initialize with empty text to show container immediately
    setAudioUrl(null);
    setIsPlaying(false);
    setNextTopic(null); // Reset next topic

    // Immediate scroll to result area to show user we are working
    setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    let fullAccumulatedText = "";

    try {
      // 1. Stream Text (FAST)
      const stream = generateFengShuiTextStream(currentData);
      
      for await (const chunk of stream) {
        fullAccumulatedText += chunk;
        
        // Parsing content and next topic live
        const parts = fullAccumulatedText.split(':::NEXT_TOPIC:::');
        const mainContent = parts[0];
        const suggestion = parts.length > 1 ? parts[1].trim() : null;

        setResult(prev => ({ ...prev, text: mainContent } as GenerationResult));
        if (suggestion) {
            setNextTopic(suggestion);
        }
      }

      // 2. Save History (Save FULL text including tag for later re-parsing)
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        preview: `${currentData.topic} - ${currentData.fullName}`,
        fullContent: fullAccumulatedText
      };
      
      const updatedHistory = [newHistoryItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('phongthuy_history', JSON.stringify(updatedHistory));

      // 3. Generate Audio (Background) - Service handles stripping the tag
      generateFengShuiAudio(fullAccumulatedText).then(audioBase64 => {
        if (audioBase64) {
          const audioSrc = `data:audio/wav;base64,${audioBase64}`;
          setAudioUrl(audioSrc);
          setResult(prev => prev ? ({ ...prev, audioBase64 }) : null);
        }
      }).catch(err => console.error("Audio generation failed in background", err));

    } catch (error: any) {
      console.error("Error generating content:", error);
      alert("Hệ thống đang bận. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeepDive = (topic: string) => {
      const newSuperChat = `Tiếp tục phân tích chuyên sâu về chủ đề: ${topic}. Hãy đi sâu vào chi tiết, đưa ra các ví dụ cụ thể và lời giải từng bước.`;
      const newData = { ...formData, superChat: newSuperChat };
      setFormData(newData);
      handleGenerate(newData);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Handle the "element has no supported sources" error gracefully
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
          })
          .catch(error => {
            // Auto-play was prevented
            console.warn("Playback prevented:", error);
            setIsPlaying(false);
            alert("Không thể phát âm thanh. Vui lòng thử lại hoặc kiểm tra loa của bạn.");
          });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => setIsPlaying(false);

  // --- NEW: HANDLE DOWNLOAD AUDIO ---
  const handleDownloadAudio = () => {
    if (!audioUrl) return;
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = audioUrl;
    // Name the file nicely for the user
    const safeName = formData.fullName.replace(/\s+/g, '_') || 'Thien_Menh';
    link.download = `Giai_Ma_Bi_An_${safeName}_${Date.now()}.wav`; // Using .wav for better compatibility as source is WAV
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // ----------------------------------

  const handleExport = () => {
    if (!result) return;
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Luan Giai</title></head><body>`;
    const footer = "</body></html>";
    let htmlContent = result.text
        .replace(/\n/g, '<br/>')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/#(.*?)\<br\/\>/g, '<h1>$1</h1>')
        .replace(/##(.*?)\<br\/\>/g, '<h2>$1</h2>');
        
    const sourceHTML = header + htmlContent + footer;
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `tuong_lai_${formData.fullName}_${Date.now()}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    // Parse on load
    const parts = item.fullContent.split(':::NEXT_TOPIC:::');
    const mainContent = parts[0];
    const suggestion = parts.length > 1 ? parts[1].trim() : null;

    setResult({ text: mainContent });
    setNextTopic(suggestion);
    setAudioUrl(null);
    setShowHistory(false);
    resultRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Common Logo Component
  const AppLogo = ({ className = '', size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom' }) => {
    const sizeClasses = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16 md:w-20 md:h-20',
      lg: 'w-24 h-24 md:w-32 md:h-32',
      xl: 'w-32 h-32 md:w-40 md:h-40',
      custom: ''
    };

    return (
      <div className={`relative group ${className}`}>
          {/* Glow */}
          <div className="absolute inset-0 bg-neonBlue/50 rounded-full blur-md animate-pulse"></div>
          <img 
              src={LOGO_URL} 
              alt="Logo" 
              className={`relative z-10 ${sizeClasses[size]} rounded-full border-2 border-white shadow-[0_0_20px_#04D9FF] animate-spin-slow object-cover`}
          />
      </div>
    );
  };

  // --- RENDER LOCK SCREEN ---
  if (isLocked) {
    return (
      <div 
        className="fixed inset-0 z-[100] flex flex-col items-center justify-start bg-black text-white font-sans overflow-hidden cursor-pointer"
        onClick={(e) => {
             // Only trigger background explosion if not clicking on input/button (handled separately)
             // We can check target but simple overlay click is fine
             triggerExplosion(e.clientX, e.clientY, true);
        }}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0010] to-black"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        {/* FIREWORKS LAYER */}
        <div className="absolute inset-0 pointer-events-none z-[150] overflow-hidden">
             {particles.map(p => (
                 <div 
                    key={p.id}
                    className="firework-particle"
                    style={{
                        left: p.x,
                        top: p.y,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                        '--tx': `${p.tx}px`,
                        '--ty': `${p.ty}px`,
                        willChange: 'transform, opacity'
                    } as React.CSSProperties}
                 />
             ))}
        </div>

        {/* Header Section - Top Spacing */}
        <div className="relative z-10 w-full px-4 flex flex-col items-center pt-10 md:pt-16 pb-8 pointer-events-none transition-all duration-500">
            {/* Reduced text size by ~30%: 3xl/6xl -> 2xl/4xl */}
            <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF003C] to-[#FFD700] drop-shadow-[0_0_25px_rgba(255,0,60,0.6)] mb-4 text-center uppercase font-display tracking-widest whitespace-nowrap animate-glow">
              CHÚC MỪNG NĂM MỚI 2026
            </h1>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-neonRed to-transparent opacity-50 blur-sm"></div>
              {/* Reduced subtitle size slightly to match: xl/3xl -> lg/2xl */}
              <p className="relative text-neonGold text-lg md:text-2xl font-black tracking-[0.5em] uppercase animate-pulse drop-shadow-[0_0_10px_#FFD700] font-serif py-1 px-4">
                ✨ TẾT BÍNH NGỌ ✨
              </p>
            </div>
        </div>

        {/* Lock Card Section */}
        <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center mt-4 pointer-events-auto">
            <div className="w-full bg-black/80 backdrop-blur-xl border-2 border-neonPurple/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(188,19,254,0.4)] relative group" onClick={(e) => e.stopPropagation()}>
                {/* Moving Border Gradient */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neonRed via-neonPurple to-neonBlue rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-gradient-xy -z-10"></div>
                
                <div className="flex flex-col items-center gap-6">
                    {/* Logo Inside Card - Centered */}
                    <div className="transform hover:scale-110 transition-transform duration-500">
                       <AppLogo size="lg" />
                    </div>

                    <div className="text-center space-y-2">
                         <p className="text-neonBlue font-bold text-lg tracking-widest uppercase drop-shadow-[0_0_5px_#04D9FF]">{t.unlock_title}</p>
                         <p className="text-yellow-400 font-black text-3xl tracking-[0.2em] drop-shadow-md">"LIXITET"</p>
                    </div>

                    {/* Input Area */}
                    <div className="w-full relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <IconKey />
                        </div>
                        <input 
                          type="text" 
                          value={unlockCode}
                          onChange={(e) => setUnlockCode(e.target.value)}
                          onFocus={handleInputFocus}
                          onClick={handleInputFocus}
                          onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                          placeholder={t.unlock_placeholder} 
                          className={`w-full bg-[#1a0525] border-2 ${unlockError ? 'border-red-500 animate-pulse' : 'border-gray-700 focus:border-neonPurple'} text-white rounded-xl py-3 pl-10 pr-10 outline-none text-center font-bold tracking-widest placeholder-gray-600 transition-all uppercase`}
                        />
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                            <IconLock />
                        </div>
                    </div>

                    <button 
                      onClick={handleUnlock}
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 text-white font-black py-4 rounded-xl shadow-[0_0_20px_#FF003C] transform hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg uppercase"
                    >
                       <IconSparkles /> {t.unlock_button} <span className="text-xl">→</span>
                    </button>

                    {/* MOVED UP: Copyright/Footer below button */}
                    <div className="mt-4 flex flex-col items-center gap-1 animate-pulse opacity-90">
                        <span className="text-neonPurple font-bold tracking-[0.2em] text-[10px] uppercase drop-shadow-[0_0_5px_#BC13FE]">{t.footer_badge}</span>
                        <span className="text-[8px] text-gray-400">© 2026 DO NOT COPY</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- RENDER MAIN APP ---
  return (
    <div className="min-h-screen bg-[#05000A] text-white relative overflow-x-hidden font-sans selection:bg-neonPurple selection:text-white flex flex-col">
      {/* Watermark Logo */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
           <img src={LOGO_URL} className="w-[80vw] max-w-2xl animate-spin-slow" style={{ animationDuration: '60s' }} />
      </div>

      {/* 3D Background Elements - Purple Neon */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-deepPurple rounded-full blur-[150px] opacity-40 animate-pulse-fast"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-neonPurple/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-neonBlue/10 rounded-full blur-[100px] animate-spin-slow"></div>
        
        {/* Starfield - Optimized with React.memo or simple separation */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map(star => (
            <div 
              key={star.id}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDuration: `${star.duration}s`,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
                willChange: 'opacity',
                transform: 'translateZ(0)' // Force GPU
              }}
            />
          ))}
        </div>

        {/* Grid Overlay for 3D effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Header - Horizontal Layout */}
      <header className="relative z-20 py-6 bg-black/40 backdrop-blur-xl border-b border-neonPurple/30 shadow-[0_4px_30px_rgba(188,19,254,0.2)]">
        {/* Top Left Logo in App */}
        <div className="absolute top-4 left-4 z-50">
            <AppLogo size="md" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center pt-12 md:pt-14">
            
            {/* SUPER LUXURY 3D TITLE */}
            <div className="relative mb-10 group" style={{ perspective: '1000px' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-gradient-to-r from-transparent via-neonPurple/20 to-transparent blur-[60px] pointer-events-none"></div>
                
                <h1 className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-3xl md:text-5xl lg:text-7xl font-black tracking-widest uppercase transition-transform duration-700 hover:[transform:scale(1.05)_rotateX(10deg)]"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        transformStyle: 'preserve-3d',
                        fontWeight: 900,
                        textShadow: '0 0 20px rgba(188, 19, 254, 0.5)'
                    }}
                >
                    <span className="text-[#BC13FE] animate-spin-slow drop-shadow-[0_0_15px_rgba(188,19,254,0.8)] text-4xl md:text-6xl lg:text-8xl"><IconYinYang /></span>
                    
                    <span className="relative inline-block text-center leading-tight bg-clip-text text-transparent animate-[text-flow_3s_linear_infinite]" 
                        style={{ 
                            backgroundImage: 'linear-gradient(90deg, #BC13FE, #FF003C, #04D9FF, #BC13FE)',
                            backgroundSize: '200% auto',
                            filter: 'drop-shadow(0 4px 0px #2E003E) drop-shadow(0 0 30px rgba(188, 19, 254, 0.6))'
                        }}
                    >
                        THIÊN CƠ <br className="block md:hidden" /> BẤT KHẢ LỘ
                    </span>

                    <span className="text-[#04D9FF] animate-spin-slow drop-shadow-[0_0_15px_rgba(4,217,255,0.8)] text-4xl md:text-6xl lg:text-8xl"><IconYinYang /></span>
                </h1>

                <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-neonPurple"></div>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC13FE] via-white to-[#04D9FF] text-[10px] md:text-sm font-bold tracking-[0.6em] uppercase drop-shadow-[0_0_8px_rgba(188,19,254,0.8)] animate-pulse font-sans text-center">
                        {t.subtitle}
                    </p>
                    <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-neonPurple"></div>
                </div>
            </div>

            {/* NEW: X3 Sales Banner */}
            <a href="https://www.youtube.com/watch?v=9u1GRx9updA" target="_blank" rel="noreferrer" className="block w-full max-w-xl mx-auto mb-3 group transform hover:scale-[1.02] transition-transform duration-300">
              <div className="relative bg-gradient-to-r from-red-900 via-red-700 to-red-900 rounded-lg p-2 text-center border border-neonRed shadow-[0_0_15px_#FF003C] overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                 <span className="relative z-10 font-black text-white text-base tracking-widest drop-shadow-md animate-pulse flex items-center justify-center gap-2">
                    🔥 {t.banner_text}
                 </span>
                 <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:left-[100%] transition-all duration-1000"></div>
              </div>
            </a>

            {/* Premium Personal Section - Compacted Vertically */}
            <div className="relative group w-full max-w-5xl mx-auto mt-4">
                {/* Moving Gradient Border */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-neonRed via-neonPurple to-neonBlue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                
                <div className="relative bg-black rounded-2xl p-4 border border-gray-800 flex flex-col items-center text-center space-y-4">
                    <p className="text-gray-300 text-xs font-medium leading-relaxed">
                        Chúc mừng Anh chị <span className="text-neonGold font-bold drop-shadow-[0_0_5px_#FFD700]">( ĐÃ BIẾT TRƯỚC THIÊN CƠ )</span>. 
                        Nếu hài lòng, hãy <span className="text-neonRed font-black text-sm drop-shadow-[0_0_15px_#FF003C] animate-pulse mx-1">{t.lixi_text}</span> lấy lộc nhé!
                    </p>

                    {/* Main Layout Container - SINGLE ROW */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full px-2">
                        
                        {/* LEFT: Facebook */}
                        <a href="https://www.facebook.com/?locale=vi_VN" target="_blank" rel="noreferrer" className="w-full md:flex-1 transform hover:scale-105 transition-transform duration-300 order-2 md:order-1">
                            <div className="flex flex-col items-center justify-center gap-1 p-3 h-full rounded-xl bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/50 hover:bg-blue-800/50 hover:border-blue-400 hover:shadow-[0_0_20px_#3B82F6] transition-all cursor-pointer group/fb min-h-[90px]">
                                <svg className="w-6 h-6 text-blue-400 group-hover/fb:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                <span className="font-bold text-blue-200 text-xs group-hover/fb:text-white mt-1">Tuấn Phạm</span>
                            </div>
                        </a>

                        {/* CENTER: QR Code - Larger and Main Focus */}
                        <div className="relative group/qr transform hover:scale-110 transition-transform duration-300 z-20 mx-2 shrink-0 order-1 md:order-2">
                            <div className="p-1.5 bg-white rounded-lg shadow-[0_0_25px_#FF003C] border-2 border-neonRed relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-scan"></div>
                                <img 
                                    src="https://img.vietqr.io/image/TCB-19035907828017-compact2.png" 
                                    alt="QR Techcombank" 
                                    className="w-24 h-24 object-contain" 
                                />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-neonRed text-white font-black text-[10px] px-3 py-1 rounded-full whitespace-nowrap shadow-[0_0_15px_#FF003C] animate-bounce border border-white/20">
                                {t.lixi_text}
                            </div>
                        </div>

                        {/* RIGHT: 8 Apps VIP - Prominent Button */}
                        <div className="w-full md:flex-1 group transform hover:scale-[1.02] transition-transform duration-300 order-3">
                             <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2E003E] via-[#BC13FE] to-[#2E003E] p-1 shadow-[0_0_30px_#BC13FE] border border-white/20 min-h-[90px] flex items-center justify-center">
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                                
                                <div className="bg-black/40 backdrop-blur-sm rounded-lg w-full h-full py-2 px-3 flex flex-col items-center justify-center gap-1">
                                     <div className="w-10 h-10 border-2 border-dashed border-neonPurple/50 rounded flex items-center justify-center text-neonPurple text-[10px]">
                                        QR BOX
                                     </div>
                                     <span className="font-black text-white text-[10px] md:text-xs tracking-widest uppercase drop-shadow-[0_0_15px_#BC13FE] group-hover:text-[#F3E5F5] text-center">
                                        Quét mã QR để học miễn phí AI
                                     </span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Top Right Controls Container */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              {/* Language Toggle */}
              <button 
                onClick={() => setLang(prev => prev === 'vi' ? 'en' : 'vi')}
                className="px-3 py-1 bg-black/50 rounded-full border border-neonGold/50 hover:border-neonGold hover:text-neonGold hover:shadow-[0_0_15px_#FFD700] transition-all text-neonGold text-xs font-bold uppercase"
              >
                {lang === 'vi' ? 'EN' : 'VI'}
              </button>

              <button 
                onClick={() => setShowHistory(true)}
                className="p-2 bg-black/50 rounded-full border border-neonPurple/50 hover:border-neonBlue hover:text-neonBlue hover:shadow-[0_0_15px_#04D9FF] transition-all text-neonPurple"
                title="Lịch sử"
              >
                <IconHistory />
              </button>
              
              <button 
                onClick={handleLogout}
                className="p-2 bg-black/50 rounded-full border border-neonRed/50 hover:border-neonRed hover:text-neonRed hover:shadow-[0_0_15px_#FF003C] transition-all text-neonRed/80"
                title="Đăng xuất"
              >
                <IconLogout />
              </button>
            </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex-grow">
        
        {/* Niche Grid with Neon Purple 3D Effect - UPDATED VIP STYLE */}
        <div className="mb-12">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-8">
            {(lang === 'vi' ? NICHE_SUGGESTIONS : NICHE_SUGGESTIONS_EN).map((niche, idx) => {
                // Split emoji and text for styling
                const firstSpace = niche.indexOf(' ');
                const emoji = niche.substring(0, firstSpace);
                const text = niche.substring(firstSpace + 1);
                const isActive = selectedNiche === niche; 
                
                return (
                <button
                key={idx}
                onClick={() => handleNicheClick(niche)}
                className={`relative p-1.5 rounded-lg text-left transition-all duration-500 transform hover:scale-[1.05] hover:-translate-y-1 overflow-hidden group border flex flex-col items-center text-center h-full justify-between min-h-[70px]
                    ${isActive 
                        ? 'bg-gradient-to-b from-[#2E003E] via-black to-[#1a0525] border-[#FFD700] shadow-[0_0_20px_#BC13FE,0_0_40px_#04D9FF] z-10 scale-[1.05]' 
                        : 'bg-black/40 backdrop-blur-md border-white/10 hover:border-[#04D9FF] hover:bg-black/60 hover:shadow-[0_0_15px_#BC13FE,inset_0_0_10px_rgba(4,217,255,0.2)]'}
                `}
                >
                {/* Neon Background Lights (Purple, Blue, Yellow) */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#BC13FE] via-[#FFD700] to-[#04D9FF] opacity-50 ${isActive ? 'animate-scan' : 'opacity-20'}`}></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#BC13FE]/10 via-transparent to-transparent pointer-events-none"></div>
                
                {isActive && (
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1 w-full h-full justify-center">
                    {/* Large Emoji with Glow */}
                    <div className={`text-lg md:text-xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.4)] transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 ${isActive ? 'animate-bounce' : ''}`}>
                    {emoji}
                    </div>
                    
                    {/* Text */}
                    <div className="w-full mt-1">
                        <span className={`block text-[7px] md:text-[9px] font-black uppercase leading-tight tracking-wider font-display 
                            ${isActive 
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#04D9FF] via-[#FFD700] to-[#BC13FE] drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]' 
                                : 'text-gray-400 group-hover:text-white transition-colors'}
                        `}>
                            {text}
                        </span>
                    </div>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
                </button>
            )})}
            </div>

            {/* SUB-TOPICS SECTION - APPEARS ON CLICK */}
            {selectedNiche && SUB_TOPICS[selectedNiche] && (
                <div className="animate-fade-in-up mb-8">
                    <div className="relative bg-[#13001C]/90 backdrop-blur-xl border border-neonBlue/50 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(4,217,255,0.2)] overflow-hidden">
                         {/* Moving Border Gradient */}
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonBlue via-white to-neonBlue animate-scan"></div>
                         
                         <h3 className="text-center text-neonBlue text-sm md:text-base font-black tracking-[0.3em] uppercase mb-6 drop-shadow-[0_0_10px_#04D9FF] flex items-center justify-center gap-3">
                            <span className="text-2xl">⚡</span> KHÁM PHÁ CHI TIẾT CHỦ ĐỀ: <span className="text-white">{selectedNiche}</span> <span className="text-2xl">⚡</span>
                         </h3>

                         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {SUB_TOPICS[selectedNiche].map((subTopic, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, topic: subTopic }));
                                        // Optional: Scroll to input or auto-generate? 
                                        // Let's just select it for now as per "Gợi ý"
                                    }}
                                    className={`relative group p-4 rounded-xl border border-neonBlue/30 bg-black/40 hover:bg-neonBlue/10 hover:border-neonBlue transition-all duration-300 flex flex-col items-center justify-center text-center h-full
                                        ${formData.topic === subTopic ? 'bg-neonBlue/20 border-neonBlue shadow-[0_0_20px_rgba(4,217,255,0.3)]' : ''}
                                    `}
                                >
                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💎</div>
                                    <span className="text-xs md:text-sm font-bold text-gray-300 group-hover:text-white leading-snug">
                                        {subTopic}
                                    </span>
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neonBlue/50 rounded-tl-md"></div>
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neonBlue/50 rounded-br-md"></div>
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
            )}
        </div>

        {/* Input Section - 3D Panel */}
        <div className="bg-[#13001C]/80 backdrop-blur-md border border-neonPurple/50 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(188,19,254,0.15)] relative overflow-hidden mb-12 group">
          {/* Neon Border Glow Animation */}
          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-neonPurple/50 transition-colors duration-500 pointer-events-none shadow-[inset_0_0_20px_rgba(188,19,254,0.1)]"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            {/* Left Col - Personal Info */}
            <div className="space-y-6">
                
                {/* Full Name & DOB Block */}
                <div className="space-y-5 bg-black/40 p-6 rounded-2xl border border-neonPurple/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <div>
                        <label className="block text-neonBlue text-xs font-black tracking-widest uppercase mb-3 drop-shadow-[0_0_5px_#04D9FF]">{t.full_name}</label>
                        <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t.name_placeholder}
                        className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 text-white text-lg focus:border-neonBlue focus:shadow-[0_0_15px_#04D9FF] outline-none transition-all placeholder-gray-600"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label className="block text-neonBlue text-xs font-black tracking-widest uppercase mb-3 drop-shadow-[0_0_5px_#04D9FF]">{t.dob}</label>
                             <input 
                                type="date" 
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 text-white focus:border-neonBlue focus:shadow-[0_0_15px_#04D9FF] outline-none transition-all text-sm uppercase"
                             />
                        </div>
                        <div>
                             <label className="block text-neonBlue text-xs font-black tracking-widest uppercase mb-3 drop-shadow-[0_0_5px_#04D9FF]">{t.location}</label>
                             <div className="relative">
                                <input 
                                    type="text" 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder={t.location_placeholder}
                                    className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 pl-10 text-white focus:border-neonBlue focus:shadow-[0_0_15px_#04D9FF] outline-none transition-all placeholder-gray-600"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neonPurple">
                                    <IconMap />
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* NEW: Marital Status & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-neonBlue text-xs font-black tracking-widest uppercase mb-3 drop-shadow-[0_0_5px_#04D9FF]">{t.marital_status}</label>
                            <div className="relative">
                                <select
                                  value={formData.maritalStatus}
                                  onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                                  className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 text-white focus:border-neonBlue focus:shadow-[0_0_15px_#04D9FF] outline-none transition-all appearance-none cursor-pointer"
                                >
                                  {(lang === "vi" ? MARITAL_STATUS_OPTIONS : MARITAL_STATUS_OPTIONS_EN).map(status => (
                                    <option key={status} value={status} className="bg-black text-white">{status}</option>
                                  ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neonBlue">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-neonBlue text-xs font-black tracking-widest uppercase mb-3 drop-shadow-[0_0_5px_#04D9FF]">{t.gender}</label>
                            <div className="relative">
                                <select
                                  value={formData.gender}
                                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                  className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 text-white focus:border-neonBlue focus:shadow-[0_0_15px_#04D9FF] outline-none transition-all appearance-none cursor-pointer"
                                >
                                  {(lang === "vi" ? GENDER_OPTIONS : GENDER_OPTIONS_EN).map(gender => (
                                    <option key={gender} value={gender} className="bg-black text-white">{gender}</option>
                                  ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neonBlue">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                         <label className="block text-neonBlue text-xs font-black tracking-widest uppercase mb-3 drop-shadow-[0_0_5px_#04D9FF]">{t.current_job}</label>
                         <div className="relative">
                            <input 
                                type="text" 
                                name="currentJob"
                                value={formData.currentJob}
                                onChange={handleInputChange}
                                placeholder={t.current_job_placeholder}
                                className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 pl-10 text-white focus:border-neonBlue focus:shadow-[0_0_15px_#04D9FF] outline-none transition-all placeholder-gray-600"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neonPurple">
                                <IconBriefcase />
                            </div>
                         </div>
                    </div>
                </div>
              
                {/* Zodiac Block - Full Width */}
                <div className="bg-black/40 p-6 rounded-2xl border border-neonPurple/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <div>
                    <label className="block text-neonGold text-xs font-black tracking-widest uppercase mb-3 text-center text-lg">Con Giáp Của Bạn</label>
                    <select 
                        name="zodiac"
                        value={formData.zodiac}
                        onChange={handleInputChange}
                        className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 text-white text-center text-xl font-bold focus:border-neonGold focus:shadow-[0_0_15px_#FFD700] outline-none appearance-none"
                    >
                        {(lang === "vi" ? ZODIAC_OPTIONS : ZODIAC_OPTIONS_EN).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    </div>
                </div>
            </div>

            {/* Right Col - Topic & Super Chat */}
            <div className="space-y-6">
               <div className="bg-black/40 p-6 rounded-2xl border border-neonPurple/30 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between">
                   <div className="mb-6">
                        <label className="block text-neonPurple text-xs font-black tracking-widest uppercase mb-3 drop-shadow-[0_0_5px_#BC13FE]">Chủ Đề Chính</label>
                        <select 
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className="w-full bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 text-white text-lg focus:border-neonPurple focus:shadow-[0_0_15px_#BC13FE] outline-none appearance-none font-bold"
                        >
                            {(lang === "vi" ? TOPIC_OPTIONS : TOPIC_OPTIONS_EN).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            {!TOPIC_OPTIONS.includes(formData.topic) && <option value={formData.topic}>{formData.topic}</option>}
                        </select>
                   </div>
                   
                   <div className="flex-grow">
                        <label className="block text-neonRed text-xs font-black tracking-widest uppercase mb-3 flex items-center gap-2 drop-shadow-[0_0_5px_#FF003C]">
                        <IconSparkles /> 
                        {t.super_chat}
                        </label>
                        <textarea 
                            name="superChat"
                            value={formData.superChat}
                            onChange={handleInputChange}
                            placeholder={t.super_chat_placeholder}
                            className="w-full h-40 bg-[#0A0010] border border-neonPurple/30 rounded-lg p-4 text-white focus:border-neonRed focus:shadow-[0_0_15px_#FF003C] outline-none transition-all resize-none"
                        />
                   </div>
               </div>
            </div>
          </div>

          <div className="relative z-10">
            <NeonButton 
                fullWidth 
                onClick={() => handleGenerate()} 
                disabled={loading}
                className="rounded-xl shadow-[0_0_30px_#BC13FE] border-neonPurple hover:bg-neonPurple hover:shadow-[0_0_50px_#BC13FE]"
            >
                {loading ? (
                <span className="flex items-center gap-3 animate-pulse">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {t.generating}
                </span>
                ) : (
                t.generate_button
                )}
            </NeonButton>
          </div>
        </div>

        {/* Result Section - 3D Neon Container */}
        {result && (
          <div ref={resultRef} className="animate-fade-in-up">
            <div className="bg-[#0A0010] border-2 border-neonGold rounded-3xl p-8 md:p-12 shadow-[0_0_80px_rgba(188,19,254,0.25)] relative overflow-hidden">
              {/* Internal Glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neonGold/5 to-transparent pointer-events-none"></div>

              {/* NEW: Tet Celebration Box - Top of Result - Compacted */}
              <div className="relative z-20 mb-6 group max-w-xl mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 rounded-xl blur opacity-70 animate-gradient-xy"></div>
                  <div className="relative bg-[#1a0505] rounded-xl p-4 border border-yellow-500/50 text-center shadow-[inset_0_0_20px_rgba(255,0,60,0.3)]">
                      <h3 className="text-xl md:text-2xl font-black text-neonGold mb-2 uppercase drop-shadow-[0_0_5px_#FFD700] tracking-widest">
                          ✨ CHÚC MỪNG NĂM MỚI 2026 ✨
                      </h3>
                      <p className="text-gray-200 mb-4 text-xs md:text-sm italic mx-auto leading-relaxed">
                          "Tuấn Master App kính chúc <span className="text-neonBlue font-bold">{formData.fullName || 'Quý gia chủ'}</span> một năm mới An Khang Thịnh Vượng - Vạn Sự Như Ý - Tấn Tài Tấn Lộc! Cảm ơn bạn đã tin tưởng sử dụng dịch vụ."
                      </p>
                      
                      <div className="flex flex-col items-center justify-center gap-2">
                          <div className="p-1 bg-white rounded-lg shadow-[0_0_20px_#FFD700] transform group-hover:scale-105 transition-transform duration-300">
                               <img 
                                  src="https://img.vietqr.io/image/TCB-19035907828017-compact2.png" 
                                  alt="QR Lì Xì" 
                                  className="w-24 h-24 object-contain" 
                              />
                          </div>
                          <div className="inline-block bg-neonRed text-white font-black text-[10px] md:text-xs px-4 py-1.5 rounded-full shadow-[0_0_15px_#FF003C] animate-bounce mt-1 border border-white/20">
                              🧧 LÌ XÌ LẤY HÊN ĐẦU NĂM 🧧
                          </div>
                      </div>
                  </div>
              </div>

              {/* Action Bar */}
              <div className="relative z-10 flex flex-wrap gap-4 justify-between items-center mb-10 border-b border-neonPurple/20 pb-6">
                 <div className="flex flex-wrap items-center gap-4">
                    {audioUrl && (
                      <>
                        <div className="flex items-center gap-3 bg-black/80 rounded-full px-5 py-3 border border-neonRed/50 shadow-[0_0_15px_rgba(255,0,60,0.3)] animate-fade-in-up">
                          <button 
                            onClick={toggleAudio}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-neonRed text-white hover:shadow-[0_0_25px_#FF003C] hover:scale-110 transition-all"
                          >
                            {isPlaying ? <IconPause /> : <IconPlay />}
                          </button>
                          <div className="text-sm">
                            <div className="text-neonRed font-bold tracking-widest">NGHE LUẬN GIẢI</div>
                            <div className="text-xs text-gray-400">Giọng Nữ Korea Premium</div>
                          </div>
                          <audio 
                            ref={audioRef} 
                            src={audioUrl} 
                            onEnded={handleAudioEnded}
                            preload="auto"
                            className="hidden" 
                          />
                        </div>

                        {/* DOWNLOAD AUDIO BUTTON */}
                        <NeonButton 
                           variant="secondary" 
                           onClick={handleDownloadAudio} 
                           className="text-xs py-3 px-5 rounded-full"
                        >
                            <span className="flex items-center gap-2 font-bold whitespace-nowrap">
                              <IconMusic /> TẢI AUDIO MP3
                            </span>
                        </NeonButton>
                      </>
                    )}
                    {!audioUrl && result.text.length > 50 && (
                         <div className="text-xs text-gray-400 italic animate-pulse">Đang tạo giọng đọc AI...</div>
                    )}
                 </div>
                 
                 <NeonButton variant="secondary" onClick={handleExport} className="text-sm py-3 px-6 rounded-lg">
                    <span className="flex items-center gap-2 font-bold">
                       <IconDownload /> TẢI FILE DOC
                    </span>
                 </NeonButton>
              </div>

              {/* Content */}
              <div className="relative z-10 markdown-content">
                <ReactMarkdown>
                  {result.text}
                </ReactMarkdown>
                {/* Cursor Effect when streaming */}
                {loading && (
                    <span className="inline-block w-2 h-5 bg-neonGold animate-pulse ml-1 align-middle"></span>
                )}
              </div>

              {/* NEXT TOPIC THUMBNAIL CARD - VIP PRO */}
              {nextTopic && !loading && (
                  <div 
                    onClick={() => handleDeepDive(nextTopic)}
                    className="relative z-20 mt-12 group cursor-pointer animate-fade-in-up transform transition-all hover:scale-[1.01]"
                  >
                      {/* Animated Border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-neonRed via-white to-neonBlue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
                      
                      <div className="relative bg-[#05000A] rounded-2xl p-1 overflow-hidden">
                          <div className="bg-gradient-to-r from-[#1a0525] to-black rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                              {/* Thumbnail Image Placeholder */}
                              <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 border border-white/20 shadow-lg group-hover:shadow-[0_0_20px_#04D9FF] transition-all">
                                  <div className="absolute inset-0 bg-gradient-to-br from-neonPurple/40 to-black/80 z-10"></div>
                                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                                  <div className="absolute inset-0 flex items-center justify-center z-20">
                                      <IconNext />
                                  </div>
                                  <div className="absolute bottom-2 left-2 z-20 bg-neonRed text-white text-[10px] font-black px-2 py-0.5 rounded animate-pulse">
                                      DEEP DIVE
                                  </div>
                              </div>

                              {/* Text Content */}
                              <div className="flex-1 text-center md:text-left">
                                  <p className="text-neonBlue text-xs font-black tracking-[0.2em] uppercase mb-2 drop-shadow-[0_0_5px_#04D9FF]">
                                      CHỦ ĐỀ CHUYÊN SÂU TIẾP THEO
                                  </p>
                                  <h4 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-neonGold transition-colors mb-3 leading-tight">
                                      {nextTopic}
                                  </h4>
                                  <div className="inline-flex items-center gap-2 text-gray-400 text-sm group-hover:text-white transition-colors">
                                      <span>Xem chi tiết phân tích</span>
                                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {/* Footer Badge */}
              <div className="mt-12 pt-8 border-t border-neonPurple/20 text-center">
                  <span className="inline-block px-4 py-1 border border-neonPurple/50 rounded-full text-xs text-neonPurple tracking-[0.2em] uppercase shadow-[0_0_10px_#BC13FE]">
                    Tuấn Master App Prediction 2026
                  </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-900 bg-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neonRed to-transparent animate-pulse"></div>
        <p className="text-gray-500 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-2">
            {t.copyright} <span className="text-neonGold drop-shadow-[0_0_5px_#FFD700] mx-1">Tuấn Phạm</span>
        </p>
        <p className="text-gray-700 text-[10px] tracking-widest opacity-70">
            {t.prohibited}
        </p>
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-neonPurple/5 to-transparent pointer-events-none"></div>
      </footer>

      {/* History Sidebar */}
      <HistorySidebar 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        history={history}
        onSelect={loadHistoryItem}
      />
      
      {/* Overlay when sidebar open */}
      {showHistory && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setShowHistory(false)}
        ></div>
      )}
    </div>
  );
}

export default App;

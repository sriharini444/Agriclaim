import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  FileCheck, 
  CloudRain, 
  Camera, 
  Satellite, 
  BrainCircuit, 
  ShieldCheck, 
  FileSpreadsheet,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VerificationProgressModal({ isOpen, onComplete, lang = 'en' }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isTamil = lang === 'ta';

  const steps = [
    {
      id: 'docs',
      icon: FileCheck,
      titleEn: 'Verifying Land Records & Patta',
      titleTa: 'நில உரிமை & பட்டா ஆவணங்களை சரிபார்க்கிறது',
      detailEn: 'Matching Survey No. with State Land Registry...',
      detailTa: 'நில சர்வே எண்ணை அரசு பதிவேட்டுடன் ஒப்பிடுகிறது...',
    },
    {
      id: 'weather',
      icon: CloudRain,
      titleEn: 'Querying Historical Weather & IMD Radar',
      titleTa: 'வானிலை மையம் & ரேடார் மழையளவை பெறுகிறது',
      detailEn: 'Analyzing precipitation, wind speed, and cyclone vectors...',
      detailTa: 'மழைப்பொழிவு மற்றும் காற்றின் தீவிரத்தை சரிபார்க்கிறது...',
    },
    {
      id: 'vision',
      icon: Camera,
      titleEn: 'Computer Vision Crop Image Inspection',
      titleTa: 'AI படப் பகுப்பாய்வு - பயிர் சேத ஆய்வு',
      detailEn: 'Detecting crop species, damage severity %, and foliage distress...',
      detailTa: 'பயிர் வகை, சேத தீவிரம் மற்றும் பாதிப்புகளை கணக்கிடுகிறது...',
    },
    {
      id: 'satellite',
      icon: Satellite,
      titleEn: 'Computing Sentinel-2 Satellite NDVI',
      titleTa: 'செயற்கைக்கோள் NDVI தாவர ஆரோக்கிய குறியீடு',
      detailEn: 'Comparing pre-damage vs post-damage spectral biomass...',
      detailTa: 'சேதத்திற்கு முந்தைய மற்றும் பிந்தைய பயிர் வளர்ச்சியை ஒப்பிடுகிறது...',
    },
    {
      id: 'matrix',
      icon: BrainCircuit,
      titleEn: 'Multi-Factor Damage Cause Analysis',
      titleTa: 'பல காரணி சேத காரண பகுப்பாய்வு',
      detailEn: 'Disentangling weather vs wildlife vs natural calamity...',
      detailTa: 'வானிலை, விலங்கு சேதம் மற்றும் பேரிடர் காரணிகளை பகுப்பாய்வு செய்கிறது...',
    },
    {
      id: 'fraud',
      icon: ShieldCheck,
      titleEn: 'Integrity & Anomaly Screening',
      titleTa: 'மோசடி மற்றும் முரண்பாடுகள் சோதனை',
      detailEn: 'GPS spatial bounding, duplicate check, and metadata screening...',
      detailTa: 'GPS இருப்பிட பொருத்தம் மற்றும் பட முரண்பாடுகளை சோதிக்கிறது...',
    },
    {
      id: 'report',
      icon: FileSpreadsheet,
      titleEn: 'Synthesizing Preliminary Report & Payout Estimate',
      titleTa: 'முதற்கட்ட அறிக்கை & இழப்பீட்டு மதிப்பீட்டை உருவாக்குகிறது',
      detailEn: 'Finalizing bilingual recommendations for field review...',
      detailTa: 'விவசாயி அறிக்கை மற்றும் காப்பீட்டு பரிந்துரைகளை தயார் செய்கிறது...',
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          try {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch (e) {
            // Ignore if canvas confetti not supported
          }
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-8 overflow-hidden relative">
        
        {/* Top Glow bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-agri-500 via-emerald-400 to-amber-400 animate-pulse"></div>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-agri-100 text-agri-700 flex items-center justify-center shadow-inner mb-3">
            <BrainCircuit className="w-8 h-8 animate-pulse text-agri-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {isTamil ? 'AI பயிர் சரிபார்ப்பு நடைபெறுகிறது' : 'Agriclaim AI Multi-Modal Engine'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isTamil 
              ? 'வானிலை, செயற்கைக்கோள், பட ஆய்வு மற்றும் காரண பகுப்பாய்வு ஒருங்கிணைக்கப்படுகிறது...' 
              : 'Synthesizing weather data, optical imagery, satellite NDVI, and causation matrix...'}
          </p>
        </div>

        {/* Steps Progression Pipeline */}
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                    : isCurrent 
                    ? 'bg-agri-100/70 border-agri-300 shadow-sm scale-[1.02]' 
                    : 'bg-slate-50 border-slate-200/60 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-8 h-8 rounded-xl bg-agri-600 text-white flex items-center justify-center shadow-md animate-spin">
                      <Loader2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-agri-900 font-extrabold' : ''}`}>
                    {isTamil ? step.titleTa : step.titleEn}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {isTamil ? step.detailTa : step.detailEn}
                  </p>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-bold text-agri-700 bg-agri-200 px-2 py-0.5 rounded-full animate-pulse">
                    {isTamil ? 'செயலாக்கம்' : 'Active'}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>{isTamil ? 'செயல்முறை முன்னேற்றம்' : 'Engine Progress'}</span>
          <span className="font-bold text-agri-700 font-mono">
            {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
          </span>
        </div>

      </div>
    </div>
  );
}

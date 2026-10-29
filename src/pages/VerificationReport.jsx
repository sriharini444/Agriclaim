import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CloudRain, 
  Camera, 
  Satellite, 
  ShieldCheck, 
  ShieldAlert, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ArrowLeft,
  Coins,
  BrainCircuit,
  Info,
  PawPrint,
  Flame,
  Leaf,
  ChevronRight,
  BadgeCheck,
  Flag,
  RefreshCw,
  IdCard
} from 'lucide-react';
import { voiceService } from '../services/voiceAssistantService';
import { translations } from '../translations';
import SatelliteNdviViewer from '../components/SatelliteNdviViewer';
import DamageCauseBadge from '../components/DamageCauseBadge';

/* ─── helpers ─── */
const maskAadhaar = (raw) => {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 4) return raw;
  return `••••-••••-${digits.slice(-4)}`;
};

const isScenario2 = (claim) =>
  claim?.id === 'SCN-ANTMAL-02' || claim?.scenarioKey === 'animal_sugarcane';

const consistencyStatusStyle = (status) => {
  if (status === 'PASS') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  if (status === 'REDIRECT') return 'bg-amber-100 text-amber-800 border-amber-300';
  if (status === 'FLAG') return 'bg-rose-100 text-rose-800 border-rose-300';
  return 'bg-slate-100 text-slate-600 border-slate-300';
};

const consistencyStatusIcon = (status) => {
  if (status === 'PASS') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
  if (status === 'REDIRECT') return <RefreshCw className="w-3.5 h-3.5 text-amber-600" />;
  if (status === 'FLAG') return <Flag className="w-3.5 h-3.5 text-rose-600" />;
  return <Info className="w-3.5 h-3.5 text-slate-400" />;
};

const animalEvidenceColor = (color) => {
  const map = {
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    red: 'bg-rose-50 border-rose-200 text-rose-800',
    blue: 'bg-sky-50 border-sky-200 text-sky-800',
  };
  return map[color] || 'bg-slate-50 border-slate-200 text-slate-800';
};

const confidenceBar = (pct, color = 'agri') => {
  const barColor = {
    amber: 'bg-amber-500',
    orange: 'bg-orange-500',
    red: 'bg-rose-500',
    blue: 'bg-sky-500',
    agri: 'bg-agri-600',
  }[color] || 'bg-agri-600';
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[10px] font-bold text-slate-600 w-8 text-right">{pct}%</span>
    </div>
  );
};

export default function VerificationReport({ claim, onBack, lang = 'en' }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;
  const isAnimalScenario = isScenario2(claim);

  if (!claim) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500 font-medium">No claim selected to generate report.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-agri-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const { farmerData, verificationResult, id } = claim;
  const vr = verificationResult;

  const handleSpeakSummary = () => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = isTamil 
      ? `அக்ரிகிளைம் முதற்கட்ட சரிபார்ப்பு அறிக்கை. விவசாயி ${farmerData.farmerName}, பயிர் ${farmerData.cropName}. AI கணக்கிட்ட சேத தீவிரம் ${vr.aiDetectedSeverity} சதவீதம். காரண பகுப்பாய்வு: ${vr.damageCauseLabelTa}. ${vr.schemeRecommendation.nextStepTamil}`
      : `Agriclaim Preliminary Verification Report for Farmer ${farmerData.farmerName}, Crop ${farmerData.cropName}. AI detected severity ${vr.aiDetectedSeverity} percent. Damage classification: ${vr.damageCauseLabel}. ${vr.schemeRecommendation.nextStepEnglish}`;

    setIsSpeaking(true);
    voiceService.speak(textToSpeak, lang, () => {
      setIsSpeaking(false);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  /* ── Aadhaar masking: use stored masked value or derive from farmerId ── */
  const maskedAadhaar = farmerData.aadhaarMasked || maskAadhaar(farmerData.farmerId) || '••••-••••-XXXX';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 print:p-0 print:space-y-4">
      
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-3 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.report.backToDashboard}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakSummary}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              isSpeaking 
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse' 
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span>{isSpeaking ? (isTamil ? 'நிறுத்து' : 'Stop Audio') : t.report.spokenAudio}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{t.report.printReport}</span>
          </button>
        </div>
      </div>

      {/* ── MAIN REPORT SHEET ── */}
      <div className="bg-white rounded-3xl border border-slate-300/80 shadow-lg p-6 sm:p-10 space-y-8 relative overflow-hidden print:border-none print:shadow-none print:p-4">
        
        {/* Watermark */}
        <div className="absolute right-8 top-8 opacity-5 pointer-events-none select-none">
          <BrainCircuit className="w-64 h-64 text-agri-950" />
        </div>

        {/* ── Report Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-agri-600 text-white flex items-center justify-center font-bold shadow-xs">
                🌿
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Agri<span className="text-agri-600">claim</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Tamil Nadu Agriculture & Crop Insurance AI Cell
                </p>
              </div>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-700 mt-2">
              {t.report.title}
            </h2>
          </div>

          <div className="text-left sm:text-right font-mono">
            <div className="text-xs text-slate-400 font-semibold">{t.report.claimId}</div>
            <div className="text-base sm:text-lg font-extrabold text-agri-800">{id}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </div>
          </div>
        </div>

        {/* ── AI Preliminary Notice ── */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
          <span>
            <strong>{isTamil ? 'முதற்கட்ட AI கண்டறிதல் மட்டுமே:' : 'Preliminary AI Findings Only:'}</strong>{' '}
            {isTamil
              ? 'இந்த அறிக்கையில் உள்ள அனைத்து AI கண்டறிதல்களும் மனித அலுவலர் இறுதி ஒப்புதலுக்கு முன் முதற்கட்டமாகவே கருதப்படும். இது தனிமனித ஆதார் அல்லது காப்பீட்டு தீர்வை உறுதிப்படுத்தாது.'
              : 'All AI findings in this report are preliminary and must be reviewed by an authorized field officer before final settlement. This does not guarantee Aadhaar verification or insurance approval.'}
          </span>
        </div>

        {/* ── Farmer & Land Profile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <div>
            <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
              {t.report.farmerDetails}
            </span>
            <p className="text-slate-900 font-extrabold text-sm">{farmerData.farmerName}</p>
            {/* Masked Aadhaar */}
            <p className="text-slate-600 flex items-center gap-1 mt-0.5">
              <IdCard className="w-3 h-3 text-agri-600" />
              <span>
                {isTamil ? 'ஆதார்:' : 'Aadhaar:'}{' '}
                <span className="font-mono font-bold tracking-wider">{maskedAadhaar}</span>
                <span className="ml-1 text-[10px] text-slate-400">(masked)</span>
              </span>
            </p>
            <p className="text-slate-600 mt-0.5">ID: {farmerData.farmerId} • Ph: {farmerData.mobileNumber}</p>
            <p className="text-slate-600 mt-0.5">
              {isTamil ? 'வருமானம்:' : 'Income:'} ₹{Number(farmerData.annualIncome).toLocaleString('en-IN')} ({farmerData.otherIncome})
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">
              {t.report.landDetails}
            </span>
            <p className="text-slate-900 font-extrabold text-sm">
              Survey No: {farmerData.surveyNumber} ({farmerData.landArea} Acres)
            </p>
            <p className="text-slate-600">{farmerData.village}, {farmerData.district}, {farmerData.state}</p>
            <p className="text-slate-600 font-mono text-[11px] mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-agri-600" />
              <span>GPS: {Number(farmerData.lat).toFixed(4)}° N, {Number(farmerData.lng).toFixed(4)}° E</span>
            </p>
          </div>
        </div>

        {/* ── Claim Details ── */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
          <span className="font-bold text-slate-400 uppercase text-[10px] block">{t.report.cropDamageDetails || 'Crop & Damage Details'}</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-slate-500 block">{isTamil ? 'பயிர்' : 'Crop'}</span>
              <span className="font-bold text-slate-800">{farmerData.cropName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isTamil ? 'சேத தேதி' : 'Damage Date'}</span>
              <span className="font-bold text-slate-800">{new Date(farmerData.damageDateTime).toLocaleDateString('en-IN')}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isTamil ? 'பயிர் பரப்பு' : 'Crop Area'}</span>
              <span className="font-bold text-slate-800">{farmerData.cropArea} Acres</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isTamil ? 'விவசாயி மதிப்பிட்ட சேதம்' : "Farmer's Est. Damage"}</span>
              <span className="font-bold text-slate-800">{farmerData.estimatedPercentage}%</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isTamil ? 'கூறப்பட்ட காரணம்' : 'Reported Cause'}</span>
              <span className="font-bold text-slate-800">{farmerData.damageType}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isTamil ? 'AI கண்டறிந்த சேதம்' : 'AI Detected Loss'}</span>
              <span className="font-bold text-agri-700">{vr.aiDetectedSeverity}%</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200">
            <span className="text-slate-500 block mb-0.5">{isTamil ? 'விவசாயி விளக்கம்' : "Farmer's Description"}</span>
            <p className="text-slate-700 italic text-[11px]">"{isTamil ? farmerData.farmerDescriptionTa || farmerData.farmerDescription : farmerData.farmerDescription}"</p>
          </div>
        </div>

        {/* ── PRIMARY DAMAGE CAUSE ANALYSIS ── */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {t.analysis.damageCauseTitle}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {isTamil ? vr.damageCauseLabelTa : vr.damageCauseLabel}
              </h3>
            </div>
            <DamageCauseBadge 
              classification={vr.damageCauseClassification} 
              lang={lang} 
              size="normal" 
            />
          </div>

          {/* Synthesis Explanation */}
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs sm:text-sm text-emerald-100 leading-relaxed">
            <span className="font-bold text-amber-300 block mb-1">
              {isTamil ? 'காரண பகுப்பாய்வு விளக்கம்:' : 'Multi-Factor Cause Synthesis:'}
            </span>
            {isTamil ? vr.damageCauseAnalysis.synthesisSummaryTa : vr.damageCauseAnalysis.synthesisSummary}
          </div>

          {/* Factor breakdown pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 block">{isTamil ? 'வானிலை சான்று' : 'Weather Match'}</span>
              <span className="font-bold text-white">{vr.weatherData.rainfallMm} mm ({vr.damageCauseAnalysis.weatherFactorConfidence}%)</span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 block">{isTamil ? 'விலங்கு சேத காரணி' : 'Animal Factor'}</span>
              <span className="font-bold text-white">{vr.damageCauseAnalysis.animalDamageDetected ? `Detected (${vr.damageCauseAnalysis.animalFactorConfidence}%)` : 'None (<5%)'}</span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 block">{isTamil ? 'செயற்கைக்கோள் NDVI' : 'Satellite Drop'}</span>
              <span className="font-bold text-white">{vr.satelliteData.beforeNdvi} → {vr.satelliteData.afterNdvi}</span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 block">{isTamil ? 'AI பார்வை தீவிரம்' : 'Vision Severity'}</span>
              <span className="font-bold text-emerald-300">{vr.aiDetectedSeverity}% Loss</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* SCENARIO 2 EXTENDED SECTIONS: Wild Boar Evidence           */}
        {/* ════════════════════════════════════════════════════════════ */}
        {isAnimalScenario && vr.animalEvidenceSections && (
          <div className="space-y-4">
            {/* Section header */}
            <div className="flex items-center gap-2 pb-2 border-b-2 border-amber-200">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <PawPrint className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {isTamil ? 'வனவிலங்கு சேத சான்றுகள் — விரிவான பகுப்பாய்வு' : 'Wildlife Damage Evidence — Detailed Analysis'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {isTamil
                    ? '[SIMULATED IMAGE ANALYSIS] உண்மையான AI பட பகுப்பாய்வு முடிவுகள் அல்ல'
                    : '[SIMULATED IMAGE ANALYSIS] Not real AI model output — demo data for prototype'}
                </p>
              </div>
            </div>

            {/* Evidence cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vr.animalEvidenceSections.map((ev, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border ${animalEvidenceColor(ev.color)} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{ev.icon}</span>
                      <h4 className="font-bold text-sm">{isTamil ? ev.labelTa : ev.label}</h4>
                    </div>
                    <span className="text-[10px] font-bold bg-white/60 px-2 py-0.5 rounded-full">
                      {isTamil ? 'நம்பகத்தன்மை' : 'Confidence'}: {ev.confidence}%
                    </span>
                  </div>
                  {confidenceBar(ev.confidence, ev.color)}
                  <p className="text-[11px] leading-relaxed mt-1">
                    {isTamil ? ev.findingsTa : ev.findings}
                  </p>
                </div>
              ))}
            </div>

            {/* Animal vs Weather Classification banner */}
            <div className="p-4 bg-gradient-to-r from-amber-900 to-orange-900 text-white rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <PawPrint className="w-4 h-4" />
                <span>{isTamil ? 'சேத வகைப்படுத்தல்: விலங்கு vs இயற்கை பேரிடர்' : 'Damage Classification: Animal vs Natural Disaster'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="font-bold text-rose-300 mb-1">
                    {isTamil ? '❌ இயற்கை பேரிடர் (நிராகரிப்பு)' : '❌ Natural Disaster (Ruled Out)'}
                  </div>
                  <div className="text-white/80 text-[11px]">
                    {isTamil
                      ? 'வானிலை தீவிரம் போதுமான அளவு இல்லை. கரும்பு சாய்க்க குறைந்தது 60 km/h காற்று தேவை — பதிவிட்ட காற்று வேகம் 14 km/h மட்டுமே.'
                      : 'Weather intensity insufficient. Sugarcane lodging requires ≥60 km/h wind — recorded: 14 km/h only.'}
                  </div>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="font-bold text-emerald-300 mb-1">
                    {isTamil ? '✅ வனவிலங்கு சேதம் (உறுதிசெய்யப்பட்டது)' : '✅ Wildlife Damage (Confirmed)'}
                  </div>
                  <div className="text-white/80 text-[11px]">
                    {isTamil
                      ? 'காட்டுப்பன்றி கடி தடங்கள், மூக்கால் தோண்டல் குழிகள், கூட்ட மிதிப்பு தடங்கள் — 91% நம்பகத்தன்மையுடன் உறுதிசெய்யப்பட்டது.'
                      : 'Wild boar bite marks, snout-digging pits, herd trampling patterns — confirmed at 91% confidence.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Satellite NDVI Section ── */}
        <SatelliteNdviViewer satelliteData={vr.satelliteData} lang={lang} />

        {/* ── Evidence Cards: Weather, Vision, Fraud ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Weather */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <CloudRain className="w-4 h-4" />
              <span>{t.analysis.weatherSummary}</span>
            </div>
            <p className="font-bold text-slate-800">{vr.weatherData.weatherStatus}</p>
            <p className="text-slate-500">Station: {vr.weatherData.location}</p>
            <div className="pt-2 border-t border-slate-100 space-y-1 text-slate-600">
              <div>Rainfall: <span className="font-bold text-slate-800">{vr.weatherData.rainfallMm} mm</span> ({vr.weatherData.deviationPct})</div>
              <div>Wind Speed: <span className="font-bold text-slate-800">{vr.weatherData.windSpeedKmh} km/h</span></div>
            </div>
            {isAnimalScenario && (
              <div className="pt-2 border-t border-amber-100">
                <p className="text-amber-700 font-bold text-[10px] uppercase">⚠ Weather Contradiction:</p>
                <p className="text-amber-600 text-[10px] mt-0.5">{vr.weatherData.weatherMatch}</p>
              </div>
            )}
          </div>

          {/* Vision */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-agri-700 font-bold">
              <Camera className="w-4 h-4" />
              <span>{t.analysis.visionSummary}</span>
            </div>
            <p className="font-bold text-slate-800">{vr.visionData.cropIdentified}</p>
            <p className="text-slate-600 leading-tight">
              {isTamil
                ? (vr.visionData.detailsTa || vr.visionData.details)
                : (vr.visionData.detailsEn || vr.visionData.details)}
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-1 text-slate-600">
              <div>Confidence: <span className="font-bold text-emerald-700">{vr.confidence}%</span></div>
              <div>Visual Loss: <span className="font-bold text-slate-800">{vr.visionData.visualDamageScore}</span></div>
              {vr.visionData.mechanicalAnimalTrampling && (
                <div className="text-amber-700 font-bold">🐾 Animal trampling detected</div>
              )}
            </div>
          </div>

          {/* Fraud Screening */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-purple-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.analysis.fraudSummary}</span>
            </div>
            <p className={`font-bold ${vr.fraudRisk.score > 50 ? 'text-rose-700' : 'text-emerald-700'}`}>
              {isTamil ? vr.fraudRisk.levelTa : vr.fraudRisk.level}
            </p>
            <ul className="space-y-1 text-slate-600 text-[11px] list-disc list-inside">
              {vr.fraudRisk.reasons.slice(0, 3).map((r, i) => (
                <li key={i} className="leading-tight">{r}</li>
              ))}
            </ul>
            {/* Fraud risk score bar */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span>{isTamil ? 'அபாய மதிப்பு' : 'Risk Score'}</span>
                <span className="font-bold">{vr.fraudRisk.score}/100</span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${vr.fraudRisk.score > 50 ? 'bg-rose-500' : vr.fraudRisk.score > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${vr.fraudRisk.score}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* SCENARIO 2: DATA CONSISTENCY CHECKS                        */}
        {/* ════════════════════════════════════════════════════════════ */}
        {isAnimalScenario && vr.consistencyChecks && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <BadgeCheck className="w-5 h-5 text-agri-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                {isTamil ? 'தரவு நிலைத்தன்மை சரிபார்ப்பு' : 'Data Consistency Checks'}
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border">
                {vr.consistencyChecks.filter(c => c.status === 'PASS').length}/{vr.consistencyChecks.length} {isTamil ? 'தேர்ச்சி' : 'Passed'}
              </span>
            </div>
            <div className="space-y-2">
              {vr.consistencyChecks.map((chk, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex-shrink-0 mt-0.5">{consistencyStatusIcon(chk.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800">{chk.label}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${consistencyStatusStyle(chk.status)}`}>
                        {chk.status}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-0.5">{chk.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Explainable Confidence Score ── */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 text-xs">
          <h4 className="font-bold text-amber-300 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" />
            {isTamil ? 'விளக்கமான AI நம்பகத்தன்மை மதிப்பெண் (Explainable Confidence Score)' : 'Explainable AI Confidence Score & Risk Level'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: isTamil ? 'மொத்த AI நம்பகம்' : 'Overall AI Confidence', value: `${vr.confidence}%`, color: 'text-emerald-300' },
              { label: isTamil ? 'வானிலை காரணி' : 'Weather Factor', value: `${vr.damageCauseAnalysis.weatherFactorConfidence}%`, color: 'text-sky-300' },
              { label: isTamil ? 'விலங்கு காரணி' : 'Animal Factor', value: `${vr.damageCauseAnalysis.animalFactorConfidence}%`, color: 'text-amber-300' },
              { label: isTamil ? 'மோசடி அபாயம்' : 'Fraud Risk Score', value: `${vr.fraudRisk.score}/100`, color: vr.fraudRisk.score > 50 ? 'text-rose-300' : 'text-emerald-300' }
            ].map((s, i) => (
              <div key={i} className="bg-white/10 p-2.5 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400">{s.label}</div>
                <div className={`font-extrabold text-base mt-0.5 ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-[10px]">
            {isTamil
              ? '⚠ இந்த மதிப்பெண்கள் SIMULATED DATA ஆகும். உண்மையான AI மாதிரி ஒருங்கிணைக்கப்படும் போது புதுப்பிக்கப்படும்.'
              : '⚠ These scores are based on SIMULATED data. Values will be updated when a real AI model is integrated.'}
          </p>
        </div>

        {/* ── Scheme Recommendation ── */}
        <div className="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              {isTamil ? 'பரிந்துரைக்கப்படும் காப்பீட்டுத் திட்டம்' : 'Recommended Insurance / Relief Scheme'}
            </span>
            <h4 className="font-extrabold text-slate-900 text-base mt-0.5">
              {isTamil ? vr.schemeRecommendation.schemeNameTa : vr.schemeRecommendation.schemeName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {isTamil ? vr.schemeRecommendation.eligibilityStatusTa : vr.schemeRecommendation.eligibilityStatus}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">
              {isTamil ? 'மதிப்பிடப்பட்ட முதற்கட்ட இழப்பீடு' : 'Estimated Preliminary Relief'}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-agri-800">
              {isTamil ? vr.schemeRecommendation.estimatedCompensationTa : vr.schemeRecommendation.estimatedCompensation}
            </span>
          </div>
        </div>

        {/* ── Recommended Next Steps ── */}
        {isAnimalScenario && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2 text-xs">
            <h4 className="font-bold text-amber-900 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              {isTamil ? 'அடுத்த படிகள் & பரிந்துரைகள்' : 'Recommended Next Steps'}
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-amber-800 pl-1">
              {[
                isTamil
                  ? 'வனத்துறை கள அலுவலர் மற்றும் வேளாண் அலுவலர் கூட்டு கள ஆய்வு — 72 மணி நேரத்திற்குள்'
                  : 'Joint field inspection by Forest Range Officer and Agriculture Officer — within 72 hours',
                isTamil
                  ? 'வனவிலங்கு சேத இழப்பீட்டுத் திட்டம் (Forest Dept Scheme) பதிவு செய்யுங்கள்'
                  : 'Register claim under Wildlife Crop Depredation Scheme (Forest Department)',
                isTamil
                  ? 'படங்கள், கால்தடங்கள் மற்றும் கடி தடங்களின் கூடுதல் சான்றுகள் சேகரிக்கவும்'
                  : 'Collect additional evidence — more photos of bite marks, hoof prints, and entry points',
                isTamil
                  ? 'எதிர்கால பாதுகாப்புக்கு வேலியமைத்தல் அல்லது ஒலி தடுப்பு நடவடிக்கைகளை பரிசீலிக்கவும்'
                  : 'Consider fencing or acoustic deterrents near forest boundary to prevent future intrusion',
              ].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* ── Farmer-Friendly Summary Box ── */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.report.farmerExplanationTitle}</span>
            </h4>
            <button
              onClick={handleSpeakSummary}
              className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isTamil ? 'குரலில் கேட்க' : 'Listen Aloud'}</span>
            </button>
          </div>

          <div className="space-y-2 text-xs sm:text-sm font-normal leading-relaxed">
            <p className="p-3 bg-white/10 rounded-xl border border-white/10 text-emerald-100">
              <span className="font-bold text-white block mb-0.5">தமிழ் விளக்கம் (Tamil Summary):</span>
              "{vr.schemeRecommendation.nextStepTamil}"
            </p>
            <p className="p-3 bg-white/10 rounded-xl border border-white/10 text-slate-200">
              <span className="font-bold text-white block mb-0.5">English Summary:</span>
              "{vr.schemeRecommendation.nextStepEnglish}"
            </p>
          </div>
        </div>

        {/* ── DISCLAIMER FOOTER ── */}
        <div className="pt-6 border-t-2 border-slate-200 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 px-4 py-2 rounded-2xl max-w-2xl text-left sm:text-center">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{t.disclaimerText}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            Report Verification Hash: SHA256-AGRI-{id}-{Date.now().toString(36).toUpperCase()}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            {isTamil
              ? 'இந்த அறிக்கை AI முதற்கட்ட கண்டறிதல்களை மட்டுமே கொண்டுள்ளது. இறுதி முடிவு அங்கீகரிக்கப்பட்ட காப்பீட்டு நிறுவனம் மட்டுமே எடுக்கும்.'
              : 'This report contains AI preliminary findings only. Final decisions are made exclusively by the authorized insurance provider.'}
          </p>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  CloudRain, 
  Camera, 
  ShieldCheck, 
  UserCheck, 
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { demoScenarios } from '../data/demoScenarios';
import { translations } from '../translations';
import DamageCauseBadge from '../components/DamageCauseBadge';

export default function ClaimStatusTracker({ onViewReport, lang = 'en', claimsList = [] }) {
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;

  const [searchId, setSearchId] = useState('SCN-FLOOD-01');
  const [activeClaim, setActiveClaim] = useState(demoScenarios[0]);

  const allAvailableClaims = [...demoScenarios, ...claimsList];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchId.trim().toLowerCase();
    const found = allAvailableClaims.find(
      (c) => c.id.toLowerCase().includes(query) || (c.farmerData?.mobileNumber && c.farmerData.mobileNumber.includes(query))
    );
    if (found) {
      setActiveClaim(found);
    }
  };

  // 7-Stage Timeline Definition
  const timelineStages = [
    { id: 'submitted', labelEn: 'Claim Submitted', labelTa: 'கிளைம் சமர்ப்பிக்கப்பட்டது', icon: FileText },
    { id: 'docChecking', labelEn: 'Document Checking', labelTa: 'ஆவணங்கள் சரிபார்ப்பு', icon: CheckCircle2 },
    { id: 'weatherVerif', labelEn: 'Weather Cross-Check', labelTa: 'வானிலை சரிபார்ப்பு', icon: CloudRain },
    { id: 'imageVerif', labelEn: 'AI Image Vision', labelTa: 'AI பட ஆய்வு', icon: Camera },
    { id: 'fraudScreening', labelEn: 'Fraud Screening', labelTa: 'மோசடி / நேர்மை சோதனை', icon: ShieldCheck },
    { id: 'manualReview', labelEn: 'Field Officer Review', labelTa: 'வேளாண் அதிகாரி கள ஆய்வு', icon: UserCheck },
    { id: 'finalDecision', labelEn: 'Final Decision', labelTa: 'இறுதி இழப்பீட்டு முடிவு', icon: Award },
  ];

  // Determine stage progress based on claim status
  const getCompletedStageCount = (claim) => {
    if (claim.verificationResult?.damageCauseClassification === 'SUSPICIOUS') {
      return 5; // Reached Manual Review stage
    }
    return 6; // Reached Field Officer / Final stage
  };

  const completedCount = getCompletedStageCount(activeClaim);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{isTamil ? 'நேரடி கிளைம் காலவரிசை கண்காணிப்பு' : 'Live Claim Progression Pipeline'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.nav.claimStatus}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isTamil 
                ? 'உங்கள் கிளைம் குறிப்பு எண் அல்லது கைபேசி எண்ணை உள்ளிட்டு சரிபார்க்கவும்' 
                : 'Track your 7-stage verification progress from initial filing to final disbursal'}
            </p>
          </div>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. SCN-FLOOD-01, SCN-ANIMAL-02, 9842176540"
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{isTamil ? 'நிலவரம் தேடுக' : 'Track Status'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample Claim Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold">{isTamil ? 'மாதிரி கிளைம்கள்:' : 'Sample Claims:'}</span>
          {allAvailableClaims.slice(0, 4).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSearchId(c.id);
                setActiveClaim(c);
              }}
              className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] font-bold transition-all ${
                activeClaim.id === c.id
                  ? 'bg-agri-600 text-white border-agri-700 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>

      {/* Claim Summary Card */}
      {activeClaim && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  {activeClaim.id}
                </span>
                <DamageCauseBadge 
                  classification={activeClaim.verificationResult.damageCauseClassification} 
                  lang={lang} 
                  size="small" 
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {activeClaim.farmerData.farmerName} • {activeClaim.farmerData.village}, {activeClaim.farmerData.district}
              </p>
            </div>

            <button
              onClick={() => onViewReport(activeClaim)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.dashboard.viewReport}</span>
            </button>
          </div>

          {/* 7-Stage Visual Progression Timeline */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center justify-between">
              <span>{isTamil ? '7 படிநிலை சரிபார்ப்பு காலவரிசை' : '7-Stage Verification Progression'}</span>
              <span className="text-xs font-semibold text-agri-700 bg-agri-50 px-2.5 py-1 rounded-full border border-agri-200">
                {completedCount} / 7 {isTamil ? 'படிநிலைகள் கடந்தது' : 'Stages Complete'}
              </span>
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {timelineStages.map((stage, idx) => {
                const Icon = stage.icon;
                const isPassed = idx < completedCount;
                const isCurrent = idx === completedCount;
                const isPending = idx > completedCount;

                return (
                  <div key={stage.id} className="relative group">
                    
                    {/* Stage icon node */}
                    <div className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs transition-all ${
                      isPassed 
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
                        : isCurrent 
                        ? 'bg-agri-500 text-white ring-4 ring-agri-100 animate-pulse' 
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : isCurrent ? (
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <span className="text-[10px] font-mono">{idx + 1}</span>
                      )}
                    </div>

                    {/* Stage content card */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      isCurrent 
                        ? 'bg-agri-50/80 border-agri-300 shadow-sm' 
                        : isPassed 
                        ? 'bg-white border-slate-200' 
                        : 'bg-slate-50/60 border-slate-200/60 opacity-60'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-800">
                          {isTamil ? stage.labelTa : stage.labelEn}
                        </span>
                        
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isPassed 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : isCurrent 
                            ? 'bg-amber-100 text-amber-800 animate-pulse' 
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {isPassed ? (isTamil ? 'நிறைவு' : 'Verified') : isCurrent ? (isTamil ? 'நடப்பில் உள்ளது' : 'In Review') : (isTamil ? 'காத்திருப்பு' : 'Queued')}
                        </span>
                      </div>

                      {/* Stage details */}
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {stage.id === 'submitted' && (isTamil ? 'விவசாயி மூலம் அனைத்து விவரங்களும் முறையாக சமர்ப்பிக்கப்பட்டது.' : 'Application submitted with survey records and photographs.')}
                        {stage.id === 'docChecking' && (isTamil ? 'பட்டா / சிட்டா நில ஆவணங்கள் நில பதிவேட்டுடன் ஒப்பிடப்பட்டது.' : 'Patta/Chitta records cross-referenced with TN Land Revenue records.')}
                        {stage.id === 'weatherVerif' && (isTamil ? `வானிலை மையத்தில் ${activeClaim.verificationResult.weatherData.rainfallMm} மிமீ மழை பதிவானது உறுதி செய்யப்பட்டது.` : `IMD Station verified ${activeClaim.verificationResult.weatherData.rainfallMm}mm rain on damage date.`)}
                        {stage.id === 'imageVerif' && (isTamil ? `AI பார்வை கணக்கீடு: ${activeClaim.verificationResult.aiDetectedSeverity}% சேதம் கண்டறியப்பட்டது.` : `Computer Vision calculated ${activeClaim.verificationResult.aiDetectedSeverity}% visible crop loss.`)}
                        {stage.id === 'fraudScreening' && (isTamil ? `அபாய மதிப்பீடு: ${activeClaim.verificationResult.fraudRisk.levelTa}` : `Integrity Score: ${activeClaim.verificationResult.fraudRisk.level}`)}
                        {stage.id === 'manualReview' && (isTamil ? 'வேளாண் அலுவலர் ஆய்வுக்காக அறிக்கை அனுப்பப்பட்டுள்ளது.' : 'Preliminary report sent to Agricultural Extension Officer.')}
                        {stage.id === 'finalDecision' && (isTamil ? 'அங்கீகரிக்கப்பட்ட காப்பீட்டு நிறுவனத்தால் இறுதி இழப்பீடு வழங்கப்படும்.' : 'Final insurance underwriter disbursement decision.')}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Bilingual Next Step Notice */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <h4 className="font-bold text-emerald-950 text-xs sm:text-sm mb-1">
              {isTamil ? 'அடுத்த கட்ட வழிகாட்டுதல்:' : 'Next Action for Farmer:'}
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {isTamil 
                ? activeClaim.verificationResult.schemeRecommendation.nextStepTamil 
                : activeClaim.verificationResult.schemeRecommendation.nextStepEnglish}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

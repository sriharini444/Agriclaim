import React from 'react';
import { 
  PlusCircle, 
  Search, 
  ShieldCheck, 
  Mic, 
  CloudRain, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  Info,
  PawPrint,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { demoScenarios } from '../data/demoScenarios';
import { translations } from '../translations';
import DamageCauseBadge from '../components/DamageCauseBadge';

export default function FarmerDashboard({ 
  claims = [], 
  onSelectClaim, 
  onNavigate, 
  onLoadScenario, 
  lang = 'en', 
  openVoiceModal,
  currentRole = 'farmer',
  currentUser = null,
  onLogout
}) {
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;

  const displayName = currentUser?.name || (isTamil ? 'கா. செல்வம்' : 'K. Selvam');
  const sampleScenarios = demoScenarios;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome & Weather Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-agri-900 via-agri-800 to-emerald-800 text-white p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-8 top-8 opacity-10 hidden sm:block">
          <Sparkles className="w-32 h-32 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{isTamil ? 'தமிழ்நாடு பயிர் காப்பீட்டு போர்டல்' : 'Tamil Nadu Crop Insurance Portal'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {isTamil ? `வணக்கம், ${displayName}!` : `Welcome back, ${displayName}!`}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {t.tagline}
            </p>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="self-start inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl text-xs font-bold transition-all backdrop-blur-md shadow-xs"
              title="Logout"
            >
              <span>{isTamil ? 'வெளியேறு (Logout)' : 'Logout'}</span>
            </button>
          )}
        </div>

          {/* District Weather Alert Pill */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-md">
              <CloudRain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300">
                  {isTamil ? 'வானிலை தகவல்: தஞ்சாவூர் & டெல்டா மண்டலம்' : 'Weather Alert: Thanjavur & Delta District'}
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
                  {isTamil ? 'கனமழை எச்சரிக்கை' : 'Heavy Rain Warning'}
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                {isTamil 
                  ? 'கடந்த 48 மணி நேரத்தில் 184 மிமீ மழை பதிவாகியுள்ளது. பாதிக்கப்பட்ட விவசாயிகள் 72 மணி நேரத்திற்குள் கிளைம் பதிவு செய்யவும்.' 
                  : '184mm surplus rainfall recorded in the last 48 hours. Affected farmers can file claims within 72 hours for fast-track review.'}
              </p>
            </div>
          </div>
        </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.dashboard.activeClaims}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">4</span>
            <span className="text-xs text-slate-400 ml-2 font-medium">{isTamil ? 'பதிவுகள்' : 'filed'}</span>
          </div>
          <p className="mt-1 text-[11px] text-blue-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            {isTamil ? 'அனைத்தும் செயலாக்கத்தில்' : 'Under active verification'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.dashboard.verifiedClaims}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">3</span>
            <span className="text-xs text-slate-400 ml-2 font-medium">{isTamil ? 'சரிபார்க்கப்பட்டது' : 'cleared'}</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {isTamil ? '94% சராசரி நம்பகத்தன்மை' : '94% average AI confidence'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.dashboard.pendingReview}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">1</span>
            <span className="text-xs text-slate-400 ml-2 font-medium">{isTamil ? 'கள ஆய்வு' : 'pending'}</span>
          </div>
          <p className="mt-1 text-[11px] text-amber-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {isTamil ? 'நேரடி ஆய்வு தேவை' : 'Requires field verification'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isTamil ? 'மதிப்பிடப்பட்ட நிவாரணம்' : 'Est. Compensation'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-agri-700">₹5.15 L</span>
          </div>
          <p className="mt-1 text-[11px] text-purple-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            {isTamil ? 'அரசு & காப்பீட்டு விதிகளின்படி' : 'Across verified parcels'}
          </p>
        </div>

      </div>

      {/* Hackathon Quick Preset Scenarios */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{t.dashboard.demoScenariosTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isTamil ? 'ஒரே கிளிக்கில் AI செயல்முறை பரிசோதனை' : 'Instant AI Verification Scenario Testbench'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t.dashboard.demoScenariosSubtitle}
            </p>
          </div>

          <span className="text-xs bg-white/10 border border-white/20 text-emerald-200 px-3 py-1.5 rounded-xl self-start md:self-auto font-medium">
            🎯 {isTamil ? 'நடுவர் & விளக்கக்காட்சி கருவி' : 'College Hackathon / Demo Mode'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleScenarios.map((scn) => (
            <div
              key={scn.id}
              onClick={() => onLoadScenario(scn)}
              className="group bg-white/5 hover:bg-white/15 border border-white/10 hover:border-emerald-400/50 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${scn.badgeColor}`}>
                    {isTamil ? scn.badgeTa : scn.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{scn.id}</span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors">
                  {isTamil ? scn.titleTa : scn.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {isTamil ? scn.descriptionTa : scn.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-300 group-hover:text-white">
                <span>{isTamil ? 'அறிக்கையை ஆய்வு செய்க' : 'Run & Load Verification'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Quick Actions Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <button
          onClick={() => onNavigate('submit')}
          className="group text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-agri-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-agri-100 text-agri-700 flex items-center justify-center group-hover:bg-agri-600 group-hover:text-white transition-colors mb-4">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base group-hover:text-agri-700 transition-colors">
              {t.dashboard.fileNewClaim}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isTamil ? 'GPS மற்றும் புகைப்படங்களை பதிவேற்றி உடனடியாக சமர்ப்பிக்கவும்' : 'Upload photos and GPS coords for instant preliminary AI check'}
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('schemes')}
          className="group text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-agri-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-700 transition-colors">
              {t.dashboard.exploreSchemes}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isTamil ? 'PMFBY, WBCIS மற்றும் வனத்துறை நிவாரண திட்டங்கள்' : 'Government PMFBY, WBCIS & Private crop policies'}
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('status')}
          className="group text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-agri-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base group-hover:text-amber-700 transition-colors">
              {t.dashboard.trackExisting}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isTamil ? '7 படிநிலை காலவரிசை மற்றும் நேரடி நிலவரம்' : '7-stage visual pipeline tracker and review stages'}
            </p>
          </div>
        </button>

        <button
          onClick={openVoiceModal}
          className="group text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-4">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">
              {t.dashboard.talkVoice}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isTamil ? 'தமிழில் பேசி தேவையான வழிகாட்டுதலை பெறுக' : 'Speak in Tamil or English for interactive voice guidance'}
            </p>
          </div>
        </button>

      </div>

      {/* Recent Claims Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800 text-lg sm:text-xl">
              {t.dashboard.recentClaims}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isTamil ? 'உங்கள் பதிவு செய்யப்பட்ட பயிர் சேத கோரிக்கைகள்' : 'Track ongoing claims and view preliminary verification reports'}
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('status')}
            className="text-xs font-bold text-agri-700 hover:text-agri-800 flex items-center gap-1"
          >
            <span>{isTamil ? 'அனைத்தையும் காண்க' : 'View All'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4 sm:px-6">{isTamil ? 'கிளைம் எண்' : 'Claim Ref'}</th>
                <th className="py-3.5 px-4">{isTamil ? 'பயிர் & இடம்' : 'Crop & Location'}</th>
                <th className="py-3.5 px-4">{isTamil ? 'சேத காரண பகுப்பாய்வு' : 'Damage Cause Matrix'}</th>
                <th className="py-3.5 px-4">{isTamil ? 'சேத %' : 'Severity %'}</th>
                <th className="py-3.5 px-4">{isTamil ? 'அபாய நிலை' : 'Risk Indicator'}</th>
                <th className="py-3.5 px-4 text-right">{t.dashboard.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {sampleScenarios.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold text-slate-800">
                    {item.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-800">
                      {isTamil ? item.farmerData.cropName : item.farmerData.cropName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.farmerData.village}, {item.farmerData.district}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <DamageCauseBadge 
                      classification={item.verificationResult.damageCauseClassification} 
                      lang={lang} 
                      size="small" 
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-800">
                      {item.verificationResult.aiDetectedSeverity}%
                    </span>
                    <span className="text-[11px] text-slate-500 ml-1">
                      ({isTamil ? 'AI கணக்கீடு' : 'AI loss'})
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      item.verificationResult.fraudRisk.level.includes('High') 
                        ? 'bg-rose-100 text-rose-800 border-rose-200' 
                        : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}>
                      {isTamil ? item.verificationResult.fraudRisk.levelTa : item.verificationResult.fraudRisk.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onLoadScenario(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-agri-50 hover:bg-agri-100 text-agri-800 text-xs font-bold border border-agri-200 transition-all shadow-2xs"
                    >
                      <span>{t.dashboard.viewReport}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

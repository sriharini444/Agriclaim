import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink,
  Coins,
  Sparkles,
  Building2,
  Landmark,
  X
} from 'lucide-react';
import { mockSchemes } from '../data/mockSchemes';
import { translations } from '../translations';

export default function InsuranceSchemes({ lang = 'en', onApplyScheme }) {
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;

  const [selectedCrop, setSelectedCrop] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Eligibility Checker Drawer State
  const [activeSchemeForEligibility, setActiveSchemeForEligibility] = useState(null);
  const [checkerData, setCheckerData] = useState({
    farmerCrop: 'Paddy',
    landArea: '3.5',
    annualIncome: '180000',
    hasPattaDoc: true,
    hasAadhaar: true,
    hasBankPassbook: true,
    damageCause: 'Flood',
  });
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const filteredSchemes = mockSchemes.filter((scheme) => {
    // Type filter
    if (selectedType !== 'ALL' && scheme.type !== selectedType) return false;

    // Crop filter
    if (selectedCrop !== 'ALL' && !scheme.eligibleCrops.some(c => c.toLowerCase().includes(selectedCrop.toLowerCase()))) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = scheme.name.toLowerCase().includes(q) || (scheme.nameTa && scheme.nameTa.toLowerCase().includes(q));
      const matchCrop = scheme.eligibleCrops.some(c => c.toLowerCase().includes(q));
      const matchAuthority = scheme.authority.toLowerCase().includes(q);
      if (!matchName && !matchCrop && !matchAuthority) return false;
    }

    return true;
  });

  const handleRunEligibility = (scheme) => {
    // Evaluate rules
    let status = 'ELIGIBLE';
    let messageEn = '';
    let messageTa = '';

    const cropMatches = scheme.eligibleCrops.some(c => c.toLowerCase().includes(checkerData.farmerCrop.toLowerCase()));
    
    if (!cropMatches) {
      status = 'NEED_INFO';
      messageEn = `The selected crop (${checkerData.farmerCrop}) is not directly covered under ${scheme.name}.`;
      messageTa = `நீங்கள் குறிப்பிட்ட பயிர் (${checkerData.farmerCrop}) இந்த திட்டத்தின் கீழ் நேரடியாக சேர்க்கப்படவில்லை.`;
    } else if (!checkerData.hasPattaDoc || !checkerData.hasAadhaar || !checkerData.hasBankPassbook) {
      status = 'POSSIBLY_ELIGIBLE';
      messageEn = 'You meet crop and acreage requirements, but mandatory documents (Patta / Aadhaar / Bank Passbook) must be uploaded.';
      messageTa = 'பயிர் மற்றும் நில அளவு தகுதியானது, ஆனால் பட்டா அல்லது வங்கி பாஸ்புக் ஆவணங்கள் இன்னும் சமர்ப்பிக்கப்பட வேண்டும்.';
    } else if (checkerData.damageCause === 'Wild Animal Intrusion' && !scheme.eligibilityRules.animalDamageCovered) {
      status = 'NEED_INFO';
      messageEn = 'PMFBY / WBCIS covers weather perils only. For wild animal damage, apply under State Forest Wildlife Depredation Relief.';
      messageTa = 'இந்த திட்டம் வானிலை சேதங்களுக்கு மட்டுமே. வனவிலங்கு சேதங்களுக்கு வனத்துறை நிவாரண திட்டத்தில் விண்ணப்பிக்கவும்.';
    } else {
      status = 'ELIGIBLE';
      messageEn = `Congratulations! Based on your land area (${checkerData.landArea} acres) and crop (${checkerData.farmerCrop}), you are eligible for preliminary claim under ${scheme.name}.`;
      messageTa = `வாழ்த்துகள்! உங்கள் நில அளவு (${checkerData.landArea} ஏக்கர்) மற்றும் பயிருக்கு (${checkerData.farmerCrop}) இந்த திட்டத்தின் கீழ் முழு முதற்கட்ட தகுதி உள்ளது.`;
    }

    setEligibilityResult({
      status,
      messageEn,
      messageTa,
      schemeId: scheme.id,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-2">
              <Landmark className="w-3.5 h-3.5" />
              <span>{isTamil ? 'அரசு & தனியார் காப்பீட்டு பாலிசிகள்' : 'Govt & Private Insurance Directory'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.schemes.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.schemes.subtitle}
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 max-w-sm">
            <span className="font-bold flex items-center gap-1 text-amber-800">
              <HelpCircle className="w-3.5 h-3.5" />
              {isTamil ? 'முக்கிய குறிப்பு:' : 'Prototype Sample Data:'}
            </span>
            <p className="text-[11px] mt-0.5">
              {isTamil 
                ? 'காப்பீட்டுத் தகவல்கள் மாதிரி குறிப்பிற்காக மட்டுமே. அதிகாரப்பூர்வ முடிவுக்கு காப்பீட்டு முகவரை தொடர்பு கொள்ளவும்.'
                : 'Sample policy parameters for demonstration. Final binding decisions are made by authorized underwriters.'}
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTamil ? "திட்டம் அல்லது பயிர் தேடுக..." : "Search scheme or crop..."}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-white font-medium"
            >
              <option value="ALL">{t.schemes.allTypes}</option>
              <option value="Government">{t.schemes.govtOnly}</option>
              <option value="Private">{t.schemes.privateOnly}</option>
            </select>
          </div>

          {/* Crop Filter */}
          <div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-white font-medium"
            >
              <option value="ALL">{t.schemes.allCrops}</option>
              <option value="Paddy">Paddy / நெல்</option>
              <option value="Sugarcane">Sugarcane / கரும்பு</option>
              <option value="Banana">Banana / வாழை</option>
              <option value="Cotton">Cotton / பருத்தி</option>
              <option value="Maize">Maize / மக்காச்சோளம்</option>
              <option value="Groundnut">Groundnut / நிலக்கடலை</option>
            </select>
          </div>

        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                  scheme.type === 'Government' 
                    ? 'bg-blue-100 text-blue-800 border-blue-200' 
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                }`}>
                  {scheme.type === 'Government' ? (isTamil ? 'அரசு திட்டம்' : 'Government Scheme') : (isTamil ? 'தனியார் காப்பீடு' : 'Private Policy')}
                </span>

                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  {scheme.id.toUpperCase()}
                </span>
              </div>

              {/* Title & Authority */}
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                {isTamil ? (scheme.nameTa || scheme.name) : scheme.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{scheme.authority}</p>

              {/* Key Metric Tags */}
              <div className="grid grid-cols-2 gap-2.5 my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {t.schemes.premium}
                  </span>
                  <span className="font-extrabold text-agri-700">
                    {isTamil ? scheme.premiumRateTa : scheme.premiumRate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    {t.schemes.sumInsured}
                  </span>
                  <span className="font-extrabold text-slate-800">
                    {isTamil ? scheme.coverageAmountTa : scheme.coverageAmount}
                  </span>
                </div>
              </div>

              {/* Eligible Crops Pills */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                  {isTamil ? 'பொருந்தும் பயிர்கள்:' : 'Eligible Crops:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(isTamil ? scheme.eligibleCropsTa : scheme.eligibleCrops).map((c, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-lg border border-slate-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Protection Benefits */}
              <div className="mb-4 text-xs text-slate-600 bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl leading-relaxed">
                <span className="font-bold text-emerald-900 block mb-0.5">
                  {t.schemes.keyBenefits}:
                </span>
                {isTamil ? scheme.keyBenefitsTa : scheme.keyBenefits}
              </div>

              {/* Required Documents List */}
              <div className="text-xs text-slate-500">
                <span className="font-bold text-slate-700 block mb-1">
                  {t.schemes.requiredDocs}:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  {(isTamil ? scheme.requiredDocsTa : scheme.requiredDocs).slice(0, 3).map((d, idx) => (
                    <li key={idx} className="truncate">{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveSchemeForEligibility(scheme);
                  setEligibilityResult(null);
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.schemes.checkEligibility}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Eligibility Evaluation Modal Drawer */}
      {activeSchemeForEligibility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 p-6 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-agri-600 bg-agri-50 px-2.5 py-0.5 rounded-full">
                  {isTamil ? 'தானியங்கி விதிமுறை சரிபார்ப்பு' : 'Rule-Based Eligibility Engine'}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mt-1">
                  {isTamil ? activeSchemeForEligibility.nameTa : activeSchemeForEligibility.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveSchemeForEligibility(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
              <p className="text-slate-600">
                {isTamil 
                  ? 'உங்கள் நிலம் மற்றும் பயிர் விவரங்களை உள்ளிட்டு இந்த திட்டத்திற்கான தகுதியை உடனடியாக சோதிக்கவும்:'
                  : 'Enter your farm parameters below to evaluate instant eligibility against official underwriting rules:'}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.submit.cropName}</label>
                  <select
                    value={checkerData.farmerCrop}
                    onChange={(e) => setCheckerData({ ...checkerData, farmerCrop: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Paddy">Paddy / நெல்</option>
                    <option value="Sugarcane">Sugarcane / கரும்பு</option>
                    <option value="Banana">Banana / வாழை</option>
                    <option value="Cotton">Cotton / பருத்தி</option>
                    <option value="Maize">Maize / மக்காச்சோளம்</option>
                    <option value="Groundnut">Groundnut / நிலக்கடலை</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{t.submit.landArea}</label>
                  <input
                    type="number"
                    value={checkerData.landArea}
                    onChange={(e) => setCheckerData({ ...checkerData, landArea: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{t.submit.damageType}</label>
                <select
                  value={checkerData.damageCause}
                  onChange={(e) => setCheckerData({ ...checkerData, damageCause: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Flood">Flood & Waterlogging (வெள்ளம்)</option>
                  <option value="Cyclone">Cyclone & High Wind (சூறாவளி)</option>
                  <option value="Drought">Drought (வறட்சி)</option>
                  <option value="Wild Animal Intrusion">Wild Animal Intrusion (காட்டுப்பன்றி / விலங்கு சேதம்)</option>
                </select>
              </div>

              {/* Document Checkboxes */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">{isTamil ? 'ஆவணங்கள் சரிபார்ப்பு:' : 'Available Documents:'}</span>
                <label className="flex items-center gap-2 text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={checkerData.hasPattaDoc} 
                    onChange={(e) => setCheckerData({ ...checkerData, hasPattaDoc: e.target.checked })}
                    className="rounded accent-agri-600" 
                  />
                  <span>Patta / Chitta / Land Record (பட்டா / சிட்டா)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={checkerData.hasAadhaar} 
                    onChange={(e) => setCheckerData({ ...checkerData, hasAadhaar: e.target.checked })}
                    className="rounded accent-agri-600" 
                  />
                  <span>Aadhaar Card Linked (ஆதார் அட்டை)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700">
                  <input 
                    type="checkbox" 
                    checked={checkerData.hasBankPassbook} 
                    onChange={(e) => setCheckerData({ ...checkerData, hasBankPassbook: e.target.checked })}
                    className="rounded accent-agri-600" 
                  />
                  <span>Bank Passbook with IFSC (வங்கி புத்தகம்)</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => handleRunEligibility(activeSchemeForEligibility)}
                className="w-full py-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl font-bold shadow-md transition-all"
              >
                {isTamil ? 'தகுதியை கணக்கிடுக' : 'Evaluate Eligibility'}
              </button>

              {/* Result display box */}
              {eligibilityResult && (
                <div className={`p-4 rounded-2xl border transition-all animate-fadeIn ${
                  eligibilityResult.status === 'ELIGIBLE' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : eligibilityResult.status === 'POSSIBLY_ELIGIBLE'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {eligibilityResult.status === 'ELIGIBLE' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{t.schemes.eligible}</span>
                      </>
                    ) : eligibilityResult.status === 'POSSIBLY_ELIGIBLE' ? (
                      <>
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        <span>{t.schemes.possiblyEligible}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>{t.schemes.needMoreInfo}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed">
                    {isTamil ? eligibilityResult.messageTa : eligibilityResult.messageEn}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

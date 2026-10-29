import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  AlertCircle,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';
import FarmMapLocation from '../components/FarmMapLocation';
import { demoScenarios } from '../data/demoScenarios';
import { translations } from '../translations';

export default function SubmitClaim({ onSubmitClaim, lang = 'en', onOpenVoice }) {
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;

  const [step, setStep] = useState(1);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState('');
  const [gpsError, setGpsError] = useState('');

  // Main Claim Form State
  const [formData, setFormData] = useState({
    farmerName: 'K. Selvam',
    mobileNumber: '9842176540',
    annualIncome: '180000',
    otherIncome: 'Dairy / Livestock',
    farmerId: 'TN-AGRI-2024-9842',
    surveyNumber: '142/3B',
    landArea: '3.5',
    village: 'Thiruvaiyaru',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    landDocName: 'Patta_Chitta_142_3B.pdf',
    
    cropName: 'Paddy (Ponni)',
    cropType: 'Kharif / Samba',
    sowingDate: '2024-09-15',
    expectedHarvest: '2025-01-20',
    cropArea: '3.2',
    damageDateTime: '2024-11-28T14:30',
    damageType: 'Flood & Water Logging',
    estimatedPercentage: '85',
    farmerDescription: 'Flash floods submerged the entire paddy field for 4 days following heavy monsoon rains. Severe rot.',
    
    lat: 10.8789,
    lng: 79.1065,
    locationName: 'Thiruvaiyaru, Thanjavur, Tamil Nadu',
    
    imageCategory: 'flood_paddy',
    imagePreview: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    imageLabel: 'Submerged paddy field with waterlogging'
  });

  const sampleImages = [
    {
      label: isTamil ? 'வெள்ளத்தில் மூழ்கிய நெற்பயிர்' : 'Flood Submerged Paddy',
      category: 'flood_paddy',
      url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: isTamil ? 'காட்டுப்பன்றி சேதப்படுத்திய கரும்பு' : 'Wild Boar Damaged Sugarcane',
      category: 'animal_sugarcane',
      url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: isTamil ? 'புயல் காற்றில் சாய்ந்த வாழை மரங்கள்' : 'Cyclone Lodged Banana',
      category: 'cyclone_banana',
      url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: isTamil ? 'வறட்சி மாதிரி நிலம்' : 'Drought / Dry Soil Sample',
      category: 'suspicious_drought',
      url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const loadScenarioPreset = (scenario) => {
    setFormData({
      ...formData,
      ...scenario.farmerData
    });
  };

  const handleAutoDetectGps = () => {
    setIsDetectingGps(true);
    setGpsError('');
    setGpsSuccess('');

    if (!navigator.geolocation) {
      setIsDetectingGps(false);
      setGpsError(isTamil ? 'உங்கள் உலாவியில் GPS ஆதரவு இல்லை. கைமுறையாக உள்ளிடவும்.' : 'Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingGps(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setFormData((prev) => ({
          ...prev,
          lat,
          lng,
          locationName: `Live GPS: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`
        }));
        setGpsSuccess(isTamil ? `GPS வெற்றிகரமாக பெறப்பட்டது: ${lat.toFixed(4)}, ${lng.toFixed(4)}` : `GPS locked: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`);
      },
      (error) => {
        setIsDetectingGps(false);
        setGpsError(isTamil ? 'GPS அனுமதி கிடைக்கவில்லை. வரைபடத்தில் கைமுறையாக தேர்வு செய்யவும்.' : `GPS error: ${error.message}. Please enter coords manually.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmitClaim) {
      onSubmitClaim(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-agri-700 bg-agri-50 border border-agri-200 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTamil ? 'AI முதற்கட்ட மதிப்பீட்டு படிவம்' : 'AI Preliminary Evaluation Wizard'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.submit.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.submit.subtitle}
            </p>
          </div>

          {/* Quick preset filler */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">
              {isTamil ? 'மாதிரி படிவம்:' : 'Autofill Preset:'}
            </span>
            <button
              type="button"
              onClick={() => loadScenarioPreset(demoScenarios[0])}
              className="text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              🌊 {isTamil ? 'வெள்ளம்' : 'Flood'}
            </button>
            <button
              type="button"
              onClick={() => loadScenarioPreset(demoScenarios[1])}
              className="text-[11px] font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              🐗 {isTamil ? 'விலங்கு சேதம்' : 'Animal'}
            </button>
            <button
              type="button"
              onClick={() => loadScenarioPreset(demoScenarios[2])}
              className="text-[11px] font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-lg transition-colors"
            >
              🌪️ {isTamil ? 'சூறாவளி' : 'Cyclone'}
            </button>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-left ${
              step === 1
                ? 'bg-agri-50 border-agri-300 text-agri-800 shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-extrabold ${
              step === 1 ? 'bg-agri-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              1
            </span>
            <span className="truncate">{isTamil ? 'விவசாயி & நிலம்' : 'Farmer & Land'}</span>
          </button>

          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-left ${
              step === 2
                ? 'bg-agri-50 border-agri-300 text-agri-800 shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-extrabold ${
              step === 2 ? 'bg-agri-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              2
            </span>
            <span className="truncate">{isTamil ? 'பயிர் & சேதம்' : 'Crop & Damage'}</span>
          </button>

          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex items-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all text-left ${
              step === 3
                ? 'bg-agri-50 border-agri-300 text-agri-800 shadow-2xs'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-extrabold ${
              step === 3 ? 'bg-agri-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              3
            </span>
            <span className="truncate">{isTamil ? 'சான்றுகள் & GPS' : 'Photos & GPS'}</span>
          </button>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* STEP 1: Farmer & Land Details */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">{t.submit.step1Title}</h2>
              <p className="text-xs text-slate-500">{isTamil ? 'விவசாயி அடையாள எண் மற்றும் நில உரிமை விவரங்களை பதிவு செய்யவும்' : 'Personal verification and cadastral land survey attributes'}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.farmerName} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.farmerName}
                  onChange={(e) => handleInputChange('farmerName', e.target.value)}
                  placeholder={t.submit.farmerNamePlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.mobileNumber} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  placeholder={t.submit.mobilePlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.farmerId} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.farmerId}
                  onChange={(e) => handleInputChange('farmerId', e.target.value)}
                  placeholder={t.submit.farmerIdPlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.annualIncome} (₹)
                </label>
                <input
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                  placeholder="e.g. 180000"
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.otherIncome}
                </label>
                <select
                  value={formData.otherIncome}
                  onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none bg-white"
                >
                  <option value="No other sources (Farming only)">{t.submit.otherIncomeNone}</option>
                  <option value="Dairy / Livestock">{t.submit.otherIncomeLivestock}</option>
                  <option value="Agri Labor / Small Business">{t.submit.otherIncomeLabor}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.surveyNumber} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.surveyNumber}
                  onChange={(e) => handleInputChange('surveyNumber', e.target.value)}
                  placeholder={t.submit.surveyPlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.landArea} *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.landArea}
                  onChange={(e) => handleInputChange('landArea', e.target.value)}
                  placeholder={t.submit.landAreaPlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.village} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => handleInputChange('village', e.target.value)}
                  placeholder={t.submit.villagePlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.district} *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none bg-white font-medium"
                >
                  <option value="Thanjavur">Thanjavur (தஞ்சாவூர்)</option>
                  <option value="Coimbatore">Coimbatore (கோயம்புத்தூர்)</option>
                  <option value="Cuddalore">Cuddalore (கடலூர்)</option>
                  <option value="Nagapattinam">Nagapattinam (நாகப்பட்டினம்)</option>
                  <option value="Madurai">Madurai (மதுரை)</option>
                  <option value="Tiruchirappalli">Tiruchirappalli (திருச்சிராப்பள்ளி)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.landDocUpload} *
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-agri-500 rounded-2xl p-4 text-center bg-slate-50 transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-700">
                    {formData.landDocName || (isTamil ? 'பட்டா / சிட்டா ஆவணத்தை பதிவேற்றவும்' : 'Upload Patta / Chitta / Land Ownership Document')}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.submit.landDocHelp}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                <span>{t.submit.nextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Crop & Damage Details */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">{t.submit.step2Title}</h2>
              <p className="text-xs text-slate-500">{isTamil ? 'பயிர் வகை மற்றும் சேதத்திற்கான காரணத்தை உள்ளிடவும்' : 'Specify crop cultivation details, damage cause, and loss estimation'}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.cropName} *
                </label>
                <select
                  value={formData.cropName}
                  onChange={(e) => handleInputChange('cropName', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none bg-white font-medium"
                >
                  <option value="Paddy (Ponni Rice)">Paddy / நெல் (Ponni / Samba)</option>
                  <option value="Sugarcane (Co 86032)">Sugarcane / கரும்பு (Co 86032)</option>
                  <option value="Banana (Grand Naine)">Banana / வாழை (Grand Naine)</option>
                  <option value="Cotton (Bt Cotton)">Cotton / பருத்தி</option>
                  <option value="Maize (Corn)">Maize / மக்காச்சோளம்</option>
                  <option value="Groundnut">Groundnut / நிலக்கடலை</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.cropType} *
                </label>
                <input
                  type="text"
                  value={formData.cropType}
                  onChange={(e) => handleInputChange('cropType', e.target.value)}
                  placeholder="e.g. Kharif / Samba Season"
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.sowingDate}
                </label>
                <input
                  type="date"
                  value={formData.sowingDate}
                  onChange={(e) => handleInputChange('sowingDate', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.expectedHarvest}
                </label>
                <input
                  type="date"
                  value={formData.expectedHarvest}
                  onChange={(e) => handleInputChange('expectedHarvest', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.cropArea} *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.cropArea}
                  onChange={(e) => handleInputChange('cropArea', e.target.value)}
                  placeholder={t.submit.cropAreaPlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.damageDateTime} *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.damageDateTime}
                  onChange={(e) => handleInputChange('damageDateTime', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.damageType} *
                </label>
                <select
                  value={formData.damageType}
                  onChange={(e) => handleInputChange('damageType', e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none bg-white font-medium"
                >
                  <option value="Flood & Water Logging">Flood & Heavy Inundation (வெள்ளப்பெருக்கு)</option>
                  <option value="Storm & Rain with Fallen Crops">Storm & Rain with Fallen Crops (மழை & சாய்ந்த பயிர்)</option>
                  <option value="Cyclone & High Wind Velocity">Cyclone & High Wind Squalls (சூறாவளி புயல்)</option>
                  <option value="Severe Drought & Moisture Deficit">Drought & Heat Deficit (கடும் வறட்சி)</option>
                  <option value="Hailstorm Damage">Hailstorm (ஆலங்கட்டி மழை)</option>
                  <option value="Wild Animal Intrusion">Wild Animal Intrusion (காட்டு விலங்கு சேதம்)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.estimatedPercentage} ({formData.estimatedPercentage}%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={formData.estimatedPercentage}
                    onChange={(e) => handleInputChange('estimatedPercentage', e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-agri-600"
                  />
                  <span className="text-sm font-extrabold text-agri-800 w-12 text-right">
                    {formData.estimatedPercentage}%
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.submit.farmerDescription} *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.farmerDescription}
                  onChange={(e) => handleInputChange('farmerDescription', e.target.value)}
                  placeholder={t.submit.farmerDescriptionPlaceholder}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-agri-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.submit.prevStep}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl font-bold text-sm shadow-md transition-all"
              >
                <span>{t.submit.nextStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Evidence & Geolocation */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-800">{t.submit.step3Title}</h2>
              <p className="text-xs text-slate-500">{isTamil ? 'GPS இருப்பிடம் மற்றும் சேதமடைந்த பயிர் புகைப்படங்களை சரிபார்க்கவும்' : 'Upload multi-angle field photos and confirm parcel GPS coordinates'}</p>
            </div>

            {/* Geolocation & Map */}
            <FarmMapLocation
              lat={formData.lat}
              lng={formData.lng}
              onLocationChange={(lat, lng) => {
                handleInputChange('lat', lat);
                handleInputChange('lng', lng);
              }}
              onAutoDetectGps={handleAutoDetectGps}
              isDetectingGps={isDetectingGps}
              gpsSuccess={gpsSuccess}
              gpsError={gpsError}
              lang={lang}
            />

            {/* Manual Lat/Lng inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.submit.latitude}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lat}
                  onChange={(e) => handleInputChange('lat', parseFloat(e.target.value))}
                  className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.submit.longitude}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lng}
                  onChange={(e) => handleInputChange('lng', parseFloat(e.target.value))}
                  className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Photo Upload & Simulator */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-2">
                <Camera className="w-4 h-4 text-agri-600" />
                <span>{t.submit.photoUpload} *</span>
              </label>

              {/* Sample Photo Pickers for Hackathon Demo */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 mb-2">
                  {t.submit.selectSamplePhoto}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {sampleImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        handleInputChange('imagePreview', img.url);
                        handleInputChange('imageCategory', img.category);
                        handleInputChange('imageLabel', img.label);
                      }}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        formData.imageCategory === img.category
                          ? 'border-agri-500 bg-agri-50 ring-2 ring-agri-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-16 object-cover rounded-lg mb-1.5"
                      />
                      <p className="text-[11px] font-bold text-slate-700 truncate">{img.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Image Preview Card */}
              {formData.imagePreview && (
                <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4">
                  <img
                    src={formData.imagePreview}
                    alt="Damage Evidence"
                    className="w-20 h-20 object-cover rounded-xl border border-slate-300 flex-shrink-0"
                  />
                  <div>
                    <span className="inline-block text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 mb-1">
                      {isTamil ? 'படம் தயாராக உள்ளது (Ready for AI Vision)' : 'Image Ready for AI Vision'}
                    </span>
                    <p className="text-xs font-bold text-slate-800">{formData.imageLabel}</p>
                    <p className="text-[11px] text-slate-500">EXIF Geotag: {Number(formData.lat).toFixed(4)}° N, {Number(formData.lng).toFixed(4)}° E</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.submit.prevStep}</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-agri-600 to-emerald-600 hover:from-agri-700 hover:to-emerald-700 text-white rounded-2xl font-extrabold text-sm sm:text-base shadow-lg shadow-agri-600/30 hover:shadow-xl transition-all"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.submit.submitButton}</span>
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}

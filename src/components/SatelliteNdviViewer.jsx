import React, { useState } from 'react';
import { Satellite, Sparkles, SlidersHorizontal, Eye, Layers } from 'lucide-react';

export default function SatelliteNdviViewer({ satelliteData, lang = 'en' }) {
  const [viewMode, setViewMode] = useState('sideBySide'); // 'sideBySide' | 'splitSlider'
  const [sliderPos, setSliderPos] = useState(50);
  const isTamil = lang === 'ta';

  const beforeVal = satelliteData?.beforeNdvi ?? 0.78;
  const afterVal = satelliteData?.afterNdvi ?? 0.22;
  const ndviDrop = (afterVal - beforeVal).toFixed(2);

  const getNdviColor = (val) => {
    if (val >= 0.65) return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    if (val >= 0.40) return 'text-amber-700 bg-amber-100 border-amber-300';
    return 'text-rose-700 bg-rose-100 border-rose-300';
  };

  const getNdviStatusText = (val) => {
    if (val >= 0.65) return isTamil ? 'ஆரோக்கியமான அடர் பயிர் மூட்டம்' : 'Healthy Dense Crop Canopy';
    if (val >= 0.40) return isTamil ? 'மிதமான பாதிப்பு / நீர் தேக்கம்' : 'Moderate Stress / Lodged Biomass';
    return isTamil ? 'கடுமையான தாவர இழப்பு / மூழ்கிய நிலை' : 'Severe Vegetative Loss / Barren';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-700 flex items-center justify-center font-bold">
            <Satellite className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base md:text-lg flex items-center gap-2">
              {isTamil ? 'செயற்கைக்கோள் NDVI தாவர நிலை பகுப்பாய்வு' : 'Satellite NDVI Vegetation Analysis'}
              <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full">
                {isTamil ? 'சென்டினல்-2 மாதிரி தரவு' : 'Sentinel-2 Prototype Data'}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              {isTamil 
                ? 'பயிர் சேதத்திற்கு முந்தைய மற்றும் பிந்தைய தாவர ஆரோக்கிய குறியீடு (NDVI)'
                : 'Comparative Normalized Difference Vegetation Index (NDVI) before & after incident'}
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto text-xs font-semibold text-slate-600">
          <button
            onClick={() => setViewMode('sideBySide')}
            className={`px-3 py-1 rounded-md transition-all ${viewMode === 'sideBySide' ? 'bg-white text-agri-800 shadow-sm' : 'hover:text-slate-900'}`}
          >
            {isTamil ? 'பக்கவாட்டு பார்வை' : 'Side-by-Side'}
          </button>
          <button
            onClick={() => setViewMode('splitSlider')}
            className={`px-3 py-1 rounded-md transition-all ${viewMode === 'splitSlider' ? 'bg-white text-agri-800 shadow-sm' : 'hover:text-slate-900'}`}
          >
            {isTamil ? 'ஒப்பீட்டு ஸ்லைடர்' : 'Interactive Split'}
          </button>
        </div>
      </div>

      {/* Main Satellite Visual Canvas Container */}
      <div className="mt-5">
        {viewMode === 'sideBySide' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before Incident Card */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 relative group">
              <div className="p-3 bg-emerald-900/90 text-white text-xs font-semibold flex items-center justify-between">
                <span>{isTamil ? 'சேதத்திற்கு முன் (15 நாட்களுக்கு முன்)' : 'Before Damage (15 Days Prior)'}</span>
                <span className="bg-emerald-500/30 border border-emerald-400 px-2 py-0.5 rounded text-[11px]">
                  NDVI: {beforeVal}
                </span>
              </div>
              
              {/* Simulated Spectral Map Canvas */}
              <div className="h-48 md:h-56 relative bg-gradient-to-br from-emerald-700 via-green-600 to-lime-600 overflow-hidden flex items-center justify-center">
                {/* Simulated field parcel grid lines */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-950/60 to-transparent"></div>
                
                {/* Healthy vegetation spectral overlay representation */}
                <div className="relative z-10 text-center text-white px-4">
                  <div className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium mb-1 border border-white/20">
                    🟢 {isTamil ? 'பசுமையான பயிர் பரப்பு' : 'Vibrant Crop Biomass'}
                  </div>
                  <p className="text-[11px] text-emerald-100">Spectral Reflectance: High NIR (Near-Infrared)</p>
                </div>

                {/* Coordinate marker box */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-mono border border-white/10">
                  Parcel NDVI: {beforeVal}
                </div>
              </div>

              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">{isTamil ? 'பயிர் நிலைமை:' : 'Canopy Condition:'}</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold border ${getNdviColor(beforeVal)}`}>
                  {getNdviStatusText(beforeVal)}
                </span>
              </div>
            </div>

            {/* After Incident Card */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 relative group">
              <div className="p-3 bg-slate-900/90 text-white text-xs font-semibold flex items-center justify-between">
                <span>{isTamil ? 'சேதத்திற்கு பின் (தற்போதைய செயற்கைக்கோள் பதிவு)' : 'After Damage (Post-Incident)'}</span>
                <span className={`px-2 py-0.5 rounded text-[11px] border ${afterVal < 0.4 ? 'bg-rose-500/30 border-rose-400' : 'bg-amber-500/30 border-amber-400'}`}>
                  NDVI: {afterVal}
                </span>
              </div>

              {/* Damaged spectral map representation */}
              <div className={`h-48 md:h-56 relative overflow-hidden flex items-center justify-center ${
                afterVal < 0.35 
                  ? 'bg-gradient-to-br from-amber-900 via-stone-800 to-rose-950' 
                  : 'bg-gradient-to-br from-yellow-700 via-amber-600 to-emerald-800'
              }`}>
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="relative z-10 text-center text-white px-4">
                  <div className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium mb-1 border border-white/20">
                    {afterVal < 0.35 ? '🔴 ' + (isTamil ? 'கடுமையான தாவர வீழ்ச்சி' : 'Severe Vegetative Decay') : '🟡 ' + (isTamil ? 'பகுதி தாவர இழப்பு' : 'Moderate Biomass Drop')}
                  </div>
                  <p className="text-[11px] text-slate-200">
                    {isTamil ? `குறியீடு மாற்றம்: ${ndviDrop}` : `Net Index Shift: ${ndviDrop}`}
                  </p>
                </div>

                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-mono border border-white/10">
                  Current NDVI: {afterVal}
                </div>
              </div>

              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">{isTamil ? 'பயிர் நிலைமை:' : 'Canopy Condition:'}</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold border ${getNdviColor(afterVal)}`}>
                  {getNdviStatusText(afterVal)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Split Slider Mode */
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 relative">
            <div className="relative h-64 select-none overflow-hidden">
              {/* After Layer (Base) */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-stone-800 to-rose-950 flex items-center justify-end pr-10 text-white">
                <div className="text-right">
                  <span className="text-xs bg-black/50 px-2.5 py-1 rounded-full font-bold">
                    {isTamil ? 'சேதத்திற்கு பின்' : 'After'}: NDVI {afterVal}
                  </span>
                  <p className="text-xs text-rose-300 mt-1 font-semibold">{getNdviStatusText(afterVal)}</p>
                </div>
              </div>

              {/* Before Layer (Clipped by slider position) */}
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-br from-emerald-700 via-green-600 to-lime-600 flex items-center justify-start pl-10 text-white overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="min-w-[200px]">
                  <span className="text-xs bg-black/50 px-2.5 py-1 rounded-full font-bold">
                    {isTamil ? 'சேதத்திற்கு முன்' : 'Before'}: NDVI {beforeVal}
                  </span>
                  <p className="text-xs text-emerald-200 mt-1 font-semibold">{getNdviStatusText(beforeVal)}</p>
                </div>
              </div>

              {/* Split line indicator */}
              <div 
                className="absolute inset-y-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-slate-800 shadow-lg flex items-center justify-center text-xs font-bold border border-slate-300">
                  ↔
                </div>
              </div>
            </div>

            {/* Slider control bar */}
            <div className="p-3 bg-slate-800 text-white flex items-center gap-4 text-xs">
              <span className="text-slate-400">{isTamil ? 'முன்' : 'Before'}</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-agri-500"
              />
              <span className="text-slate-400">{isTamil ? 'பின்' : 'After'}</span>
            </div>
          </div>
        )}

        {/* NDVI Color Scale Legend */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              {isTamil ? 'NDVI தாவர குறியீடு அளவுகோல்:' : 'NDVI Spectral Reference Scale:'}
            </span>
            <div className="flex items-center gap-3 text-[11px] font-medium flex-wrap">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
                <span>0.65 - 1.0 ({isTamil ? 'ஆரோக்கியமான பயிர்' : 'Healthy Canopy'})</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span>0.35 - 0.64 ({isTamil ? 'பாதிக்கப்பட்ட பயிர்' : 'Moderate Stress'})</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span>
                <span>&lt; 0.35 ({isTamil ? 'கடுமையான சேதம் / நீர் மூழ்கல்' : 'Severe Loss / Inundation'})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

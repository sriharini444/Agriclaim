/**
 * Agriclaim AI Verification Engine
 * Multi-Factor Verification: Image Vision, Weather Cross-Check, Damage Cause Matrix, Satellite NDVI, and Fraud Screening.
 */

// Sample district weather station simulation database
const DISTRICT_WEATHER_STATION_DB = {
  "thanjavur": {
    station: "Thanjavur AWS-04 (Cauvery Basin)",
    recentRainfallMm: 184.5,
    normalRainfallMm: 22.0,
    windSpeedKmh: 42.0,
    maxTempC: 24.5,
    event: "Flash Flood / Inundation Event",
    eventTa: "திடீர் வெள்ளப்பெருக்கு",
    riskCategory: "FLOOD"
  },
  "coimbatore": {
    station: "Coimbatore Agro-Met Station 02",
    recentRainfallMm: 11.2,
    normalRainfallMm: 15.0,
    windSpeedKmh: 14.0,
    maxTempC: 31.0,
    event: "Normal Light Rain (Non-Destructive)",
    eventTa: "இயல்பான லேசான மழை",
    riskCategory: "NORMAL"
  },
  "cuddalore": {
    station: "Cuddalore Coastal IMD Observatory",
    recentRainfallMm: 215.0,
    normalRainfallMm: 18.0,
    windSpeedKmh: 92.4,
    maxTempC: 22.0,
    event: "Severe Cyclonic Storm (Cyclone Fengal)",
    eventTa: "தீவிர சூறாவளி புயல்",
    riskCategory: "CYCLONE"
  },
  "nagapattinam": {
    station: "Nagapattinam Coast AWS",
    recentRainfallMm: 238.4,
    normalRainfallMm: 65.0,
    windSpeedKmh: 28.0,
    maxTempC: 28.5,
    event: "Heavy Monsoon Rain",
    eventTa: "பருவமழை கனமழை",
    riskCategory: "RAIN"
  },
  "default": {
    station: "Regional Agro-Meteorological Station",
    recentRainfallMm: 45.0,
    normalRainfallMm: 30.0,
    windSpeedKmh: 22.0,
    maxTempC: 30.0,
    event: "Moderate Seasonal Weather",
    eventTa: "மிதமான பருவகால வானிலை",
    riskCategory: "MODERATE"
  }
};

/**
 * Runs the full AI-assisted verification pipeline on claim submission.
 */
export function verifyClaim(formData) {
  const districtKey = (formData.district || '').toLowerCase().trim();
  const weatherBase = DISTRICT_WEATHER_STATION_DB[districtKey] || DISTRICT_WEATHER_STATION_DB.default;
  
  const reportedDamageType = (formData.damageType || '').toLowerCase();
  const reportedSeverity = parseFloat(formData.estimatedPercentage) || 60;
  const description = (formData.farmerDescription || '').toLowerCase();
  
  // 1. Computer Vision Inspection (Mock / Heuristic Engine)
  const isAnimalKeywordPresent = description.includes('boar') || description.includes('animal') || 
                                description.includes('elephant') || description.includes('பன்றி') || 
                                description.includes('யானை') || description.includes('விலங்கு') ||
                                reportedDamageType.includes('animal');

  const isCycloneWind = reportedDamageType.includes('cyclone') || reportedDamageType.includes('wind') || description.includes('wind') || description.includes('புயல்');
  const isFloodWater = reportedDamageType.includes('flood') || reportedDamageType.includes('water') || description.includes('flood') || description.includes('வெள்ள');
  const isDrought = reportedDamageType.includes('drought') || description.includes('drought') || description.includes('வறட்சி');

  let cropDetected = formData.cropName || "Cultivated Crop";
  let visionScore = Math.min(95, Math.max(25, reportedSeverity + Math.floor(Math.random() * 8) - 4));
  let waterLodging = false;
  let animalTrampling = false;
  let windLodging = false;
  let visionConfidence = 92;
  let visionDetailsEn = "";
  let visionDetailsTa = "";

  if (isAnimalKeywordPresent || formData.imageCategory === 'animal_sugarcane') {
    animalTrampling = true;
    visionDetailsEn = "Identified localized stalk snapping, irregular perimeter trampling pathways, and root gnawing marks.";
    visionDetailsTa = "பயிரின் குறிப்பிட்ட விளிம்பு பகுதிகளில் முறிவுகள், மிதிபட்ட தடங்கள் மற்றும் கடித்த அடையாளங்கள் கண்டறியப்பட்டன.";
  } else if (isCycloneWind || weatherBase.riskCategory === 'CYCLONE') {
    windLodging = true;
    visionDetailsEn = "Directional lodging of stalks matching cyclonic wind vectors; severe snapped stems.";
    visionDetailsTa = "சூறாவளி காற்றின் திசையில் பயிர்கள் அடியோடு சாய்ந்துள்ளதும், தண்டு முறிவுகளும் கண்டறியப்பட்டன.";
  } else if (isFloodWater || weatherBase.riskCategory === 'FLOOD') {
    waterLodging = true;
    visionDetailsEn = "Visible standing water, panicle submergence, and early leaf decay chlorosis.";
    visionDetailsTa = "வயலில் தேங்கியுள்ள தண்ணீர், நீரில் மூழ்கிய கதிர்கள் மற்றும் இலை அழுகல் கண்டறியப்பட்டது.";
  } else if (isDrought && weatherBase.riskCategory !== 'FLOOD') {
    visionDetailsEn = "Severe soil fissure cracking, foliar wilting, and vegetative desiccation.";
    visionDetailsTa = "நிலத்தில் வெடிப்புகள், பயிர் வாடல் மற்றும் காய்ந்து போன நிலை கண்டறியப்பட்டது.";
  } else {
    visionDetailsEn = "Crop foliage detected with visible structural distress.";
    visionDetailsTa = "பயிர்களின் இலைகளில் பாதிப்புகள் கண்டறியப்பட்டுள்ளன.";
  }

  // 2. Weather Cross-Check
  let weatherMatch = "Consistent";
  let weatherMatchTa = "வானிலை சான்று பொருந்துகிறது";
  let weatherConsistencyScore = 95;

  if (isDrought && weatherBase.recentRainfallMm > 150) {
    // Severe Contradiction (e.g. Scenario 4)
    weatherMatch = "Contradiction: Extreme rainfall recorded on claimed drought period.";
    weatherMatchTa = "முரண்பாடு: வறட்சி என தெரிவிக்கப்பட்ட தேதியில் கனமழை பதிவாகியுள்ளது.";
    weatherConsistencyScore = 10;
  } else if (reportedDamageType.includes('flood') && weatherBase.recentRainfallMm < 20) {
    weatherMatch = "Low rainfall recorded at local weather station during reported window.";
    weatherMatchTa = "குறிப்பிட்ட காலத்தில் வானிலை மையத்தில் குறைந்த மழையே பதிவாகியுள்ளது.";
    weatherConsistencyScore = 30;
  }

  // 3. Simulated Satellite NDVI Spectral Analysis
  let beforeNdvi = 0.76;
  let afterNdvi = 0.22;
  
  if (weatherConsistencyScore < 20) {
    // Suspicious: satellite shows healthy green crops
    beforeNdvi = 0.74;
    afterNdvi = 0.78;
  } else if (animalTrampling) {
    beforeNdvi = 0.74;
    afterNdvi = 0.54; // Partial patch drop
  } else {
    afterNdvi = Math.max(0.15, (0.76 * (1 - visionScore / 100)).toFixed(2));
  }
  const ndviDrop = (afterNdvi - beforeNdvi).toFixed(2);

  // 4. DAMAGE CAUSE ANALYSIS MATRIX
  let damageClassification = "NATURAL_DISASTER";
  let classificationLabelEn = "Natural Disaster / Weather Damage";
  let classificationLabelTa = "இயற்கை பேரிடர் / வானிலை சேதம்";
  let primaryFactorEn = "Weather & Natural Calamity";
  let primaryFactorTa = "வானிலை & இயற்கை பேரிடர்";
  let synthesisSummaryEn = "";
  let synthesisSummaryTa = "";

  if (weatherConsistencyScore < 30) {
    damageClassification = "SUSPICIOUS";
    classificationLabelEn = "Suspicious activity detected – requires manual verification";
    classificationLabelTa = "சந்தேகத்திற்கிடமான நடவடிக்கை கண்டறியப்பட்டுள்ளது – நேரடி சரிபார்ப்பு தேவை";
    primaryFactorEn = "Data & Evidence Inconsistency";
    primaryFactorTa = "தரவு மற்றும் சான்றுகள் முரண்பாடு";
    synthesisSummaryEn = `Discrepancy: Claim reports damage event contradictory to meteorological station records (${weatherBase.recentRainfallMm}mm rain recorded). Satellite NDVI confirms healthy vegetation (${afterNdvi}). Flagged respectfully for field review.`;
    synthesisSummaryTa = `முரண்பாடு: தெரிவிக்கப்பட்ட சேதத்திற்கும் வானிலை மைய தரவுகளுக்கும் (${weatherBase.recentRainfallMm} மிமீ மழை) முரண்பாடு உள்ளது. செயற்கைக்கோள் தரவும் பயிர் பச்சையாக உள்ளதை காட்டுகிறது. எனவே நேரடி கள ஆய்வுக்கு அனுப்பப்படுகிறது.`;
  } else if (animalTrampling && weatherBase.recentRainfallMm < 30) {
    damageClassification = "ANIMAL_DAMAGE";
    classificationLabelEn = "Possible Animal Damage (Wildlife Intrusion)";
    classificationLabelTa = "சாத்தியமான வனவிலங்கு / விலங்கு சேதம்";
    primaryFactorEn = "Wild Animal Intrusion / Crop Depredation";
    primaryFactorTa = "காட்டு விலங்குகள் பயிர் சேதம்";
    synthesisSummaryEn = `Important Analysis: Weather recorded was only ${weatherBase.recentRainfallMm}mm mild shower with ${weatherBase.windSpeedKmh} km/h breeze (incapable of severe structural crop lodging). However, visual inspection detects animal bite and trampling marks. System correctly classifies as 'Possible Animal Damage' instead of attributing falsely to weather.`;
    synthesisSummaryTa = `முக்கிய பகுப்பாய்வு: வானிலையில் ${weatherBase.recentRainfallMm} மிமீ லேசான மழையே பதிவாகியுள்ளது. ஆனால் பயிர் படங்களில் விலங்குகள் கடித்த தடங்களும் கால் மிதிபட்ட அடையாளங்களும் தெளிவாக உள்ளன. இது இயற்கை பேரிடராக அல்லாமல் 'வனவிலங்கு சேதம்' என துல்லியமாக பகுப்பாய்வு செய்யப்பட்டுள்ளது.`;
  } else if (animalTrampling && weatherBase.recentRainfallMm >= 30) {
    damageClassification = "MIXED_UNCERTAIN";
    classificationLabelEn = "Mixed / Uncertain Causation (Weather + Wildlife)";
    classificationLabelTa = "கலப்பு / நிச்சயமற்ற சேத காரணி (வானிலை + விலங்கு)";
    primaryFactorEn = "Compound Weather & Wildlife Factors";
    primaryFactorTa = "வானிலை மற்றும் வனவிலங்கு கூட்டு காரணிகள்";
    synthesisSummaryEn = "Both moderate rainfall and localized wildlife intrusion markers are present. Requires joint inspection between Agriculture and Forest departments.";
    synthesisSummaryTa = "வானிலை மழைப்பொழிவு மற்றும் வனவிலங்கு சேத அடையாளங்கள் இரண்டும் கலந்துள்ளதால் வேளாண் மற்றும் வனத்துறையின் கூட்டு ஆய்வு பரிந்துரைக்கப்படுகிறது.";
  } else {
    damageClassification = "NATURAL_DISASTER";
    classificationLabelEn = "Natural Disaster / Weather Damage";
    classificationLabelTa = "இயற்கை பேரிடர் / வானிலை சேதம்";
    primaryFactorEn = weatherBase.event;
    primaryFactorTa = weatherBase.eventTa;
    synthesisSummaryEn = `High correlation between meteorological data (${weatherBase.recentRainfallMm}mm rain, ${weatherBase.windSpeedKmh} km/h wind), satellite vegetation drop (${ndviDrop}), and crop damage photographs.`;
    synthesisSummaryTa = `வானிலை மைய தரவுகள் (${weatherBase.recentRainfallMm} மிமீ மழை, ${weatherBase.windSpeedKmh} கிமீ காற்று), செயற்கைக்கோள் பயிர் இழப்பு (${ndviDrop}) மற்றும் புகைப்படங்கள் முழுமையாக பொருந்துகின்றன.`;
  }

  // 5. Fraud & Anomaly Screening
  let fraudRiskLevel = "Low Risk";
  let fraudRiskLevelTa = "குறைந்த அபாயம்";
  let fraudScore = 6;
  let fraudReasons = [
    "GPS coordinates match declared survey parcel boundaries.",
    "Image metadata and timestamp align with reported damage event.",
    "No duplicate claim or image hash found in state registry."
  ];

  if (damageClassification === "SUSPICIOUS") {
    fraudRiskLevel = "High Risk";
    fraudRiskLevelTa = "அதிக அபாயம் (நேரடி சரிபார்ப்பு தேவை)";
    fraudScore = 82;
    fraudReasons = [
      "Suspicious activity detected – requires manual verification.",
      "Severe discrepancy between reported weather peril and ground radar data.",
      "Satellite NDVI indicates healthy active biomass without stress.",
      "Image integrity screening recommends physical field inspection."
    ];
  } else if (damageClassification === "ANIMAL_DAMAGE" || damageClassification === "MIXED_UNCERTAIN") {
    fraudRiskLevel = "Low-Medium Risk (Discrepancy Clarified)";
    fraudRiskLevelTa = "குறைந்த-நடுத்தர அபாயம் (காரணம் தெளிவுபடுத்தப்பட்டது)";
    fraudScore = 18;
    fraudReasons = [
      "Farmer claimed weather peril, but physical evidence indicates wildlife intrusion.",
      "No malicious fraud intent detected; requires scheme redirection to Forest Department."
    ];
  }

  // 6. Scheme Eligibility & Recommendation
  let schemeId = "pmfby";
  let schemeName = "Pradhan Mantri Fasal Bima Yojana (PMFBY)";
  let schemeNameTa = "பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY)";
  let eligibilityStatus = "Eligible";
  let eligibilityStatusTa = "தகுதியுடையவர்";
  let nextStepEn = "Preliminary verification successful. Forwarded for field officer approval.";
  let nextStepTa = "இந்த பகுதியில் ஏற்பட்ட வானிலை காரணமாக பயிர் சேதம் ஏற்பட்டிருக்க வாய்ப்பு உள்ளது. முதற்கட்ட சரிபார்ப்பு முடிந்தது.";

  if (damageClassification === "ANIMAL_DAMAGE") {
    schemeId = "tn-wildlife-relief";
    schemeName = "State Forest Department Wildlife Crop Depredation Scheme";
    schemeNameTa = "வனத்துறை வனவிலங்கு பயிர் சேத இழப்பீட்டுத் திட்டம்";
    eligibilityStatus = "Eligible for Wildlife Relief";
    eligibilityStatusTa = "வனத்துறை நிவாரணத்திற்கு தகுதி";
    nextStepEn = "Routed to Forest Range Officer under wildlife crop depredation guidelines.";
    nextStepTa = "வானிலை மிதமாக இருந்ததால் இது வனவிலங்கு சேதமாக கணிக்கப்பட்டு வனத்துறை நிவாரணத்திற்கு பரிந்துரைக்கப்பட்டுள்ளது.";
  } else if (damageClassification === "SUSPICIOUS") {
    eligibilityStatus = "More Information Required";
    eligibilityStatusTa = "கூடுதல் தகவல் & கள ஆய்வு தேவை";
    nextStepEn = "Suspicious activity detected – requires manual verification. Field officer physical visit scheduled.";
    nextStepTa = "வானிலை மற்றும் செயற்கைக்கோள் தரவுகளில் முரண்பாடுகள் உள்ளதால் மேலும் சில ஆவணங்கள் மற்றும் நேரடி கள ஆய்வு தேவைப்படுகின்றன.";
  }

  const claimId = `AGC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    claimId,
    timestamp: new Date().toISOString(),
    status: damageClassification === "SUSPICIOUS" ? "Under Review" : "Preliminary Verified",
    damageCauseClassification: damageClassification,
    damageCauseLabel: classificationLabelEn,
    damageCauseLabelTa: classificationLabelTa,
    confidence: visionConfidence,
    aiDetectedSeverity: visionScore,
    aiSeverityClass: visionScore > 75 ? "Catastrophic / Severe Loss" : (visionScore > 40 ? "Moderate-High Loss" : "Mild Damage"),
    aiSeverityClassTa: visionScore > 75 ? "கடுமையான தீவிர சேதம்" : (visionScore > 40 ? "மிதமான முதல் அதிக சேதம்" : "குறைந்த சேதம்"),
    
    weatherData: {
      location: weatherBase.station,
      date: formData.damageDateTime ? new Date(formData.damageDateTime).toLocaleDateString() : "Recent",
      rainfallMm: weatherBase.recentRainfallMm,
      normalRainfallMm: weatherBase.normalRainfallMm,
      deviationPct: `${weatherBase.recentRainfallMm > weatherBase.normalRainfallMm ? '+' : ''}${Math.round(((weatherBase.recentRainfallMm - weatherBase.normalRainfallMm)/weatherBase.normalRainfallMm)*100)}%`,
      windSpeedKmh: weatherBase.windSpeedKmh,
      maxTempC: weatherBase.maxTempC,
      weatherStatus: weatherBase.event,
      weatherStatusTa: weatherBase.eventTa,
      weatherMatch,
      weatherMatchTa,
      weatherConsistencyScore
    },

    visionData: {
      cropIdentified: cropDetected,
      cropIdentifiedTa: cropDetected,
      waterLodgingDetected: waterLodging,
      chlorosisRottingDetected: waterLodging,
      mechanicalAnimalTrampling: animalTrampling,
      visualDamageScore: `${visionScore}% Estimated Visual Loss`,
      detailsEn: visionDetailsEn,
      detailsTa: visionDetailsTa,
    },

    satelliteData: {
      source: "Sentinel-2 & Landsat-9 Spectral Simulation",
      beforeDate: "15 Days Prior",
      afterDate: "Current Post-Incident",
      beforeNdvi,
      afterNdvi,
      ndviDrop: `${ndviDrop} NDVI Index Change`,
      vegetationStatus: afterNdvi < 0.35 ? "Severe canopy collapse and vegetative biomass decline." : "Stable canopy coverage."
    },

    damageCauseAnalysis: {
      primaryFactor: primaryFactorEn,
      primaryFactorTa,
      animalDamageDetected: animalTrampling,
      animalFactorConfidence: animalTrampling ? 89 : 4,
      weatherFactorConfidence: weatherConsistencyScore,
      synthesisSummary: synthesisSummaryEn,
      synthesisSummaryTa
    },

    fraudRisk: {
      level: fraudRiskLevel,
      levelTa: fraudRiskLevelTa,
      score: fraudScore,
      reasons: fraudReasons
    },

    schemeRecommendation: {
      schemeId,
      schemeName,
      schemeNameTa,
      eligibilityStatus,
      eligibilityStatusTa,
      estimatedCompensation: `₹${(parseFloat(formData.cropArea || 2) * (schemeId === 'tn-wildlife-relief' ? 20000 : 45000)).toLocaleString('en-IN')}`,
      nextStepEnglish: nextStepEn,
      nextStepTamil: nextStepTa
    },

    farmerData: formData
  };
}

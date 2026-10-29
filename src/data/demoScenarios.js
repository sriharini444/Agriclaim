export const demoScenarios = [
  {
    id: "SCN-FLOOD-01",
    scenarioKey: "flood_thanjavur",
    title: "Scenario 1: Heavy Flood Inundation (Natural Disaster)",
    titleTa: "காட்சி 1: அதீத வெள்ளப்பெருக்கு பயிர் சேதம் (இயற்கை பேரிடர்)",
    badge: "100% Natural Disaster Match",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    badgeTa: "இயற்கை பேரிடர் பொருத்தம்",
    description: "Paddy crop submerged for 72 hours due to Cauvery delta flash floods in Thanjavur. Verified by historical weather station (184mm rain) and satellite NDVI drop.",
    descriptionTa: "தஞ்சாவூர் காவேரி டெல்டாவில் திடீர் வெள்ளத்தால் 72 மணி நேரம் நெற்பயிர் நீரில் மூழ்கியது. வானிலை மையம் (184 மிமீ மழை) மற்றும் செயற்கைக்கோள் NDVI மூலம் உறுதி செய்யப்பட்டது.",
    
    farmerData: {
      farmerName: "K. Selvam (செல்வம்)",
      mobileNumber: "9842176540",
      annualIncome: "180000",
      otherIncome: "Dairy / Livestock",
      farmerId: "TN-AGRI-2024-9842",
      surveyNumber: "142/3B",
      landArea: "3.5",
      village: "Thiruvaiyaru (திருவையாறு)",
      district: "Thanjavur",
      state: "Tamil Nadu",
      landDocName: "Patta_Chitta_142_3B.pdf",
      
      cropName: "Paddy (Ponni Rice)",
      cropType: "Kharif / Samba Season",
      sowingDate: "2024-09-15",
      expectedHarvest: "2025-01-20",
      cropArea: "3.2",
      damageDateTime: "2024-11-28T14:30",
      damageType: "Flood & Water Logging",
      estimatedPercentage: "85",
      farmerDescription: "Due to continuous heavy rains and river breach, my entire paddy field was submerged in 3 feet of water for 4 days. Grains have rotted.",
      farmerDescriptionTa: "தொடர் கனமழை மற்றும் ஆற்று வெள்ளத்தால் எனது நெல் வயல் 3 அடி நீரில் 4 நாட்கள் மூழ்கியது. கதிர்கள் அழுகிவிட்டன.",
      
      lat: 10.8789,
      lng: 79.1065,
      locationName: "Thiruvaiyaru, Thanjavur, Tamil Nadu",
      
      imageCategory: "flood_paddy",
      imagePreview: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
      imageLabel: "Flood inundated paddy field with standing water and lodging."
    },

    verificationResult: {
      status: "Verified",
      damageCauseClassification: "NATURAL_DISASTER",
      damageCauseLabel: "Natural Disaster / Weather Damage",
      damageCauseLabelTa: "இயற்கை பேரிடர் / வானிலை சேதம்",
      confidence: 94,
      aiDetectedSeverity: 86,
      aiSeverityClass: "Severe Damage / Substantial Loss",
      aiSeverityClassTa: "கடுமையான சேதம் / பெரும் மகசூல் இழப்பு",
      
      weatherData: {
        location: "Thanjavur AWS-04",
        date: "28-Nov-2024",
        rainfallMm: 184.5,
        normalRainfallMm: 22.0,
        deviationPct: "+738% Extreme Surplus",
        windSpeedKmh: 42,
        maxTempC: 24.5,
        weatherStatus: "Extreme Heavy Downpour & Flash Inundation",
        weatherStatusTa: "அதீத கனமழை மற்றும் திடீர் வெள்ளப்பெருக்கு",
        weatherMatch: "High Correlation (100% Consistent)"
      },

      visionData: {
        cropIdentified: "Paddy (Oryza sativa)",
        cropIdentifiedTa: "நெல் பயிர்",
        waterLodgingDetected: true,
        chlorosisRottingDetected: true,
        mechanicalAnimalTrampling: false,
        visualDamageScore: "86% Loss Area Identified",
        details: "Deep water ponding, leaf decay, lodging of mature panicles."
      },

      satelliteData: {
        source: "Sentinel-2 Spectral Simulation",
        beforeDate: "15-Nov-2024",
        afterDate: "01-Dec-2024",
        beforeNdvi: 0.78,
        afterNdvi: 0.19,
        ndviDrop: "-0.59 (Significant Canopy Loss)",
        vegetationStatus: "Severe moisture saturation and biomass decline."
      },

      damageCauseAnalysis: {
        primaryFactor: "Heavy Monsoon Inundation (Flash Flood)",
        primaryFactorTa: "பருவமழை வெள்ளப்பெருக்கு",
        animalDamageDetected: false,
        animalFactorConfidence: 2,
        weatherFactorConfidence: 96,
        synthesisSummary: "Weather radar, ground station rainfall, optical spectral NDVI, and field photographs all corroborate severe flood inundation. No animal tracks detected.",
        synthesisSummaryTa: "வானிலை மையம், தரைப்பகுதி மழைப்பொழிவு, செயற்கைக்கோள் NDVI மற்றும் புகைப்படங்கள் அனைத்தும் வெள்ள சேதத்தை உறுதிப்படுத்துகின்றன. விலங்கு தடங்கள் ஏதுமில்லை."
      },

      fraudRisk: {
        level: "Low Risk",
        levelTa: "குறைந்த அபாயம்",
        score: 4, // out of 100
        reasons: [
          "GPS coordinates match survey number location in Thiruvaiyaru.",
          "Extreme weather corroborated by IMD station data.",
          "Image metadata timestamp matches reported damage window.",
          "No duplicate image hash in claim registry."
        ]
      },

      schemeRecommendation: {
        schemeId: "pmfby",
        schemeName: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        schemeNameTa: "பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
        eligibilityStatus: "Eligible",
        eligibilityStatusTa: "முழு தகுதியுடையவர்",
        estimatedCompensation: "₹1,44,000 (Based on 3.2 acres @ ₹45,000/acre scale of finance)",
        estimatedCompensationTa: "சுமார் ₹1,44,000 (3.2 ஏக்கருக்கு)",
        nextStepTamil: "இந்த பகுதியில் ஏற்பட்ட வானிலை காரணமாக பயிர் சேதம் ஏற்பட்டிருக்க வாய்ப்பு உள்ளது. முதற்கட்ட சரிபார்ப்பு முடிந்தது.",
        nextStepEnglish: "High probability of weather-induced crop damage. Forwarded to Agricultural Officer for rapid settlement."
      }
    }
  },

  {
    id: "SCN-ANTMAL-02",
    scenarioKey: "animal_sugarcane",
    title: "Scenario 2: Wild Boar Intrusion during Light Rain (Damage Cause Analysis)",
    titleTa: "காட்சி 2: லேசான மழையின் போது காட்டுப்பன்றி சேதம் (காரண பகுப்பாய்வு)",
    badge: "Animal Damage Disentanglement",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    badgeTa: "வனவிலங்கு சேத பகுப்பாய்வு",
    description: "Farmer reported storm damage in Coimbatore foothill farm, but AI analysis discovers wild boar herd intrusion, bite marks, and snout digging despite light rain.",
    descriptionTa: "கோயம்புத்தூர் வனப்பகுதி விவசாயி புயல் சேதம் என விண்ணப்பித்திருந்தார், ஆனால் AI பகுப்பாய்வு லேசான மழையையும் காட்டுப்பன்றிகள் கடித்து சேதப்படுத்தியதையும் கண்டறிந்தது.",
    
    farmerData: {
      farmerName: "M. Ramanathan (ராமநாதன்)",
      aadhaarMasked: "••••-••••-5678",
      mobileNumber: "9443218970",
      annualIncome: "240000",
      otherIncome: "Agri Labor / Small Business",
      farmerId: "TN-AGRI-2024-4412",
      surveyNumber: "88/1A",
      landArea: "4.0",
      village: "Thondamuthur (தொண்டாமுத்தூர்)",
      district: "Coimbatore",
      state: "Tamil Nadu",
      landDocName: "Patta_88_1A_Forest_Fringe.pdf",
      
      cropName: "Sugarcane (கரும்பு - Co 86032)",
      cropType: "Commercial / Annual",
      sowingDate: "2024-02-10",
      expectedHarvest: "2025-01-15",
      cropArea: "2.8",
      damageDateTime: "2024-10-14T06:00",
      damageType: "Storm & Rain with Fallen Crops",
      estimatedPercentage: "60",
      farmerDescription: "After bad weather at night, my sugarcane crop was smashed to the ground. Suspected high wind and animals.",
      farmerDescriptionTa: "இரவு மோசமான வானிலைக்குப் பிறகு, எனது கரும்பு பயிர் தரையில் சாய்ந்து கிடந்தது. காற்று மற்றும் விலங்குகள் சேதப்படுத்தியிருக்கலாம்.",
      
      lat: 10.9954,
      lng: 76.8402,
      locationName: "Thondamuthur, Western Ghats Fringe, Coimbatore",
      
      imageCategory: "animal_sugarcane",
      imagePreview: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
      imageLabel: "Trampled sugarcane stalks with visible mastication and irregular localized pathways."
    },

    verificationResult: {
      status: "Verified - Cause Redirected",
      damageCauseClassification: "ANIMAL_DAMAGE",
      damageCauseLabel: "Possible Animal Damage (Wildlife Intrusion)",
      damageCauseLabelTa: "சாத்தியமான வனவிலங்கு / விலங்கு சேதம்",
      confidence: 91,
      aiDetectedSeverity: 58,
      aiSeverityClass: "Moderate-Severe Localized Damage",
      aiSeverityClassTa: "குறிப்பிட்ட பகுதியில் தீவிர சேதம்",
      
      weatherData: {
        location: "Coimbatore Agro-Met 02",
        date: "14-Oct-2024",
        rainfallMm: 11.2,
        normalRainfallMm: 15.0,
        deviationPct: "-25% Normal Mild Shower",
        windSpeedKmh: 14,
        maxTempC: 31.0,
        weatherStatus: "Mild Light Rain / Gentle Breeze (No Cyclone/Severe Storm)",
        weatherStatusTa: "லேசான மழை மற்றும் மிதமான காற்று (புயல் காற்று இல்லை)",
        weatherMatch: "Inadequate weather intensity to cause mechanical stalk snapping."
      },

      visionData: {
        cropIdentified: "Sugarcane (Saccharum officinarum)",
        cropIdentifiedTa: "கரும்பு பயிர்",
        waterLodgingDetected: false,
        chlorosisRottingDetected: false,
        mechanicalAnimalTrampling: true,
        visualDamageScore: "58% Damage in Perimeter Zones",
        details: "Irregular radial trampling, stalk gnawing, snout-digging marks near roots typical of Sus scrofa (Wild Boar).",
        detailsTa: "ஒழுங்கற்ற வட்ட மிதிப்பு, தண்டு கடித்தல் மற்றும் வேர்களுக்கு அருகில் மூக்கால் தோண்டிய தடங்கள் — காட்டுப்பன்றிக்கு (Sus scrofa) பொதுவான அடையாளங்கள்.",
        detailsEn: "Irregular radial trampling, stalk gnawing, snout-digging marks near roots typical of Sus scrofa (Wild Boar)."
      },

      animalEvidenceSections: [
        {
          label: "Bite Mark Pattern Analysis",
          labelTa: "கடி தடங்கள் பகுப்பாய்வு",
          confidence: 92,
          findings: "Incisor bite radius 4–6 cm matches Sus scrofa (Wild Boar) dental profile. Marks found on mid-stalk and at rhizome level.",
          findingsTa: "4–6 செ.மீ அகல கடி தடங்கள் காட்டுப்பன்றி பற்கள் வடிவத்துடன் பொருந்துகின்றன. தண்டின் நடு பகுதி மற்றும் கிழங்கு மட்டத்தில் கடி தடங்கள் கண்டுபிடிக்கப்பட்டன.",
          icon: "🦷",
          color: "amber"
        },
        {
          label: "Snout-Digging & Root Disturbance",
          labelTa: "மூக்கால் தோண்டுதல் & வேர் கலைப்பு",
          confidence: 88,
          findings: "Conical soil excavation pits (depth 8–15 cm) near rhizomes. Typical Sus scrofa foraging to access sugar-rich root tissue.",
          findingsTa: "கிழங்குகளுக்கு அருகில் 8–15 செ.மீ ஆழமான கூம்பு வடிவ மண் தோண்டல் குழிகள். சர்க்கரை நிறைந்த வேர் திசுவை அணுக காட்டுப்பன்றி வழக்கமான உண்ணும் முறை.",
          icon: "🐗",
          color: "orange"
        },
        {
          label: "Herd Trampling Path Analysis",
          labelTa: "கூட்ட மிதிப்பு பாதை பகுப்பாய்வு",
          confidence: 85,
          findings: "Radial damage radiates from 2 forest-boundary entry points. Trampling affects 58% of perimeter rows — consistent with herd of 8–12 animals moving through crop rows.",
          findingsTa: "2 காட்டு எல்லை நுழைவு புள்ளிகளிலிருந்து பரவும் வட்ட சேத முறை. 8–12 விலங்குகள் கூட்டம் கரும்பு வரிசைகளிடையே நடந்தது என்பதற்கு பொருத்தமான சான்று.",
          icon: "👣",
          color: "red"
        },
        {
          label: "Weather vs Damage Contradiction",
          labelTa: "வானிலை vs சேதம் முரண்பாடு",
          confidence: 97,
          findings: "14 km/h wind speed is physically incapable of lodging mature Co 86032 sugarcane (requires >60 km/h). 11.2mm rain is below lodging threshold. Weather cannot explain observed damage.",
          findingsTa: "14 கி.மீ/மணி காற்று முதிர்ந்த கரும்பை சாய்க்க போதுமானதில்லை (>60 கி.மீ/மணி தேவை). வானிலை சேதத்தை விளக்க முடியாது — விலங்கு சேதம் தெளிவாக உறுதி செய்யப்படுகிறது.",
          icon: "🌧️",
          color: "blue"
        }
      ],

      consistencyChecks: [
        { label: "GPS ↔ Survey Record Match", status: "PASS", detail: "Lat/Lng within 50m of registered parcel 88/1A" },
        { label: "Claim Date ↔ Weather Station", status: "PASS", detail: "14-Oct-2024 weather confirms light rain, not storm" },
        { label: "Image EXIF Timestamp", status: "PASS", detail: "Photo metadata matches reported damage window ±6hrs" },
        { label: "Duplicate Image Hash Check", status: "PASS", detail: "No match found in Agriclaim claim image registry" },
        { label: "Peril Type vs Physical Evidence", status: "REDIRECT", detail: "Farmer reported Storm; evidence shows Wildlife — auto-reclassified" },
        { label: "Forest Boundary Proximity", status: "FLAG", detail: "Farm is 780m from Boluvampatti Reserved Forest — wildlife risk zone" }
      ],

      satelliteData: {
        source: "Sentinel-2 Spectral Simulation",
        beforeDate: "05-Oct-2024",
        afterDate: "18-Oct-2024",
        beforeNdvi: 0.74,
        afterNdvi: 0.54,
        ndviDrop: "-0.20 (Patchy localized drop on forest boundary)",
        vegetationStatus: "Non-uniform edge degradation consistent with wildlife entry."
      },

      damageCauseAnalysis: {
        primaryFactor: "Wild Boar (Sus scrofa) Herd Crop Depredation",
        primaryFactorTa: "காட்டுப்பன்றி கூட்டத்தால் பயிர் சேதம்",
        animalDamageDetected: true,
        animalFactorConfidence: 89,
        weatherFactorConfidence: 12,
        synthesisSummary: "Crucial Analysis: Weather recorded was only 11mm gentle rain with 14 km/h breeze (incapable of lodging heavy sugarcane). However, image vision identified animal bite marks and localized boundary trampling. System correctly identifies 'Possible Animal Damage' instead of rejecting or attributing falsely to weather.",
        synthesisSummaryTa: "முக்கிய பகுப்பாய்வு: வானிலை பதிவில் 11 மிமீ லேசான மழை மட்டுமே பதிவாகியுள்ளது. ஆனால் பயிர் படங்களில் விலங்குகள் கடித்த தடங்களும் காட்டுப்பன்றி கால்தடங்களும் தெளிவாக உள்ளன. வானிலை காரணமாக இல்லாமல் வனவிலங்கு சேதமாக கணிக்கப்பட்டுள்ளது."
      },

      fraudRisk: {
        level: "Low-Medium Risk (Discrepancy Clarified)",
        levelTa: "குறைந்த-நடுத்தர அபாயம் (காரணம் தெளிவுபடுத்தப்பட்டது)",
        score: 18,
        reasons: [
          "Farmer listed storm peril, but physical evidence proves wildlife intrusion.",
          "Land is within 800m of Boluvampatti Reserved Forest boundary.",
          "No malicious fraud intent detected; requires scheme redirection."
        ]
      },

      schemeRecommendation: {
        schemeId: "tn-wildlife-relief",
        schemeName: "State Forest Department Wildlife Crop Depredation Scheme",
        schemeNameTa: "வனத்துறை வனவிலங்கு பயிர் சேத இழப்பீட்டுத் திட்டம்",
        eligibilityStatus: "Eligible for Wildlife Relief Scheme",
        eligibilityStatusTa: "வனத்துறை நிவாரணத்திற்கு முழு தகுதி",
        estimatedCompensation: "₹56,000 (2.8 acres @ ₹20,000/acre under Forest Dept Norms)",
        estimatedCompensationTa: "சுமார் ₹56,000 (வனத்துறை நிவாரண விதிகளின்படி)",
        nextStepTamil: "வானிலை மிதமாக இருந்ததால் இது வனவிலங்கு சேதமாக கண்டறியப்பட்டுள்ளது. வனத்துறை கூட்டு கள ஆய்வுக்கு பரிந்துரை செய்யப்பட்டுள்ளது.",
        nextStepEnglish: "Classified as Wildlife Intrusion rather than weather loss. Application routed to Forest Range Office for compensation payout. Joint field inspection by Forest Range Officer and Agriculture Officer recommended within 72 hours."
      }
    }
  },

  {
    id: "SCN-CYCLONE-03",
    scenarioKey: "cyclone_banana",
    title: "Scenario 3: Severe Cyclone Wind Lodging (Natural Disaster)",
    titleTa: "காட்சி 3: தீவிர சூறாவளி காற்று - வாழை மரங்கள் சேதம் (இயற்கை பேரிடர்)",
    badge: "Cyclone Damage Verified",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    badgeTa: "சூறாவளி சேதம் உறுதி",
    description: "Banana plantation in coastal Cuddalore flattened by 92 km/h cyclonic squall winds during Cyclone Fengal. High confidence natural disaster.",
    descriptionTa: "கடலூர் கடலோரப் பகுதியில் ஃபெங்கல் புயலின் போது 92 கி.மீ வேகத்தில் வீசிய சூறாவளி காற்றில் வாழை மரங்கள் அடியோடு சாய்ந்தன.",
    
    farmerData: {
      farmerName: "S. Arumugam (ஆறுமுகம்)",
      mobileNumber: "9789123456",
      annualIncome: "320000",
      otherIncome: "No other sources (Farming only)",
      farmerId: "TN-AGRI-2024-7729",
      surveyNumber: "209/4",
      landArea: "5.0",
      village: "Kurinjipadi (குறிஞ்சிப்பாடி)",
      district: "Cuddalore",
      state: "Tamil Nadu",
      landDocName: "Patta_Chitta_Kurinjipadi_209.pdf",
      
      cropName: "Banana (வாழை - Grand Naine)",
      cropType: "Horticulture",
      sowingDate: "2024-03-01",
      expectedHarvest: "2024-12-15",
      cropArea: "4.5",
      damageDateTime: "2024-11-30T18:00",
      damageType: "Cyclone & High Wind Velocity",
      estimatedPercentage: "90",
      farmerDescription: "Cyclone wind violently uprooted standing banana plants with unripe bunches just 2 weeks prior to harvest.",
      farmerDescriptionTa: "அறுவடைக்கு 2 வாரங்களே இருந்த நிலையில், சூறாவளி காற்றில் வாழை மரங்கள் அனைத்தும் முறிந்து விழுந்தன.",
      
      lat: 11.5694,
      lng: 79.5932,
      locationName: "Kurinjipadi, Cuddalore Coastal Belt, Tamil Nadu",
      
      imageCategory: "cyclone_banana",
      imagePreview: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      imageLabel: "Snapped banana pseudostems and flattened plantation canopy."
    },

    verificationResult: {
      status: "Verified",
      damageCauseClassification: "NATURAL_DISASTER",
      damageCauseLabel: "Natural Disaster / Cyclone Lodging",
      damageCauseLabelTa: "இயற்கை பேரிடர் / சூறாவளி காற்று சேதம்",
      confidence: 96,
      aiDetectedSeverity: 92,
      aiSeverityClass: "Total Catastrophic Loss (>85%)",
      aiSeverityClassTa: "முழுமையான தீவிர சேதம் (>85%)",
      
      weatherData: {
        location: "Cuddalore Coastal AWS-01",
        date: "30-Nov-2024",
        rainfallMm: 215.0,
        normalRainfallMm: 18.0,
        deviationPct: "+1094% Cyclonic Surge",
        windSpeedKmh: 92.4,
        maxTempC: 22.0,
        weatherStatus: "Severe Cyclonic Storm (Cyclone Fengal landfall)",
        weatherStatusTa: "தீவிர சூறாவளி புயல் காற்று மற்றும் பெருமழை",
        weatherMatch: "100% Correlation with IMD Severe Weather Warning"
      },

      visionData: {
        cropIdentified: "Banana (Musa acuminata)",
        cropIdentifiedTa: "வாழை பயிர்",
        waterLodgingDetected: true,
        chlorosisRottingDetected: false,
        mechanicalAnimalTrampling: false,
        visualDamageScore: "92% Snapped Pseudo-stems",
        details: "Directional stem snapping in alignment with cyclone wind vectors (North-East to South-West)."
      },

      satelliteData: {
        source: "Sentinel-2 Spectral Simulation",
        beforeDate: "20-Nov-2024",
        afterDate: "03-Dec-2024",
        beforeNdvi: 0.81,
        afterNdvi: 0.23,
        ndviDrop: "-0.58 (Total Canopy Flattening)",
        vegetationStatus: "Instant collapse of upper vegetation canopy across contiguous 4.5 acres."
      },

      damageCauseAnalysis: {
        primaryFactor: "Severe Cyclonic Wind Shear & Trunk Snapping",
        primaryFactorTa: "சூறாவளி புயல் காற்று சேதம்",
        animalDamageDetected: false,
        animalFactorConfidence: 0,
        weatherFactorConfidence: 99,
        synthesisSummary: "Directional tree snapping, 92 km/h IMD recorded winds, and total NDVI collapse confirm immediate cyclone disaster.",
        synthesisSummaryTa: "92 கிமீ வேக புயல் காற்று மற்றும் செயற்கைக்கோள் தரவுகள் மூலம் சூறாவளி சேதம் முழுமையாக உறுதி செய்யப்பட்டுள்ளது."
      },

      fraudRisk: {
        level: "Low Risk",
        levelTa: "குறைந்த அபாயம்",
        score: 3,
        reasons: [
          "Coordinates align with IMD Cyclone Track landfall zone.",
          "High resolution photo exhibits valid EXIF metadata.",
          "High consistency with village-level cluster claims."
        ]
      },

      schemeRecommendation: {
        schemeId: "wbcis",
        schemeName: "Weather Based Crop Insurance Scheme (WBCIS) / PMFBY",
        schemeNameTa: "வானிலை காப்பீட்டு திட்டம் (WBCIS) / PMFBY",
        eligibilityStatus: "Eligible for Automatic Fast-Track Payout",
        eligibilityStatusTa: "உடனடி விரைவு இழப்பீட்டுக்கு தகுதி",
        estimatedCompensation: "₹3,15,000 (4.5 acres @ ₹70,000/acre horticulture rate)",
        estimatedCompensationTa: "சுமார் ₹3,15,000 (வாழை தோட்டக்கலை விகிதப்படி)",
        nextStepTamil: "இந்த பகுதியில் ஏற்பட்ட தீவிர புயல் காற்று காரணமாக வாழை பயிர் முழுமையாக சேதமடைந்துள்ளது. ஆவணங்கள் சரிபார்க்கப்பட்டு இழப்பீடு அனுமதிக்கப்படுகிறது.",
        nextStepEnglish: "100% verified under cyclonic weather trigger. Automatic settlement initiated."
      }
    }
  },

  {
    id: "SCN-SUSPICIOUS-04",
    scenarioKey: "suspicious_nagapattinam",
    title: "Scenario 4: Data Inconsistency & Weather Mismatch (Fraud Screening)",
    titleTa: "காட்சி 4: தரவு முரண்பாடு & வானிலை பொருந்தாமை (மோசடி சோதனை)",
    badge: "Manual Verification Required",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    badgeTa: "நேரடி சரிபார்ப்பு தேவை",
    description: "Claim reports total drought loss in Nagapattinam during a month that received 240mm surplus rainfall, accompanied by stock photo match.",
    descriptionTa: "நாகப்பட்டினத்தில் 240 மிமீ மழை பெய்த மாதத்தில் வறட்சி என தவறாக பதிவு செய்யப்பட்ட கிளைம். இணையதள மாதிரி புகைப்படமும் முரண்பாடுகளும் கண்டறியப்பட்டது.",
    
    farmerData: {
      farmerName: "P. Murugesan (முருகேசன்)",
      mobileNumber: "9123456780",
      annualIncome: "150000",
      otherIncome: "No other sources (Farming only)",
      farmerId: "TN-AGRI-2024-1102",
      surveyNumber: "304/2",
      landArea: "6.0",
      village: "Vedaranyam (வேதாரண்யம்)",
      district: "Nagapattinam",
      state: "Tamil Nadu",
      landDocName: "Land_Record_Unverified_304.pdf",
      
      cropName: "Groundnut (நிலக்கடலை)",
      cropType: "Rabi Oilseed",
      sowingDate: "2024-08-01",
      expectedHarvest: "2024-11-15",
      cropArea: "6.0",
      damageDateTime: "2024-11-05T12:00",
      damageType: "Severe Drought & Moisture Deficit",
      estimatedPercentage: "100",
      farmerDescription: "Extreme prolonged drought scorched entire 6 acres groundnut farm, zero yield.",
      farmerDescriptionTa: "கடும் வறட்சியால் நிலக்கடலை பயிர்கள் முற்றிலும் கருகிவிட்டன, 100% சேதம்.",
      
      lat: 10.3725,
      lng: 79.8519,
      locationName: "Vedaranyam, Nagapattinam, Tamil Nadu",
      
      imageCategory: "suspicious_drought",
      imagePreview: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      imageLabel: "Mismatched stock dry soil landscape with healthy vegetation in background."
    },

    verificationResult: {
      status: "Suspicious Activity Detected",
      damageCauseClassification: "SUSPICIOUS",
      damageCauseLabel: "Suspicious activity detected – requires manual verification",
      damageCauseLabelTa: "சந்தேகத்திற்கிடமான நடவடிக்கை கண்டறியப்பட்டுள்ளது – நேரடி சரிபார்ப்பு தேவை",
      confidence: 88,
      aiDetectedSeverity: 15,
      aiSeverityClass: "Unsubstantiated Damage Claim",
      aiSeverityClassTa: "உறுதிப்படுத்தப்படாத சேத கோரிக்கை",
      
      weatherData: {
        location: "Vedaranyam IMD Station",
        date: "05-Nov-2024",
        rainfallMm: 238.4,
        normalRainfallMm: 65.0,
        deviationPct: "+266% Severe Rainfall (Opposite of Drought)",
        windSpeedKmh: 28,
        maxTempC: 28.5,
        weatherStatus: "Heavy Rain Season Recorded (No Drought Condition)",
        weatherStatusTa: "கனமழை பதிவாகியுள்ளது (வறட்சி நிலை முற்றிலும் இல்லை)",
        weatherMatch: "Contradiction: Extreme rain recorded on claimed drought date."
      },

      visionData: {
        cropIdentified: "Mixed Landscape / Unidentified Field",
        cropIdentifiedTa: "பொருத்தமற்ற நிலப்பரப்பு",
        waterLodgingDetected: false,
        chlorosisRottingDetected: false,
        mechanicalAnimalTrampling: false,
        visualDamageScore: "15% - Photo shows thriving green tree line",
        details: "Image similarity engine found identical stock photo in external dataset. Missing camera EXIF GPS tags."
      },

      satelliteData: {
        source: "Sentinel-2 Spectral Simulation",
        beforeDate: "20-Oct-2024",
        afterDate: "10-Nov-2024",
        beforeNdvi: 0.72,
        afterNdvi: 0.76,
        ndviDrop: "+0.04 (Healthy Biomass Growth)",
        vegetationStatus: "Satellite confirms active healthy vegetation growth across parcel."
      },

      damageCauseAnalysis: {
        primaryFactor: "Data & Evidence Discrepancy",
        primaryFactorTa: "தரவு மற்றும் சான்றுகள் முரண்பாடு",
        animalDamageDetected: false,
        animalFactorConfidence: 0,
        weatherFactorConfidence: 0,
        synthesisSummary: "Discrepancy: Ground station recorded 238mm heavy rainfall on claimed drought date. Satellite NDVI shows 0.76 (healthy green crop). Uploaded image matches web repository. Flagged respectfully for field investigation.",
        synthesisSummaryTa: "முரண்பாடு: வறட்சி என கூறப்பட்ட தேதியில் 238 மிமீ கனமழை பதிவாகியுள்ளது. செயற்கைக்கோள் நிலவரமும் பயிர் பச்சையாக உள்ளதை காட்டுகிறது. ஆகவே நேரடி கள ஆய்வுக்கு அனுப்பப்படுகிறது."
      },

      fraudRisk: {
        level: "High Risk (Requires Manual Field Verification)",
        levelTa: "அதிக அபாயம் (நேரடி கள ஆய்வு தேவை)",
        score: 84,
        reasons: [
          "Suspicious activity detected – requires manual verification.",
          "Direct conflict between reported drought and 238mm recorded rainfall.",
          "Satellite NDVI indicates healthy active vegetation (0.76).",
          "Photo identified as generic non-localized image."
        ]
      },

      schemeRecommendation: {
        schemeId: "pmfby",
        schemeName: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        schemeNameTa: "பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
        eligibilityStatus: "More Information Required / Field Review",
        eligibilityStatusTa: "கூடுதல் தகவல் & கள ஆய்வு தேவை",
        estimatedCompensation: "Pending Field Inspection Verification",
        estimatedCompensationTa: "நேரடி ஆய்வுக்குப் பின் முடிவு செய்யப்படும்",
        nextStepTamil: "வானிலை மற்றும் செயற்கைக்கோள் தரவுகளில் முரண்பாடுகள் உள்ளதால் மேலும் சில ஆவணங்கள் மற்றும் வேளாண் அதிகாரியின் நேரடி கள ஆய்வு தேவைப்படுகின்றன.",
        nextStepEnglish: "Suspicious activity detected – requires manual verification. Field officer physical visit scheduled."
      }
    }
  }
];

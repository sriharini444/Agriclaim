export const mockSchemes = [
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    nameTa: "பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
    type: "Government",
    typeTa: "மத்திய / மாநில அரசு திட்டம்",
    authority: "Ministry of Agriculture & Farmers Welfare, Govt of India",
    eligibleCrops: ["Paddy", "Sugarcane", "Cotton", "Maize", "Groundnut", "Banana", "Pulses", "Millets"],
    eligibleCropsTa: ["நெல்", "கரும்பு", "பருத்தி", "மக்காச்சோளம்", "நிலக்கடலை", "வாழை", "பயறு வகைகள்", "சிறு தானியங்கள்"],
    farmerType: "All Farmers (Loanee, Non-Loanee, Sharecroppers, Tenant Farmers)",
    farmerTypeTa: "அனைத்து விவசாயிகள் (கடன் பெற்றோர், பெறாதோர், குத்தகை விவசாயிகள்)",
    premiumRate: "1.5% to 2.0% (Kharif/Rabi), 5.0% (Commercial/Horticulture)",
    premiumRateTa: "1.5% முதல் 2.0% (காரீஃப்/ரபி), 5.0% (தோட்டக்கலை பயிர்கள்)",
    coverageAmount: "Up to ₹45,000 - ₹85,000 per acre (Scale of Finance)",
    coverageAmountTa: "ஏக்கருக்கு ₹45,000 முதல் ₹85,000 வரை",
    requiredDocs: [
      "Land Ownership Document (Patta / Chitta / Land Record)",
      "Aadhaar Card Copy",
      "Bank Account Passbook (Bank Account Number & IFSC)",
      "Sowing Certificate from VAO / Agri Officer",
      "Crop Damage Photographs"
    ],
    requiredDocsTa: [
      "நில உரிமை ஆவணம் (பட்டா / சிட்டா / அடங்கல்)",
      "ஆதார் அட்டை நகல்",
      "வங்கி கணக்கு புத்தக நகல் (IFSC குறியீட்டுடன்)",
      "விஏஓ / வேளாண் அலுவலர் விதைப்பு சான்றிதழ்",
      "பயிர் சேத புகைப்படங்கள்"
    ],
    keyBenefits: "Covers localized disasters (hailstorm, landslide, inundation/flood), post-harvest losses, and widespread natural yield losses.",
    keyBenefitsTa: "உள்ளூர் பேரிடர்கள் (ஆலங்கட்டி மழை, வெள்ளம் மூழ்குதல்), அறுவடைக்கு பின் சேதம் மற்றும் இயற்கை மகசூல் இழப்பை ஈடுசெய்கிறது.",
    eligibilityRules: {
      maxIncome: null, // No income cap
      minLandAcres: 0.1,
      maxLandAcres: 100,
      coveredPerils: ["Flood", "Drought", "Cyclone", "Hailstorm", "Inundation", "Pest Epidemic"],
      animalDamageCovered: false, // PMFBY standard does not cover wild animal damage (state relief handles it)
      animalDamageNote: "Wild animal damage is not covered under PMFBY; state wildlife compensation applies.",
      animalDamageNoteTa: "காட்டு விலங்கு சேதம் PMFBY-ல் ஈடுசெய்யப்படாது; மாநில வனத்துறை நிவாரணம் பொருந்தும்."
    },
    sampleDataNote: "Sample prototype reference based on PMFBY guidelines."
  },
  {
    id: "wbcis",
    name: "Weather Based Crop Insurance Scheme (WBCIS)",
    nameTa: "வானிலை அடிப்படையிலான பயிர் காப்பீட்டுத் திட்டம் (WBCIS)",
    type: "Government",
    typeTa: "அரசு வானிலை காப்பீடு",
    authority: "Department of Agriculture & Farmers Welfare",
    eligibleCrops: ["Banana", "Chilli", "Turmeric", "Onion", "Tomato", "Cotton", "Sugarcane", "Mango"],
    eligibleCropsTa: ["வாழை", "மிளகாய்", "மஞ்சள்", "வெங்காயம்", "தக்காளி", "பருத்தி", "கரும்பு", "மா"],
    farmerType: "Commercial and Horticultural Crop Growers",
    farmerTypeTa: "தோட்டக்கலை மற்றும் வணிகப் பயிர் விவசாயிகள்",
    premiumRate: "5% subsidized farmer share",
    premiumRateTa: "5% மானிய பிரீமியம்",
    coverageAmount: "Up to ₹60,000 - ₹1,20,000 per acre",
    coverageAmountTa: "ஏக்கருக்கு ₹60,000 முதல் ₹1,20,000 வரை",
    requiredDocs: [
      "Patta / Chitta / Land Ownership Record",
      "Aadhaar Card",
      "Bank Details with Aadhaar seeding",
      "Village Administrative Officer (VAO) Certificate"
    ],
    requiredDocsTa: [
      "பட்டா / சிட்டா / நில உரிமை சான்று",
      "ஆதார் அட்டை",
      "ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு விவரம்",
      "கிராம நிர்வாக அலுவலர் (VAO) சான்றிதழ்"
    ],
    keyBenefits: "Automatic payouts triggered when automated weather station (AWS) detects rainfall deficit, excessive rainfall, extreme high/low temperature, or high wind speed.",
    keyBenefitsTa: "வானிலை நிலையங்களில் போதிய மழையின்மை, அதீத மழை, அதீத வெப்பம் அல்லது சூறாவளி காற்று பதிவாகும் போது தானியங்கி இழப்பீடு.",
    eligibilityRules: {
      maxIncome: null,
      minLandAcres: 0.2,
      maxLandAcres: 50,
      coveredPerils: ["Rainfall Deficit", "Excess Rainfall", "Extreme Temperature", "High Wind Velocity", "Cyclone"],
      animalDamageCovered: false,
      animalDamageNote: "Weather triggers only. Non-weather perils like animal attacks are not covered.",
      animalDamageNoteTa: "வானிலை மாறுபாடுகளுக்கு மட்டுமே. விலங்கு சேதங்களுக்கு பொருந்தாது."
    },
    sampleDataNote: "Sample prototype reference based on WBCIS weather triggers."
  },
  {
    id: "tn-sdrf",
    name: "State Disaster Relief Assistance (SDRF / Agri Input Subsidy)",
    nameTa: "மாநில பேரிடர் நிவாரண நிதி உதவி (SDRF)",
    type: "Government",
    typeTa: "மாநில அரசு பேரிடர் உதவி",
    authority: "State Revenue & Disaster Management Department",
    eligibleCrops: ["Paddy", "Cotton", "Sugarcane", "Banana", "Pulses", "Millets", "Groundnut", "Vegetables"],
    eligibleCropsTa: ["நெல்", "பருத்தி", "கரும்பு", "வாழை", "பயறு வகைகள்", "சிறு தானியங்கள்", "நிலக்கடலை", "காய்கறிகள்"],
    farmerType: "All registered farmers in declared disaster-affected taluks",
    farmerTypeTa: "பேரிடர் பாதிக்கப்பட்ட வட்டங்களில் உள்ள அனைத்து பதிவு செய்த விவசாயிகள்",
    premiumRate: "0% (Free Government Disaster Input Subsidy)",
    premiumRateTa: "0% (இலவச அரசு உள்ளீட்டு மானிய நிவாரணம்)",
    coverageAmount: "₹8,500 to ₹17,000 per hectare (Rainfed / Irrigated norms)",
    coverageAmountTa: "ஹெக்டேருக்கு ₹8,500 முதல் ₹17,000 வரை",
    requiredDocs: [
      "Patta / Chitta / Land Records",
      "Aadhaar Number",
      "Bank Account Passbook",
      "Damage Assessment Form signed by Village Team"
    ],
    requiredDocsTa: [
      "பட்டா / சிட்டா / நில ஆவணம்",
      "ஆதார் எண்",
      "வங்கி கணக்கு புத்தகம்",
      "கிராம குழு கையொப்பமிட்ட சேத மதிப்பீட்டு படிவம்"
    ],
    keyBenefits: "Immediate direct benefit transfer (DBT) for input relief when crop loss is 33% or higher due to declared floods, cyclone, or drought.",
    keyBenefitsTa: "33% அல்லது அதற்கு மேற்பட்ட பயிர் சேதம் ஏற்படும் போது நேரடி வங்கி பரிமாற்றம் மூலம் உடனடி நிவாரணம்.",
    eligibilityRules: {
      maxIncome: null,
      minLandAcres: 0.1,
      maxLandAcres: 50,
      coveredPerils: ["Flood", "Cyclone", "Drought", "Hailstorm"],
      animalDamageCovered: false,
      animalDamageNote: "Applicable only for notified natural disaster events.",
      animalDamageNoteTa: "அறிவிக்கப்பட்ட இயற்கை பேரிடர்களுக்கு மட்டுமே பொருந்தும்."
    },
    sampleDataNote: "Sample prototype reference data for State Disaster Relief."
  },
  {
    id: "tn-wildlife-relief",
    name: "State Forest Department Wildlife Crop Depredation Scheme",
    nameTa: "வனத்துறை வனவிலங்கு பயிர் சேத இழப்பீட்டுத் திட்டம்",
    type: "Government",
    typeTa: "மாநில வனத்துறை நிவாரணம்",
    authority: "State Forest & Wildlife Department",
    eligibleCrops: ["Sugarcane", "Banana", "Paddy", "Maize", "Coconut", "Groundnut", "Vegetables"],
    eligibleCropsTa: ["கரும்பு", "வாழை", "நெல்", "மக்காச்சோளம்", "தென்னை", "நிலக்கடலை", "காய்கறிகள்"],
    farmerType: "Farmers with land adjoining forest fringe areas or wildlife corridors",
    farmerTypeTa: "வன எல்லை மற்றும் விலங்கு வழித்தடங்களை ஒட்டிய நில விவசாயிகள்",
    premiumRate: "0% (Free Compensation Claim)",
    premiumRateTa: "0% (இலவச இழப்பீட்டு கோரிக்கை)",
    coverageAmount: "₹15,000 to ₹25,000 per acre depending on crop damage",
    coverageAmountTa: "பயிர் சேதத்தைப் பொறுத்து ஏக்கருக்கு ₹15,000 முதல் ₹25,000 வரை",
    requiredDocs: [
      "Patta / Land Document with Forest boundary distance",
      "Aadhaar Card",
      "Clear photos of animal pugmarks / bite marks / damage footprints",
      "Joint inspection report with Forest Range Officer (FRO)"
    ],
    requiredDocsTa: [
      "பட்டா / நில ஆவணம்",
      "ஆதார் அட்டை",
      "விலங்குகளின் கால் தடம் / கடித்த அடையாளங்களின் தெளிவான புகைப்படங்கள்",
      "வனச்சரக அலுவலரின் கூட்டு கள ஆய்வு அறிக்கை"
    ],
    keyBenefits: "Direct financial assistance specifically for damages caused by Wild Elephants, Wild Boars, Gaurs, Deer, and Monkeys.",
    keyBenefitsTa: "காட்டு யானை, காட்டுப்பன்றி, காட்டு மாடு, மான் மற்றும் குரங்குகளால் ஏற்படும் சேதங்களுக்கு நேரடி இழப்பீடு.",
    eligibilityRules: {
      maxIncome: null,
      minLandAcres: 0.1,
      maxLandAcres: 25,
      coveredPerils: ["Wild Boar Damage", "Elephant Intrusion", "Wild Animal Depredation"],
      animalDamageCovered: true,
      animalDamageNote: "Dedicated compensation for wild animal damages.",
      animalDamageNoteTa: "காட்டு விலங்கு சேதங்களுக்கான பிரத்யேக இழப்பீட்டுத் திட்டம்."
    },
    sampleDataNote: "Sample reference based on State Wildlife Depredation Relief norms."
  },
  {
    id: "tata-aig-agrishield",
    name: "TATA AIG Agro-Shield Comprehensive Crop Cover",
    nameTa: "டாடா ஏஐஜி அக்ரோ-ஷீல்டு விரிவான பயிர் காப்பீடு",
    type: "Private",
    typeTa: "தனியார் காப்பீட்டு நிறுவனம்",
    authority: "TATA AIG General Insurance (IRDAI Regulated)",
    eligibleCrops: ["Paddy", "Sugarcane", "Cotton", "Banana", "Chilli", "Turmeric"],
    eligibleCropsTa: ["நெல்", "கரும்பு", "பருத்தி", "வாழை", "மிளகாய்", "மஞ்சள்"],
    farmerType: "Individual Farmers, Farmer Producer Organizations (FPOs)",
    farmerTypeTa: "தனிநபர் விவசாயிகள், உழவர் உற்பத்தியாளர் நிறுவனங்கள் (FPOs)",
    premiumRate: "3.5% to 6.0% depending on sum insured tier",
    premiumRateTa: "3.5% முதல் 6.0% வரை",
    coverageAmount: "₹50,000 to ₹1,50,000 per acre with customized add-on riders",
    coverageAmountTa: "ஏக்கருக்கு ₹50,000 முதல் ₹1,50,000 வரை",
    requiredDocs: [
      "Land Ownership / Lease Agreement",
      "Farmer KYC (Aadhaar / PAN)",
      "Bank Account Details",
      "GPS Tagged Field Photos via App"
    ],
    requiredDocsTa: [
      "நில உரிமை / குத்தகை ஒப்பந்தம்",
      "விவசாயி கேஒய்சி (ஆதார் / பான்)",
      "வங்கி கணக்கு விவரம்",
      "GPS முத்திரையிடப்பட்ட பண்ணை புகைப்படங்கள்"
    ],
    keyBenefits: "Fast-track claim settlement within 7 days via drone & satellite assessment, includes optional wildlife intrusion rider.",
    keyBenefitsTa: "ட்ரோன் மற்றும் செயற்கைக்கோள் மூலம் 7 நாட்களில் விரைவு தீர்வு, கூடுதல் விலங்கு சேத பாதுகாப்பும் உண்டு.",
    eligibilityRules: {
      maxIncome: null,
      minLandAcres: 1.0,
      maxLandAcres: 150,
      coveredPerils: ["Flood", "Drought", "Cyclone", "Pest Outbreak", "Fire", "Wild Animal (Rider)"],
      animalDamageCovered: true,
      animalDamageNote: "Covered if Wildlife Add-on Rider is selected at enrollment.",
      animalDamageNoteTa: "விண்ணப்பத்தில் வனவிலங்கு கூடுதல் பாதுகாப்பு தேர்வு செய்யப்பட்டிருந்தால் பொருந்தும்."
    },
    sampleDataNote: "Sample prototype reference based on private parametric insurance offerings."
  },
  {
    id: "hdfc-agri-suraksha",
    name: "HDFC ERGO Agri Suraksha Parametric Policy",
    nameTa: "ஹெச்டிஎஃப்சி எர்கோ அக்ரி சுரக்ஷா வானிலை பாலிசி",
    type: "Private",
    typeTa: "தனியார் வானிலை காப்பீடு",
    authority: "HDFC ERGO General Insurance Co. Ltd.",
    eligibleCrops: ["Paddy", "Cotton", "Maize", "Groundnut", "Vegetables"],
    eligibleCropsTa: ["நெல்", "பருத்தி", "மக்காச்சோளம்", "நிலக்கடலை", "காய்கறிகள்"],
    farmerType: "Progressive farmers & Agri-Contract growers",
    farmerTypeTa: "முன்னோடி விவசாயிகள் மற்றும் ஒப்பந்த சாகுபடியாளர்கள்",
    premiumRate: "4.0% to 5.5%",
    premiumRateTa: "4.0% முதல் 5.5%",
    coverageAmount: "Up to ₹1,00,000 per acre",
    coverageAmountTa: "ஏக்கருக்கு ₹1,00,000 வரை",
    requiredDocs: [
      "Aadhaar Card",
      "Land Patta / Chitta document",
      "Bank Account details"
    ],
    requiredDocsTa: [
      "ஆதார் அட்டை",
      "நில பட்டா / சிட்டா ஆவணம்",
      "வங்கி கணக்கு விவரங்கள்"
    ],
    keyBenefits: "No physical field inspection required if meteorological index triggers; instant digital payout to UPI/Bank.",
    keyBenefitsTa: "வானிலை அளவீடு தூண்டப்படும் போது நேரடி ஆய்வு இன்றி உடனடி டிஜிட்டல் வங்கி வரவு.",
    eligibilityRules: {
      maxIncome: null,
      minLandAcres: 0.5,
      maxLandAcres: 100,
      coveredPerils: ["Excess Rainfall", "Drought", "Heat Wave", "Cold Wave"],
      animalDamageCovered: false,
      animalDamageNote: "Purely parametric weather index.",
      animalDamageNoteTa: "வானிலை குறியீட்டுக்கு மட்டுமே."
    },
    sampleDataNote: "Sample prototype reference data for HDFC ERGO Parametric product."
  }
];

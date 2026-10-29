/**
 * Agriclaim Tamil & English Voice Assistant Service
 * Provides Speech Recognition (STT), Speech Synthesis (TTS), and farmer intent handling.
 */

// Voice Knowledge Base
const KNOWLEDGE_RESPONSES = {
  ta: {
    howToClaim: {
      intent: "claim_help",
      spokenText: "உங்கள் பயிர் சேதமடைந்தால், 'புதிய கிளைம் பதிவு' பக்கத்திற்குச் செல்லவும். அங்கு உங்கள் நில சர்வே எண், சேதமடைந்த பயிர் வகை மற்றும் புகைப்படங்களை பதிவேற்றி உடனடியாக சமர்ப்பிக்கலாம்.",
      displayText: "உங்கள் பயிர் சேதமடைந்தால், 'புதிய கிளைம் பதிவு' பக்கத்திற்குச் செல்லவும்.\n1. உங்கள் நில சர்வே எண் மற்றும் கிராமத்தை உள்ளிடவும்.\n2. பயிர் பெயர் மற்றும் சேத விவரங்களை குறிப்பிடவும்.\n3. சேதமடைந்த பயிரின் தெளிவான புகைப்படங்களை பதிவேற்றவும்.\n4. AI உடனடியாக உங்கள் இழப்பீட்டை ஆய்வு செய்து அறிக்கை தரும்.",
      actionRoute: "submit",
    },
    documents: {
      intent: "documents",
      spokenText: "பயிர் காப்பீட்டிற்கு பட்டா அல்லது சிட்டா நில உரிமை ஆவணம், ஆதார் அட்டை, வங்கி கணக்கு புத்தகம் மற்றும் சேதமடைந்த பயிர் புகைப்படங்கள் தேவைப்படும்.",
      displayText: "தேவையான முக்கிய ஆவணங்கள்:\n• நில உரிமை ஆவணம் (பட்டா / சிட்டா / அடங்கல்)\n• விவசாயியின் ஆதார் அட்டை நகல்\n• வங்கி கணக்கு பாஸ்புக் நகல் (IFSC குறியீட்டுடன்)\n• சேதமடைந்த பயிர் புகைப்படங்கள்\n• விஏஓ விதைப்பு சான்று (தேவைப்பட்டால்)",
      actionRoute: "schemes",
    },
    schemes: {
      intent: "schemes",
      spokenText: "பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY), வானிலை அடிப்படையிலான காப்பீடு (WBCIS), மற்றும் வனவிலங்கு சேத நிவாரணத் திட்டம் ஆகிய திட்டங்கள் உள்ளன. 'காப்பீட்டு திட்டங்கள்' பக்கத்தில் உங்கள் தகுதியை சோதிக்கலாம்.",
      displayText: "கிடைக்கக்கூடிய முக்கிய திட்டங்கள்:\n1. பிரதமர் பயிர் காப்பீட்டுத் திட்டம் (PMFBY) - நெல், கரும்பு, பருத்தி, மக்காச்சோளம்\n2. வானிலை காப்பீட்டுத் திட்டம் (WBCIS) - வாழை, மிளகாய், மஞ்சள்\n3. மாநில வனத்துறை நிவாரணம் - காட்டுப்பன்றி, யானை சேதங்களுக்கு\n'காப்பீட்டு திட்டங்கள்' பக்கத்தில் விரிவாகப் பார்க்கலாம்.",
      actionRoute: "schemes",
    },
    status: {
      intent: "status",
      spokenText: "உங்கள் கிளைம் நிலவரத்தை அறிய 'கிளைம் நிலை அறிதல்' பக்கத்தில் உங்கள் கிளைம் குறிப்பு எண் அல்லது கைபேசி எண்ணை உள்ளிட்டு சரிபார்க்கலாம்.",
      displayText: "கிளைம் நிலை அறிதல்:\n'கிளைம் நிலை அறிதல்' பக்கத்திற்கு சென்று உங்கள் பதிவு செய்யப்பட்ட கைபேசி எண் அல்லது கிளைம் எண்ணை (எ.கா: SCN-FLOOD-01) பதிவிட்டு நேரடி நிலை மற்றும் அறிக்கையை பெறலாம்.",
      actionRoute: "status",
    },
    animalDamage: {
      intent: "animal_damage",
      spokenText: "காட்டுப்பன்றி அல்லது யானைகளால் பயிர் சேதமடைந்தால், வானிலை குறைவாக இருந்தாலும் எங்கள் AI அதை 'வனவிலங்கு சேதம்' என துல்லியமாக பிரித்தறியும். இதற்கு வனத்துறை நிவாரண திட்டத்தில் இழப்பீடு பெறலாம்.",
      displayText: "வனவிலங்கு சேதங்கள் குறித்த தகவல்:\nஅக்ரிகிளைம் அமைப்பில் வானிலை மற்றும் பயிர் புகைப்படங்கள் ஒப்பிடப்பட்டு 'வனவிலங்கு சேதம்' தனியாக பகுப்பாய்வு செய்யப்படுகிறது. இதற்கு வனத்துறை நிவாரணத் திட்டம் மூலம் ஏக்கருக்கு ₹15,000 முதல் ₹25,000 வரை இழப்பீடு பெறலாம்.",
      actionRoute: "schemes",
    },
    weather: {
      intent: "weather",
      spokenText: "உங்கள் மாவட்டத்தில் பதிவு செய்யப்பட்ட மழை அளவு, காற்றின் வேகம் மற்றும் செயற்கைக்கோள் தரவுகளை AI தானாகவே ஆய்வு செய்து காப்பீட்டு முடிவுக்கு உதவுகிறது.",
      displayText: "வானிலை சரிபார்ப்பு:\nஅக்ரிகிளைம் தானியங்கி வானிலை நிலையங்கள் மற்றும் IMD தரவுகளுடன் உங்கள் சேத தேதியை ஒப்பிட்டு வெள்ளம், புயல் அல்லது வறட்சியை துல்லியமாக சரிபார்க்கிறது.",
      actionRoute: "dashboard",
    },
    default: {
      intent: "general",
      spokenText: "வணக்கம்! நான் அக்ரிகிளைம் விவசாய குரல் உதவியாளர். பயிர் சேத இழப்பீடு பதிவு செய்வது, தேவையான ஆவணங்கள் மற்றும் காப்பீட்டு திட்டங்கள் பற்றி என்னிடம் தமிழில் கேட்கலாம்.",
      displayText: "வணக்கம்! நான் அக்ரிகிளைம் விவசாய குரல் உதவியாளர்.\nநீங்கள் பின்வருவனவற்றை கேட்கலாம்:\n• 'பயிர் சேத இழப்பீடு பதிவு செய்வது எப்படி?'\n• 'தேவையான ஆவணங்கள் என்னென்ன?'\n• 'காட்டு விலங்குகள் பயிரை அழித்தால் காப்பீடு கிடைக்குமா?'\n• 'என் கிளைம் நிலவரம் என்ன?'",
      actionRoute: null,
    }
  },

  en: {
    howToClaim: {
      intent: "claim_help",
      spokenText: "To file a crop insurance claim, go to the Submit Claim page. Fill in your survey number, crop type, and upload photos of the damaged field for preliminary verification.",
      displayText: "How to File a Claim:\n1. Open 'Submit New Claim' page.\n2. Provide your Land Survey Number and Village.\n3. Specify the crop and reported damage event.\n4. Upload field damage photos and land records.\n5. AI will immediately evaluate your preliminary claim.",
      actionRoute: "submit",
    },
    documents: {
      intent: "documents",
      spokenText: "You will need your Land Patta or Chitta document, Aadhaar card copy, Bank account passbook, and photos of the damaged crop.",
      displayText: "Required Documents:\n• Land Ownership Record (Patta / Chitta / Land Record)\n• Farmer Aadhaar Card copy\n• Bank Passbook with IFSC and Aadhaar linkage\n• Geo-tagged Crop Damage Photographs\n• Sowing Certificate (if applicable)",
      actionRoute: "schemes",
    },
    schemes: {
      intent: "schemes",
      spokenText: "Available schemes include PMFBY for natural disasters, WBCIS for weather events, and State Forest Wildlife Relief for animal damage. Check our Scheme Finder.",
      displayText: "Key Available Schemes:\n1. Pradhan Mantri Fasal Bima Yojana (PMFBY) - All food and oilseed crops\n2. Weather Based Crop Insurance Scheme (WBCIS) - Horticulture & commercial crops\n3. State Forest Wildlife Depredation Relief - Wild boar & elephant attacks\nExplore the Insurance Schemes tab.",
      actionRoute: "schemes",
    },
    status: {
      intent: "status",
      spokenText: "You can track your claim status by navigating to the Track Status page and entering your Claim Reference ID or registered mobile number.",
      displayText: "Track Claim Status:\nGo to 'Track Status' page to check the 7-step timeline (Document Check → Weather Cross-Check → Image Vision → Fraud Screening → Field Review).",
      actionRoute: "status",
    },
    animalDamage: {
      intent: "animal_damage",
      spokenText: "If wild boars or elephants damaged your field, our Damage Cause Analysis distinguishes animal trampling from bad weather and routes you to the Forest Wildlife compensation scheme.",
      displayText: "Animal & Wildlife Damage Analysis:\nOur multi-factor engine inspects crop bite marks, trampling patterns, and weather intensity to distinguish wildlife attacks from storms, guiding you to dedicated forest compensation.",
      actionRoute: "schemes",
    },
    weather: {
      intent: "weather",
      spokenText: "The system cross-checks meteorological radar and ground automated weather station data for the exact date and location of damage.",
      displayText: "Weather Cross-Examination:\nAgriclaim correlates historical rainfall (mm), wind speed (km/h), and temperature against your damage timestamp to verify natural disaster claims.",
      actionRoute: "dashboard",
    },
    default: {
      intent: "general",
      spokenText: "Hello! I am Agriclaim Voice Assistant. Ask me how to file claims, check required documents, or find eligible schemes in English or Tamil.",
      displayText: "Hello! I am your Agriclaim Voice Assistant.\nYou can ask questions like:\n• 'How do I claim crop insurance?'\n• 'What documents are required?'\n• 'Will insurance pay for wild animal damage?'\n• 'How to track my claim status?'",
      actionRoute: null,
    }
  }
};

class VoiceAssistantService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  isSupported() {
    return !!(typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition));
  }

  startListening(lang = 'ta-IN', onResult, onError, onEnd) {
    if (!this.recognition) {
      this.initSpeechRecognition();
    }
    if (!this.recognition) {
      if (onError) onError("Speech recognition is not supported in this browser.");
      return;
    }

    try {
      this.recognition.lang = lang === 'ta' ? 'ta-IN' : (lang === 'en' ? 'en-IN' : lang);
      this.isListening = true;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        if (onResult) onResult(transcript);
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        if (onError) onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      if (onError) onError(err.message);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text, lang = 'ta', onEnd) {
    if (!this.synthesis) return;
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = lang === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.lang = targetLang;
    utterance.rate = lang === 'ta' ? 0.9 : 1.0;
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = this.synthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang === targetLang || v.lang.startsWith(lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Evaluates text queries and returns matched knowledge response.
   */
  processQuery(queryText, lang = 'ta') {
    const q = (queryText || '').toLowerCase().trim();
    const responses = KNOWLEDGE_RESPONSES[lang] || KNOWLEDGE_RESPONSES.en;

    // Tamil keywords matching
    if (lang === 'ta') {
      if (q.includes('கிளைம்') || q.includes('சேதம்') || q.includes('விண்ணப்ப') || q.includes('எப்படி') || q.includes('பதிவு')) {
        return responses.howToClaim;
      }
      if (q.includes('ஆவண') || q.includes('பட்டா') || q.includes('சிட்டா') || q.includes('ஆதார்') || q.includes('தேவை')) {
        return responses.documents;
      }
      if (q.includes('திட்ட') || q.includes('தகுதி') || q.includes('பிஎம்எஃப்பிஒய்') || q.includes('pmfby') || q.includes('காப்பீடு')) {
        return responses.schemes;
      }
      if (q.includes('நிலை') || q.includes('தற்போதைய') || q.includes('எங்குள்ளது') || q.includes('ஸ்டேட்டஸ்')) {
        return responses.status;
      }
      if (q.includes('விலங்கு') || q.includes('பன்றி') || q.includes('யானை') || q.includes('காட்டு') || q.includes('மாடு')) {
        return responses.animalDamage;
      }
      if (q.includes('வானிலை') || q.includes('மழை') || q.includes('புயல்') || q.includes('வறட்சி') || q.includes('வெள்ளம்')) {
        return responses.weather;
      }
      return responses.default;
    }

    // English keywords matching
    if (q.includes('how') || q.includes('claim') || q.includes('submit') || q.includes('apply') || q.includes('damage') || q.includes('file')) {
      return responses.howToClaim;
    }
    if (q.includes('document') || q.includes('patta') || q.includes('aadhaar') || q.includes('paper') || q.includes('required')) {
      return responses.documents;
    }
    if (q.includes('scheme') || q.includes('policy') || q.includes('eligible') || q.includes('pmfby') || q.includes('insurance')) {
      return responses.schemes;
    }
    if (q.includes('status') || q.includes('track') || q.includes('progress') || q.includes('where')) {
      return responses.status;
    }
    if (q.includes('animal') || q.includes('boar') || q.includes('elephant') || q.includes('wildlife') || q.includes('bite')) {
      return responses.animalDamage;
    }
    if (q.includes('weather') || q.includes('rain') || q.includes('flood') || q.includes('cyclone') || q.includes('drought')) {
      return responses.weather;
    }

    return responses.default;
  }
}

export const voiceService = new VoiceAssistantService();

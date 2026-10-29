import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, MessageSquare, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react';
import { voiceService } from '../services/voiceAssistantService';
import { translations } from '../translations';

export default function VoiceAssistantModal({ isOpen, onClose, lang = 'ta', onNavigate }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Initial greeting if history is empty
      if (chatHistory.length === 0) {
        const initialGreeting = isTamil 
          ? "வணக்கம்! நான் உங்கள் அக்ரிகிளைம் குரல் உதவியாளர். பயிர் சேத இழப்பீடு, தேவையான ஆவணங்கள் மற்றும் காப்பீட்டு திட்டங்கள் பற்றி என்னிடம் தமிழில் கேட்கலாம்."
          : "Hello! I am your Agriclaim Voice Assistant. Ask me about crop damage claims, required documents, or insurance scheme eligibility.";
        
        const initialBubble = {
          sender: 'assistant',
          text: initialGreeting,
          actionRoute: null,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory([initialBubble]);
      }
    } else {
      voiceService.stopListening();
      voiceService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen, lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, statusMessage]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
    setTranscript('');
    setStatusMessage(isTamil ? 'கேட்கிறது... தமிழில் பேசுங்கள்' : 'Listening... Speak in English or Tamil');
    setIsListening(true);

    voiceService.startListening(
      lang,
      (text) => {
        setIsListening(false);
        setTranscript(text);
        processUserSpeech(text);
      },
      (error) => {
        setIsListening(false);
        setStatusMessage(isTamil ? `குரல் பதிவு பிழை: ${error}` : `Mic error: ${error}`);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
    setStatusMessage('');
  };

  const processUserSpeech = (userQuery) => {
    setStatusMessage(isTamil ? 'பதிலை உருவாக்குகிறது...' : 'Understanding...');
    
    // Add user question to chat
    const userMsg = {
      sender: 'user',
      text: userQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const answer = voiceService.processQuery(userQuery, lang);
    setResponse(answer);

    const assistantMsg = {
      sender: 'assistant',
      text: answer.displayText,
      spokenText: answer.spokenText,
      actionRoute: answer.actionRoute,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg, assistantMsg]);
    setStatusMessage('');

    // Speak response aloud
    setIsSpeaking(true);
    voiceService.speak(answer.spokenText, lang, () => {
      setIsSpeaking(false);
    });
  };

  const handleSamplePromptClick = (promptText) => {
    setTranscript(promptText);
    processUserSpeech(promptText);
  };

  const samplePrompts = isTamil ? [
    { label: "என் பயிர் சேதமாகிவிட்டது, நான் இன்சூரன்ஸ் கிளைம் எப்படி செய்வது?", text: "என் பயிர் சேதமாகிவிட்டது, நான் இன்சூரன்ஸ் கிளைம் எப்படி செய்வது?" },
    { label: "பயிர் காப்பீட்டிற்கு தேவையான ஆவணங்கள் என்னென்ன?", text: "பயிர் காப்பீட்டிற்கு தேவையான ஆவணங்கள் என்னென்ன?" },
    { label: "காட்டு விலங்குகள் பயிரை அழித்தால் காப்பீடு கிடைக்குமா?", text: "காட்டு விலங்குகள் பயிரை அழித்தால் காப்பீடு கிடைக்குமா?" },
    { label: "நான் எந்தெந்த காப்பீட்டு திட்டங்களுக்கு தகுதியானவன்?", text: "நான் எந்தெந்த காப்பீட்டு திட்டங்களுக்கு தகுதியானவன்?" },
    { label: "எனது கிளைம் தற்போதைய நிலை என்ன?", text: "எனது கிளைம் தற்போதைய நிலை என்ன?" }
  ] : [
    { label: "How do I claim crop insurance for damaged field?", text: "My crop is damaged, how do I claim insurance?" },
    { label: "What documents are required for crop insurance?", text: "What documents are required for crop insurance?" },
    { label: "Will insurance pay if wild animals damaged my crops?", text: "Will insurance pay if wild animals damaged my field?" },
    { label: "Which insurance schemes am I eligible for?", text: "Which insurance schemes am I eligible for?" },
    { label: "How do I track my claim status?", text: "What is my claim status?" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-800 to-emerald-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl flex items-center gap-2">
                {isTamil ? 'விவசாய குரல் உதவியாளர்' : 'Agriclaim Voice Assistant'}
                <span className="text-[11px] font-semibold bg-white/20 border border-white/30 px-2 py-0.5 rounded-full text-white">
                  {isTamil ? 'தமிழ் & English' : 'Bilingual AI'}
                </span>
              </h2>
              <p className="text-xs text-emerald-100">
                {isTamil ? 'குரல் மூலம் பேசி விளக்கம் மற்றும் வழிகாட்டுதல் பெறுங்கள்' : 'Speak naturally in Tamil or English for instant insurance guidance'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50 min-h-[220px]">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm ${
                  msg.sender === 'user'
                    ? 'bg-agri-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold opacity-75">
                    {msg.sender === 'user' 
                      ? (isTamil ? 'நீங்கள்' : 'You') 
                      : (isTamil ? 'அக்ரிகிளைம் உதவியாளர்' : 'Agriclaim AI Assistant')}
                  </span>
                  <span className="text-[10px] opacity-60">{msg.time}</span>
                </div>

                <div className="whitespace-pre-line leading-relaxed font-normal">
                  {msg.text}
                </div>

                {/* Spoken Audio replay button */}
                {msg.sender === 'assistant' && msg.spokenText && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setIsSpeaking(true);
                        voiceService.speak(msg.spokenText, lang, () => setIsSpeaking(false));
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-agri-700 hover:text-agri-800 font-semibold bg-agri-50 px-2.5 py-1 rounded-lg border border-agri-200 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {isTamil ? 'மீண்டும் கேட்க' : 'Listen Again'}
                    </button>

                    {msg.actionRoute && (
                      <button
                        onClick={() => {
                          onClose();
                          if (onNavigate) onNavigate(msg.actionRoute);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-white bg-agri-600 hover:bg-agri-700 font-semibold px-3 py-1 rounded-lg shadow-sm transition-all"
                      >
                        <span>
                          {msg.actionRoute === 'submit' && (isTamil ? 'கிளைம் படிவம் திறக்க' : 'Open Claim Form')}
                          {msg.actionRoute === 'schemes' && (isTamil ? 'திட்டங்களை பார்க்க' : 'View Schemes')}
                          {msg.actionRoute === 'status' && (isTamil ? 'நிலை சரிபார்க்க' : 'Track Status')}
                          {msg.actionRoute === 'dashboard' && (isTamil ? 'முகப்பிற்கு செல்ல' : 'Go to Dashboard')}
                        </span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {statusMessage && (
            <div className="flex items-center justify-center">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{statusMessage}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Sample Questions Chips */}
        <div className="p-3 bg-slate-100 border-t border-slate-200">
          <p className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1">
            <CornerDownRight className="w-3 h-3" />
            {isTamil ? 'விரைவு கேள்விகள் (கிளிக் செய்து கேட்கலாம்):' : 'Suggested farmer questions (Tap to ask):'}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSamplePromptClick(p.text)}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-agri-500 hover:bg-agri-50 text-slate-700 text-xs font-medium transition-all shadow-2xs flex-shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && transcript.trim()) {
                  processUserSpeech(transcript);
                }
              }}
              placeholder={isTamil ? "தமிழில் தட்டச்சு செய்யவும் அல்லது மைக்கை அழுத்தவும்..." : "Type in English / Tamil or tap the mic..."}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50"
            />
          </div>

          {/* Big Interactive Mic Button */}
          <div className="flex items-center gap-2">
            {isListening ? (
              <button
                onClick={handleStopListening}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md animate-pulse"
              >
                <MicOff className="w-4 h-4" />
                <span>{isTamil ? 'நிறுத்து' : 'Stop'}</span>
              </button>
            ) : (
              <button
                onClick={handleStartListening}
                className="px-5 py-2.5 bg-agri-600 hover:bg-agri-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>{isTamil ? 'குரலில் பேசு' : 'Speak'}</span>
              </button>
            )}

            {isSpeaking && (
              <button
                onClick={() => {
                  voiceService.stopSpeaking();
                  setIsSpeaking(false);
                }}
                className="p-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl"
                title={isTamil ? 'குரலை நிறுத்து' : 'Mute'}
              >
                <VolumeX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

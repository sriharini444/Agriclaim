import React, { useState, useEffect, useRef } from 'react';
import { 
  Sprout, 
  UserCheck, 
  ShieldCheck, 
  ShieldAlert,
  Lock, 
  Phone, 
  ArrowRight, 
  Sparkles, 
  Languages, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  UserPlus, 
  Mic, 
  RefreshCw,
  Send,
  Eye,
  EyeOff,
  Timer,
  IdCard,
  User,
  ArrowLeft,
  Building2
} from 'lucide-react';
import { translations } from '../translations';

/* ─── Aadhaar helpers ─── */
const maskAadhaar = (num) => {
  const d = (num || '').replace(/\D/g, '');
  if (d.length < 4) return '••••-••••-' + d.padEnd(4, '•');
  return '••••-••••-' + d.slice(-4);
};

const generateDemoOtp = () => {
  // Generates a cryptographically-safe 6-digit OTP for demo purposes
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return String(100000 + (arr[0] % 900000));
};

export default function LoginPage({ onLogin, lang = 'ta', setLang, onOpenVoice }) {
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;

  // ─── Auth step: 'aadhaar' | 'otp' | 'done'
  const [step, setStep] = useState('aadhaar');

  // ─── Aadhaar Step state
  const [farmerName, setFarmerName] = useState('');
  const [aadhaarRaw, setAadhaarRaw] = useState('');    // never logged; only used in memory
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [aadhaarError, setAadhaarError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  // ─── OTP Step state
  const [demoOtp, setDemoOtp] = useState('');          // shown only in demo hint
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  // ─── Quick Demo Profiles (no real personal info; all labelled DEMO)
  const demoProfiles = [
    {
      role: 'farmer',
      name: isTamil ? 'ம. ராமநாதன் (DEMO விவசாயி)' : 'M. Ramanathan (DEMO Farmer)',
      aadhaarLast4: '5678',
      id: 'TN-AGRI-2024-4412',
      district: 'Coimbatore',
      badge: isTamil ? 'விவசாயி' : 'Farmer',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      role: 'fieldOfficer',
      name: isTamil ? 'மு. செந்தில்குமார் (DEMO அலுவலர்)' : 'M. Senthil Kumar (DEMO Officer)',
      aadhaarLast4: '9012',
      id: 'OFFICER-DELTA-04',
      district: 'Thanjavur',
      badge: isTamil ? 'வேளாண் அலுவலர்' : 'Field Officer',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      role: 'evaluator',
      name: isTamil ? 'ரா. காயத்ரி (DEMO மதிப்பீட்டாளர்)' : 'R. Gayathri (DEMO Evaluator)',
      aadhaarLast4: '3456',
      id: 'AIC-UNDERWRITER-88',
      district: 'Headquarters',
      badge: isTamil ? 'மதிப்பீட்டாளர்' : 'Underwriter',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  ];

  /* ─── Resend countdown ─── */
  const startCountdown = () => {
    setResendCountdown(30);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  /* ─── Aadhaar validation ─── */
  const validateAadhaar = (val) => {
    const digits = val.replace(/\D/g, '');
    return digits.length === 12;
  };

  const handleAadhaarChange = (e) => {
    // Accept digits only; format as groups of 4
    const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
    setAadhaarRaw(raw);
    setAadhaarError('');
  };

  const displayAadhaar = () => {
    if (showAadhaar) {
      return aadhaarRaw.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
    return maskAadhaar(aadhaarRaw);
  };

  /* ─── Step 1: Verify Aadhaar & Send OTP ─── */
  const handleVerifyAadhaar = (e) => {
    e.preventDefault();
    setAadhaarError('');
    setNameError('');

    if (!farmerName.trim() || farmerName.trim().length < 3) {
      setNameError(isTamil
        ? 'தயவுசெய்து உங்கள் முழு பெயரை உள்ளிடவும் (குறைந்தது 3 எழுத்துக்கள்).'
        : 'Please enter your full name (at least 3 characters).');
      return;
    }
    if (!validateAadhaar(aadhaarRaw)) {
      setAadhaarError(isTamil
        ? 'தயவுசெய்து சரியான 12 இலக்க ஆதார் எண்ணை உள்ளிடவும்.'
        : 'Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    setIsVerifying(true);
    // Simulated MOCK Aadhaar verification — no real UIDAI call
    setTimeout(() => {
      const otp = generateDemoOtp();
      setDemoOtp(otp);
      setAadhaarVerified(true);
      setIsVerifying(false);
      setStep('otp');
      startCountdown();
      // OTP inputs cleared
      setOtpInputs(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, 1500);
  };

  /* ─── OTP input helpers ─── */
  const handleOtpInput = (idx, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const updated = [...otpInputs];
    updated[idx] = digit;
    setOtpInputs(updated);
    setOtpError('');
    if (digit && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otpInputs[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtpInputs(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const enteredOtpFull = otpInputs.join('');

  /* ─── Step 2: Verify OTP & Login ─── */
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError('');

    if (enteredOtpFull.length !== 6) {
      setOtpError(isTamil
        ? 'தயவுசெய்து 6 இலக்க OTP எண்ணை உள்ளிடவும்.'
        : 'Please enter the complete 6-digit OTP.');
      return;
    }
    if (enteredOtpFull !== demoOtp) {
      setOtpError(isTamil
        ? `தவறான OTP. சரியான DEMO OTP: ${demoOtp}. மீண்டும் முயற்சிக்கவும்.`
        : `Incorrect OTP. The DEMO OTP is: ${demoOtp}. Please try again.`);
      return;
    }

    setIsLoggingIn(true);
    setOtpSuccess(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      if (onLogin) {
        onLogin({
          role: 'farmer',
          name: farmerName.trim(),
          aadhaarMasked: maskAadhaar(aadhaarRaw),
          id: `TN-AGRI-${Date.now().toString().slice(-6)}`,
          district: 'Tamil Nadu'
        });
      }
    }, 900);
  };

  /* ─── Resend OTP ─── */
  const handleResendOtp = () => {
    if (!canResend) return;
    const otp = generateDemoOtp();
    setDemoOtp(otp);
    setOtpInputs(['', '', '', '', '', '']);
    setOtpError('');
    setOtpSuccess(false);
    startCountdown();
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  /* ─── Quick demo profile one-click ─── */
  const handleQuickProfileSelect = (p) => {
    if (onLogin) {
      onLogin({
        role: p.role,
        name: p.name,
        aadhaarMasked: `••••-••••-${p.aadhaarLast4}`,
        id: p.id,
        district: p.district
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative animate-fadeIn">
        
        {/* Top Gradient Accent */}
        <div className="h-2.5 bg-gradient-to-r from-agri-600 via-emerald-500 to-amber-400"></div>

        {/* Header Bar */}
        <div className="p-4 sm:p-6 pb-0 flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-agri-700 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-agri-600/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Agri<span className="text-agri-600">claim</span>
                </span>
                <span className="text-[10px] font-bold uppercase bg-agri-100 text-agri-800 px-2 py-0.5 rounded-full border border-agri-200">AI</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onOpenVoice}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-agri-600 to-emerald-600 hover:from-agri-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all">
              <Mic className="w-3.5 h-3.5" />
              <span>{isTamil ? 'குரல் உதவி' : 'Voice Help'}</span>
            </button>
            <button type="button" onClick={() => setLang(isTamil ? 'en' : 'ta')}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300 transition-all">
              <Languages className="w-3.5 h-3.5 text-agri-700" />
              <span>{isTamil ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {step === 'otp'
                ? (isTamil ? 'OTP சரிபார்ப்பு' : 'OTP Verification')
                : t.auth.loginTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {isTamil
                ? 'செயற்கை நுண்ணறிவு பயிர் காப்பீட்டு சரிபார்ப்பு தளம்'
                : 'AI-Assisted Crop Insurance Claim Verification'}
            </p>
          </div>

          {/* ── MOCK UIDAI Notice Banner ── */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
            <span>
              <strong>{isTamil ? 'DEMO மட்டுமே:' : 'DEMO ONLY:'}</strong>{' '}
              {isTamil
                ? 'இது MOCK ஆதார் சரிபார்ப்பு. UIDAI / உண்மையான SMS இணைப்பு இல்லை. OTP திரையிலேயே காட்டப்படும்.'
                : 'This uses MOCK Aadhaar verification. No real UIDAI / SMS integration. OTP is shown on-screen for testing.'}
            </span>
          </div>

          {/* ══════════════════════════════════════════ */}
          {/* STEP 1: Farmer Name + Aadhaar Number      */}
          {/* ══════════════════════════════════════════ */}
          {step === 'aadhaar' && (
            <form onSubmit={handleVerifyAadhaar} className="space-y-4">

              {/* Progress indicator */}
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <span className="w-6 h-6 rounded-full bg-agri-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span className="text-agri-700">{isTamil ? 'விவரங்கள் உள்ளிடுக' : 'Enter Details'}</span>
                <div className="flex-1 h-px bg-slate-200 mx-1"></div>
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px]">2</span>
                <span>{isTamil ? 'OTP சரிபார்ப்பு' : 'OTP Verify'}</span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-agri-600" />
                  <span>{isTamil ? 'முழு பெயர் *' : 'Full Name *'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => { setFarmerName(e.target.value); setNameError(''); }}
                  placeholder={isTamil ? 'உங்கள் முழு பெயர் (எ.கா. ம. ராமநாதன்)' : 'e.g. M. Ramanathan'}
                  className={`w-full text-sm px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-agri-500 bg-slate-50 ${nameError ? 'border-rose-400' : 'border-slate-300'}`}
                />
                {nameError && (
                  <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{nameError}
                  </p>
                )}
              </div>

              {/* Aadhaar Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <IdCard className="w-3.5 h-3.5 text-agri-600" />
                  <span>{isTamil ? '12-இலக்க ஆதார் எண் *' : '12-Digit Aadhaar Number *'}</span>
                </label>
                <div className="relative">
                  <input
                    type={showAadhaar ? 'text' : 'password'}
                    inputMode="numeric"
                    autoComplete="off"
                    required
                    maxLength={12}
                    value={aadhaarRaw}
                    onChange={handleAadhaarChange}
                    placeholder={isTamil ? '12 இலக்க ஆதார் எண் (எ.கா: XXXXXXXXXXXX)' : '12-digit Aadhaar (e.g. XXXXXXXXXXXX)'}
                    className={`w-full text-sm px-4 py-2.5 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-agri-500 font-mono bg-slate-50 tracking-widest ${aadhaarError ? 'border-rose-400' : 'border-slate-300'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAadhaar(!showAadhaar)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                    title={showAadhaar ? 'Hide Aadhaar' : 'Show Aadhaar'}
                  >
                    {showAadhaar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Masked preview */}
                {aadhaarRaw.length > 0 && (
                  <p className="mt-1 text-[11px] text-slate-500 font-mono">
                    {isTamil ? 'மறைக்கப்பட்ட ஆதார்:' : 'Masked Aadhaar:'}{' '}
                    <span className="font-bold text-agri-700">{maskAadhaar(aadhaarRaw)}</span>
                    {' '}({aadhaarRaw.length}/12 {isTamil ? 'இலக்கங்கள்' : 'digits'})
                  </p>
                )}
                {aadhaarError && (
                  <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{aadhaarError}
                  </p>
                )}
                <p className="mt-1 text-[10px] text-slate-400">
                  {isTamil
                    ? '⚠ DEMO: உண்மையான ஆதார் தரவை பகிர வேண்டாம். எந்த 12 இலக்கமும் சரிபார்ப்பை அனுமதிக்கும்.'
                    : '⚠ DEMO: Do not enter real Aadhaar. Any 12-digit number will pass verification.'}
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3 bg-gradient-to-r from-agri-600 to-emerald-600 hover:from-agri-700 hover:to-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-agri-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isTamil ? 'MOCK ஆதார் சரிபார்க்கிறது...' : 'Running MOCK Aadhaar Verify...'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>{isTamil ? 'ஆதார் சரிபார்த்து OTP அனுப்புக' : 'Verify Aadhaar & Send OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ══════════════════════════════════════════ */}
          {/* STEP 2: OTP Entry                         */}
          {/* ══════════════════════════════════════════ */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fadeIn">

              {/* Progress indicator */}
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</span>
                <span className="text-slate-400">{isTamil ? 'ஆதார் சரிபார்க்கப்பட்டது' : 'Aadhaar Verified'}</span>
                <div className="flex-1 h-px bg-agri-300 mx-1"></div>
                <span className="w-6 h-6 rounded-full bg-agri-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span className="text-agri-700">{isTamil ? 'OTP சரிபார்ப்பு' : 'OTP Verify'}</span>
              </div>

              {/* Aadhaar confirmed banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold text-emerald-800">
                    {isTamil ? 'MOCK ஆதார் சரிபார்ப்பு வெற்றி! OTP உருவாக்கப்பட்டது.' : 'MOCK Aadhaar Verified! OTP Generated.'}
                  </span>
                </div>
                <p className="text-slate-600 ml-6">
                  {isTamil ? 'விவசாயி:' : 'Farmer:'} <strong>{farmerName}</strong> &nbsp;|&nbsp;
                  {isTamil ? 'ஆதார்:' : 'Aadhaar:'} <strong className="font-mono">{maskAadhaar(aadhaarRaw)}</strong>
                </p>
              </div>

              {/* DEMO OTP hint */}
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs">
                <p className="font-bold text-sky-800 mb-1">
                  🔢 {isTamil ? 'DEMO OTP (சோதனைக்கு மட்டும்):' : 'DEMO OTP (For testing only):'}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-2xl text-sky-700 tracking-widest">{demoOtp}</span>
                  <button
                    type="button"
                    onClick={() => setOtpInputs(demoOtp.split(''))}
                    className="text-[11px] font-bold bg-sky-600 text-white px-3 py-1 rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    {isTamil ? 'தானாக நிரப்புக' : 'Auto-Fill'}
                  </button>
                </div>
                <p className="text-sky-600 mt-1 text-[10px]">
                  {isTamil
                    ? 'உண்மையான செயலாக்கத்தில் இது SMS மூலம் மட்டுமே அனுப்பப்படும்.'
                    : 'In production, this would only be sent via SMS — never shown on screen.'}
                </p>
              </div>

              {/* 6 OTP boxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-3">
                  {isTamil ? '6-இலக்க OTP உள்ளிடுக:' : 'Enter 6-Digit OTP:'}
                </label>
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otpInputs.map((val, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpInput(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-11 h-12 text-center text-xl font-mono font-black rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-agri-500 transition-all ${
                        val ? 'border-agri-500 bg-agri-50 text-agri-800' : 'border-slate-300 bg-slate-50'
                      } ${otpError ? 'border-rose-400' : ''}`}
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="mt-2 text-[11px] text-rose-600 flex items-center gap-1 justify-center">
                    <AlertCircle className="w-3 h-3" />{otpError}
                  </p>
                )}
                {otpSuccess && (
                  <p className="mt-2 text-[11px] text-emerald-600 flex items-center gap-1 justify-center font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    {isTamil ? 'OTP சரிபார்க்கப்பட்டது! உள்நுழைகிறோம்...' : 'OTP Verified! Logging you in...'}
                  </p>
                )}
              </div>

              {/* Verify button */}
              <button
                type="submit"
                disabled={isLoggingIn || enteredOtpFull.length < 6}
                className="w-full py-3 bg-gradient-to-r from-agri-600 to-emerald-600 hover:from-agri-700 hover:to-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{isTamil ? 'உள்நுழைகிறோம்...' : 'Logging in...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isTamil ? 'OTP சரிபார்த்து உள்நுழைக' : 'Verify OTP & Login'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Resend + Change Details row */}
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend}
                  className={`flex items-center gap-1.5 font-bold transition-colors ${
                    canResend ? 'text-agri-700 hover:text-agri-800' : 'text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {canResend
                    ? (isTamil ? 'மீண்டும் OTP அனுப்புக' : 'Resend OTP')
                    : (isTamil ? `மீண்டும் அனுப்ப ${resendCountdown}s காத்திருக்கவும்` : `Resend in ${resendCountdown}s`)}
                  {!canResend && (
                    <span className="ml-1 flex items-center gap-0.5 text-slate-400">
                      <Timer className="w-3 h-3" />
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep('aadhaar');
                    setOtpInputs(['', '', '', '', '', '']);
                    setOtpError('');
                    setOtpSuccess(false);
                    setAadhaarVerified(false);
                  }}
                  className="text-slate-500 hover:text-slate-700 font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {isTamil ? 'விவரங்கள் மாற்றுக' : 'Change Details'}
                </button>
              </div>
            </form>
          )}

          {/* ── 1-Click Demo Profiles ── */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isTamil ? '1-கிளிக் DEMO உள்நுழைவு (விளக்கக்காட்சிக்கு):' : '1-Click DEMO Profiles (Hackathon Quick Login):'}
              </span>
              <span className="text-[10px] font-bold text-agri-700 bg-agri-50 px-2 py-0.5 rounded-full">DEMO</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {demoProfiles.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handleQuickProfileSelect(p)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-agri-400 bg-slate-50 hover:bg-agri-50/60 text-left transition-all group"
                >
                  <span className={`text-[9px] font-bold px-1.5 rounded border ${p.badgeColor} inline-block mb-1`}>
                    {p.badge}
                  </span>
                  <div className="font-bold text-xs text-slate-800 group-hover:text-agri-800 truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {isTamil ? 'ஆதார்:' : 'Aadhaar:'} ••••-••••-{p.aadhaarLast4}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400">
          {t.disclaimerText}
        </div>
      </div>
    </div>
  );
}

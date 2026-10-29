import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DisclaimerBanner from './components/DisclaimerBanner';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import VerificationProgressModal from './components/VerificationProgressModal';
import FarmerDashboard from './pages/FarmerDashboard';
import SubmitClaim from './pages/SubmitClaim';
import InsuranceSchemes from './pages/InsuranceSchemes';
import ClaimStatusTracker from './pages/ClaimStatusTracker';
import VerificationReport from './pages/VerificationReport';
import LoginPage from './pages/LoginPage';
import { demoScenarios } from './data/demoScenarios';
import { verifyClaim } from './services/aiVerificationEngine';

export default function App() {
  const [lang, setLang] = useState('ta'); // Default to Tamil, toggles freely to English
  const [isLoggedIn, setIsLoggedIn] = useState(false); // First screen is Login Page by default
  const [currentTab, setCurrentTab] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState('farmer');
  const [claims, setClaims] = useState(demoScenarios);
  const [selectedClaimForReport, setSelectedClaimForReport] = useState(demoScenarios[0]);
  
  // Voice & Verification Modal states
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isVerifyingModalOpen, setIsVerifyingModalOpen] = useState(false);
  const [pendingClaimResult, setPendingClaimResult] = useState(null);

  // Authentication Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setCurrentRole(userData.role || 'farmer');
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentTab('login');
  };

  // Claim submission handler
  const handleSubmitClaim = (formData) => {
    // Run AI verification engine
    const verificationResult = verifyClaim(formData);
    const newClaim = {
      id: verificationResult.claimId,
      scenarioKey: `user_${Date.now()}`,
      title: `${formData.cropName} Damage Claim (${formData.village})`,
      titleTa: `${formData.cropName} பயிர் சேத இழப்பீடு (${formData.village})`,
      badge: verificationResult.damageCauseLabel,
      badgeTa: verificationResult.damageCauseLabelTa,
      badgeColor: verificationResult.damageCauseClassification === 'SUSPICIOUS' 
        ? 'bg-rose-100 text-rose-800 border-rose-300' 
        : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: formData.farmerDescription,
      descriptionTa: formData.farmerDescription,
      farmerData: formData,
      verificationResult
    };

    setPendingClaimResult(newClaim);
    setIsVerifyingModalOpen(true);
  };

  const handleVerificationAnimationComplete = () => {
    setIsVerifyingModalOpen(false);
    if (pendingClaimResult) {
      setClaims((prev) => [pendingClaimResult, ...prev]);
      setSelectedClaimForReport(pendingClaimResult);
      setCurrentTab('report');
    }
  };

  const handleLoadScenario = (scenario) => {
    setSelectedClaimForReport(scenario);
    setCurrentTab('report');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-agri-500 selection:text-white">
      
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner lang={lang} />

      {/* Conditional Navbar when Logged In */}
      {isLoggedIn && (
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          lang={lang}
          setLang={setLang}
          openVoiceModal={() => setIsVoiceModalOpen(true)}
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        
        {/* FIRST SCREEN: Login Page */}
        {!isLoggedIn && (
          <LoginPage
            onLogin={handleLoginSuccess}
            lang={lang}
            setLang={setLang}
            onOpenVoice={() => setIsVoiceModalOpen(true)}
          />
        )}

        {/* AUTHENTICATED PAGES */}
        {isLoggedIn && (
          <>
            {currentTab === 'dashboard' && (
              <FarmerDashboard
                claims={claims}
                onSelectClaim={(claim) => {
                  setSelectedClaimForReport(claim);
                  setCurrentTab('report');
                }}
                onNavigate={(tab) => setCurrentTab(tab)}
                onLoadScenario={handleLoadScenario}
                lang={lang}
                openVoiceModal={() => setIsVoiceModalOpen(true)}
                currentRole={currentRole}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            )}

            {currentTab === 'submit' && (
              <SubmitClaim
                onSubmitClaim={handleSubmitClaim}
                lang={lang}
                onOpenVoice={() => setIsVoiceModalOpen(true)}
              />
            )}

            {currentTab === 'schemes' && (
              <InsuranceSchemes
                lang={lang}
                onApplyScheme={(scheme) => setCurrentTab('submit')}
              />
            )}

            {currentTab === 'status' && (
              <ClaimStatusTracker
                onViewReport={(claim) => {
                  setSelectedClaimForReport(claim);
                  setCurrentTab('report');
                }}
                lang={lang}
                claimsList={claims}
              />
            )}

            {currentTab === 'report' && (
              <VerificationReport
                claim={selectedClaimForReport}
                onBack={() => setCurrentTab('dashboard')}
                lang={lang}
              />
            )}
          </>
        )}
      </main>

      {/* Interactive Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        lang={lang}
        onNavigate={(tab) => {
          if (!isLoggedIn) {
            // If logged out and voice intent asks to login or explore, can log in with demo
            handleLoginSuccess({
              role: 'farmer',
              name: 'K. Selvam (க. செல்வம்)',
              mobile: '9842176540',
              id: 'TN-AGRI-2024-9842',
              district: 'Thanjavur'
            });
          }
          setCurrentTab(tab);
        }}
      />

      {/* Animated Multi-Stage Verification Progress Modal */}
      <VerificationProgressModal
        isOpen={isVerifyingModalOpen}
        onComplete={handleVerificationAnimationComplete}
        lang={lang}
      />

      {/* Responsive Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-5 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Agriclaim (அக்ரிகிளைம்)</span>
            <span>•</span>
            <span>AI-Assisted Crop Insurance Verification Platform</span>
          </div>
          <p className="text-slate-400">
            {lang === 'ta' 
              ? 'விவசாயிகளுக்கு விரைவான, நியாயமான மற்றும் வெளிப்படையான பயிர் காப்பீட்டு தீர்வு'
              : 'Empowering farmers with Tamil & English Voice AI, Satellite NDVI & Damage Cause Analysis'}
          </p>
        </div>
      </footer>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  Sprout, 
  Languages, 
  Mic, 
  FileText, 
  ShieldCheck, 
  Search, 
  Activity, 
  Menu, 
  X, 
  UserCheck, 
  Sparkles,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { translations } from '../translations';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  openVoiceModal, 
  currentRole, 
  setCurrentRole,
  onLogout 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  
  const isTamil = lang === 'ta';
  const t = translations[lang] || translations.en;

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: Activity },
    { id: 'submit', label: t.nav.submitClaim, icon: FileText },
    { id: 'schemes', label: t.nav.schemes, icon: Search },
    { id: 'status', label: t.nav.claimStatus, icon: ShieldCheck },
    { id: 'report', label: t.nav.verificationReport, icon: Sparkles },
  ];

  const roles = [
    { id: 'farmer', label: isTamil ? 'விவசாயி முறை (Farmer)' : 'Farmer Portal' },
    { id: 'fieldOfficer', label: isTamil ? 'வேளாண் அலுவலர் (Field Officer)' : 'Agri Field Officer' },
    { id: 'evaluator', label: isTamil ? 'காப்பீட்டு மதிப்பீட்டாளர் (Evaluator)' : 'Insurance Evaluator' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-agri-700 via-agri-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-agri-600/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-agri-700 transition-colors">
                  Agri<span className="text-agri-600">claim</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-agri-100 text-agri-800 px-2 py-0.5 rounded-full border border-agri-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {isTamil ? 'பயிர் காப்பீட்டு சரிபார்ப்பு தளம்' : 'AI Crop Insurance Verification'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-agri-50 text-agri-700 border border-agri-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-agri-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Voice Mic, Language Toggle, Role Selector, Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Tamil / English Voice Assistant Button */}
            <button
              onClick={openVoiceModal}
              className="relative group flex items-center gap-2 px-3 sm:px-3.5 py-2 bg-gradient-to-r from-agri-600 to-emerald-600 hover:from-agri-700 hover:to-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-agri-600/20 hover:shadow-lg transition-all"
            >
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isTamil ? 'குரல் உதவி (Voice)' : 'Voice Assistant'}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(isTamil ? 'en' : 'ta')}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-all"
              title="Switch Language"
            >
              <Languages className="w-4 h-4 text-agri-700" />
              <span>{isTamil ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            </button>

            {/* Role Switcher Menu */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-agri-600" />
                <span>
                  {currentRole === 'farmer' ? (isTamil ? 'விவசாயி' : 'Farmer') : 
                   currentRole === 'fieldOfficer' ? (isTamil ? 'அலுவலர்' : 'Officer') : (isTamil ? 'மதிப்பீட்டாளர்' : 'Evaluator')}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {isTamil ? 'பயனர் முறை தேர்வு' : 'Switch Role View'}
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setCurrentRole(r.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between ${
                        currentRole === r.id ? 'bg-agri-50 text-agri-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{r.label}</span>
                      {currentRole === r.id && <span className="w-2 h-2 rounded-full bg-agri-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all"
              title={t.auth.logout}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isTamil ? 'வெளியேறு' : 'Logout'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-agri-50 text-agri-700 border border-agri-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-agri-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 px-2">
            <span>{isTamil ? 'பயனர் வகை:' : 'Role:'}</span>
            <div className="flex gap-1">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    currentRole === r.id ? 'bg-agri-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {r.id === 'farmer' ? (isTamil ? 'விவசாயி' : 'Farmer') : (isTamil ? 'அதிகாரி' : 'Officer')}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onLogout) onLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200"
            >
              <LogOut className="w-4 h-4" />
              <span>{isTamil ? 'கணக்கிலிருந்து வெளியேறு (Logout)' : 'Logout of Account'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

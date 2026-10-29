import React from 'react';
import { ShieldAlert, CloudRain, PawPrint, AlertCircle } from 'lucide-react';

export default function DamageCauseBadge({ classification, lang = 'en', size = 'normal' }) {
  const isTamil = lang === 'ta';

  let config = {
    bg: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    icon: CloudRain,
    label: isTamil ? 'இயற்கை பேரிடர் / வானிலை சேதம்' : 'Natural Disaster / Weather Damage',
  };

  if (classification === 'ANIMAL_DAMAGE') {
    config = {
      bg: 'bg-amber-100 border-amber-300 text-amber-800',
      icon: PawPrint,
      label: isTamil ? 'சாத்தியமான வனவிலங்கு / விலங்கு சேதம்' : 'Possible Animal Damage (Wildlife Intrusion)',
    };
  } else if (classification === 'MIXED_UNCERTAIN') {
    config = {
      bg: 'bg-purple-100 border-purple-300 text-purple-800',
      icon: AlertCircle,
      label: isTamil ? 'கலப்பு / நிச்சயமற்ற சேத காரணி' : 'Mixed / Uncertain Causation',
    };
  } else if (classification === 'SUSPICIOUS') {
    config = {
      bg: 'bg-rose-100 border-rose-300 text-rose-800',
      icon: ShieldAlert,
      label: isTamil 
        ? 'சந்தேகத்திற்கிடமான நடவடிக்கை கண்டறியப்பட்டுள்ளது – நேரடி சரிபார்ப்பு தேவை'
        : 'Suspicious activity detected – requires manual verification',
    };
  }

  const Icon = config.icon;
  const sizeClasses = size === 'small' 
    ? 'text-xs px-2.5 py-1 gap-1.5' 
    : 'text-sm px-3.5 py-1.5 gap-2';

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border shadow-sm ${config.bg} ${sizeClasses}`}>
      <Icon className={size === 'small' ? 'w-3.5 h-3.5' : 'w-4 h-4 flex-shrink-0'} />
      <span>{config.label}</span>
    </span>
  );
}

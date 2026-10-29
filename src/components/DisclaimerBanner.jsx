import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { translations } from '../translations';

export default function DisclaimerBanner({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 text-xs md:text-sm py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="font-medium leading-tight">
            <span className="font-bold text-amber-800">
              {lang === 'ta' ? 'அறிவிப்பு:' : 'AI Disclaimer:'}
            </span>{' '}
            {t.disclaimerText}
          </p>
        </div>
        <span className="hidden lg:inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11px] font-semibold flex-shrink-0 border border-amber-300">
          <Info className="w-3 h-3" />
          {t.officialNotice}
        </span>
      </div>
    </div>
  );
}

import React from 'react';
import { SCHOOL_INFO } from '../../data/mockData';

interface OfficialBrandingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'logo-only';
  textColor?: 'dark' | 'light';
  className?: string;
}

export const OfficialBranding: React.FC<OfficialBrandingProps> = ({
  size = 'md',
  variant = 'full',
  textColor = 'dark',
  className = ''
}) => {
  const logoDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  }[size];

  const primaryTextSize = {
    sm: 'text-xs font-bold leading-tight',
    md: 'text-sm font-extrabold tracking-tight leading-tight',
    lg: 'text-lg font-extrabold tracking-tight leading-none',
    xl: 'text-2xl font-black tracking-tight leading-none'
  }[size];

  const campusTextSize = {
    sm: 'text-[9px] font-semibold tracking-wider',
    md: 'text-[11px] font-bold tracking-widest',
    lg: 'text-xs font-bold tracking-widest',
    xl: 'text-sm font-bold tracking-widest'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official School Crest / Emblem */}
      <div className={`relative ${logoDimensions} shrink-0 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-slate-900/10 flex items-center justify-center p-0.5`}>
        <img
          src={SCHOOL_INFO.images.logo}
          alt="Peshawar Model School Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
          onError={(e) => {
            // Elegant SVG Fallback if image load fails
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-[#0A2540] text-white rounded">
                  <span class="font-black text-xs text-[#F37021]">PMS</span>
                </div>
              `;
            }
          }}
        />
      </div>

      {variant !== 'logo-only' && (
        <div className="flex flex-col text-left">
          <span
            className={`${primaryTextSize} uppercase ${
              textColor === 'light' ? 'text-white' : 'text-slate-950 dark:text-white'
            }`}
          >
            Peshawar Model School
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`${campusTextSize} uppercase text-[#F37021] font-bold`}>
              Mardan Campus
            </span>
            {size === 'lg' || size === 'xl' ? (
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                · Est. 1979
              </span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

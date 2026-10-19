import React from 'react';
import { Download, Moon, Sun } from 'lucide-react';
import type { ThemeMode } from './FluidAuroraShader.tsx';

export type PortalSite = 'home' | 'war-room' | 'automation-plan' | 'beginner-guide';

interface PortalHeaderProps {
  activeSite: PortalSite;
  onSelectSite: (site: PortalSite) => void;
  onExportMasterBundle: () => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeSite,
  onSelectSite,
  onExportMasterBundle,
  themeMode,
  onToggleTheme,
}) => {
  return (
    <header className="sm:sticky sm:top-0 z-40 bg-[#090D16]/85 backdrop-blur-md border-b border-slate-800/90 transition-colors">
      <div className="max-w-[1440px] mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onSelectSite('home');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 font-display hover:text-cyan-400 transition-colors"
        >
          WAR ROOM NEXUS
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Global Sub-Website Switcher"
          className="order-3 sm:order-2 w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 sm:gap-6 pt-2 sm:pt-0 border-t border-slate-800/60 sm:border-t-0"
        >
          <button
            type="button"
            onClick={() => onSelectSite('home')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeSite === 'home'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            Home Portal
          </button>
          <button
            type="button"
            onClick={() => onSelectSite('war-room')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeSite === 'war-room'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            War Room OS
          </button>
          <button
            type="button"
            onClick={() => onSelectSite('automation-plan')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeSite === 'automation-plan'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            Automation Plan
          </button>
          <button
            type="button"
            onClick={() => onSelectSite('beginner-guide')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeSite === 'beginner-guide'
                ? 'border-indigo-400 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            Beginner Guide
          </button>
        </nav>

        {/* Zone 3: Theme Toggle + 1 Primary Export Action */}
        <div className="order-2 sm:order-3 flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            data-testid="theme-toggle-button"
            aria-label="Toggle Light and Dark Theme"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-200 bg-[#111827] hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {themeMode === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onExportMasterBundle}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Master Script</span>
          </button>
        </div>
      </div>
    </header>
  );
};

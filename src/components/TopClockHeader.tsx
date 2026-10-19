import React from 'react';
import {
  ArrowLeft,
  Clock,
  Download,
  Pause,
  Play,
  RotateCcw,
  ShieldAlert,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';
import {
  ActiveSyncState,
  formatDurationHMS,
  formatHourMinuteFromSeconds,
  ProgressSummary,
  TOTAL_HACKATHON_MINUTES,
} from '../utils/warRoomLogic.ts';
import { MODULE_METADATA } from '../data/warRoomData.ts';

export type ActiveTab = 'navigator' | 'routing' | 'prompts' | 'artifacts';

interface TopClockHeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  elapsedSeconds: number;
  isRunning: boolean;
  clockSpeedMultiplier: 1 | 60;
  onToggleRun: () => void;
  onResetClock: () => void;
  onToggleSpeed: () => void;
  onJumpToMinutes: (minutes: number) => void;
  syncState: ActiveSyncState;
  progress: ProgressSummary;
  onExportBlueprint: () => void;
  onSelectPhaseId: (phaseId: string) => void;
  onBackToHome?: () => void;
  onGoToAutomationPlan?: () => void;
}

const MILESTONE_JUMPS = [
  { label: '0:00 Start', minutes: 0, phaseId: 'phase-1-1' },
  { label: '1:00 Lock', minutes: 60, phaseId: 'phase-1-2' },
  { label: '2:30 Gate', minutes: 150, phaseId: 'phase-1-5' },
  { label: '10:00 ML', minutes: 600, phaseId: 'phase-2-4' },
  { label: '14:00 Freeze', minutes: 840, phaseId: 'phase-3-1' },
  { label: '16:45 Lock', minutes: 1005, phaseId: 'phase-3-4' },
];

export const TopClockHeader: React.FC<TopClockHeaderProps> = ({
  activeTab,
  onSelectTab,
  elapsedSeconds,
  isRunning,
  clockSpeedMultiplier,
  onToggleRun,
  onResetClock,
  onToggleSpeed,
  onJumpToMinutes,
  syncState,
  progress,
  onExportBlueprint,
  onSelectPhaseId,
  onBackToHome,
  onGoToAutomationPlan,
}) => {
  const currentMinutes = Math.floor(elapsedSeconds / 60);
  const activeModMeta = MODULE_METADATA[syncState.activeModuleId];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = Number(e.target.value);
    onJumpToMinutes(mins);
  };

  return (
    <div className="bg-[#090D16]/95 border-b border-slate-800/90">
      {/* Sub-Website 1 Workspace Bar */}
      <div className="max-w-[1440px] mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-6 px-4 sm:px-6 py-2.5 border-b border-slate-800/70 bg-[#111827]/70">
        <div className="flex items-center gap-3 shrink-0">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Home Portal</span>
            </button>
          )}
          <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-100 whitespace-nowrap font-display">
            <span className="text-cyan-400 font-mono mr-1.5">SUB-WEBSITE 01</span>
            WAR ROOM v2.5
          </span>
        </div>

        <nav
          aria-label="War Room Workspace Navigation"
          className="order-3 md:order-2 w-full md:w-auto flex items-center justify-between sm:justify-start gap-2 sm:gap-6 pt-2 md:pt-0 border-t border-slate-800/60 md:border-t-0"
        >
          <button
            type="button"
            onClick={() => onSelectTab('navigator')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'navigator'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            Phase Navigator
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('routing')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'routing'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            Model Routing
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('prompts')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'prompts'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            Prompt Vault
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('artifacts')}
            className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'artifacts'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-100'
            }`}
          >
            Artifact Studio
          </button>
        </nav>

        <div className="order-2 md:order-3 flex items-center gap-2 shrink-0">
          {onGoToAutomationPlan && (
            <button
              type="button"
              onClick={onGoToAutomationPlan}
              className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-300 bg-[#090D16] hover:bg-slate-800 border border-emerald-500/40 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sub-Website 2: Autopilot v2.5 →
            </button>
          )}
          <button
            type="button"
            onClick={onExportBlueprint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CONTEXT.md</span>
          </button>
        </div>
      </div>

      {/* Master 17-Hour Clock, Phase Sync & Global Progress Command Strip */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Clock & Controls (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2.5 bg-[#111827] border border-slate-800 rounded-md px-3 py-1.5">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400 leading-none">
                  Elapsed / Remaining (17h)
                </div>
                <div className="font-mono text-sm sm:text-base font-bold tracking-tight text-slate-100 tabular-nums mt-0.5">
                  <span data-testid="elapsed-clock">
                    {formatDurationHMS(syncState.elapsedSeconds)}
                  </span>
                  <span className="text-slate-500 mx-1.5">/</span>
                  <span className="text-cyan-400" data-testid="remaining-clock">
                    -{formatDurationHMS(syncState.remainingSeconds)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleRun}
                aria-label={isRunning ? 'Pause Master Clock' : 'Start Master Clock'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isRunning
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Start</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onResetClock}
                aria-label="Reset Master Clock"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-[#111827] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={onToggleSpeed}
                aria-label="Toggle Clock Simulation Speed"
                className="px-2.5 py-1.5 text-xs font-mono font-medium text-slate-300 bg-[#111827] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
              >
                {clockSpeedMultiplier === 1 ? '1x Live' : '60x Sim'}
              </button>
            </div>
          </div>

          {/* Manual Jump to Hour Slider & Milestone Presets (Cols 5-9) */}
          <div className="lg:col-span-5 flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <label
                htmlFor="master-hour-slider"
                className="inline-flex items-center gap-1.5 text-slate-300 font-medium"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Jump to Hour</span>
                <span className="font-mono text-cyan-400 tabular-nums">
                  ({formatHourMinuteFromSeconds(syncState.elapsedSeconds)} / 17:00)
                </span>
              </label>
              <button
                type="button"
                onClick={() => {
                  onSelectPhaseId(syncState.activePhase.id);
                  onSelectTab('navigator');
                }}
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Focus {syncState.activePhase.code}
              </button>
            </div>

            <input
              id="master-hour-slider"
              type="range"
              min={0}
              max={TOTAL_HACKATHON_MINUTES}
              step={5}
              value={currentMinutes}
              onChange={handleSliderChange}
              aria-label="Jump to Hour Slider"
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            <div className="flex flex-wrap items-center justify-between gap-1 pt-0.5">
              {MILESTONE_JUMPS.map((ms) => (
                <button
                  key={ms.label}
                  type="button"
                  onClick={() => {
                    onJumpToMinutes(ms.minutes);
                    onSelectPhaseId(ms.phaseId);
                  }}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                    Math.abs(currentMinutes - ms.minutes) < 15
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  {ms.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Phase Sync & Global Progress (Cols 10-12) */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-1.5 bg-[#111827] border border-slate-800 rounded-md px-3 py-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="truncate font-medium text-slate-200" data-testid="synced-phase-label">
                <span className="text-amber-400 font-semibold">{activeModMeta.shortTitle}</span>
                <span className="text-slate-500 mx-1.5">·</span>
                <span className="font-mono text-slate-300">{syncState.activePhase.code}</span>
              </div>
              <span
                className="font-mono font-semibold text-emerald-400 tabular-nums shrink-0"
                data-testid="global-progress-percent"
              >
                {progress.overallPercent}% Done
              </span>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 transition-transform duration-200 origin-left"
                style={{ transform: `scaleX(${progress.overallPercent / 100})` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 tabular-nums">
              <span>
                Tasks: {progress.completedTaskCount}/{progress.totalTaskCount}
              </span>
              <span>·</span>
              <span
                className={
                  progress.isSection2Unlocked ? 'text-emerald-400 font-medium' : 'text-amber-400'
                }
              >
                2:30 Gate: {progress.completedGateCount}/{progress.totalGateCount}
              </span>
            </div>
          </div>
        </div>

        {/* Semantic Deadline / Freeze Status Strip when at critical milestones */}
        {syncState.activeDeadlineBanner.level !== 'nominal' && (
          <div
            className={`mt-2 flex items-center justify-between gap-3 px-3 py-1.5 rounded-md border text-xs ${
              syncState.activeDeadlineBanner.level === 'critical'
                ? 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                : 'bg-amber-950/50 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {syncState.activeDeadlineBanner.level === 'critical' ? (
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="font-semibold">{syncState.activeDeadlineBanner.label}:</span>
              <span className="text-slate-200">{syncState.activeDeadlineBanner.detail}</span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider shrink-0">
              {syncState.activePhase.timeRangeLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

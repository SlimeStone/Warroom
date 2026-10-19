import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  FileCode2,
  Lock,
  Sparkles,
  Unlock,
  Layers,
} from 'lucide-react';
import {
  GATE_CHECKLIST_ITEMS,
  MODULE_METADATA,
  ModuleId,
  PhaseItem,
  PHASES,
} from '../data/warRoomData.ts';
import { ActiveSyncState, ProgressSummary } from '../utils/warRoomLogic.ts';

interface PhaseNavigatorProps {
  selectedPhaseId: string;
  onSelectPhase: (phaseId: string) => void;
  checkedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  onMarkPhaseTasks: (phase: PhaseItem, completed: boolean) => void;
  checkedGates: Record<string, boolean>;
  onToggleGate: (gateId: string) => void;
  onUnlockAllGates: () => void;
  phaseNotes: Record<string, string>;
  onUpdatePhaseNote: (phaseId: string, note: string) => void;
  syncState: ActiveSyncState;
  progress: ProgressSummary;
  onJumpToMinutes: (minutes: number) => void;
  onInspectModelInHub: (modelQuery: string) => void;
  onOpenArtifactStudio: () => void;
}

export const PhaseNavigator: React.FC<PhaseNavigatorProps> = ({
  selectedPhaseId,
  onSelectPhase,
  checkedTasks,
  onToggleTask,
  onMarkPhaseTasks,
  checkedGates,
  onToggleGate,
  onUnlockAllGates,
  phaseNotes,
  onUpdatePhaseNote,
  syncState,
  progress,
  onJumpToMinutes,
  onInspectModelInHub,
  onOpenArtifactStudio,
}) => {
  const selectedPhase = PHASES.find((p) => p.id === selectedPhaseId) ?? PHASES[0];
  const isSection2LockedAndSelected =
    selectedPhase.moduleId === 'coder' && !progress.isSection2Unlocked;

  const phaseCompletedCount = selectedPhase.tasks.filter((t) => checkedTasks[t.id]).length;
  const isAllPhaseTasksDone =
    selectedPhase.tasks.length > 0 && phaseCompletedCount === selectedPhase.tasks.length;

  const currentPhaseIndex = PHASES.findIndex((p) => p.id === selectedPhase.id);
  const prevPhase = currentPhaseIndex > 0 ? PHASES[currentPhaseIndex - 1] : null;
  const nextPhase =
    currentPhaseIndex < PHASES.length - 1 ? PHASES[currentPhaseIndex + 1] : null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      {/* Module Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(['brain', 'coder', 'shipyard'] as ModuleId[]).map((modId) => {
          const meta = MODULE_METADATA[modId];
          const modProg = progress.moduleProgress[modId];
          const isTimeActive = syncState.activeModuleId === modId;
          const isSelectedMod = selectedPhase.moduleId === modId;
          const firstPhaseOfMod = PHASES.find((p) => p.moduleId === modId)!;

          return (
            <button
              key={modId}
              type="button"
              onClick={() => onSelectPhase(firstPhaseOfMod.id)}
              className={`text-left p-4 rounded-lg border transition-colors cursor-pointer ${
                isSelectedMod
                  ? 'bg-[#111827] border-cyan-500/60'
                  : 'bg-[#111827]/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">
                <span className="font-mono font-semibold text-cyan-400 tabular-nums">
                  {meta.hoursLabel}
                </span>
                <span>·</span>
                <span className="font-mono tabular-nums">
                  {modProg.completed}/{modProg.total} tasks ({modProg.percent}%)
                </span>
                {isTimeActive && (
                  <span className="text-amber-400 font-semibold ml-auto">Active Phase</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold text-slate-100 font-display">{meta.title}</h2>
                {modId === 'coder' && !progress.isSection2Unlocked && (
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" aria-label="Gate Locked" />
                )}
                {modId === 'coder' && progress.isSection2Unlocked && (
                  <Unlock
                    className="w-4 h-4 text-emerald-400 shrink-0"
                    aria-label="Gate Unlocked"
                  />
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{meta.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Left/Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 14 Sequential Phases Timeline Navigator */}
        <aside
          aria-label="14-Phase Timeline Navigator"
          className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 font-display">
              14-Phase Execution Timeline
            </h3>
            <span className="text-xs font-mono text-slate-400 tabular-nums">0:00 – 17:00</span>
          </div>

          <div className="space-y-5">
            {(['brain', 'coder', 'shipyard'] as ModuleId[]).map((modId) => {
              const meta = MODULE_METADATA[modId];
              const modPhases = PHASES.filter((p) => p.moduleId === modId);

              return (
                <div key={modId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span className="font-semibold text-slate-200">{meta.shortTitle}</span>
                    <span className="font-mono tabular-nums">{meta.hoursLabel}</span>
                  </div>

                  {modPhases.map((phase) => {
                    const isSelected = phase.id === selectedPhase.id;
                    const isClockCurrent = phase.id === syncState.activePhase.id;
                    const doneCount = phase.tasks.filter((t) => checkedTasks[t.id]).length;
                    const totalCount = phase.tasks.length;
                    const isComplete = doneCount === totalCount && totalCount > 0;
                    const isCoderLocked =
                      phase.moduleId === 'coder' && !progress.isSection2Unlocked;

                    return (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => onSelectPhase(phase.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-md border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800/90 border-cyan-400/70 text-slate-100'
                            : 'bg-[#090D16]/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-1.5 font-mono">
                            <span
                              className={
                                isSelected ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                              }
                            >
                              {phase.code}
                            </span>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-400 tabular-nums">
                              {phase.timeRangeLabel.split(' ')[0]}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 font-mono text-[11px] tabular-nums">
                            {isClockCurrent && (
                              <span className="text-amber-400 font-semibold">NOW</span>
                            )}
                            {isCoderLocked && <Lock className="w-3 h-3 text-amber-400" />}
                            <span
                              className={
                                isComplete ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                              }
                            >
                              {doneCount}/{totalCount}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs font-medium text-slate-200 mt-1 line-clamp-1">
                          {phase.title}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Right Viewport: Selected Phase Detail, Interactive Tasks & Hour 2:30 Gate Lock */}
        <section className="lg:col-span-8 space-y-6">
          {/* Prominent Hard Feature Freeze Warning Banner for Section 3 (Shipyard) */}
          {(selectedPhase.moduleId === 'shipyard' || syncState.isFeatureFreezeActive) && (
            <div
              data-testid="feature-freeze-banner"
              className="bg-rose-950/60 border border-rose-500/60 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm font-display">
                  <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>HARD FEATURE FREEZE AT HOUR 14:00 — THE SHIPYARD v2.0</span>
                </div>
                <p className="text-xs text-rose-100/90 leading-relaxed">
                  All feature development is strictly terminated at Hour 14:00. Execute only
                  Dockerized bug hunts, ONNX/vLLM quantization, the 5500ms Stage Circuit-Breaker (
                  <code className="font-mono text-rose-200">demo_vault.json</code>), Student Pack
                  cloud deployment, and the Hour 16:45 submission lock.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onJumpToMinutes(840)}
                className="px-3 py-1.5 text-xs font-mono font-semibold text-rose-950 bg-rose-400 hover:bg-rose-300 rounded-md whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
              >
                Sync Clock to 14:00
              </button>
            </div>
          )}

          {/* Section 2 Gate Lock Warning if User Selects Coder Before Completing Gate */}
          {isSection2LockedAndSelected && (
            <div
              data-testid="section2-gate-warning"
              className="bg-amber-950/50 border border-amber-500/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm font-display">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Hour 2:30 "Go-For-Launch" Gate Required Before Section 2</span>
                </div>
                <p className="text-xs text-amber-100/90 leading-relaxed">
                  Never write production frontend or backend code until all 5 Go-For-Launch items in
                  Section 1 are checked off ({progress.completedGateCount}/
                  {progress.totalGateCount} verified). Complete the checklist below to unlock
                  Section 2.
                </p>
              </div>
              <button
                type="button"
                onClick={onUnlockAllGates}
                className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                Verify All 5 & Unlock Section 2
              </button>
            </div>
          )}

          {/* Selected Phase Card */}
          <div className="bg-[#111827] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-cyan-400 font-semibold">{selectedPhase.moduleLabel}</span>
                  <span>·</span>
                  <span>{selectedPhase.code}</span>
                  <span>·</span>
                  <span className="text-slate-200 tabular-nums">
                    {selectedPhase.timeRangeLabel}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                  {selectedPhase.title}
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {selectedPhase.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onJumpToMinutes(selectedPhase.startMinute)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
                >
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sync Clock ({selectedPhase.startMinute}m)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onMarkPhaseTasks(selectedPhase, !isAllPhaseTasksDone)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAllPhaseTasksDone ? 'Uncheck Phase' : 'Complete Phase'}</span>
                </button>
              </div>
            </div>

            {/* Phase Alert Banner (Hour 1:00 Hard Stop, Guillotine Rule, 3-Tier ML DAG, Hour 16:45 Lock) */}
            {selectedPhase.alert && (
              <div
                className={`p-4 rounded-md border ${
                  selectedPhase.alert.type === 'hard-stop' ||
                  selectedPhase.alert.type === 'freeze'
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                    : selectedPhase.alert.type === 'guillotine'
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-100'
                    : 'bg-indigo-950/40 border-indigo-500/40 text-indigo-100'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm font-display mb-1">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{selectedPhase.alert.title}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-95">{selectedPhase.alert.message}</p>
              </div>
            )}

            {/* Phase 1.4 Special: 5 Mandatory Blocks of CONTEXT.md */}
            {selectedPhase.mandatoryBlocks && (
              <div className="bg-[#090D16] border border-slate-800 rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <FileCode2 className="w-4 h-4" />
                    <span>5 Mandatory Architecture Blocks in CONTEXT.md</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenArtifactStudio}
                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Open CONTEXT.md Generator →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPhase.mandatoryBlocks.map((block) => (
                    <div
                      key={block}
                      className="text-xs text-slate-300 font-mono bg-[#111827] border border-slate-800/90 px-3 py-2 rounded"
                    >
                      {block}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actionable Checkable Sub-Steps */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200">
                  Actionable Sub-Steps & Model Assignments
                </span>
                <span className="font-mono tabular-nums">
                  {phaseCompletedCount} of {selectedPhase.tasks.length} completed
                </span>
              </div>

              {selectedPhase.tasks.map((task) => {
                const isDone = Boolean(checkedTasks[task.id]);
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      isDone
                        ? 'bg-[#090D16]/90 border-emerald-500/40'
                        : 'bg-[#090D16] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        id={`task-check-${task.id}`}
                        type="checkbox"
                        checked={isDone}
                        onChange={() => onToggleTask(task.id)}
                        className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400 cursor-pointer shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label
                            htmlFor={`task-check-${task.id}`}
                            className={`text-sm font-semibold cursor-pointer ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-100'
                            }`}
                          >
                            {task.title}
                          </label>
                          <span className="text-xs font-mono text-cyan-400 tabular-nums shrink-0">
                            {task.timeWindow}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {task.detail}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-slate-400 inline-flex items-center gap-1">
                              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Models:</span>
                            </span>
                            {task.models.map((m, idx) => (
                              <React.Fragment key={m}>
                                {idx > 0 && <span className="text-slate-600">·</span>}
                                <button
                                  type="button"
                                  onClick={() => onInspectModelInHub(m)}
                                  className="font-mono text-indigo-300 hover:text-cyan-300 underline decoration-indigo-500/40 underline-offset-2 cursor-pointer"
                                >
                                  {m}
                                </button>
                              </React.Fragment>
                            ))}
                          </div>

                          <div className="text-slate-400 font-mono text-[11px]">
                            Deliverable: <span className="text-emerald-400">{task.deliverable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tactical Team Scratchpad Note for Current Phase */}
            <div className="pt-2 border-t border-slate-800">
              <label
                htmlFor={`phase-note-${selectedPhase.id}`}
                className="block text-xs font-medium text-slate-400 mb-1.5"
              >
                War Room Log for {selectedPhase.code} (persisted in localStorage)
              </label>
              <textarea
                id={`phase-note-${selectedPhase.id}`}
                rows={2}
                value={phaseNotes[selectedPhase.id] ?? ''}
                onChange={(e) => onUpdatePhaseNote(selectedPhase.id, e.target.value)}
                placeholder={`Record decisions, owner assignments, or links for ${selectedPhase.code}...`}
                className="w-full rounded-md bg-[#090D16] border border-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Phase Prev / Next Navigation Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              {prevPhase ? (
                <button
                  type="button"
                  onClick={() => onSelectPhase(prevPhase.id)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors cursor-pointer"
                >
                  ← {prevPhase.code}: {prevPhase.title}
                </button>
              ) : (
                <div />
              )}
              {nextPhase && (
                <button
                  type="button"
                  onClick={() => onSelectPhase(nextPhase.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer"
                >
                  <span>
                    Next: {nextPhase.code} ({nextPhase.timeRangeLabel.split(' ')[0]})
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Gate Lock — The Hour 2:30 "Go-For-Launch" Checklist */}
          <div
            data-testid="hour-230-gate-card"
            className={`rounded-lg border p-5 sm:p-6 transition-colors ${
              progress.isSection2Unlocked
                ? 'bg-emerald-950/25 border-emerald-500/50'
                : 'bg-[#111827] border-amber-500/50'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  {progress.isSection2Unlocked ? (
                    <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>GATE UNLOCKED · SECTION 2 AUTHORIZED</span>
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold inline-flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>MANDATORY GATE LOCK · HOUR 2:30 (150m)</span>
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-display">
                  The Hour 2:30 "Go-For-Launch" Gate Checklist
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  All 5 deliverables must be verified before unlocking{' '}
                  <strong>Section 2: THE CODER v2.0</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-slate-300 tabular-nums">
                  {progress.completedGateCount}/{progress.totalGateCount} Verified
                </span>
                {!progress.isSection2Unlocked && (
                  <button
                    type="button"
                    onClick={onUnlockAllGates}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Check All 5 & Unlock
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {GATE_CHECKLIST_ITEMS.map((item, idx) => {
                const isChecked = Boolean(checkedGates[item.id]);
                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-md border transition-colors ${
                      isChecked
                        ? 'bg-[#090D16]/90 border-emerald-500/40'
                        : 'bg-[#090D16] border-slate-800'
                    }`}
                  >
                    <input
                      id={`gate-item-${item.id}`}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleGate(item.id)}
                      className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-emerald-400 focus:ring-emerald-400 cursor-pointer shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label
                          htmlFor={`gate-item-${item.id}`}
                          className={`text-xs sm:text-sm font-semibold cursor-pointer ${
                            isChecked ? 'text-emerald-300' : 'text-slate-100'
                          }`}
                        >
                          0{idx + 1}. {item.title}
                        </label>
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.artifactTag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.verificationCriteria}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Celebration State when all 5 Gate Items are Checked */}
            {progress.isSection2Unlocked && (
              <div
                data-testid="section2-unlocked-celebration"
                className="mt-4 p-4 rounded-md bg-emerald-500/15 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-emerald-300 font-display">
                      Section 2 Unlocked — Go-For-Launch Confirmed!
                    </div>
                    <p className="text-xs text-emerald-100/90 mt-0.5">
                      All 5 Brain v2.0 artifacts are locked. Your team is cleared for{' '}
                      <strong>Section 2: THE CODER v2.0 (Hours 2:30 – 14:00)</strong>.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPhase('phase-2-1');
                    onJumpToMinutes(150);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Launch Phase 2.1 (Hour 2:30)</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

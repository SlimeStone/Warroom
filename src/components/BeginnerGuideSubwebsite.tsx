import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  Download,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react';
import type { ArtifactConfig } from '../data/warRoomData.ts';
import {
  BEGINNER_STAGES,
  BeginnerGuideProgress,
  BeginnerStageGuide,
  generateBeginnerGuideMarkdown,
  injectBeginnerGuideVariables,
  LAPTOP_HARDWARE_PROFILE,
} from '../data/beginnerGuideData.ts';

interface BeginnerGuideSubwebsiteProps {
  artifactConfig: ArtifactConfig;
  onUpdateConfig: (updated: ArtifactConfig) => void;
  selectedStageId: string;
  onSelectStageId: (stageId: string) => void;
  checkedBeginnerSteps: Record<string, boolean>;
  onToggleBeginnerStep: (stepId: string) => void;
  onMarkStageBeginnerSteps: (stage: BeginnerStageGuide, completed: boolean) => void;
  onMarkAllBeginnerSteps: (completed: boolean) => void;
  beginnerProgress: BeginnerGuideProgress;
  onNavigateToHome: () => void;
  onNavigateToAutomationPlan: () => void;
}

export const BeginnerGuideSubwebsite: React.FC<BeginnerGuideSubwebsiteProps> = ({
  artifactConfig,
  onUpdateConfig,
  selectedStageId,
  onSelectStageId,
  checkedBeginnerSteps,
  onToggleBeginnerStep,
  onMarkStageBeginnerSteps,
  onMarkAllBeginnerSteps,
  beginnerProgress,
  onNavigateToHome,
  onNavigateToAutomationPlan,
}) => {
  const [viewMode, setViewMode] = useState<'all-steps' | 'focus-step'>('all-steps');
  const [focusedStepIndex, setFocusedStepIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedStage =
    BEGINNER_STAGES.find((s) => s.id === selectedStageId) ?? BEGINNER_STAGES[0];
  const currentStageIndex = BEGINNER_STAGES.findIndex((s) => s.id === selectedStage.id);
  const prevStage = currentStageIndex > 0 ? BEGINNER_STAGES[currentStageIndex - 1] : null;
  const nextStage =
    currentStageIndex < BEGINNER_STAGES.length - 1
      ? BEGINNER_STAGES[currentStageIndex + 1]
      : null;

  const safeFocusIndex = Math.min(
    Math.max(focusedStepIndex, 0),
    selectedStage.microSteps.length - 1
  );

  const stageDoneCount = selectedStage.microSteps.filter(
    (ms) => checkedBeginnerSteps[ms.id]
  ).length;
  const isAllStageDone =
    selectedStage.microSteps.length > 0 &&
    stageDoneCount === selectedStage.microSteps.length;

  const handleSelectStage = (stageId: string) => {
    onSelectStageId(stageId);
    setFocusedStepIndex(0);
  };

  const handleCopyCommand = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
  };

  const handleDownloadHandbook = () => {
    const content = generateBeginnerGuideMarkdown(artifactConfig, BEGINNER_STAGES);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ZERO_TO_HERO_WIN11_RTX5060_BEGINNER_GUIDE.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const visibleMicroSteps =
    viewMode === 'focus-step'
      ? [selectedStage.microSteps[safeFocusIndex]]
      : selectedStage.microSteps;

  return (
    <div className="min-h-screen relative z-10">
      {/* Sub-Website 3 Top Command Strip */}
      <div className="bg-[#111827]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span>Home Portal</span>
            </button>

            <div className="text-xs sm:text-sm font-bold text-slate-100 font-display">
              <span className="text-indigo-400 font-mono mr-2">SUB-WEBSITE 03</span>
              ZERO-TO-HERO GUIDE: Windows 11 · Ryzen 9 HX · 16GB RAM · RTX 5060 (8GB)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-[#090D16] border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-mono tabular-nums">
              <span className="text-slate-400">Guided Progress:</span>
              <span className="text-indigo-400 font-bold" data-testid="beginner-progress-label">
                {beginnerProgress.completedSteps}/{beginnerProgress.totalSteps} Micro-Steps (
                {beginnerProgress.percent}%)
              </span>
            </div>

            <button
              type="button"
              onClick={() => onMarkAllBeginnerSteps(beginnerProgress.percent < 100)}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/40 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {beginnerProgress.percent === 100
                ? 'Reset All 32 Micro-Steps'
                : 'Check All 32 Micro-Steps'}
            </button>

            <button
              type="button"
              onClick={handleDownloadHandbook}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Windows 11 Handbook (.md)</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToAutomationPlan}
              className="px-3 py-1.5 text-xs font-medium text-emerald-300 bg-[#090D16] hover:bg-slate-800 border border-emerald-500/40 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              View Raw Scripts (Sub-Site 2) →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Welcome & Hardware Profile Banner */}
        <section className="shader-glass-card rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-indigo-400">
                <BookOpen className="w-4 h-4" />
                <span>
                  TUNED FOR WINDOWS 11 · AMD RYZEN 9 HX · 16GB RAM · NVIDIA RTX 5060 (8GB VRAM)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                Learn & Build Stage 01 to Stage 08 on Your Windows 11 Laptop
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                New to terminals, scripts, or AI tools? This guide breaks all 8 stages into{' '}
                <strong>32 bite-sized Windows 11 PowerShell micro-steps</strong> specifically tuned
                for your <strong>AMD Ryzen 9 HX processor</strong>, <strong>16GB RAM</strong>, and{' '}
                <strong>NVIDIA GeForce RTX 5060 8GB graphics card</strong>. Every step explains what
                you are doing in plain English, gives an everyday analogy, and translates every
                PowerShell command word-by-word.
              </p>
            </div>

            {/* Toggle between All Micro-Steps in Stage vs. 1 Step at a Time Focus Mode */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#090D16] border border-slate-800 p-1.5 rounded-2xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setViewMode('all-steps')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'all-steps'
                    ? 'bg-indigo-500 text-slate-950'
                    : 'text-slate-300 hover:text-slate-100'
                }`}
              >
                Show All Steps in Stage
              </button>
              <button
                type="button"
                data-testid="toggle-focus-step-mode"
                onClick={() => {
                  setViewMode('focus-step');
                  setFocusedStepIndex(0);
                }}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'focus-step'
                    ? 'bg-cyan-400 text-slate-950'
                    : 'text-slate-300 hover:text-slate-100'
                }`}
              >
                One Step at a Time (Focus Mode)
              </button>
            </div>
          </div>

          {/* 4-Card Laptop Hardware Profile Strip */}
          <div
            data-testid="laptop-hardware-profile-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2"
          >
            {LAPTOP_HARDWARE_PROFILE.map((hw) => (
              <div
                key={hw.component}
                className="p-3.5 rounded-2xl bg-[#090D16] border border-slate-800/90 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                    {hw.component}
                  </span>
                  <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-100 font-display">
                  {hw.model}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{hw.plainRole}</p>
                <div className="pt-1 flex items-start gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{hw.safeBudgetRule}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Personalize Your Guide Bar */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
            <div className="md:col-span-4">
              <label
                htmlFor="guide-project-name"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Your Project Name (Automatically Fills Into All PowerShell Commands)
              </label>
              <input
                id="guide-project-name"
                type="text"
                value={artifactConfig.projectName}
                onChange={(e) =>
                  onUpdateConfig({ ...artifactConfig, projectName: e.target.value })
                }
                className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono bg-[#090D16] border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div className="md:col-span-5">
              <label
                htmlFor="guide-problem-domain"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Your Hackathon Topic / Problem Domain
              </label>
              <input
                id="guide-problem-domain"
                type="text"
                value={artifactConfig.problemDomain}
                onChange={(e) =>
                  onUpdateConfig({ ...artifactConfig, problemDomain: e.target.value })
                }
                className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono bg-[#090D16] border border-indigo-500/40 rounded-xl text-indigo-200 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor="guide-domain-url"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Your Target Website Link
              </label>
              <input
                id="guide-domain-url"
                type="text"
                value={artifactConfig.domainUrl}
                onChange={(e) =>
                  onUpdateConfig({ ...artifactConfig, domainUrl: e.target.value })
                }
                className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono bg-[#090D16] border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
        </section>

        {/* Left/Main Split View: 8-Stage Beginner Roadmap + Micro-Step Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 8 Beginner Stages & Micro-Step Jump List */}
          <aside
            aria-label="8-Stage Beginner Guide Navigator"
            className="lg:col-span-4 shader-glass-card rounded-3xl p-4 sm:p-5 space-y-2.5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-slate-100 font-display">
                Stages 01–08 (32 Win11 Micro-Steps)
              </h2>
              <span className="text-xs font-mono text-indigo-400 tabular-nums">
                {beginnerProgress.completedStages}/{beginnerProgress.totalStages} stages done
              </span>
            </div>

            {BEGINNER_STAGES.map((stage) => {
              const isSelected = stage.id === selectedStage.id;
              const done = stage.microSteps.filter((ms) => checkedBeginnerSteps[ms.id]).length;
              const total = stage.microSteps.length;
              const isComplete = done === total && total > 0;

              return (
                <div key={stage.id} className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectStage(stage.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-indigo-400/80 text-slate-100'
                        : 'bg-[#090D16]/70 border-slate-800/80 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span
                        className={
                          isSelected ? 'text-indigo-400 font-semibold' : 'text-cyan-400'
                        }
                      >
                        Stage {stage.stageNumber} · {stage.totalTime}
                      </span>
                      <span
                        className={`tabular-nums ${
                          isComplete ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        {done}/{total} steps
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-slate-100 mt-1">
                      {injectBeginnerGuideVariables(stage.title, artifactConfig)}
                    </div>
                  </button>

                  {/* Sub-list of micro-steps when this stage is selected */}
                  {isSelected && (
                    <div className="pl-3 space-y-1">
                      {stage.microSteps.map((ms, idx) => {
                        const stepDone = Boolean(checkedBeginnerSteps[ms.id]);
                        const isFocused = viewMode === 'focus-step' && safeFocusIndex === idx;
                        return (
                          <button
                            key={ms.id}
                            type="button"
                            onClick={() => {
                              setFocusedStepIndex(idx);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2 border transition-colors cursor-pointer ${
                              isFocused
                                ? 'bg-indigo-500/20 border-indigo-400/60 text-indigo-200 font-semibold'
                                : stepDone
                                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                                  : 'bg-[#090D16]/60 border-slate-800/70 text-slate-300 hover:bg-slate-800/40'
                            }`}
                          >
                            <span className="truncate">
                              <strong className="font-mono mr-1.5">{ms.stepNumberLabel}:</strong>
                              {injectBeginnerGuideVariables(ms.title, artifactConfig)}
                            </span>
                            {stepDone && (
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </aside>

          {/* Right Column: Active Stage Plain-English Header + Detailed Micro-Steps */}
          <section className="lg:col-span-8 space-y-6">
            {/* Active Stage Plain-English Overview Card */}
            <div className="shader-glass-card rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-indigo-400 font-bold">
                      STAGE {selectedStage.stageNumber}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-cyan-400">
                      ESTIMATED TIME: {selectedStage.totalTime}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400">
                      {stageDoneCount} of {selectedStage.microSteps.length} Micro-Steps Done
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                    {injectBeginnerGuideVariables(selectedStage.title, artifactConfig)}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {injectBeginnerGuideVariables(selectedStage.subtitle, artifactConfig)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onMarkStageBeginnerSteps(selectedStage, !isAllStageDone)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 ${
                    isAllStageDone
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                      : 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isAllStageDone
                      ? `Uncheck Stage ${selectedStage.stageNumber}`
                      : `Complete All ${selectedStage.microSteps.length} Steps in Stage ${selectedStage.stageNumber}`}
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>In Plain English: What Is Happening Here?</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {injectBeginnerGuideVariables(selectedStage.plainOverview, artifactConfig)}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Why Does This Stage Matter for Your Laptop?</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {injectBeginnerGuideVariables(
                      selectedStage.whyThisStageMatters,
                      artifactConfig
                    )}
                  </p>
                </div>
              </div>

              {/* Focus Mode Step Switcher Bar */}
              {viewMode === 'focus-step' && (
                <div className="p-3.5 rounded-2xl bg-[#090D16] border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-cyan-300">
                    Focus Mode: Viewing Micro-Step {safeFocusIndex + 1} of{' '}
                    {selectedStage.microSteps.length} in Stage {selectedStage.stageNumber}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={safeFocusIndex === 0}
                      onClick={() => setFocusedStepIndex((i) => Math.max(0, i - 1))}
                      className="px-3 py-1 text-xs font-medium text-slate-200 bg-[#111827] hover:bg-slate-800 disabled:opacity-40 border border-slate-700 rounded-xl transition-colors cursor-pointer"
                    >
                      ← Previous Micro-Step
                    </button>
                    <button
                      type="button"
                      disabled={safeFocusIndex >= selectedStage.microSteps.length - 1}
                      onClick={() =>
                        setFocusedStepIndex((i) =>
                          Math.min(selectedStage.microSteps.length - 1, i + 1)
                        )
                      }
                      className="px-3 py-1 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 rounded-xl transition-colors cursor-pointer"
                    >
                      Next Micro-Step →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Micro-Step Cards */}
            <div className="space-y-5">
              {visibleMicroSteps.map((step) => {
                const isDone = Boolean(checkedBeginnerSteps[step.id]);
                const renderedCmd = step.copyableCommand
                  ? injectBeginnerGuideVariables(step.copyableCommand, artifactConfig)
                  : null;

                return (
                  <article
                    key={step.id}
                    data-testid={`beginner-step-card-${step.id}`}
                    className={`shader-glass-card rounded-3xl p-6 space-y-5 transition-colors ${
                      isDone ? 'border-emerald-500/50' : ''
                    }`}
                  >
                    {/* Micro-Step Header & Checkbox */}
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                      <div className="flex items-start gap-3.5">
                        <input
                          id={`beginner-check-${step.id}`}
                          type="checkbox"
                          checked={isDone}
                          onChange={() => onToggleBeginnerStep(step.id)}
                          className="mt-1 w-5 h-5 rounded-lg border-slate-600 bg-slate-900 text-emerald-400 focus:ring-emerald-400 cursor-pointer shrink-0"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                            <span className="text-indigo-400 font-bold">
                              {step.stepNumberLabel}
                            </span>
                            <span className="text-slate-500">·</span>
                            <span className="text-cyan-400 tabular-nums">
                              Takes ~{step.estimatedTime}
                            </span>
                            {isDone && (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                <span>·</span>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Completed</span>
                              </span>
                            )}
                          </div>
                          <label
                            htmlFor={`beginner-check-${step.id}`}
                            className={`text-lg sm:text-xl font-bold font-display cursor-pointer block mt-0.5 ${
                              isDone ? 'text-emerald-300' : 'text-slate-100'
                            }`}
                          >
                            {injectBeginnerGuideVariables(step.title, artifactConfig)}
                          </label>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleBeginnerStep(step.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer shrink-0 ${
                          isDone
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                            : 'bg-[#090D16] border-slate-700 text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <span>Mark Step Done</span>
                        )}
                      </button>
                    </div>

                    {/* 1. What You Are Doing & Real-World Analogy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-1.5">
                        <div className="text-xs font-semibold text-slate-200">
                          1. What You Are Doing
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {injectBeginnerGuideVariables(step.whatYouAreDoing, artifactConfig)}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Everyday Analogy (Think of It Like...)</span>
                        </div>
                        <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
                          {injectBeginnerGuideVariables(step.realWorldAnalogy, artifactConfig)}
                        </p>
                      </div>
                    </div>

                    {/* Hardware Optimization Note (Windows 11 + Ryzen 9 HX + 16GB RAM + RTX 5060 8GB) */}
                    <div className="p-4 rounded-2xl bg-cyan-950/25 border border-cyan-500/40 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                        <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>
                          Your Laptop Hardware Tuning (Windows 11 · Ryzen 9 HX · 16GB RAM · RTX 5060
                          8GB)
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {injectBeginnerGuideVariables(
                          step.hardwareOptimizationNote,
                          artifactConfig
                        )}
                      </p>
                    </div>

                    {/* 2. Where to Click / Open & Copyable Windows 11 PowerShell Command */}
                    <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                          <Terminal className="w-4 h-4" />
                          <span>
                            2. Exact Action in Windows 11 PowerShell: Where to Click & What to Paste
                          </span>
                        </div>

                        {renderedCmd && (
                          <button
                            type="button"
                            onClick={() => handleCopyCommand(step.id, renderedCmd)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                              copiedId === step.id
                                ? 'bg-emerald-400 text-slate-950'
                                : 'bg-[#111827] hover:bg-slate-800 text-cyan-300 border border-cyan-500/40'
                            }`}
                          >
                            {copiedId === step.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied PowerShell Command!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy PowerShell Command</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {injectBeginnerGuideVariables(step.whereToClickOrOpen, artifactConfig)}
                      </p>

                      {renderedCmd && (
                        <pre className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {renderedCmd}
                        </pre>
                      )}

                      {/* Word-by-Word Command Breakdown */}
                      {step.commandBreakdown.length > 0 && (
                        <div className="pt-2 space-y-2">
                          <div className="text-xs font-semibold text-slate-300">
                            Word-by-Word Translation (What This Windows 11 PowerShell Command Means):
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            {step.commandBreakdown.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-[#111827]/90 border border-slate-800/90 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 text-xs"
                              >
                                <code className="font-mono font-bold text-cyan-300 shrink-0">
                                  {injectBeginnerGuideVariables(item.piece, artifactConfig)}
                                </code>
                                <span className="text-slate-300 leading-relaxed">
                                  → {injectBeginnerGuideVariables(item.meaning, artifactConfig)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 3. Jargon Decoder (What Do These Technical Words Mean?) */}
                    {step.jargonDecoder.length > 0 && (
                      <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                          <HelpCircle className="w-4 h-4" />
                          <span>3. Jargon Decoder (Technical Words Translated to Plain English)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {step.jargonDecoder.map((j) => (
                            <div
                              key={j.term}
                              className="p-3 rounded-xl bg-[#111827] border border-slate-800/90 space-y-1"
                            >
                              <div className="text-xs font-bold text-slate-100 font-display">
                                {j.term}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {j.plainMeaning}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. How You Know It Worked + Troubleshooting Fix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/40 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                          <ListChecks className="w-4 h-4" />
                          <span>How You Know It Worked on Windows 11</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {injectBeginnerGuideVariables(step.howYouKnowItWorked, artifactConfig)}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                          <Wrench className="w-4 h-4" />
                          <span>If Something Goes Wrong (Windows 11 Quick Fix)</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {injectBeginnerGuideVariables(step.commonMistakeFix, artifactConfig)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Stage Navigation Footer */}
            <div className="shader-glass-card rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">
              {prevStage ? (
                <button
                  type="button"
                  onClick={() => handleSelectStage(prevStage.id)}
                  className="px-4 py-2 text-xs font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  ← Stage {prevStage.stageNumber}:{' '}
                  {injectBeginnerGuideVariables(prevStage.title, artifactConfig)}
                </button>
              ) : (
                <div />
              )}

              {nextStage && (
                <button
                  type="button"
                  onClick={() => handleSelectStage(nextStage.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl transition-colors cursor-pointer"
                >
                  <span>
                    Next: Stage {nextStage.stageNumber} (
                    {injectBeginnerGuideVariables(nextStage.title, artifactConfig)})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

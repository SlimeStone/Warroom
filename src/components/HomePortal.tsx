import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Clock,
  Cpu,
  FileCode2,
  HelpCircle,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import type { ArtifactConfig } from '../data/warRoomData.ts';
import type { ActiveSyncState, ProgressSummary } from '../utils/warRoomLogic.ts';
import { formatDurationHMS } from '../utils/warRoomLogic.ts';
import {
  AutomationProgressSummary,
  TIME_COMPRESSION_MATRIX,
} from '../data/automationData.ts';
import type { BeginnerGuideProgress } from '../data/beginnerGuideData.ts';
import type { ActiveTab } from './TopClockHeader.tsx';

interface HomePortalProps {
  artifactConfig: ArtifactConfig;
  onUpdateConfig: (updated: ArtifactConfig) => void;
  warRoomSync: ActiveSyncState;
  warRoomProgress: ProgressSummary;
  automationProgress: AutomationProgressSummary;
  beginnerProgress: BeginnerGuideProgress;
  onLaunchWarRoom: (initialTab?: ActiveTab) => void;
  onLaunchAutomationPlan: (autoStartSimulation?: boolean) => void;
  onLaunchBeginnerGuide: (stageId?: string) => void;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  artifactConfig,
  onUpdateConfig,
  warRoomSync,
  warRoomProgress,
  automationProgress,
  beginnerProgress,
  onLaunchWarRoom,
  onLaunchAutomationPlan,
  onLaunchBeginnerGuide,
}) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-10 relative z-10">
      {/* Hero Section & Cross-Site Telemetry Strip */}
      <section className="shader-glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs font-mono text-cyan-400">
              MISSION CONTROL PORTAL · TRI-SUB-WEBSITE ARCHITECTURE
            </div>
            <h1
              className="text-2xl sm:text-4xl font-bold text-slate-100 font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              17-Hour Hackathon Command Center, Automation OS & Beginner Guide
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Execute your hackathon strategy through three synchronized sub-websites: run{' '}
              <strong className="text-cyan-300">Sub-Website 1: WAR ROOM v2.0</strong> (17-hour clock & 14 phases), deploy{' '}
              <strong className="text-emerald-300">Sub-Website 2: AUTOPILOT v2.0</strong> (8-stage CLI & agent scripts), or follow{' '}
              <strong className="text-indigo-300">Sub-Website 3: ZERO-TO-HERO GUIDE</strong> (a non-technical, plain-English walkthrough of Stages 1 to 8 that explains every word and step).
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onLaunchWarRoom('navigator')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Sub-Site 1: War Room v2.0</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onLaunchAutomationPlan(false)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Terminal className="w-4 h-4 shrink-0" />
                <span>Sub-Site 2: Automation Plan</span>
              </button>

              <button
                type="button"
                onClick={() => onLaunchBeginnerGuide('guide-stage-1')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-indigo-200 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 shrink-0 text-indigo-300" />
                <span>Sub-Site 3: Beginner Step-by-Step Guide</span>
              </button>
            </div>
          </div>

          {/* 4-Metric Cross-Site Telemetry Summary */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3.5">
            <div className="bg-[#090D16] border border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-400">Sub-Site 1: War Room Clock</div>
              <div className="text-lg font-mono font-bold text-cyan-400 tabular-nums mt-1">
                {formatDurationHMS(warRoomSync.elapsedSeconds)}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {warRoomSync.activePhase.code} · {warRoomProgress.overallPercent}% Done
              </div>
            </div>

            <div className="bg-[#090D16] border border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-400">Hour 2:30 Gate Lock</div>
              <div
                className={`text-lg font-mono font-bold tabular-nums mt-1 ${
                  warRoomProgress.isSection2Unlocked ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {warRoomProgress.completedGateCount}/{warRoomProgress.totalGateCount} Verified
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {warRoomProgress.isSection2Unlocked ? 'Section 2 Unlocked' : 'Awaiting Gate'}
              </div>
            </div>

            <div className="bg-[#090D16] border border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-400">Sub-Site 2: Autopilot Plan</div>
              <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums mt-1">
                {automationProgress.completedStages}/{automationProgress.totalStages} Stages
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {automationProgress.percent}% Scripts Checked
              </div>
            </div>

            <div className="bg-[#090D16] border border-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-400">Sub-Site 3: Beginner Guide</div>
              <div className="text-lg font-mono font-bold text-indigo-400 tabular-nums mt-1">
                {beginnerProgress.completedSteps}/{beginnerProgress.totalSteps} Steps
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                8 Plain-English Stages
              </div>
            </div>
          </div>
        </div>

        {/* Shared Cross-Site Project Configuration Bar */}
        <div className="pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
          <div className="md:col-span-3">
            <label
              htmlFor="portal-project-name"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Shared Project Name (Syncs All 3 Sites)
            </label>
            <input
              id="portal-project-name"
              type="text"
              value={artifactConfig.projectName}
              onChange={(e) =>
                onUpdateConfig({ ...artifactConfig, projectName: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono bg-[#090D16] border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="md:col-span-6">
            <label
              htmlFor="portal-problem-domain"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Shared [Problem Domain] (Injected into Prompts, Scripts & Beginner Guide)
            </label>
            <input
              id="portal-problem-domain"
              type="text"
              value={artifactConfig.problemDomain}
              onChange={(e) =>
                onUpdateConfig({ ...artifactConfig, problemDomain: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono bg-[#090D16] border border-cyan-500/40 rounded-xl text-cyan-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor="portal-domain-url"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Production .tech / .me URL
            </label>
            <input
              id="portal-domain-url"
              type="text"
              value={artifactConfig.domainUrl}
              onChange={(e) =>
                onUpdateConfig({ ...artifactConfig, domainUrl: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-mono bg-[#090D16] border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Tri Sub-Website Launch Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Sub-Website 1 Launch Card: WAR ROOM v2.0 */}
        <article
          data-testid="launch-card-war-room"
          className="shader-glass-card shader-glass-card-interactive hover:border-cyan-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <span className="text-cyan-400 font-semibold">SUB-WEBSITE 01 · INTERACTIVE OS</span>
              <span className="text-slate-400 tabular-nums">
                {warRoomProgress.completedTaskCount}/{warRoomProgress.totalTaskCount} Tasks
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-100 font-display">
                WAR ROOM v2.0: The 17-Hour Execution OS
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                The live command center for executing your 3-module hackathon strategy across{' '}
                <strong>The Brain (0:00–2:30)</strong>, <strong>The Coder (2:30–14:00)</strong>, and{' '}
                <strong>The Shipyard (14:00–17:00)</strong>.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => onLaunchWarRoom('navigator')}
                className="w-full text-left p-3.5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>14-Phase Timeline & 17h Master Clock</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Hour 1:00 Idea Lock, Guillotine Rule, Hour 2:30 Gate & 14:00 Freeze.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onLaunchWarRoom('routing')}
                className="w-full text-left p-3.5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>20-Model Routing Hub & 6-Prompt Vault</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Filter Builder vs. Product models and copy prompts with [Problem Domain].
                </p>
              </button>

              <button
                type="button"
                onClick={() => onLaunchWarRoom('artifacts')}
                className="w-full text-left p-3.5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Artifact Studio & Export Generators</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  1-click CONTEXT.md, Canva brand tokens, demo_vault.json & README.md.
                </p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-slate-400">
              Active: <strong className="text-slate-200">{warRoomSync.activePhase.code}</strong>
            </span>
            <button
              type="button"
              onClick={() => onLaunchWarRoom('navigator')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Enter Sub-Site 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>

        {/* Sub-Website 2 Launch Card: AUTOPILOT v2.0 */}
        <article
          data-testid="launch-card-automation"
          className="shader-glass-card shader-glass-card-interactive hover:border-emerald-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <span className="text-emerald-400 font-semibold">
                SUB-WEBSITE 02 · CLI SCRIPTS
              </span>
              <span className="text-slate-400 tabular-nums">
                {automationProgress.completedStages}/{automationProgress.totalStages} Stages
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-100 font-display">
                AUTOPILOT v2.0: CLI & Agent Automation Plan
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                An 8-stage technical automation playbook with copy-ready Bash & Python orchestration
                scripts and a live dry-run pipeline simulator that compresses 17h into 38m.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#090D16] border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Stages 01–04: Brain & Repo Ignition Scripts</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Auto-bootstrap monorepo, scrape rubrics, run ideation & boot mock_server.py.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#090D16] border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Stages 05–08: Coder & Shipyard Scripts</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Auto-seed 50 domain records, wire AI pipeline, record vault & run Playwright E2E.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onLaunchAutomationPlan(true)}
                className="w-full text-left p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 hover:bg-emerald-950/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <Play className="w-3.5 h-3.5" />
                  <span>Launch Live Pipeline Simulator →</span>
                </div>
                <p className="text-xs text-emerald-100/80 mt-1">
                  Execute an interactive dry-run of all 8 stages with live terminal telemetry.
                </p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-slate-400">
              Saves <strong className="text-emerald-400">16h 22m</strong>
            </span>
            <button
              type="button"
              onClick={() => onLaunchAutomationPlan(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Enter Sub-Site 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>

        {/* Sub-Website 3 Launch Card: ZERO-TO-HERO BEGINNER GUIDE */}
        <article
          data-testid="launch-card-beginner-guide"
          className="shader-glass-card shader-glass-card-interactive hover:border-indigo-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <span className="text-indigo-400 font-semibold">
                SUB-WEBSITE 03 · NON-TECHNICAL GUIDE
              </span>
              <span className="text-slate-400 tabular-nums">
                {beginnerProgress.completedSteps}/{beginnerProgress.totalSteps} Micro-Steps
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-100 font-display">
                ZERO-TO-HERO: Windows 11 & RTX 5060 Beginner Guide
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Tuned for your <strong>Windows 11 laptop</strong> with{' '}
                <strong>AMD Ryzen 9 HX</strong>, <strong>16GB RAM</strong>, and{' '}
                <strong>RTX 5060 (8GB)</strong>. Breaks Stages 1 to 8 into{' '}
                <strong>32 plain-English PowerShell micro-steps</strong>.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => onLaunchBeginnerGuide('guide-stage-1')}
                className="w-full text-left p-3.5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Windows 11 PowerShell & Hardware-Safe Rules</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Native Windows 11 commands that keep 8GB VRAM & 16GB RAM cool and fast.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onLaunchBeginnerGuide('guide-stage-1')}
                className="w-full text-left p-3.5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Word-by-Word Command Translator & Jargon Decoder</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Translates every PowerShell command and technical word into simple English.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onLaunchBeginnerGuide('guide-stage-1')}
                className="w-full text-left p-3.5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                  <ListChecks className="w-3.5 h-3.5" />
                  <span>Windows 11 Success Checks & Quick Fixes</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Shows how to verify each step with nvidia-smi & PowerShell plus beginner fixes.
                </p>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-slate-400">
              <strong className="text-indigo-400">Win11 · RTX 5060</strong> · 32 Steps
            </span>
            <button
              type="button"
              onClick={() => onLaunchBeginnerGuide('guide-stage-1')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Enter Sub-Site 3</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </article>
      </section>

      {/* Manual (17h) vs. Automated (38m) Time Compression Matrix */}
      <section className="shader-glass-card rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400">
              QUANTIFIED AUTOMATION LEVERAGE · SUB-WEBSITE 1 vs. SUB-WEBSITE 2 & 3
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-display mt-0.5">
              How the 8-Stage Automation Plan Compresses 17 Hours into 38 Minutes
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 tabular-nums">
            Total Manual: 1,020 min (17h) → Automated Pipeline: 38 min (26.8x Faster)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#090D16]/90 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-5">War Room Phase Group</th>
                <th className="py-3.5 px-5">Manual War Room Workflow (Sub-Site 1)</th>
                <th className="py-3.5 px-5 text-right">Manual Time</th>
                <th className="py-3.5 px-5">Automated CLI & Agent Pipeline (Sub-Site 2 & 3)</th>
                <th className="py-3.5 px-5 text-right">Auto Time</th>
                <th className="py-3.5 px-5 text-right">Speedup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
              {TIME_COMPRESSION_MATRIX.map((row) => (
                <tr key={row.phaseGroup} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-semibold text-slate-100">{row.phaseGroup}</div>
                    <div className="text-[11px] font-mono text-cyan-400">{row.moduleLabel}</div>
                  </td>
                  <td className="py-4 px-5 text-xs text-slate-300 max-w-[280px]">
                    {row.manualProcess}
                  </td>
                  <td className="py-4 px-5 text-right font-mono text-xs text-amber-300 whitespace-nowrap tabular-nums">
                    {row.manualTime}
                  </td>
                  <td className="py-4 px-5 text-xs text-slate-200 max-w-[320px]">
                    {row.automatedPipeline}
                  </td>
                  <td className="py-4 px-5 text-right font-mono text-xs text-emerald-400 font-semibold whitespace-nowrap tabular-nums">
                    {row.automatedTime}
                  </td>
                  <td className="py-4 px-5 text-right font-mono text-xs text-cyan-300 font-bold whitespace-nowrap tabular-nums">
                    {row.speedupFactor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

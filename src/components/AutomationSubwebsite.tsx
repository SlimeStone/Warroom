import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  Download,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import type { ArtifactConfig } from '../data/warRoomData.ts';
import {
  AUTOMATION_STAGES,
  AutomationProgressSummary,
  AutomationStage,
  generateMasterAutopilotBash,
  injectAutomationVariables,
} from '../data/automationData.ts';

interface AutomationSubwebsiteProps {
  artifactConfig: ArtifactConfig;
  onUpdateConfig: (updated: ArtifactConfig) => void;
  selectedStageId: string;
  onSelectStageId: (stageId: string) => void;
  checkedAutoTasks: Record<string, boolean>;
  onToggleAutoTask: (taskId: string) => void;
  onMarkStageAutoTasks: (stage: AutomationStage, completed: boolean) => void;
  onMarkAllAutoStages: (completed: boolean) => void;
  automationProgress: AutomationProgressSummary;
  autoStartSimulation: boolean;
  onConsumeAutoStartSimulation: () => void;
  onNavigateToHome: () => void;
  onNavigateToWarRoom: () => void;
}

export const AutomationSubwebsite: React.FC<AutomationSubwebsiteProps> = ({
  artifactConfig,
  onUpdateConfig,
  selectedStageId,
  onSelectStageId,
  checkedAutoTasks,
  onToggleAutoTask,
  onMarkStageAutoTasks,
  onMarkAllAutoStages,
  automationProgress,
  autoStartSimulation,
  onConsumeAutoStartSimulation,
  onNavigateToHome,
  onNavigateToWarRoom,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [simLogs, setSimLogs] = useState<string[]>([
    '[AUTOPILOT READY] 8-Stage CLI & Multi-Agent Automation Harness initialized.',
    `[CONTEXT] Project="${artifactConfig.projectName}" | Domain="${artifactConfig.problemDomain}"`,
    '[READY] Click "Run Full 8-Stage Simulation" or "Simulate Stage" to execute the automated pipeline.',
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const selectedStage =
    AUTOMATION_STAGES.find((s) => s.id === selectedStageId) ?? AUTOMATION_STAGES[0];
  const currentIndex = AUTOMATION_STAGES.findIndex((s) => s.id === selectedStage.id);
  const prevStage = currentIndex > 0 ? AUTOMATION_STAGES[currentIndex - 1] : null;
  const nextStage =
    currentIndex < AUTOMATION_STAGES.length - 1 ? AUTOMATION_STAGES[currentIndex + 1] : null;

  const stageDoneCount = selectedStage.tasks.filter((t) => checkedAutoTasks[t.id]).length;
  const isAllStageDone =
    selectedStage.tasks.length > 0 && stageDoneCount === selectedStage.tasks.length;

  const renderedScript = injectAutomationVariables(selectedStage.scriptTemplate, artifactConfig);

  const runStageSimulation = (stage: AutomationStage) => {
    setIsSimulating(true);
    const lines = stage.simulationLogs.map((line) =>
      injectAutomationVariables(line, artifactConfig)
    );
    setSimLogs([
      `[EXEC] Running ${stage.scriptFilename} (${stage.title})...`,
      ...lines,
    ]);
    onMarkStageAutoTasks(stage, true);
    setIsSimulating(false);
  };

  const runFullPipelineSimulation = () => {
    setIsSimulating(true);
    const allLines: string[] = [
      `[MASTER AUTOPILOT] Executing full 8-stage automation pipeline for "${artifactConfig.projectName}"...`,
    ];
    for (const st of AUTOMATION_STAGES) {
      for (const l of st.simulationLogs) {
        allLines.push(injectAutomationVariables(l, artifactConfig));
      }
    }
    setSimLogs(allLines);
    onMarkAllAutoStages(true);
    setIsSimulating(false);
  };

  useEffect(() => {
    if (autoStartSimulation) {
      runFullPipelineSimulation();
      onConsumeAutoStartSimulation();
    }
  }, [autoStartSimulation]);

  const handleCopyText = async (id: string, text: string) => {
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

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMasterBundle = () => {
    const masterContent = generateMasterAutopilotBash(artifactConfig, AUTOMATION_STAGES);
    handleDownloadFile('autopilot_master_pipeline.sh', masterContent);
  };

  return (
    <div className="min-h-screen relative z-10">
      {/* Sub-Website 2 Top Command Strip */}
      <div className="bg-[#111827]/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Home Portal</span>
            </button>

            <div className="text-xs sm:text-sm font-bold text-slate-100 font-display">
              <span className="text-emerald-400 font-mono mr-2">SUB-WEBSITE 02</span>
              AUTOPILOT v2.0: Step-by-Step Hackathon Automation Plan
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#090D16] border border-slate-800 px-3 py-1.5 rounded text-xs font-mono tabular-nums">
              <span className="text-slate-400">Automation Progress:</span>
              <span className="text-emerald-400 font-bold" data-testid="automation-progress-label">
                {automationProgress.completedStages}/{automationProgress.totalStages} Stages (
                {automationProgress.percent}%)
              </span>
            </div>

            <button
              type="button"
              onClick={() => onMarkAllAutoStages(automationProgress.percent < 100)}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {automationProgress.percent === 100 ? 'Reset All 8 Stages' : 'Verify All 8 Stages'}
            </button>

            <button
              type="button"
              onClick={handleDownloadMasterBundle}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download autopilot_master.sh</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToWarRoom}
              className="px-3 py-1.5 text-xs font-medium text-cyan-300 bg-[#090D16] hover:bg-slate-800 border border-cyan-500/40 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Switch to Sub-Website 1 (War Room) →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Dynamic Variable Injection & Live Pipeline Simulator Console */}
        <section className="bg-[#111827] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-3">
              <label
                htmlFor="auto-project-name"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Inject [PROJECT_NAME]
              </label>
              <input
                id="auto-project-name"
                type="text"
                value={artifactConfig.projectName}
                onChange={(e) =>
                  onUpdateConfig({ ...artifactConfig, projectName: e.target.value })
                }
                className="w-full px-3 py-1.5 text-xs sm:text-sm font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="lg:col-span-5">
              <label
                htmlFor="auto-problem-domain"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Inject [PROBLEM_DOMAIN] Across All 8 CLI & Agent Scripts
              </label>
              <input
                id="auto-problem-domain"
                type="text"
                value={artifactConfig.problemDomain}
                onChange={(e) =>
                  onUpdateConfig({ ...artifactConfig, problemDomain: e.target.value })
                }
                className="w-full px-3 py-1.5 text-xs sm:text-sm font-mono bg-[#090D16] border border-emerald-500/50 rounded text-emerald-200 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="lg:col-span-4 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={runFullPipelineSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Full 8-Stage Simulation</span>
              </button>

              <button
                type="button"
                onClick={() => runStageSimulation(selectedStage)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Stage {selectedStage.number}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setSimLogs([
                    '[TERMINAL CLEARED] Ready to simulate Stage 01–08 automation scripts.',
                  ])
                }
                aria-label="Clear Simulator Terminal"
                className="px-2.5 py-2 text-xs font-medium text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Dry-Run Terminal Console */}
          <div className="bg-[#090D16] border border-slate-800 rounded-md p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-200 font-semibold">
                  AUTOPILOT DRY-RUN PIPELINE SIMULATOR CONSOLE
                </span>
              </div>
              <span className="text-emerald-400 tabular-nums">
                17h Manual → 38m Automated (Saves 16h 22m)
              </span>
            </div>

            <pre
              data-testid="automation-simulator-log"
              className="text-xs font-mono text-emerald-300/95 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto tabular-nums"
            >
              {simLogs.join('\n')}
            </pre>
          </div>
        </section>

        {/* Left/Main Split View: 8-Stage Step-by-Step Automation Playbook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 8 Sequential Automation Stages */}
          <aside
            aria-label="8-Stage Automation Playbook Navigator"
            className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-lg p-4 space-y-2.5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-slate-100 font-display">
                8-Stage Automation Sequence
              </h2>
              <span className="text-xs font-mono text-emerald-400 tabular-nums">
                {automationProgress.completedTasks}/{automationProgress.totalTasks} steps
              </span>
            </div>

            {AUTOMATION_STAGES.map((stage) => {
              const isSelected = stage.id === selectedStage.id;
              const done = stage.tasks.filter((t) => checkedAutoTasks[t.id]).length;
              const total = stage.tasks.length;
              const isComplete = done === total && total > 0;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => onSelectStageId(stage.id)}
                  className={`w-full text-left p-3 rounded-md border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-400/70 text-slate-100'
                      : 'bg-[#090D16]/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span
                      className={
                        isSelected ? 'text-emerald-400 font-semibold' : 'text-cyan-400'
                      }
                    >
                      Stage {stage.number} · {stage.scriptFilename}
                    </span>
                    <span
                      className={`tabular-nums ${
                        isComplete ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {done}/{total}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-100 mt-1 line-clamp-1">
                    {stage.title}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1 tabular-nums">
                    <span>
                      {stage.manualDuration} →{' '}
                      <strong className="text-emerald-300">{stage.automatedDuration}</strong>
                    </span>
                    <span className="text-indigo-300">{stage.timeSavedLabel}</span>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Right Main Viewport: Selected Automation Stage Checklist & Copyable Script */}
          <section className="lg:col-span-8 space-y-6">
            <div className="bg-[#111827] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-5">
              {/* Stage Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 font-semibold">
                      STAGE {selectedStage.number}
                    </span>
                    <span>·</span>
                    <span>{selectedStage.moduleLabel}</span>
                    <span>·</span>
                    <span className="text-cyan-300 tabular-nums">
                      {selectedStage.manualDuration} → {selectedStage.automatedDuration} (
                      {selectedStage.timeSavedLabel})
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                    {selectedStage.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedStage.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => runStageSimulation(selectedStage)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Simulate Stage {selectedStage.number}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onMarkStageAutoTasks(selectedStage, !isAllStageDone)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-[#090D16] hover:bg-slate-800 border border-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isAllStageDone ? 'Uncheck Stage' : 'Mark Stage Verified'}</span>
                  </button>
                </div>
              </div>

              {/* Orchestrated Agents & Tools */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 bg-[#090D16] border border-slate-800 px-3.5 py-2.5 rounded-md">
                <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Automated Agents & Tools Invoked:</span>
                <span className="font-mono text-indigo-300">
                  {selectedStage.agentsUsed.join(' · ')}
                </span>
              </div>

              {/* Step-by-Step Automated Action Checklist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">
                    Step-by-Step Automated Execution Tasks
                  </span>
                  <span className="font-mono tabular-nums">
                    {stageDoneCount} of {selectedStage.tasks.length} verified
                  </span>
                </div>

                {selectedStage.tasks.map((task) => {
                  const isChecked = Boolean(checkedAutoTasks[task.id]);
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        isChecked
                          ? 'bg-[#090D16]/90 border-emerald-500/40'
                          : 'bg-[#090D16] border-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <input
                          id={`auto-task-${task.id}`}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleAutoTask(task.id)}
                          className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-900 text-emerald-400 focus:ring-emerald-400 cursor-pointer shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <label
                              htmlFor={`auto-task-${task.id}`}
                              className={`text-sm font-semibold cursor-pointer ${
                                isChecked ? 'line-through text-slate-400' : 'text-slate-100'
                              }`}
                            >
                              {task.title}
                            </label>
                            <span className="text-[11px] font-mono text-emerald-400">
                              Output: {task.outputArtifact}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {task.description}
                          </p>

                          <div className="bg-[#111827] border border-slate-800/90 rounded px-3 py-1.5 font-mono text-xs text-cyan-300 overflow-x-auto">
                            $ {injectAutomationVariables(task.commandPreview, artifactConfig)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Copyable & Downloadable Stage Automation Script */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-slate-100">
                      {selectedStage.scriptFilename}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400">
                      Dynamically Injected with [{artifactConfig.projectName}]
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText(selectedStage.id, renderedScript)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        copiedId === selectedStage.id
                          ? 'bg-emerald-400 text-slate-950'
                          : 'bg-[#090D16] hover:bg-slate-800 text-slate-100 border border-slate-700'
                      }`}
                    >
                      {copiedId === selectedStage.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Script</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copy {selectedStage.scriptFilename}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownloadFile(selectedStage.scriptFilename, renderedScript)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <pre
                  data-testid="automation-stage-script"
                  className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96 overflow-y-auto"
                >
                  {renderedScript}
                </pre>
              </div>

              {/* Prev / Next Stage Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                {prevStage ? (
                  <button
                    type="button"
                    onClick={() => onSelectStageId(prevStage.id)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors cursor-pointer"
                  >
                    ← Stage {prevStage.number}: {prevStage.title}
                  </button>
                ) : (
                  <div />
                )}

                {nextStage && (
                  <button
                    type="button"
                    onClick={() => onSelectStageId(nextStage.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors cursor-pointer"
                  >
                    <span>
                      Next: Stage {nextStage.number} ({nextStage.scriptFilename})
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

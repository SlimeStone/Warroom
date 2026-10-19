import React, { useEffect, useState } from 'react';
import {
  ArtifactConfig,
  DEFAULT_ARTIFACT_CONFIG,
  GATE_CHECKLIST_ITEMS,
  PhaseItem,
  PHASES,
} from './data/warRoomData.ts';
import {
  AUTOMATION_STAGES,
  AutomationStage,
  calculateAutomationProgress,
  generateMasterAutopilotBash,
} from './data/automationData.ts';
import {
  BEGINNER_STAGES,
  BeginnerStageGuide,
  calculateBeginnerGuideProgress,
} from './data/beginnerGuideData.ts';
import {
  calculateGlobalProgress,
  clampSeconds,
  generateContextMd,
  getActiveSyncState,
  TOTAL_HACKATHON_SECONDS,
} from './utils/warRoomLogic.ts';
import { PortalHeader, PortalSite } from './components/PortalHeader.tsx';
import { HomePortal } from './components/HomePortal.tsx';
import { ActiveTab, TopClockHeader } from './components/TopClockHeader.tsx';
import { PhaseNavigator } from './components/PhaseNavigator.tsx';
import { ModelRoutingHub } from './components/ModelRoutingHub.tsx';
import { PromptVault } from './components/PromptVault.tsx';
import { ArtifactStudio } from './components/ArtifactStudio.tsx';
import { AutomationSubwebsite } from './components/AutomationSubwebsite.tsx';
import { BeginnerGuideSubwebsite } from './components/BeginnerGuideSubwebsite.tsx';
import { FluidAuroraShader, ThemeMode } from './components/FluidAuroraShader.tsx';

const STORAGE_KEY = 'war_room_v2_execution_os_state_v2';

interface PersistedWarRoomState {
  activeSite: PortalSite;
  themeMode: ThemeMode;
  elapsedSeconds: number;
  selectedPhaseId: string;
  checkedTasks: Record<string, boolean>;
  checkedGates: Record<string, boolean>;
  phaseNotes: Record<string, string>;
  artifactConfig: ArtifactConfig;
  selectedAutoStageId: string;
  checkedAutoTasks: Record<string, boolean>;
  selectedBeginnerStageId: string;
  checkedBeginnerSteps: Record<string, boolean>;
}

function getSiteFromHash(): PortalSite | null {
  if (typeof window === 'undefined') return null;
  const h = window.location.hash.replace('#', '');
  if (
    h === 'home' ||
    h === 'war-room' ||
    h === 'automation-plan' ||
    h === 'beginner-guide'
  ) {
    return h;
  }
  return null;
}

function loadInitialState(): PersistedWarRoomState {
  const hashSite = getSiteFromHash();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedWarRoomState>;
      return {
        activeSite: hashSite ?? parsed.activeSite ?? 'home',
        themeMode: parsed.themeMode === 'light' ? 'light' : 'dark',
        elapsedSeconds: clampSeconds(parsed.elapsedSeconds ?? 0),
        selectedPhaseId: parsed.selectedPhaseId ?? 'phase-1-1',
        checkedTasks: parsed.checkedTasks ?? {},
        checkedGates: parsed.checkedGates ?? {},
        phaseNotes: parsed.phaseNotes ?? {},
        artifactConfig: {
          ...DEFAULT_ARTIFACT_CONFIG,
          ...(parsed.artifactConfig ?? {}),
        },
        selectedAutoStageId: parsed.selectedAutoStageId ?? 'auto-stage-1',
        checkedAutoTasks: parsed.checkedAutoTasks ?? {},
        selectedBeginnerStageId: parsed.selectedBeginnerStageId ?? 'guide-stage-1',
        checkedBeginnerSteps: parsed.checkedBeginnerSteps ?? {},
      };
    }
  } catch {
    // Fallback to defaults if localStorage is unavailable
  }
  return {
    activeSite: hashSite ?? 'home',
    themeMode: 'dark',
    elapsedSeconds: 0,
    selectedPhaseId: 'phase-1-1',
    checkedTasks: {},
    checkedGates: {},
    phaseNotes: {},
    artifactConfig: DEFAULT_ARTIFACT_CONFIG,
    selectedAutoStageId: 'auto-stage-1',
    checkedAutoTasks: {},
    selectedBeginnerStageId: 'guide-stage-1',
    checkedBeginnerSteps: {},
  };
}

export default function App() {
  const [persisted, setPersisted] = useState<PersistedWarRoomState>(loadInitialState);
  const [activeTab, setActiveTab] = useState<ActiveTab>('navigator');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [clockSpeedMultiplier, setClockSpeedMultiplier] = useState<1 | 60>(1);
  const [routingInitialSearch, setRoutingInitialSearch] = useState<string>('');
  const [autoStartSimulation, setAutoStartSimulation] = useState<boolean>(false);

  // Sync themeMode with <html data-theme="...">
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', persisted.themeMode);
      document.documentElement.classList.toggle('dark', persisted.themeMode === 'dark');
    }
  }, [persisted.themeMode]);

  // Persist to localStorage on every state update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // Ignore storage quota errors
    }
  }, [persisted]);

  // Listen to browser back/forward hash changes
  useEffect(() => {
    const onHashChange = () => {
      const site = getSiteFromHash();
      if (site) {
        setPersisted((prev) => ({ ...prev, activeSite: site }));
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Master 17-Hour Stopwatch interval
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setPersisted((prev) => {
        const nextSeconds = clampSeconds(prev.elapsedSeconds + clockSpeedMultiplier);
        const nextSync = getActiveSyncState(nextSeconds, PHASES);
        if (nextSeconds >= TOTAL_HACKATHON_SECONDS) {
          setIsRunning(false);
        }
        return {
          ...prev,
          elapsedSeconds: nextSeconds,
          selectedPhaseId: nextSync.activePhase.id,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, clockSpeedMultiplier]);

  const syncState = getActiveSyncState(persisted.elapsedSeconds, PHASES);
  const progress = calculateGlobalProgress(
    persisted.checkedTasks,
    persisted.checkedGates,
    PHASES,
    GATE_CHECKLIST_ITEMS
  );
  const automationProgress = calculateAutomationProgress(
    persisted.checkedAutoTasks,
    AUTOMATION_STAGES
  );
  const beginnerProgress = calculateBeginnerGuideProgress(
    persisted.checkedBeginnerSteps,
    BEGINNER_STAGES
  );

  const handleToggleTheme = () => {
    setPersisted((prev) => ({
      ...prev,
      themeMode: prev.themeMode === 'dark' ? 'light' : 'dark',
    }));
  };

  const handleSelectSite = (site: PortalSite) => {
    setPersisted((prev) => ({ ...prev, activeSite: site }));
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${site}`);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleJumpToMinutes = (minutes: number) => {
    const targetSeconds = clampSeconds(minutes * 60);
    const nextSync = getActiveSyncState(targetSeconds, PHASES);
    setPersisted((prev) => ({
      ...prev,
      elapsedSeconds: targetSeconds,
      selectedPhaseId: nextSync.activePhase.id,
    }));
  };

  const handleResetClock = () => {
    setIsRunning(false);
    setPersisted((prev) => ({
      ...prev,
      elapsedSeconds: 0,
      selectedPhaseId: 'phase-1-1',
    }));
  };

  const handleToggleTask = (taskId: string) => {
    setPersisted((prev) => ({
      ...prev,
      checkedTasks: {
        ...prev.checkedTasks,
        [taskId]: !prev.checkedTasks[taskId],
      },
    }));
  };

  const handleMarkPhaseTasks = (phase: PhaseItem, completed: boolean) => {
    setPersisted((prev) => {
      const updated = { ...prev.checkedTasks };
      for (const t of phase.tasks) {
        updated[t.id] = completed;
      }
      return {
        ...prev,
        checkedTasks: updated,
      };
    });
  };

  const handleToggleGate = (gateId: string) => {
    setPersisted((prev) => ({
      ...prev,
      checkedGates: {
        ...prev.checkedGates,
        [gateId]: !prev.checkedGates[gateId],
      },
    }));
  };

  const handleUnlockAllGates = () => {
    setPersisted((prev) => {
      const allGates: Record<string, boolean> = {};
      for (const g of GATE_CHECKLIST_ITEMS) {
        allGates[g.id] = true;
      }
      return {
        ...prev,
        checkedGates: allGates,
      };
    });
  };

  const handleUpdatePhaseNote = (phaseId: string, note: string) => {
    setPersisted((prev) => ({
      ...prev,
      phaseNotes: {
        ...prev.phaseNotes,
        [phaseId]: note,
      },
    }));
  };

  const handleToggleAutoTask = (taskId: string) => {
    setPersisted((prev) => ({
      ...prev,
      checkedAutoTasks: {
        ...prev.checkedAutoTasks,
        [taskId]: !prev.checkedAutoTasks[taskId],
      },
    }));
  };

  const handleMarkStageAutoTasks = (stage: AutomationStage, completed: boolean) => {
    setPersisted((prev) => {
      const updated = { ...prev.checkedAutoTasks };
      for (const t of stage.tasks) {
        updated[t.id] = completed;
      }
      return {
        ...prev,
        checkedAutoTasks: updated,
      };
    });
  };

  const handleMarkAllAutoStages = (completed: boolean) => {
    setPersisted((prev) => {
      const updated: Record<string, boolean> = {};
      if (completed) {
        for (const st of AUTOMATION_STAGES) {
          for (const t of st.tasks) {
            updated[t.id] = true;
          }
        }
      }
      return {
        ...prev,
        checkedAutoTasks: updated,
      };
    });
  };

  const handleToggleBeginnerStep = (stepId: string) => {
    setPersisted((prev) => ({
      ...prev,
      checkedBeginnerSteps: {
        ...prev.checkedBeginnerSteps,
        [stepId]: !prev.checkedBeginnerSteps[stepId],
      },
    }));
  };

  const handleMarkStageBeginnerSteps = (
    stage: BeginnerStageGuide,
    completed: boolean
  ) => {
    setPersisted((prev) => {
      const updated = { ...prev.checkedBeginnerSteps };
      for (const ms of stage.microSteps) {
        updated[ms.id] = completed;
      }
      return {
        ...prev,
        checkedBeginnerSteps: updated,
      };
    });
  };

  const handleMarkAllBeginnerSteps = (completed: boolean) => {
    setPersisted((prev) => {
      const updated: Record<string, boolean> = {};
      if (completed) {
        for (const st of BEGINNER_STAGES) {
          for (const ms of st.microSteps) {
            updated[ms.id] = true;
          }
        }
      }
      return {
        ...prev,
        checkedBeginnerSteps: updated,
      };
    });
  };

  const handleInspectModelInHub = (modelQuery: string) => {
    setRoutingInitialSearch(modelQuery);
    setActiveTab('routing');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleExportBlueprint = () => {
    const content = generateContextMd(persisted.artifactConfig);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CONTEXT.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportMasterBundle = () => {
    const content = generateMasterAutopilotBash(persisted.artifactConfig, AUTOMATION_STAGES);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'autopilot_master_pipeline.sh';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col text-slate-100 relative">
      {/* Ambient Full-Viewport WebGL Fluid Aurora & Precision Grid Shader */}
      <FluidAuroraShader
        themeMode={persisted.themeMode}
        activeSite={persisted.activeSite}
        activeModule={syncState.activeModuleId}
        circuitBreakerActive={syncState.isFeatureFreezeActive}
      />

      {/* Global Portal Header */}
      <PortalHeader
        activeSite={persisted.activeSite}
        onSelectSite={handleSelectSite}
        onExportMasterBundle={handleExportMasterBundle}
        themeMode={persisted.themeMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* VIEW 1: MAIN HOME PAGE PORTAL */}
      {persisted.activeSite === 'home' && (
        <main className="flex-1 relative z-10">
          <HomePortal
            artifactConfig={persisted.artifactConfig}
            onUpdateConfig={(updated) =>
              setPersisted((prev) => ({ ...prev, artifactConfig: updated }))
            }
            warRoomSync={syncState}
            warRoomProgress={progress}
            automationProgress={automationProgress}
            beginnerProgress={beginnerProgress}
            onLaunchWarRoom={(initialTab = 'navigator') => {
              setActiveTab(initialTab);
              handleSelectSite('war-room');
            }}
            onLaunchAutomationPlan={(startSim = false) => {
              if (startSim) {
                setAutoStartSimulation(true);
              }
              handleSelectSite('automation-plan');
            }}
            onLaunchBeginnerGuide={(stageId = 'guide-stage-1') => {
              setPersisted((prev) => ({ ...prev, selectedBeginnerStageId: stageId }));
              handleSelectSite('beginner-guide');
            }}
          />
        </main>
      )}

      {/* VIEW 2: SUB-WEBSITE 1 — WAR ROOM v2.0 (THE 17-HOUR EXECUTION OS) */}
      {persisted.activeSite === 'war-room' && (
        <div className="flex-1 flex flex-col relative z-10">
          <TopClockHeader
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            elapsedSeconds={persisted.elapsedSeconds}
            isRunning={isRunning}
            clockSpeedMultiplier={clockSpeedMultiplier}
            onToggleRun={() => setIsRunning((r) => !r)}
            onResetClock={handleResetClock}
            onToggleSpeed={() => setClockSpeedMultiplier((s) => (s === 1 ? 60 : 1))}
            onJumpToMinutes={handleJumpToMinutes}
            syncState={syncState}
            progress={progress}
            onExportBlueprint={handleExportBlueprint}
            onSelectPhaseId={(phaseId) =>
              setPersisted((prev) => ({ ...prev, selectedPhaseId: phaseId }))
            }
            onBackToHome={() => handleSelectSite('home')}
            onGoToAutomationPlan={() => handleSelectSite('automation-plan')}
          />

          <main className="flex-1">
            {activeTab === 'navigator' && (
              <PhaseNavigator
                selectedPhaseId={persisted.selectedPhaseId}
                onSelectPhase={(phaseId) =>
                  setPersisted((prev) => ({ ...prev, selectedPhaseId: phaseId }))
                }
                checkedTasks={persisted.checkedTasks}
                onToggleTask={handleToggleTask}
                onMarkPhaseTasks={handleMarkPhaseTasks}
                checkedGates={persisted.checkedGates}
                onToggleGate={handleToggleGate}
                onUnlockAllGates={handleUnlockAllGates}
                phaseNotes={persisted.phaseNotes}
                onUpdatePhaseNote={handleUpdatePhaseNote}
                syncState={syncState}
                progress={progress}
                onJumpToMinutes={handleJumpToMinutes}
                onInspectModelInHub={handleInspectModelInHub}
                onOpenArtifactStudio={() => handleSelectTab('artifacts')}
              />
            )}

            {activeTab === 'routing' && (
              <ModelRoutingHub
                initialSearchQuery={routingInitialSearch}
                onClearInitialSearch={() => setRoutingInitialSearch('')}
              />
            )}

            {activeTab === 'prompts' && (
              <PromptVault
                problemDomain={persisted.artifactConfig.problemDomain}
                onChangeProblemDomain={(newDomain) =>
                  setPersisted((prev) => ({
                    ...prev,
                    artifactConfig: {
                      ...prev.artifactConfig,
                      problemDomain: newDomain,
                    },
                  }))
                }
              />
            )}

            {activeTab === 'artifacts' && (
              <ArtifactStudio
                config={persisted.artifactConfig}
                onUpdateConfig={(updated) =>
                  setPersisted((prev) => ({
                    ...prev,
                    artifactConfig: updated,
                  }))
                }
                onResetConfig={() =>
                  setPersisted((prev) => ({
                    ...prev,
                    artifactConfig: DEFAULT_ARTIFACT_CONFIG,
                  }))
                }
              />
            )}
          </main>
        </div>
      )}

      {/* VIEW 3: SUB-WEBSITE 2 — AUTOPILOT v2.0 (STEP-BY-STEP AUTOMATION PLAN) */}
      {persisted.activeSite === 'automation-plan' && (
        <main className="flex-1 relative z-10">
          <AutomationSubwebsite
            artifactConfig={persisted.artifactConfig}
            onUpdateConfig={(updated) =>
              setPersisted((prev) => ({ ...prev, artifactConfig: updated }))
            }
            selectedStageId={persisted.selectedAutoStageId}
            onSelectStageId={(stageId) =>
              setPersisted((prev) => ({ ...prev, selectedAutoStageId: stageId }))
            }
            checkedAutoTasks={persisted.checkedAutoTasks}
            onToggleAutoTask={handleToggleAutoTask}
            onMarkStageAutoTasks={handleMarkStageAutoTasks}
            onMarkAllAutoStages={handleMarkAllAutoStages}
            automationProgress={automationProgress}
            autoStartSimulation={autoStartSimulation}
            onConsumeAutoStartSimulation={() => setAutoStartSimulation(false)}
            onNavigateToHome={() => handleSelectSite('home')}
            onNavigateToWarRoom={() => handleSelectSite('war-room')}
          />
        </main>
      )}

      {/* VIEW 4: SUB-WEBSITE 3 — ZERO-TO-HERO GUIDE (NON-TECHNICAL STEP-BY-STEP WALKTHROUGH) */}
      {persisted.activeSite === 'beginner-guide' && (
        <main className="flex-1 relative z-10">
          <BeginnerGuideSubwebsite
            artifactConfig={persisted.artifactConfig}
            onUpdateConfig={(updated) =>
              setPersisted((prev) => ({ ...prev, artifactConfig: updated }))
            }
            selectedStageId={persisted.selectedBeginnerStageId}
            onSelectStageId={(stageId) =>
              setPersisted((prev) => ({ ...prev, selectedBeginnerStageId: stageId }))
            }
            checkedBeginnerSteps={persisted.checkedBeginnerSteps}
            onToggleBeginnerStep={handleToggleBeginnerStep}
            onMarkStageBeginnerSteps={handleMarkStageBeginnerSteps}
            onMarkAllBeginnerSteps={handleMarkAllBeginnerSteps}
            beginnerProgress={beginnerProgress}
            onNavigateToHome={() => handleSelectSite('home')}
            onNavigateToAutomationPlan={() => handleSelectSite('automation-plan')}
          />
        </main>
      )}

      <footer className="relative z-10 border-t border-slate-800/80 bg-[#090D16]/85 backdrop-blur-md py-4 px-4 sm:px-6 mt-12">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            WAR ROOM NEXUS · Sub-Site 1 (War Room OS) · Sub-Site 2 (Autopilot Plan) · Sub-Site 3 (Beginner Step-by-Step Guide)
          </div>
          <a href="#top" className="hover:text-slate-300 transition-colors font-mono">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

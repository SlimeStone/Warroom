import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateGlobalProgress,
  clampSeconds,
  DAG_NODES,
  filterModelRouting,
  formatDurationHMS,
  generateCircuitBreakerFiles,
  generateContextMd,
  generateJudgeReadmeMd,
  getActiveSyncState,
  getShaderColorUniforms,
  injectPromptVariables,
  TOTAL_HACKATHON_SECONDS,
} from './warRoomLogic.ts';
import {
  DEFAULT_ARTIFACT_CONFIG,
  GATE_CHECKLIST_ITEMS,
  MODEL_ROUTING_MATRIX,
  PHASES,
} from '../data/warRoomData.ts';
import {
  AUTOMATION_STAGES,
  calculateAutomationProgress,
  generateMasterAutopilotBash,
  injectAutomationVariables,
} from '../data/automationData.ts';
import {
  BEGINNER_STAGES,
  calculateBeginnerGuideProgress,
  generateBeginnerGuideMarkdown,
  injectBeginnerGuideVariables,
  LAPTOP_HARDWARE_PROFILE,
} from '../data/beginnerGuideData.ts';

test('formatDurationHMS formats elapsed and countdown seconds accurately', () => {
  assert.equal(formatDurationHMS(0), '00:00:00');
  assert.equal(formatDurationHMS(3600), '01:00:00');
  assert.equal(formatDurationHMS(9000), '02:30:00');
  assert.equal(formatDurationHMS(TOTAL_HACKATHON_SECONDS), '17:00:00');
  assert.equal(clampSeconds(-50), 0);
  assert.equal(clampSeconds(999999), TOTAL_HACKATHON_SECONDS);
});

test('getActiveSyncState maps elapsed time to correct Module, Phase, and Hard Stops', () => {
  const s0 = getActiveSyncState(0, PHASES);
  assert.equal(s0.activeModuleId, 'brain');
  assert.equal(s0.activePhase.code, 'Phase 1.1');
  assert.equal(s0.isIdeaLockReached, false);

  const s1 = getActiveSyncState(3600, PHASES);
  assert.equal(s1.activeModuleId, 'brain');
  assert.equal(s1.activePhase.code, 'Phase 1.3');
  assert.equal(s1.isIdeaLockReached, true);

  const s2 = getActiveSyncState(9000, PHASES);
  assert.equal(s2.activeModuleId, 'coder');
  assert.equal(s2.activePhase.code, 'Phase 2.1');
  assert.equal(s2.isGateTimeReached, true);
  assert.equal(s2.isFeatureFreezeActive, false);

  const s3 = getActiveSyncState(14 * 3600, PHASES);
  assert.equal(s3.activeModuleId, 'shipyard');
  assert.equal(s3.activePhase.code, 'Phase 3.1');
  assert.equal(s3.isFeatureFreezeActive, true);
  assert.equal(s3.isSubmissionLockActive, false);

  const s4 = getActiveSyncState(16 * 3600 + 45 * 60, PHASES);
  assert.equal(s4.activeModuleId, 'shipyard');
  assert.equal(s4.activePhase.code, 'Phase 3.4');
  assert.equal(s4.isSubmissionLockActive, true);
});

test('calculateGlobalProgress tracks checklist completion and Hour 2:30 Gate Lock', () => {
  const initial = calculateGlobalProgress({}, {}, PHASES, GATE_CHECKLIST_ITEMS);
  assert.equal(initial.completedTaskCount, 0);
  assert.equal(initial.isSection2Unlocked, false);
  assert.equal(initial.overallPercent, 0);

  const allGatesChecked: Record<string, boolean> = {};
  for (const g of GATE_CHECKLIST_ITEMS) {
    allGatesChecked[g.id] = true;
  }

  const gateUnlocked = calculateGlobalProgress({}, allGatesChecked, PHASES, GATE_CHECKLIST_ITEMS);
  assert.equal(gateUnlocked.isSection2Unlocked, true);
  assert.equal(gateUnlocked.completedGateCount, 5);
});

test('filterModelRouting filters by Role, Stage, Task Category, and Search Query', () => {
  const openCoder = filterModelRouting(
    MODEL_ROUTING_MATRIX,
    'Open-Weight / Open-Source',
    'Coder',
    'ALL',
    'ModernBERT'
  );
  assert.equal(openCoder.length, 1);
  assert.equal(openCoder[0].modelName, 'ModernBERT-base');

  const shipyardQuant = filterModelRouting(
    MODEL_ROUTING_MATRIX,
    'ALL',
    'Shipyard',
    'Quantization & Edge',
    ''
  );
  assert.equal(shipyardQuant.length, 1);
  assert.ok(shipyardQuant[0].modelName.includes('ONNX Runtime'));
});

test('injectPromptVariables dynamically replaces [Problem Domain]', () => {
  const raw = 'Investigate [Problem Domain] bottlenecks and [Problem Domain] latency.';
  const updated = injectPromptVariables(raw, 'Autonomous Drone Triage');
  assert.equal(
    updated,
    'Investigate Autonomous Drone Triage bottlenecks and Autonomous Drone Triage latency.'
  );
});

test('Artifact generators produce complete CONTEXT.md, 5500ms circuit-breaker, and README.md', () => {
  const contextMd = generateContextMd(DEFAULT_ARTIFACT_CONFIG);
  assert.ok(contextMd.includes('BLOCK 1: MONOREPO DIRECTORY TREE'));
  assert.ok(contextMd.includes('POST /api/v1/analyze'));
  assert.ok(contextMd.includes('ModernBERT-base'));

  const cb = generateCircuitBreakerFiles(DEFAULT_ARTIFACT_CONFIG);
  assert.ok(cb.typescriptCode.includes('5500'));
  assert.ok(cb.pythonCode.includes('demo_vault.json'));

  const readme = generateJudgeReadmeMd(DEFAULT_ARTIFACT_CONFIG);
  assert.ok(readme.includes('Why Not Just an LLM Wrapper?'));
  assert.ok(readme.includes('Quantized p95 Latency Benchmark Table'));
});

test('Automation sub-website logic injects variables, tracks 8 stages, and builds master bash bundle', () => {
  assert.equal(AUTOMATION_STAGES.length, 8);

  const injected = injectAutomationVariables(
    'Project: [PROJECT_NAME] | Domain: [PROBLEM_DOMAIN] | URL: [DOMAIN_URL]',
    {
      projectName: 'OrbitalGuard',
      problemDomain: 'Satellite Collision Triage',
      domainUrl: 'https://orbitalguard.tech',
    }
  );
  assert.equal(
    injected,
    'Project: OrbitalGuard | Domain: Satellite Collision Triage | URL: https://orbitalguard.tech'
  );

  const prog0 = calculateAutomationProgress({});
  assert.equal(prog0.completedStages, 0);
  assert.equal(prog0.totalStages, 8);
  assert.equal(prog0.percent, 0);

  const allChecked: Record<string, boolean> = {};
  for (const st of AUTOMATION_STAGES) {
    for (const t of st.tasks) {
      allChecked[t.id] = true;
    }
  }
  const progFull = calculateAutomationProgress(allChecked);
  assert.equal(progFull.completedStages, 8);
  assert.equal(progFull.percent, 100);

  const masterBash = generateMasterAutopilotBash(DEFAULT_ARTIFACT_CONFIG);
  assert.ok(masterBash.includes('AUTOPILOT v2.0 — MASTER 8-STAGE HACKATHON AUTOMATION HARNESS'));
  assert.ok(masterBash.includes('01_bootstrap_env.sh'));
  assert.ok(masterBash.includes('08_shipyard_release.sh'));
});

test('Shader uniform calculator & 3-Tier DAG nodes support Dark/Light themes and Circuit-Breaker mode', () => {
  assert.equal(DAG_NODES.length, 5);
  const darkBrain = getShaderColorUniforms('dark', 'brain', false);
  const lightCoder = getShaderColorUniforms('light', 'coder', false);
  const trippedDark = getShaderColorUniforms('dark', 'shipyard', true);

  assert.ok(darkBrain.bgRgb[0] < 0.1);
  assert.ok(lightCoder.bgRgb[0] > 0.9);
  assert.ok(trippedDark.primaryAccentRgb[0] > 0.8); // Rose alert channel
});

test('Beginner Guide (Sub-Website 3) breaks 8 stages into 32 non-technical micro-steps tuned for Windows 11, Ryzen 9 HX, 16GB RAM, and RTX 5060 8GB', () => {
  assert.equal(BEGINNER_STAGES.length, 8);
  assert.equal(LAPTOP_HARDWARE_PROFILE.length, 4);
  const p0 = calculateBeginnerGuideProgress({});
  assert.equal(p0.totalSteps, 32);
  assert.equal(p0.completedSteps, 0);

  for (const stage of BEGINNER_STAGES) {
    for (const ms of stage.microSteps) {
      assert.ok(ms.hardwareOptimizationNote.length > 20);
    }
  }

  const replaced = injectBeginnerGuideVariables(
    'mkdir "[PROJECT_SLUG]" for [PROJECT_NAME] in [PROBLEM_DOMAIN]',
    {
      projectName: 'PulseMed AI',
      problemDomain: 'ER Triage',
      domainUrl: 'https://pulsemed.tech',
    }
  );
  assert.equal(replaced, 'mkdir "pulsemed-ai" for PulseMed AI in ER Triage');

  const md = generateBeginnerGuideMarkdown(DEFAULT_ARTIFACT_CONFIG);
  assert.ok(md.includes('ZERO-TO-HERO BEGINNER GUIDE'));
  assert.ok(md.includes('Windows 11'));
  assert.ok(md.includes('RTX 5060'));
  assert.ok(md.includes('Ryzen 9 HX'));
  assert.ok(md.includes('16GB RAM'));
  assert.ok(md.includes('STAGE 01:'));
  assert.ok(md.includes('STAGE 08:'));
});

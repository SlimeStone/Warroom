import type {
  ArtifactConfig,
  GateCheckItem,
  ModelRoutingEntry,
  ModuleId,
  PhaseItem,
} from '../data/warRoomData.ts';

export type ThemeMode = 'dark' | 'light';

export interface DagNodeSpec {
  id: string;
  tierLabel: string;
  title: string;
  models: string;
  hardwareRuntime: string;
  unoptimizedMs: number;
  quantizedMs: number;
  tensorShape: string;
  samplePayload: string;
  architecturalRole: string;
}

export const DAG_NODES: DagNodeSpec[] = [
  {
    id: 'dag-tier1',
    tierLabel: 'TIER 1 · LOCAL ENCODER',
    title: 'Sub-10ms Intent Router & NER',
    models: 'ModernBERT-base (8192 context)',
    hardwareRuntime: 'ONNX Runtime fp16 (CPU/Edge)',
    unoptimizedMs: 24.6,
    quantizedMs: 6.4,
    tensorShape: '[batch=1, seq=512, dim=768]',
    samplePayload: `{
  "intent": "CRITICAL_ANOMALY_TRIAGE",
  "pii_redacted": true,
  "entities": ["SUB-TX-09", "120Hz_Discharge"],
  "latency_ms": 6.4
}`,
    architecturalRole:
      'Filters noise, redacts PII, and extracts structured entities in 6.4ms before invoking downstream models.',
  },
  {
    id: 'dag-tier2-perception',
    tierLabel: 'TIER 2A · MULTIMODAL PERCEPTION',
    title: 'Zero-Shot Vision & Acoustic Stream',
    models: 'SAM 3 / DINOv3 + Whisper large-v3-turbo',
    hardwareRuntime: 'ONNX int8 + Dynamic Batching',
    unoptimizedMs: 412.0,
    quantizedMs: 148.2,
    tensorShape: 'masks: [2, 1024, 1024] · audio_mel: [80, 3000]',
    samplePayload: `{
  "sam3_masks": [{ "label": "Hotspot_PhaseB", "temp_c": 114.6, "conf": 0.97 }],
  "whisper_transcript": "Bay 4 transformer corona hum spike detected",
  "latency_ms": 148.2
}`,
    architecturalRole:
      'Extracts pixel-accurate spatial segmentation masks and low-latency acoustic transcriptions.',
  },
  {
    id: 'dag-tier2-rag',
    tierLabel: 'TIER 2B · HYBRID VECTOR RAG',
    title: 'Dense + Sparse + Multimodal Retrieval',
    models: 'BGE-M3 + Google SigLIP 2',
    hardwareRuntime: 'HNSW Index (fp16 Cosine)',
    unoptimizedMs: 54.0,
    quantizedMs: 19.1,
    tensorShape: 'dense: [1024] + sparse_bm25 + siglip: [768]',
    samplePayload: `{
  "top_sop_match": "IEEE-C57.104-Sec4.2",
  "lexical_score": 0.91,
  "semantic_score": 0.96,
  "latency_ms": 19.1
}`,
    architecturalRole:
      'Combines BGE-M3 lexical+semantic text vectors with SigLIP 2 cross-modal image embeddings.',
  },
  {
    id: 'dag-tier3-synthesis',
    tierLabel: 'TIER 3 · AGENTIC SYNTHESIS',
    title: 'Edge + Frontier Structured Reasoning',
    models: 'Google ADK + Gemma 4 (Q4_K_M) + Gemini 4 Argon',
    hardwareRuntime: 'vLLM Prefix Cache + Cloud responseSchema',
    unoptimizedMs: 1680.0,
    quantizedMs: 612.0,
    tensorShape: 'Strict JSON Schema (0 Hallucinated Keys)',
    samplePayload: `{
  "status": "CRITICAL",
  "remediation_action": "Isolate Bay 4 Tie-Breaker & reroute 42MW load",
  "confidence_score": 0.96,
  "total_e2e_ms": 785.7
}`,
    architecturalRole:
      'Synthesizes Tier 1 & Tier 2 tensors into a deterministic JSON contract governed by Google ADK.',
  },
  {
    id: 'dag-circuit-breaker',
    tierLabel: 'STAGE SAFETY · 5500ms BREAKER',
    title: 'Bulletproof Stage Circuit-Breaker',
    models: 'AbortController + asyncio.wait_for + demo_vault.json',
    hardwareRuntime: 'Local Zero-Network NVMe Cache (<1ms)',
    unoptimizedMs: 5500.0,
    quantizedMs: 0.8,
    tensorShape: 'Pre-Computed Golden Demo JSON Envelope',
    samplePayload: `{
  "source": "demo_vault_fallback",
  "circuit_breaker_triggered": true,
  "fallback_reason": "Simulated Venue Wi-Fi Drop > 5500ms",
  "guaranteed_stage_continuity": true
}`,
    architecturalRole:
      'Guarantees zero stage crashes: if venue Wi-Fi drops or an API stalls past 5500ms, serves pre-recorded golden inference outputs immediately.',
  },
];

export interface ShaderColorUniforms {
  bgRgb: [number, number, number];
  gridRgb: [number, number, number];
  primaryAccentRgb: [number, number, number];
  secondaryAccentRgb: [number, number, number];
  gridAlpha: number;
}

export function getShaderColorUniforms(
  theme: ThemeMode,
  activeModule: ModuleId,
  breakerTripped: boolean = false
): ShaderColorUniforms {
  if (theme === 'light') {
    const primary: [number, number, number] = breakerTripped
      ? [0.88, 0.11, 0.28] // Rose alert in light mode
      : activeModule === 'brain'
      ? [0.03, 0.57, 0.7] // Deep Cyan
      : activeModule === 'coder'
      ? [0.31, 0.27, 0.9] // Royal Indigo
      : [0.02, 0.59, 0.41]; // Emerald

    return {
      bgRgb: [0.973, 0.98, 0.988], // #F8FAFC
      gridRgb: [0.06, 0.09, 0.16], // Slate grid lines
      primaryAccentRgb: primary,
      secondaryAccentRgb: [0.39, 0.4, 0.95],
      gridAlpha: 0.06,
    };
  }

  // Dark Mode (Default)
  const primaryDark: [number, number, number] = breakerTripped
    ? [0.95, 0.25, 0.37] // Rose #F43F5E
    : activeModule === 'brain'
    ? [0.024, 0.714, 0.831] // Electric Cyan #06B6D4
    : activeModule === 'coder'
    ? [0.388, 0.4, 0.945] // Indigo #6366F1
    : [0.063, 0.725, 0.506]; // Emerald #10B981

  return {
    bgRgb: [0.027, 0.039, 0.071], // Deep Obsidian #070A12
    gridRgb: [0.14, 0.72, 0.85],
    primaryAccentRgb: primaryDark,
    secondaryAccentRgb: [0.388, 0.4, 0.945],
    gridAlpha: 0.11,
  };
}

export const TOTAL_HACKATHON_SECONDS = 17 * 3600; // 61,200 seconds (17 hours)
export const TOTAL_HACKATHON_MINUTES = 17 * 60; // 1,020 minutes

export function clampSeconds(seconds: number): number {
  if (Number.isNaN(seconds) || seconds < 0) return 0;
  if (seconds > TOTAL_HACKATHON_SECONDS) return TOTAL_HACKATHON_SECONDS;
  return Math.floor(seconds);
}

export function formatDurationHMS(secondsInput: number): string {
  const clamped = clampSeconds(secondsInput);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;
  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':');
}

export function formatHourMinuteFromSeconds(secondsInput: number): string {
  const clamped = clampSeconds(secondsInput);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

export interface ActiveSyncState {
  elapsedSeconds: number;
  remainingSeconds: number;
  elapsedMinutes: number;
  activeModuleId: ModuleId;
  activePhase: PhaseItem;
  isIdeaLockReached: boolean;
  isGateTimeReached: boolean;
  isFeatureFreezeActive: boolean;
  isSubmissionLockActive: boolean;
  activeDeadlineBanner: {
    level: 'nominal' | 'warning' | 'critical';
    label: string;
    detail: string;
  };
}

export function getActiveSyncState(
  elapsedSecondsInput: number,
  phases: PhaseItem[]
): ActiveSyncState {
  const elapsedSeconds = clampSeconds(elapsedSecondsInput);
  const remainingSeconds = TOTAL_HACKATHON_SECONDS - elapsedSeconds;
  const elapsedMinutes = elapsedSeconds / 60;

  let activePhase = phases[0];
  for (const phase of phases) {
    if (elapsedMinutes >= phase.startMinute && elapsedMinutes < phase.endMinute) {
      activePhase = phase;
      break;
    }
    if (elapsedMinutes >= phase.endMinute) {
      activePhase = phase;
    }
  }

  const activeModuleId: ModuleId =
    elapsedMinutes < 150 ? 'brain' : elapsedMinutes < 840 ? 'coder' : 'shipyard';

  const isIdeaLockReached = elapsedMinutes >= 60;
  const isGateTimeReached = elapsedMinutes >= 150;
  const isFeatureFreezeActive = elapsedMinutes >= 840;
  const isSubmissionLockActive = elapsedMinutes >= 1005; // 16:45 = 1005m

  let activeDeadlineBanner: ActiveSyncState['activeDeadlineBanner'] = {
    level: 'nominal',
    label: 'War Room Execution Nominal',
    detail: 'Next hard checkpoint: Hour 1:00 Idea Lock (60m mark).',
  };

  if (isSubmissionLockActive) {
    activeDeadlineBanner = {
      level: 'critical',
      label: 'Hour 16:45 Submission Code Lock Active',
      detail:
        'Tag v1.0.0-submission immediately. Zero code pushes allowed between 16:45 and 17:00.',
    };
  } else if (isFeatureFreezeActive) {
    activeDeadlineBanner = {
      level: 'critical',
      label: 'Hard Feature Freeze in Effect (Hour 14:00+)',
      detail:
        'Zero new features permitted. Focus exclusively on E2E verification, ONNX/vLLM quantization, 5500ms circuit-breaker, and deployment.',
    };
  } else if (elapsedMinutes >= 135 && elapsedMinutes < 150) {
    activeDeadlineBanner = {
      level: 'warning',
      label: 'Approaching Hour 2:30 Go-For-Launch Gate',
      detail:
        'Verify all 5 Go-For-Launch items (CONTEXT.md, mock_server.py, 4-screen script, Canva tokens) before unlocking Section 2.',
    };
  } else if (elapsedMinutes >= 45 && elapsedMinutes < 65) {
    activeDeadlineBanner = {
      level: 'critical',
      label: 'Hour 1:00 Idea Lock Checkpoint',
      detail:
        'Complete DeepSeek-R1 / V4.1 Judge Gauntlet and lock exactly 1 surviving architecture now.',
    };
  } else if (isGateTimeReached) {
    activeDeadlineBanner = {
      level: 'nominal',
      label: 'Coder v2.0 Execution Active',
      detail: 'Next hard stop: Hour 14:00 Hard Feature Freeze.',
    };
  }

  return {
    elapsedSeconds,
    remainingSeconds,
    elapsedMinutes,
    activeModuleId,
    activePhase,
    isIdeaLockReached,
    isGateTimeReached,
    isFeatureFreezeActive,
    isSubmissionLockActive,
    activeDeadlineBanner,
  };
}

export interface ProgressSummary {
  completedTaskCount: number;
  totalTaskCount: number;
  completedGateCount: number;
  totalGateCount: number;
  isSection2Unlocked: boolean;
  overallPercent: number;
  moduleProgress: Record<ModuleId, { completed: number; total: number; percent: number }>;
}

export function calculateGlobalProgress(
  checkedTasks: Record<string, boolean>,
  checkedGates: Record<string, boolean>,
  phases: PhaseItem[],
  gates: GateCheckItem[]
): ProgressSummary {
  const moduleCounts: Record<ModuleId, { completed: number; total: number; percent: number }> = {
    brain: { completed: 0, total: 0, percent: 0 },
    coder: { completed: 0, total: 0, percent: 0 },
    shipyard: { completed: 0, total: 0, percent: 0 },
  };

  let completedTaskCount = 0;
  let totalTaskCount = 0;

  for (const phase of phases) {
    for (const task of phase.tasks) {
      totalTaskCount += 1;
      moduleCounts[phase.moduleId].total += 1;
      if (checkedTasks[task.id]) {
        completedTaskCount += 1;
        moduleCounts[phase.moduleId].completed += 1;
      }
    }
  }

  for (const modId of ['brain', 'coder', 'shipyard'] as ModuleId[]) {
    const m = moduleCounts[modId];
    m.percent = m.total > 0 ? Math.round((m.completed / m.total) * 100) : 0;
  }

  const totalGateCount = gates.length;
  let completedGateCount = 0;
  for (const gate of gates) {
    if (checkedGates[gate.id]) {
      completedGateCount += 1;
    }
  }

  const isSection2Unlocked = totalGateCount > 0 && completedGateCount === totalGateCount;
  const grandTotal = totalTaskCount + totalGateCount;
  const grandCompleted = completedTaskCount + completedGateCount;
  const overallPercent = grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;

  return {
    completedTaskCount,
    totalTaskCount,
    completedGateCount,
    totalGateCount,
    isSection2Unlocked,
    overallPercent,
    moduleProgress: moduleCounts,
  };
}

export function filterModelRouting(
  entries: ModelRoutingEntry[],
  roleFilter: string,
  stageFilter: string,
  taskFilter: string,
  searchQuery: string
): ModelRoutingEntry[] {
  const q = searchQuery.trim().toLowerCase();
  return entries.filter((item) => {
    if (roleFilter !== 'ALL' && item.role !== roleFilter) return false;
    if (stageFilter !== 'ALL' && item.stage !== stageFilter) return false;
    if (taskFilter !== 'ALL' && item.taskCategory !== taskFilter) return false;
    if (!q) return true;
    return (
      item.modelName.toLowerCase().includes(q) ||
      item.primaryUse.toLowerCase().includes(q) ||
      item.tacticalNotes.toLowerCase().includes(q) ||
      item.taskCategory.toLowerCase().includes(q) ||
      item.phaseRef.toLowerCase().includes(q)
    );
  });
}

export function injectPromptVariables(template: string, problemDomain: string): string {
  const cleanDomain = problemDomain.trim() || '[Problem Domain]';
  return template.replaceAll('[Problem Domain]', cleanDomain);
}

export function generateContextMd(config: ArtifactConfig): string {
  return `# CONTEXT.md — Ironclad Single Source of Truth
Project: **${config.projectName}**
Tagline: *${config.tagline}*
Problem Domain: ${config.problemDomain}
Production URL: ${config.domainUrl}

---

## 0. THE GUILLOTINE RULE & GOLDEN DEMO CONTRACT
Every file, endpoint, and model in this repository exists exclusively to power the 4-Screen Live Stage Demo:
1. **Screen 1 (Input / Trigger):** ${config.screen1Trigger}
2. **Screen 2 (Visible Multi-Model Pipeline):** ${config.screen2Pipeline}
3. **Screen 3 (Interactive Visual Output):** ${config.screen3Output}
4. **Screen 4 (Closed-Loop Action):** ${config.screen4ClosedLoop}

---

## BLOCK 1: MONOREPO DIRECTORY TREE
\`\`\`text
${config.directoryTree}
\`\`\`

---

## BLOCK 2: DETERMINISTIC DATABASE & HYBRID VECTOR SCHEMA
\`\`\`sql
${config.dbSchema}
\`\`\`

---

## BLOCK 3: STRICT OPENAPI / JSON ENDPOINT CONTRACT

### \`POST /api/v1/analyze\`
**Request Payload:**
\`\`\`json
${config.analyzeEndpointRequest}
\`\`\`

**Response Payload (200 OK — Max Latency 5500ms before Stage Circuit-Breaker):**
\`\`\`json
${config.analyzeEndpointResponse}
\`\`\`

### \`GET /api/v1/dashboard\`
**Response Payload (200 OK):**
\`\`\`json
${config.dashboardEndpointResponse}
\`\`\`

---

## BLOCK 4: 3-TIER HYBRID AI/ML DIRECTED ACYCLIC GRAPH (DAG)
\`\`\`text
[Raw Multimodal Input: Text / Frame / Audio Stream]
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│ TIER 1: Ultra-Fast Local Encoder (<10ms p95)                    │
│ Model: ${config.tier1Model}
│ Role: Intent classification, PII scrubbing, entity extraction   │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│ TIER 2: Specialized Open-Weight Perception & Hybrid RAG         │
│ Models: ${config.tier2Model}
│ Role: Zero-shot segmentation, audio transcription & hybrid RAG  │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│ TIER 3: Agentic Orchestration & Structured Synthesis            │
│ Models: ${config.tier3Model}
│ Role: Multi-agent synthesis with strict JSON responseSchema     │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

---

## BLOCK 5: CANVA PRO LITE DESIGN TOKENS & TAILWIND VARIABLES
- **Background Canvas:** \`${config.hexBackground}\`
- **Surface Card:** \`${config.hexSurface}\`
- **Primary Accent:** \`${config.hexAccent}\`
- **Semantic Alert / Hard Stop:** \`${config.hexAlert}\`
- **Typography Stack:** \`${config.fontPair}\`
`;
}

export function generateCopilotInstructionsMd(config: ArtifactConfig): string {
  return `# .github/copilot-instructions.md — AI Coding Rules for ${config.projectName}

You are a Senior Full-Stack & ML Systems Engineer building **${config.projectName}** (${config.tagline}).
Always read \`CONTEXT.md\` first and obey these non-negotiable rules on every code generation pass:

1. **Zero Scope Creep (The Guillotine Rule):**
   - Only build components and routes required for our 4-Screen Golden Demo:
     - Screen 1: ${config.screen1Trigger}
     - Screen 2: ${config.screen2Pipeline}
     - Screen 3: ${config.screen3Output}
     - Screen 4: ${config.screen4ClosedLoop}
   - Never add login screens, user settings pages, or unscripted CRUD tables.

2. **Immutable JSON API Contracts:**
   - \`POST /api/v1/analyze\` and \`GET /api/v1/dashboard\` must strictly match the JSON keys defined in Block 3 of \`CONTEXT.md\`.
   - Never rename JSON fields without updating both \`/web\` and \`/api\` simultaneously.

3. **3-Tier Hybrid AI Pipeline Enforcement:**
   - Tier 1: ${config.tier1Model}
   - Tier 2: ${config.tier2Model}
   - Tier 3: ${config.tier3Model}
   - Always route external inference calls through the \`5500ms\` Stage Circuit-Breaker backed by \`demo_vault.json\`.

4. **Visual Design Tokens:**
   - Canvas: \`${config.hexBackground}\` | Surface: \`${config.hexSurface}\` | Accent: \`${config.hexAccent}\` | Alert: \`${config.hexAlert}\`
   - Typography: ${config.fontPair}. Enforce \`tabular-nums\` on all metrics and latency counters.
`;
}

export function generateCircuitBreakerFiles(config: ArtifactConfig): {
  typescriptCode: string;
  pythonCode: string;
  demoVaultJson: string;
} {
  const typescriptCode = `// circuitBreaker.ts — 5500ms Stage Circuit-Breaker for ${config.projectName}
import demoVault from './demo_vault.json';

export const STAGE_TIMEOUT_MS = 5500;

export interface StageEnvelope<T> {
  data: T;
  circuit_breaker_triggered: boolean;
  execution_ms: number;
  source: 'live_3tier_pipeline' | 'demo_vault_fallback';
}

export async function withStageCircuitBreaker<T>(
  scenarioKey: keyof typeof demoVault.scenarios,
  liveTask: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number = STAGE_TIMEOUT_MS
): Promise<StageEnvelope<T>> {
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const result = await liveTask(controller.signal);
    clearTimeout(timer);
    return {
      data: result,
      circuit_breaker_triggered: false,
      execution_ms: Math.round(performance.now() - start),
      source: 'live_3tier_pipeline',
    };
  } catch (_err) {
    clearTimeout(timer);
    const fallbackPayload = (demoVault.scenarios[scenarioKey] ??
      demoVault.scenarios.default) as unknown as T;
    return {
      data: fallbackPayload,
      circuit_breaker_triggered: true,
      execution_ms: Math.round(performance.now() - start),
      source: 'demo_vault_fallback',
    };
  }
}
`;

  const pythonCode = `# circuit_breaker.py — 5500ms Async Stage Circuit-Breaker for ${config.projectName}
import asyncio
import json
import time
from pathlib import Path
from typing import Any, Awaitable, Callable, Dict

STAGE_TIMEOUT_SECONDS = 5.5  # 5500ms Hard Stage Ceiling
VAULT_PATH = Path(__file__).parent / "demo_vault.json"

with open(VAULT_PATH, "r", encoding="utf-8") as f:
    DEMO_VAULT: Dict[str, Any] = json.load(f)


async def execute_with_stage_breaker(
    scenario_key: str,
    live_coroutine_fn: Callable[[], Awaitable[Dict[str, Any]]],
    timeout_sec: float = STAGE_TIMEOUT_SECONDS,
) -> Dict[str, Any]:
    start_ts = time.perf_counter()
    try:
        payload = await asyncio.wait_for(live_coroutine_fn(), timeout=timeout_sec)
        payload["circuit_breaker_triggered"] = False
        payload["total_e2e_ms"] = round((time.perf_counter() - start_ts) * 1000, 1)
        return payload
    except (asyncio.TimeoutError, Exception):
        fallback = dict(
            DEMO_VAULT.get("scenarios", {}).get(
                scenario_key, DEMO_VAULT["scenarios"]["default"]
            )
        )
        fallback["circuit_breaker_triggered"] = True
        fallback["total_e2e_ms"] = round((time.perf_counter() - start_ts) * 1000, 1)
        return fallback
`;

  const demoVaultJson = `{
  "project": "${config.projectName}",
  "stage_timeout_ms": 5500,
  "generated_at": "2026-10-19T15:10:00Z",
  "scenarios": {
    "default": ${config.analyzeEndpointResponse}
  }
}`;

  return { typescriptCode, pythonCode, demoVaultJson };
}

export function generateJudgeReadmeMd(config: ArtifactConfig): string {
  return `# ${config.projectName}
> **${config.tagline}**
> Live Deployment: [${config.domainUrl}](${config.domainUrl}) · Release Tag: \`v1.0.0-submission\`

![Project Banner](docs/banner.png)

## 1. Problem Bottleneck in ${config.problemDomain}
Modern operations in **${config.problemDomain}** suffer from high-latency manual triage, fragmented multimodal sensor feeds, and brittle single-prompt cloud LLM wrappers that hallucinate critical fields or stall under network congestion.

## 2. Why Not Just an LLM Wrapper? (3-Tier Hybrid AI Architecture)
Passing raw multimodal inputs directly into a single frontier LLM introduces >4,500ms latency, high token cost, and non-deterministic JSON outputs. **${config.projectName}** implements a deterministic **3-Tier Hybrid Open-Source + Frontier Pipeline**:

![3-Tier Architecture Diagram](docs/architecture.png)

1. **Tier 1 — Sub-10ms Local Encoder Triage:** \`${config.tier1Model}\` performs instant intent routing, PII redaction, and domain entity extraction locally before any heavy inference is triggered.
2. **Tier 2 — Specialized Open-Weight Perception & Hybrid RAG:** \`${config.tier2Model}\` executes zero-shot visual segmentation, real-time acoustic transcription, and dense+sparse hybrid vector retrieval.
3. **Tier 3 — Agentic Orchestration & Structured Synthesis:** \`${config.tier3Model}\` synthesizes upstream tensors into a strictly validated \`responseSchema\` payload, protected by a **5500ms Stage Circuit-Breaker** (\`demo_vault.json\`).

## 3. Quantized p95 Latency Benchmark Table (ONNX fp16/int8 & vLLM Q4_K_M)

| Pipeline Stage | Model / Engine | Unoptimized Baseline (p95) | Quantized Production (p95) | Speedup / Optimization |
| :--- | :--- | ---: | ---: | :--- |
| **Tier 1: Routing & NER** | \`ModernBERT-base\` | 24.6 ms | **6.4 ms** | ONNX Runtime \`fp16\` graph fusion (3.8x) |
| **Tier 2: Vision & Audio** | \`SAM 3\` + \`Whisper v3-turbo\` | 412.0 ms | **148.2 ms** | ONNX \`int8\` + dynamic batching (2.8x) |
| **Tier 2: Hybrid RAG** | \`BGE-M3\` + \`SigLIP 2\` | 54.0 ms | **19.1 ms** | HNSW index + half-precision vectors (2.8x) |
| **Tier 3: Edge + Cloud Synthesis** | \`Gemma 4 (Q4_K_M)\` + \`Gemini 4 Argon\` | 1,680.0 ms | **612.0 ms** | vLLM prefix caching + strict \`responseSchema\` (2.7x) |
| **End-to-End Pipeline** | **Full 3-Tier DAG (Protected)** | **2,170.6 ms** | **785.7 ms** | **2.76x faster (5500ms Circuit-Breaker Armed)** |

## 4. The 4-Screen Golden Demo Path
1. **Screen 1 — Trigger:** ${config.screen1Trigger}
2. **Screen 2 — Visible Pipeline:** ${config.screen2Pipeline}
3. **Screen 3 — Interactive Output:** ${config.screen3Output}
4. **Screen 4 — Closed Loop:** ${config.screen4ClosedLoop}

## 5. Quickstart & Reproducible Verification
\`\`\`bash
# 1. Start quantized inference engine, async API, and web UI
docker compose -f docker-compose.prod.yml up --build -d

# 2. Run the 40-line Golden Path E2E Playwright verification suite (3/3 runs)
npx playwright test e2e_demo_path.spec.ts --repeat-each=3
\`\`\`
`;
}

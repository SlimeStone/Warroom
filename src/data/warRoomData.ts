export type ModuleId = 'brain' | 'coder' | 'shipyard';

export interface SubTask {
  id: string;
  timeWindow: string;
  title: string;
  detail: string;
  models: string[];
  deliverable: string;
}

export interface PhaseAlert {
  type: 'hard-stop' | 'guillotine' | 'freeze' | 'architecture';
  title: string;
  message: string;
}

export interface PhaseItem {
  id: string;
  code: string;
  moduleId: ModuleId;
  moduleLabel: string;
  title: string;
  timeRangeLabel: string;
  startMinute: number;
  endMinute: number;
  summary: string;
  alert?: PhaseAlert;
  mandatoryBlocks?: string[];
  tasks: SubTask[];
}

export interface GateCheckItem {
  id: string;
  title: string;
  verificationCriteria: string;
  artifactTag: string;
}

export type ModelRole = 'Closed Frontier Subscription' | 'Open-Weight / Open-Source';
export type RoutingStage = 'Brain' | 'Coder' | 'Shipyard';
export type TaskCategory =
  | 'Research & Rubric'
  | 'Ideation'
  | 'Red-Teaming'
  | 'Shaders & UI'
  | 'RAG & Embeddings'
  | 'Backend & DevOps'
  | 'Vision & Audio'
  | 'Hybrid Reasoning & Routing'
  | 'Quantization & Edge';

export interface ModelRoutingEntry {
  id: string;
  modelName: string;
  role: ModelRole;
  stage: RoutingStage;
  taskCategory: TaskCategory;
  phaseRef: string;
  latencyTarget: string;
  primaryUse: string;
  tacticalNotes: string;
}

export interface PromptTemplate {
  id: string;
  number: number;
  title: string;
  stage: RoutingStage;
  phaseRef: string;
  targetModels: string[];
  usesDynamicDomain?: boolean;
  systemContext: string;
  template: string;
}

export interface ArtifactConfig {
  projectName: string;
  tagline: string;
  problemDomain: string;
  domainUrl: string;
  // 4-Screen Golden Demo
  screen1Trigger: string;
  screen2Pipeline: string;
  screen3Output: string;
  screen4ClosedLoop: string;
  // Canva Brand Kit Tokens
  hexBackground: string;
  hexSurface: string;
  hexAccent: string;
  hexAlert: string;
  fontPair: string;
  // Architecture & Contracts
  directoryTree: string;
  dbSchema: string;
  analyzeEndpointRequest: string;
  analyzeEndpointResponse: string;
  dashboardEndpointResponse: string;
  tier1Model: string;
  tier2Model: string;
  tier3Model: string;
}

export const MODULE_METADATA: Record<
  ModuleId,
  {
    id: ModuleId;
    number: number;
    title: string;
    shortTitle: string;
    hoursLabel: string;
    startMinute: number;
    endMinute: number;
    subtitle: string;
  }
> = {
  brain: {
    id: 'brain',
    number: 1,
    title: 'SECTION 1: THE BRAIN v2.0',
    shortTitle: 'The Brain v2.0',
    hoursLabel: 'Hours 0:00 – 2:30',
    startMinute: 0,
    endMinute: 150,
    subtitle:
      'Pre-coding war room, rubric reverse-engineering, adversarial red-team filtering, 4-screen demo script, Canva brand tokens, and ironclad CONTEXT.md generation.',
  },
  coder: {
    id: 'coder',
    number: 2,
    title: 'SECTION 2: THE CODER v2.0',
    shortTitle: 'The Coder v2.0',
    hoursLabel: 'Hours 2:30 – 14:00',
    startMinute: 150,
    endMinute: 840,
    subtitle:
      'Multi-model routing (Builder Models vs. Product Models), shader-grade UI, hybrid vector RAG, terminal automation, and 3-Tier Open-Source + Gemini ML pipeline.',
  },
  shipyard: {
    id: 'shipyard',
    number: 3,
    title: 'SECTION 3: THE SHIPYARD v2.0',
    shortTitle: 'The Shipyard v2.0',
    hoursLabel: 'Hours 14:00 – 17:00',
    startMinute: 840,
    endMinute: 1020,
    subtitle:
      'Hard feature freeze at Hour 14:00, Dockerized bug hunt, ONNX/vLLM quantization, 5500ms Stage Circuit-Breaker (demo_vault.json), Student Pack deploy, and 16:45 submission lock.',
  },
};

export const GATE_CHECKLIST_ITEMS: GateCheckItem[] = [
  {
    id: 'gate-1',
    title: '1 Surviving Idea Locked Before Hour 1:00',
    verificationCriteria:
      'Survived the DeepSeek-R1 / V4.1 Cynical Principal Engineer Judge Gauntlet with a clear defense against the "Just a GPT Wrapper" critique.',
    artifactTag: 'Idea Lock',
  },
  {
    id: 'gate-2',
    title: '4-Screen Golden Demo Script Verified',
    verificationCriteria:
      'Screen 1 (Input/Trigger), Screen 2 (Visible Pipeline), Screen 3 (Interactive Output), and Screen 4 (Closed Loop) defined. Zero features outside the 4 screens.',
    artifactTag: 'Golden Demo',
  },
  {
    id: 'gate-3',
    title: 'Canva Wireframe + Vector Logo + 4 Hex Codes',
    verificationCriteria:
      'Canva Pro Lite 4-screen wireframe exported, SVG brand mark generated, and 4 exact hex tokens (Background, Surface, Accent, Alert) + Font Pair locked.',
    artifactTag: 'Brand Kit',
  },
  {
    id: 'gate-4',
    title: 'CONTEXT.md & .github/copilot-instructions.md Committed',
    verificationCriteria:
      'All 5 mandatory architecture blocks (Directory Tree, DB Schema, OpenAPI Contract, Hybrid AI/ML DAG, Canva Design Tokens) written to repo root.',
    artifactTag: 'CONTEXT.md',
  },
  {
    id: 'gate-5',
    title: 'Working Mock Endpoints & Commit #1 Live',
    verificationCriteria:
      'mock_server.py serving deterministic JSON for POST /api/v1/analyze and GET /api/v1/dashboard on localhost; Student Pack .tech/.me domain claimed.',
    artifactTag: 'mock_server.py',
  },
];

export const PHASES: PhaseItem[] = [
  // SECTION 1: THE BRAIN v2.0 (0:00 - 2:30 -> 0m to 150m)
  {
    id: 'phase-1-1',
    code: 'Phase 1.1',
    moduleId: 'brain',
    moduleLabel: 'THE BRAIN v2.0',
    title: 'Rubric Reverse-Engineering & Domain Blitz',
    timeRangeLabel: '0:00 – 0:30 (0–30m)',
    startMinute: 0,
    endMinute: 30,
    summary:
      'Extract hidden sponsor priorities and real-world domain bottlenecks before pitching a single idea.',
    tasks: [
      {
        id: 't-1-1-a',
        timeWindow: '0:00 – 0:10 (0–10m)',
        title: 'NotebookLM Rubric & Sponsor Doc Ingestion',
        detail:
          'Upload hackathon rules, judging rubric PDFs, sponsor API docs, and past winning Devpost writeups into NotebookLM to generate a weighted Problem Statement Scoring Matrix.',
        models: ['NotebookLM'],
        deliverable: 'Weighted Rubric Scoring Matrix',
      },
      {
        id: 't-1-1-b',
        timeWindow: '0:10 – 0:30 (10–30m)',
        title: 'Gemini Deep Research Domain Bottleneck Blitz',
        detail:
          'Run Gemini Deep Research on the target problem domain to uncover 2025–2026 regulatory failure modes, latency bottlenecks, and non-obvious technical pain points with real metrics.',
        models: ['Gemini Deep Research'],
        deliverable: 'Domain Bottleneck Dossier (3 Quantified Pain Points)',
      },
    ],
  },
  {
    id: 'phase-1-2',
    code: 'Phase 1.2',
    moduleId: 'brain',
    moduleLabel: 'THE BRAIN v2.0',
    title: 'Multi-Model Ideation & Adversarial Red-Team Filtering',
    timeRangeLabel: '0:30 – 1:00 (30–60m)',
    startMinute: 30,
    endMinute: 60,
    summary:
      'Generate 3 divergent system architectures and subject them to a ruthless Principal Engineer red-team gauntlet.',
    alert: {
      type: 'hard-stop',
      title: 'Hard Stop at Hour 1:00 — Mandatory Idea Lock',
      message:
        'If your team has not locked a single surviving architecture by Minute 60, immediately pick the highest-scoring candidate from the DeepSeek-R1 gauntlet and move to Phase 1.3. Never debate ideas past Hour 1:00.',
    },
    tasks: [
      {
        id: 't-1-2-a',
        timeWindow: '0:30 – 0:45 (30–45m)',
        title: 'Divergent 3-Architecture Ideation Sprint',
        detail:
          'Prompt Gemini 4 Argon and Qwen3-235B-A22B Thinking in parallel to propose 3 distinct multi-tier architectures combining specialized open-weight models with frontier reasoning.',
        models: ['Gemini 4 Argon', 'Qwen3-235B-A22B Thinking'],
        deliverable: '3 Candidate System Architectures',
      },
      {
        id: 't-1-2-b',
        timeWindow: '0:45 – 1:00 (45–60m)',
        title: 'DeepSeek-R1 / V4.1 Judge Red-Team Gauntlet',
        detail:
          'Feed all 3 candidates into DeepSeek-R1 / V4.1 acting as a cynical Principal Engineer judge. Kill 2 ideas that fail feasibility or sound like thin wrappers; lock the 1 survivor at Hour 1:00.',
        models: ['DeepSeek-R1', 'DeepSeek V4.1'],
        deliverable: '1 Surviving Architecture Locked at 1:00',
      },
    ],
  },
  {
    id: 'phase-1-3',
    code: 'Phase 1.3',
    moduleId: 'brain',
    moduleLabel: 'THE BRAIN v2.0',
    title: '"Reverse-Demo" PRD & Canva Visual Blueprint',
    timeRangeLabel: '1:00 – 1:35 (60–95m)',
    startMinute: 60,
    endMinute: 95,
    summary:
      'Script the 3-minute stage demo backwards before writing code, then lock your visual wireframes and brand tokens.',
    alert: {
      type: 'guillotine',
      title: 'The Guillotine Rule — Zero Unscripted Features',
      message:
        'If a feature, settings page, auth flow, or database table is NOT directly visible on stage during the 4-Step Golden Demo Script, it is immediately guillotined from the scope.',
    },
    tasks: [
      {
        id: 't-1-3-a',
        timeWindow: '1:00 – 1:15 (60–75m)',
        title: '4-Step Golden Demo Script in Gemini Canvas',
        detail:
          'Draft the exact 4-screen click path in Gemini Canvas: Screen 1 (Input/Trigger), Screen 2 (Visible Multi-Model Pipeline), Screen 3 (Interactive Visual Output), Screen 4 (Closed-Loop Action).',
        models: ['Gemini Canvas', 'Gemini 4 Argon'],
        deliverable: '4-Screen Golden Demo Script',
      },
      {
        id: 't-1-3-b',
        timeWindow: '1:15 – 1:35 (75–95m)',
        title: 'Canva Pro Lite Wireframing & Brand Kit Lock',
        detail:
          'Lay out the 4 screens in Canva Pro Lite, export a clean SVG logo, and lock 4 exact hex tokens (Background, Surface, Accent, Alert) plus display/body/mono typography.',
        models: ['Canva Pro Lite'],
        deliverable: 'Wireframe Blueprint + 4 Hex Tokens + Logo',
      },
    ],
  },
  {
    id: 'phase-1-4',
    code: 'Phase 1.4',
    moduleId: 'brain',
    moduleLabel: 'THE BRAIN v2.0',
    title: 'The Ironclad CONTEXT.md & Hybrid ML Architecture',
    timeRangeLabel: '1:35 – 2:10 (95–130m)',
    startMinute: 95,
    endMinute: 130,
    summary:
      'Compile the single source-of-truth specification file so every coding model generates compatible schemas and components on the first pass.',
    mandatoryBlocks: [
      'Block 1: Monorepo Directory Tree (/web, /api, /engine)',
      'Block 2: Deterministic DB Schema & Vector Index Specs',
      'Block 3: Strict OpenAPI / JSON Endpoint Contract (POST /api/v1/analyze, GET /api/v1/dashboard)',
      'Block 4: 3-Tier Hybrid AI/ML Directed Acyclic Graph (DAG)',
      'Block 5: Canva Design Tokens & Tailwind CSS Variables',
    ],
    tasks: [
      {
        id: 't-1-4-a',
        timeWindow: '1:35 – 1:55 (95–115m)',
        title: 'Draft Directory Tree, DB Schema & JSON Contracts',
        detail:
          'Freeze exact request/response JSON shapes for POST /api/v1/analyze and GET /api/v1/dashboard so frontend and backend teammates can build in parallel with zero merge conflicts.',
        models: ['Gemini 4 Argon', 'Claude Sonnet 5.5'],
        deliverable: 'Blocks 1–3 of CONTEXT.md',
      },
      {
        id: 't-1-4-b',
        timeWindow: '1:55 – 2:10 (115–130m)',
        title: 'Lock 3-Tier Hybrid AI/ML DAG & Canva Tokens in CONTEXT.md',
        detail:
          'Specify the exact handoff between Tier 1 (<10ms ModernBERT), Tier 2 (SAM 3 / DINOv3 / Whisper / BGE-M3), and Tier 3 (Gemma 4 + Gemini 4 Argon structured output).',
        models: ['Gemini 4 Argon'],
        deliverable: 'Complete Ironclad CONTEXT.md File',
      },
    ],
  },
  {
    id: 'phase-1-5',
    code: 'Phase 1.5',
    moduleId: 'brain',
    moduleLabel: 'THE BRAIN v2.0',
    title: 'Repo Ignition, AI Rules Injection & Mock Server',
    timeRangeLabel: '2:10 – 2:30 (130–150m)',
    startMinute: 130,
    endMinute: 150,
    summary:
      'Initialize the repository, inject IDE system instructions, spin up a working mock backend, and pass the Hour 2:30 Go-For-Launch Gate.',
    tasks: [
      {
        id: 't-1-5-a',
        timeWindow: '2:10 – 2:18 (130–138m)',
        title: 'Inject .github/copilot-instructions.md & Cursor/Windsurf Rules',
        detail:
          'Mirror CONTEXT.md into .github/copilot-instructions.md so every AI code completion enforces the exact JSON contract, Tailwind tokens, and zero-bloat rules.',
        models: ['Claude Sonnet 5.5', 'Gemini 3.8 Flash'],
        deliverable: '.github/copilot-instructions.md',
      },
      {
        id: 't-1-5-b',
        timeWindow: '2:18 – 2:25 (138–145m)',
        title: 'Generate Working mock_server.py with Deterministic Payloads',
        detail:
          'Use DeepSeek V4.1 Flash or Gemini 3.8 Flash to generate a FastAPI/Express mock server returning realistic domain JSON immediately so the frontend is never blocked.',
        models: ['DeepSeek V4.1 Flash', 'Gemini 3.8 Flash'],
        deliverable: 'Running mock_server.py on Port 8000',
      },
      {
        id: 't-1-5-c',
        timeWindow: '2:25 – 2:30 (145–150m)',
        title: 'Claim GitHub Student Pack .tech / .me Domain & Push Commit #1',
        detail:
          'Register custom domain via GitHub Student Developer Pack (Namecheap) so DNS propagation completes hours before Shipyard deployment, and push Commit #1.',
        models: ['GitHub Student Pack'],
        deliverable: 'Commit #1 + Custom Domain Claimed',
      },
    ],
  },

  // SECTION 2: THE CODER v2.0 (2:30 - 14:00 -> 150m to 840m)
  {
    id: 'phase-2-1',
    code: 'Phase 2.1',
    moduleId: 'coder',
    moduleLabel: 'THE CODER v2.0',
    title: '"Zero-Bloat" UI/UX & Shader-Grade Frontend',
    timeRangeLabel: '2:30 – 6:00 (150–360m)',
    startMinute: 150,
    endMinute: 360,
    summary:
      'Build the 4 Golden Demo screens connected to mock_server.py, generate bespoke visual assets, and run a 3D/WebGL shader upgrade pass.',
    tasks: [
      {
        id: 't-2-1-a',
        timeWindow: '2:30 – 3:15 (150–195m)',
        title: 'Bespoke Visual Asset Generation',
        detail:
          'Generate hero textures, domain diagrams, and custom UI iconography using Canva Pro Lite paired with FLUX.2-klein-4B or Qwen-Image-2512.',
        models: ['Canva Pro Lite', 'FLUX.2-klein-4B', 'Qwen-Image-2512'],
        deliverable: 'High-Contrast Domain Assets in /public/assets',
      },
      {
        id: 't-2-1-b',
        timeWindow: '3:15 – 5:00 (195–300m)',
        title: '4-Screen Frontend Scaffolding Against Mock API',
        detail:
          'Use Claude Sonnet 5.5 and Qwen3-Coder-480B-A35B to build the responsive 4-screen interface wired directly to mock_server.py endpoints.',
        models: ['Claude Sonnet 5.5', 'Qwen3-Coder-480B-A35B'],
        deliverable: 'Interactive 4-Screen Frontend UI',
      },
      {
        id: 't-2-1-c',
        timeWindow: '5:00 – 6:00 (300–360m)',
        title: 'Gemini 4 Argon 3D / WebGL / CSS Shader Upgrade Pass',
        detail:
          'Upgrade Screen 2 (Visible Pipeline) and Screen 3 (Interactive Output) with hardware-accelerated WebGL/Canvas telemetry visualization or interactive spatial shaders.',
        models: ['Gemini 4 Argon'],
        deliverable: '60fps Interactive Pipeline Visualizer',
      },
    ],
  },
  {
    id: 'phase-2-2',
    code: 'Phase 2.2',
    moduleId: 'coder',
    moduleLabel: 'THE CODER v2.0',
    title: 'Database, Hybrid Vector Search & Realistic Seeding',
    timeRangeLabel: '6:00 – 7:30 (360–450m)',
    startMinute: 360,
    endMinute: 450,
    summary:
      'Populate the database with 50 realistic domain records and wire dense + sparse hybrid text and multimodal vector retrieval.',
    tasks: [
      {
        id: 't-2-2-a',
        timeWindow: '6:00 – 6:30 (360–390m)',
        title: '50-Row Realistic Domain Seed Script (seed.py)',
        detail:
          'Use Gemini 3.8 Flash or Claude Haiku 5.5 to generate 50 domain-accurate records (zero "John Doe" or "Lorem Ipsum" placeholders) with realistic timestamps and telemetry.',
        models: ['Gemini 3.8 Flash', 'Claude Haiku 5.5'],
        deliverable: '50-Row seed.py Populated in DB',
      },
      {
        id: 't-2-2-b',
        timeWindow: '6:30 – 7:05 (390–425m)',
        title: 'Hybrid Text RAG Index (Dense + Sparse Lexical)',
        detail:
          'Embed domain documents with BGE-M3 or Qwen3-Embedding-0.6B combining dense semantic vectors with BM25/sparse lexical matching for sub-50ms retrieval.',
        models: ['BGE-M3', 'Qwen3-Embedding-0.6B'],
        deliverable: 'Hybrid Text Vector Index',
      },
      {
        id: 't-2-2-c',
        timeWindow: '7:05 – 7:30 (425–450m)',
        title: 'Multimodal Cross-Modal Vision Index',
        detail:
          'Wire Google SigLIP 2 or Nomic Embed Vision so judges can query visual frames, diagrams, or sensor imagery using natural language.',
        models: ['Google SigLIP 2', 'Nomic Embed Vision'],
        deliverable: 'Multimodal Image-Text Retrieval Pipeline',
      },
    ],
  },
  {
    id: 'phase-2-3',
    code: 'Phase 2.3',
    moduleId: 'coder',
    moduleLabel: 'THE CODER v2.0',
    title: 'Backend Core & Terminal Automation',
    timeRangeLabel: '7:30 – 10:00 (450–600m)',
    startMinute: 450,
    endMinute: 600,
    summary:
      'Replace mock endpoints with real async workers, streaming WebSockets, Dockerized services, and automated integration tests.',
    tasks: [
      {
        id: 't-2-3-a',
        timeWindow: '7:30 – 9:00 (450–540m)',
        title: 'Async Concurrency & Streaming WebSocket Telemetry',
        detail:
          'Use Gemini 4 Argon and Kimi K3 to build non-blocking async task orchestration and WebSocket stage progress events so Screen 2 updates live during inference.',
        models: ['Gemini 4 Argon', 'Kimi K3'],
        deliverable: 'Production API + Live WebSocket Stream',
      },
      {
        id: 't-2-3-b',
        timeWindow: '9:00 – 10:00 (540–600m)',
        title: 'CLI/Docker Automation & RL Test Patching',
        detail:
          'Use DeepSeek V4.1 Flash for multi-container Docker orchestration and Kimi-Dev-72B to automatically generate and patch endpoint integration tests.',
        models: ['DeepSeek V4.1 Flash', 'Kimi-Dev-72B'],
        deliverable: 'Verified API Containers + Passing Integration Suite',
      },
    ],
  },
  {
    id: 'phase-2-4',
    code: 'Phase 2.4',
    moduleId: 'coder',
    moduleLabel: 'THE CODER v2.0',
    title: 'Specialized Open-Source ML & 3-Tier Hybrid AI Pipeline',
    timeRangeLabel: '10:00 – 12:30 (600–750m)',
    startMinute: 600,
    endMinute: 750,
    summary:
      'Execute the core technical differentiator: a 3-Tier Open-Source + Frontier Gemini pipeline that crushes "LLM wrapper" critiques.',
    alert: {
      type: 'architecture',
      title: '3-Tier Hybrid AI Pipeline — Crushing the "LLM Wrapper" Critique',
      message:
        'Never send raw inputs straight to a single cloud LLM call. Route through Tier 1 (<10ms encoder triage) → Tier 2 (specialized vision/audio extraction) → Tier 3 (Google ADK + Gemma 4 local edge + Gemini 4 Argon structured synthesis).',
    },
    tasks: [
      {
        id: 't-2-4-a',
        timeWindow: '10:00 – 10:45 (600–645m)',
        title: 'Tier 1: Sub-10ms Intent Routing, Guardrails & NER',
        detail:
          'Deploy ModernBERT-base locally for <10ms classification, PII redaction, and entity extraction before invoking heavier downstream models.',
        models: ['ModernBERT-base'],
        deliverable: 'Tier 1 <10ms Classifier & Entity Extractor',
      },
      {
        id: 't-2-4-b',
        timeWindow: '10:45 – 11:35 (645–695m)',
        title: 'Tier 2: Specialized Vision Segmentation & Audio Transcription',
        detail:
          'Run SAM 3 or DINOv3 for zero-shot spatial segmentation/feature extraction and Whisper large-v3-turbo for real-time voice command or audio stream ingestion.',
        models: ['SAM 3', 'DINOv3', 'Whisper large-v3-turbo'],
        deliverable: 'Tier 2 Multimodal Perception Outputs',
      },
      {
        id: 't-2-4-c',
        timeWindow: '11:35 – 12:30 (695–750m)',
        title: 'Tier 3: Google ADK + Local Gemma 4 + Cloud Gemini 4 Argon',
        detail:
          'Orchestrate multi-agent handoffs via Google ADK using local/edge Gemma 4 (E2B/31B) for low-latency privacy tasks and Gemini 4 Argon with strict responseSchema for complex synthesis.',
        models: ['Google ADK', 'Gemma 4 (E2B/31B)', 'Gemini 4 Argon'],
        deliverable: 'End-to-End 3-Tier Hybrid Inference DAG',
      },
    ],
  },
  {
    id: 'phase-2-5',
    code: 'Phase 2.5',
    moduleId: 'coder',
    moduleLabel: 'THE CODER v2.0',
    title: 'Full-Repo Context Surgery & Bug Eradication',
    timeRangeLabel: '12:30 – 14:00 (750–840m)',
    startMinute: 750,
    endMinute: 840,
    summary:
      'Pack the entire repository with repomix and perform a 1M-token cross-file audit before the Hour 14:00 Hard Feature Freeze.',
    tasks: [
      {
        id: 't-2-5-a',
        timeWindow: '12:30 – 13:15 (750–795m)',
        title: 'Repomix Full-Codebase Packing & 1M-Context Audit',
        detail:
          'Run npx repomix to serialize the entire codebase into a single XML/Markdown payload and feed it into Gemini 4 Argon to detect schema drift, race conditions, and unhandled nulls.',
        models: ['repomix', 'Gemini 4 Argon'],
        deliverable: 'Zero-Drift Cross-Stack Alignment Patch',
      },
      {
        id: 't-2-5-b',
        timeWindow: '13:15 – 14:00 (795–840m)',
        title: 'Pre-Freeze Bug Eradication & Edge-Case Hardening',
        detail:
          'Use DeepSeek V4.1 Flash and Kimi K3 to resolve all TypeScript/Python type mismatches, CORS rules, and state desynchronizations prior to the Hour 14:00 freeze.',
        models: ['DeepSeek V4.1 Flash', 'Kimi K3'],
        deliverable: 'Feature-Complete Build Ready for Hour 14:00 Freeze',
      },
    ],
  },

  // SECTION 3: THE SHIPYARD v2.0 (14:00 - 17:00 -> 840m to 1020m)
  {
    id: 'phase-3-1',
    code: 'Phase 3.1',
    moduleId: 'shipyard',
    moduleLabel: 'THE SHIPYARD v2.0',
    title: 'Dockerized Bug Hunt & Golden-Path E2E Verification',
    timeRangeLabel: '14:00 – 14:45 (840–885m)',
    startMinute: 840,
    endMinute: 885,
    summary:
      'HARD FEATURE FREEZE IN EFFECT. Zero new features. Lock down the 4-screen Golden Demo path with automated Playwright verification and scrub secrets.',
    alert: {
      type: 'freeze',
      title: 'Hard Feature Freeze at Hour 14:00 — Zero New Features Permitted',
      message:
        'At 14:00:00, all feature branches are frozen. Only bug fixes, quantization, circuit-breaker fallbacks, cloud deployment, and documentation are allowed.',
    },
    tasks: [
      {
        id: 't-3-1-a',
        timeWindow: '14:00 – 14:20 (0–20m of Shipyard)',
        title: 'Kimi-Dev-72B Automated Regression Patch Pass',
        detail:
          'Run Kimi-Dev-72B across container logs and failing stack traces to patch runtime exceptions without altering API contracts.',
        models: ['Kimi-Dev-72B'],
        deliverable: 'Zero Runtime Exceptions in Container Logs',
      },
      {
        id: 't-3-1-b',
        timeWindow: '14:20 – 14:35 (20–35m of Shipyard)',
        title: 'Qwen3-Coder 40-Line Playwright E2E Golden Path (3/3 Consecutive Passes)',
        detail:
          'Generate a concise 40-line e2e_demo_path.spec.ts script covering Screens 1–4 and verify it passes 3 out of 3 consecutive runs in headless Chromium.',
        models: ['Qwen3-Coder-480B-A35B', 'Playwright'],
        deliverable: '3/3 Green Runs on e2e_demo_path.spec.ts',
      },
      {
        id: 't-3-1-c',
        timeWindow: '14:35 – 14:45 (35–45m of Shipyard)',
        title: 'Gemini 4 Argon Repository Secret & API Key Scrub',
        detail:
          'Audit git history and environment files to verify zero hardcoded keys exist before making the repository public for judges.',
        models: ['Gemini 4 Argon'],
        deliverable: 'Clean .env.example & Sanitized Git History',
      },
    ],
  },
  {
    id: 'phase-3-2',
    code: 'Phase 3.2',
    moduleId: 'shipyard',
    moduleLabel: 'THE SHIPYARD v2.0',
    title: 'Open-Model Acceleration & The "Bulletproof Circuit-Breaker"',
    timeRangeLabel: '14:45 – 15:30 (885–930m)',
    startMinute: 885,
    endMinute: 930,
    summary:
      'Quantize local open-weight models for sub-second latency and wrap every external call in a 5500ms Stage Circuit-Breaker backed by demo_vault.json.',
    tasks: [
      {
        id: 't-3-2-a',
        timeWindow: '14:45 – 15:05 (45–65m of Shipyard)',
        title: 'ONNX fp16/int8 Quantization & vLLM/Ollama Q4_K_M Prefix Caching',
        detail:
          'Export ModernBERT, DINOv3, and BGE-M3 to ONNX Runtime (fp16/int8) and run Gemma 4 via vLLM or Ollama Q4_K_M GGUF with system prompt prefix caching enabled.',
        models: ['ONNX Runtime', 'vLLM / Ollama', 'Gemma 4 (Q4_K_M)'],
        deliverable: '2.4x–3.8x Inference Speedup & Benchmarking Logs',
      },
      {
        id: 't-3-2-b',
        timeWindow: '15:05 – 15:30 (65–90m of Shipyard)',
        title: '5500ms Stage Circuit-Breaker & Pre-Computed demo_vault.json',
        detail:
          'Record 3 real golden inference outputs into demo_vault.json and wrap the pipeline in a 5500ms timeout circuit-breaker so venue Wi-Fi drops or API rate limits never crash the live demo.',
        models: ['Claude Sonnet 5.5', 'DeepSeek V4.1 Flash'],
        deliverable: '5500ms Circuit-Breaker + demo_vault.json',
      },
    ],
  },
  {
    id: 'phase-3-3',
    code: 'Phase 3.3',
    moduleId: 'shipyard',
    moduleLabel: 'THE SHIPYARD v2.0',
    title: 'Cloud Deployment & Custom Domain Ignition',
    timeRangeLabel: '15:30 – 16:15 (930–975m)',
    startMinute: 930,
    endMinute: 975,
    summary:
      'Deploy production containers using Student Pack credits, bind TLS on your custom .tech/.me domain, and verify over cellular data.',
    tasks: [
      {
        id: 't-3-3-a',
        timeWindow: '15:30 – 15:50 (90–110m of Shipyard)',
        title: 'DeepSeek V4.1 Flash docker-compose.prod.yml & Nginx Reverse Proxy',
        detail:
          'Generate production multi-stage Dockerfiles, docker-compose.prod.yml, and Nginx config with WebSocket upgrade headers and gzip compression.',
        models: ['DeepSeek V4.1 Flash'],
        deliverable: 'Production docker-compose.prod.yml + nginx.conf',
      },
      {
        id: 't-3-3-b',
        timeWindow: '15:50 – 16:05 (110–125m of Shipyard)',
        title: 'Vercel / Firebase Frontend + DigitalOcean $200 / Azure $100 / Cloud Run Backend',
        detail:
          'Deploy the frontend edge bundle and backend GPU/CPU containers using GitHub Student Pack cloud credits ($200 DigitalOcean, $100 Azure, or Cloud Run).',
        models: ['Vercel / Firebase', 'DigitalOcean / Azure / Cloud Run'],
        deliverable: 'Live HTTPS Production Deployment',
      },
      {
        id: 't-3-3-c',
        timeWindow: '16:05 – 16:15 (125–135m of Shipyard)',
        title: 'Namecheap .tech/.me DNS Cutover & Mobile Cellular Verification',
        detail:
          'Point A/CNAME records to production, verify SSL certificate issuance, and test the Golden Demo on a phone disconnected from venue Wi-Fi.',
        models: ['Namecheap DNS'],
        deliverable: 'Verified Live URL on Mobile Cellular Network',
      },
    ],
  },
  {
    id: 'phase-3-4',
    code: 'Phase 3.4',
    moduleId: 'shipyard',
    moduleLabel: 'THE SHIPYARD v2.0',
    title: 'The "Judge-Magnet" Repository & Hour 16:45 Lock',
    timeRangeLabel: '16:15 – 17:00 (975–1020m)',
    startMinute: 975,
    endMinute: 1020,
    summary:
      'Publish high-craft architecture diagrams, p95 latency benchmarks, and lock v1.0.0-submission at 16:45—15 full minutes before the deadline.',
    alert: {
      type: 'hard-stop',
      title: 'Hour 16:45 Code Lock — Tag v1.0.0-submission 15 Minutes Early',
      message:
        'Never push commits between 16:45 and 17:00. Tag v1.0.0-submission at 16:45, submit your Devpost/portal links, and spend the final 15 minutes rehearsing the 4-screen vocal handoff.',
    },
    tasks: [
      {
        id: 't-3-4-a',
        timeWindow: '16:15 – 16:30 (135–150m of Shipyard)',
        title: 'Canva Pro Lite Hero banner.png & 3-Tier architecture.png',
        detail:
          'Export high-resolution dark-mode hero banner and 3-Tier Hybrid AI pipeline diagram from Canva Pro Lite into /docs for immediate visual authority.',
        models: ['Canva Pro Lite'],
        deliverable: 'docs/banner.png & docs/architecture.png',
      },
      {
        id: 't-3-4-b',
        timeWindow: '16:30 – 16:45 (150–165m of Shipyard)',
        title: 'Flagship README.md with p95 Latency Benchmark Table',
        detail:
          'Use Gemini 4 Argon + Kimi K3 to generate the flagship README featuring the "Why Not Just an LLM Wrapper?" breakdown and quantized p95 latency table.',
        models: ['Gemini 4 Argon', 'Kimi K3'],
        deliverable: 'Judge-Magnet README.md Committed',
      },
      {
        id: 't-3-4-c',
        timeWindow: '16:45 – 17:00 (165–180m of Shipyard)',
        title: '16:45 Hard Commit Tag v1.0.0-submission & Stage Rehearsal',
        detail:
          'Run git tag v1.0.0-submission && git push --tags at 16:45 sharp, verify Devpost submission links, and run 3 timed 180-second live demo rehearsals.',
        models: ['Git Tag v1.0.0-submission'],
        deliverable: 'Submitted Release v1.0.0-submission',
      },
    ],
  },
];

export const MODEL_ROUTING_MATRIX: ModelRoutingEntry[] = [
  // BRAIN STAGE
  {
    id: 'mr-1',
    modelName: 'NotebookLM',
    role: 'Closed Frontier Subscription',
    stage: 'Brain',
    taskCategory: 'Research & Rubric',
    phaseRef: 'Phase 1.1 (0–10m)',
    latencyTarget: 'Interactive citation',
    primaryUse: 'Rubric Reverse-Engineering & Sponsor API Ingestion',
    tacticalNotes:
      'Ingest judging PDFs, sponsor docs, and winning Devpost projects to extract hidden scoring weights.',
  },
  {
    id: 'mr-2',
    modelName: 'Gemini Deep Research',
    role: 'Closed Frontier Subscription',
    stage: 'Brain',
    taskCategory: 'Research & Rubric',
    phaseRef: 'Phase 1.1 (10–30m)',
    latencyTarget: '3–5m autonomous report',
    primaryUse: 'Domain Bottleneck & Failure-Mode Blitz',
    tacticalNotes:
      'Finds real industry failure modes, cost bottlenecks, and regulatory statistics to anchor the pitch.',
  },
  {
    id: 'mr-3',
    modelName: 'Gemini 4 Argon',
    role: 'Closed Frontier Subscription',
    stage: 'Brain',
    taskCategory: 'Ideation',
    phaseRef: 'Phase 1.2 & 1.4',
    latencyTarget: '1M Context Window',
    primaryUse: 'System Architecture Synthesis & CONTEXT.md Generation',
    tacticalNotes:
      'Drafts the 3 divergent architectures, 4-Screen Golden Demo script, and the 5-block CONTEXT.md spec.',
  },
  {
    id: 'mr-4',
    modelName: 'Qwen3-235B-A22B Thinking',
    role: 'Open-Weight / Open-Source',
    stage: 'Brain',
    taskCategory: 'Ideation',
    phaseRef: 'Phase 1.2 (30–45m)',
    latencyTarget: 'Deep MoE reasoning',
    primaryUse: 'Divergent Open-Source ML Pipeline Ideation',
    tacticalNotes:
      'Pairs with Gemini 4 Argon to propose specialized open-weight model combinations (encoders + vision + edge LLMs).',
  },
  {
    id: 'mr-5',
    modelName: 'DeepSeek-R1 / DeepSeek V4.1',
    role: 'Open-Weight / Open-Source',
    stage: 'Brain',
    taskCategory: 'Red-Teaming',
    phaseRef: 'Phase 1.2 (45–60m)',
    latencyTarget: 'Adversarial critique',
    primaryUse: 'Cynical Principal Engineer "Judge Gauntlet"',
    tacticalNotes:
      'Rips apart weak "GPT wrapper" ideas before Hour 1:00 so only 1 high-defensibility architecture survives.',
  },
  {
    id: 'mr-6',
    modelName: 'DeepSeek V4.1 Flash / Gemini 3.8 Flash',
    role: 'Closed Frontier Subscription',
    stage: 'Brain',
    taskCategory: 'Backend & DevOps',
    phaseRef: 'Phase 1.5 (138–145m)',
    latencyTarget: '<1.2s generation',
    primaryUse: 'Instant mock_server.py Scaffolding',
    tacticalNotes:
      'Generates deterministic FastAPI/Express mock endpoints matching CONTEXT.md in under 7 minutes.',
  },

  // CODER STAGE
  {
    id: 'mr-7',
    modelName: 'FLUX.2-klein-4B / Qwen-Image-2512',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'Shaders & UI',
    phaseRef: 'Phase 2.1 (2.5–3.25h)',
    latencyTarget: '<3s per asset',
    primaryUse: 'Bespoke Visual Assets, Isometric Diagrams & UI Textures',
    tacticalNotes:
      'Generates domain-authentic dark-mode textures and hero graphics integrated with Canva Pro Lite.',
  },
  {
    id: 'mr-8',
    modelName: 'Claude Sonnet 5.5',
    role: 'Closed Frontier Subscription',
    stage: 'Coder',
    taskCategory: 'Shaders & UI',
    phaseRef: 'Phase 2.1 (3.25–5.0h)',
    latencyTarget: 'High-precision UI code',
    primaryUse: 'Zero-Bloat 4-Screen Component Scaffolding',
    tacticalNotes:
      'Builds clean React/TypeScript components adhering strictly to CONTEXT.md tokens and mock endpoints.',
  },
  {
    id: 'mr-9',
    modelName: 'Qwen3-Coder-480B-A35B',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'Shaders & UI',
    phaseRef: 'Phase 2.1 & 3.1',
    latencyTarget: 'Fast multi-file codegen',
    primaryUse: 'Data Grid Scaffolding & 40-Line Playwright E2E Spec',
    tacticalNotes:
      'Excels at complex TypeScript state hooks, tabular views, and concise Playwright test automation.',
  },
  {
    id: 'mr-10',
    modelName: 'Gemini 4 Argon (Shader & Repo Surgery)',
    role: 'Closed Frontier Subscription',
    stage: 'Coder',
    taskCategory: 'Shaders & UI',
    phaseRef: 'Phase 2.1 & 2.5',
    latencyTarget: '60fps WebGL / 1M Repo Context',
    primaryUse: '3D/WebGL Shader Pass & Repomix Full-Repo Surgery',
    tacticalNotes:
      'Writes custom WebGL/Canvas interactive visualizers and ingests the full repomix dump at Hour 12.5.',
  },
  {
    id: 'mr-11',
    modelName: 'BGE-M3 / Qwen3-Embedding-0.6B',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'RAG & Embeddings',
    phaseRef: 'Phase 2.2 (6.5–7.1h)',
    latencyTarget: '14ms–22ms p95',
    primaryUse: 'Hybrid Dense + Sparse Lexical Text RAG',
    tacticalNotes:
      'Combines dense semantic vectors with sparse lexical weights for high-precision domain retrieval.',
  },
  {
    id: 'mr-12',
    modelName: 'Google SigLIP 2 / Nomic Embed Vision',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'RAG & Embeddings',
    phaseRef: 'Phase 2.2 (7.1–7.5h)',
    latencyTarget: '28ms p95',
    primaryUse: 'Multimodal Image + Text Shared Vector Space',
    tacticalNotes:
      'Enables cross-modal search across diagrams, X-rays, satellite frames, or industrial camera feeds.',
  },
  {
    id: 'mr-13',
    modelName: 'Kimi K3',
    role: 'Closed Frontier Subscription',
    stage: 'Coder',
    taskCategory: 'Backend & DevOps',
    phaseRef: 'Phase 2.3 & 2.5',
    latencyTarget: 'High-concurrency async',
    primaryUse: 'Async Worker Queues, WebSockets & Cross-Stack Debugging',
    tacticalNotes:
      'Co-designs streaming WebSocket progress pipelines and resolves subtle race conditions.',
  },
  {
    id: 'mr-14',
    modelName: 'Kimi-Dev-72B',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'Backend & DevOps',
    phaseRef: 'Phase 2.3 & 3.1',
    latencyTarget: 'RL-tuned SWE patching',
    primaryUse: 'Automated Test Generation & Docker Bug Hunting',
    tacticalNotes:
      'Reinforcement-learning tuned coding model for autonomous stack-trace diagnosis and test patching.',
  },
  {
    id: 'mr-15',
    modelName: 'ModernBERT-base',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'Hybrid Reasoning & Routing',
    phaseRef: 'Phase 2.4 (Tier 1)',
    latencyTarget: '6.8ms p95 (ONNX fp16)',
    primaryUse: 'Tier 1 Ultra-Fast Intent Routing, NER & Guardrails',
    tacticalNotes:
      '8192-token context encoder running locally in <10ms to classify queries and extract entities before LLM calls.',
  },
  {
    id: 'mr-16',
    modelName: 'SAM 3 / DINOv3',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'Vision & Audio',
    phaseRef: 'Phase 2.4 (Tier 2 Vision)',
    latencyTarget: '42ms p95 (ONNX)',
    primaryUse: 'Tier 2 Zero-Shot Spatial Segmentation & Visual Features',
    tacticalNotes:
      'Extracts bounding masks, spatial anomalies, and dense visual embeddings before structured reasoning.',
  },
  {
    id: 'mr-17',
    modelName: 'Whisper large-v3-turbo',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'Vision & Audio',
    phaseRef: 'Phase 2.4 (Tier 2 Audio)',
    latencyTarget: '110ms p95 chunk',
    primaryUse: 'Tier 2 Real-Time Voice & Acoustic Stream Transcription',
    tacticalNotes:
      'Delivers low-latency multilingual speech-to-text for hands-free live stage demos.',
  },
  {
    id: 'mr-18',
    modelName: 'Gemma 4 (E2B / 31B) + Google ADK',
    role: 'Open-Weight / Open-Source',
    stage: 'Coder',
    taskCategory: 'Hybrid Reasoning & Routing',
    phaseRef: 'Phase 2.4 (Tier 3 Edge)',
    latencyTarget: '310ms TTFT (Q4_K_M)',
    primaryUse: 'Tier 3 Local/Edge Agentic Synthesis & Privacy Processing',
    tacticalNotes:
      'Coordinated by Google ADK alongside Gemini 4 Argon (responseSchema) for hybrid local+cloud orchestration.',
  },

  // SHIPYARD STAGE
  {
    id: 'mr-19',
    modelName: 'ONNX Runtime (fp16/int8) + vLLM / Ollama (Q4_K_M)',
    role: 'Open-Weight / Open-Source',
    stage: 'Shipyard',
    taskCategory: 'Quantization & Edge',
    phaseRef: 'Phase 3.2 (14:45–15:05)',
    latencyTarget: '2.4x–3.8x speedup',
    primaryUse: 'Open-Model Quantization & Prefix Caching',
    tacticalNotes:
      'Quantizes ModernBERT, DINOv3, and BGE-M3 to ONNX fp16/int8 and enables GGUF Q4_K_M prefix caching on Gemma 4.',
  },
  {
    id: 'mr-20',
    modelName: 'DeepSeek V4.1 Flash (DevOps & Proxy)',
    role: 'Closed Frontier Subscription',
    stage: 'Shipyard',
    taskCategory: 'Backend & DevOps',
    phaseRef: 'Phase 3.2 & 3.3',
    latencyTarget: '<2s config generation',
    primaryUse: '5500ms Circuit-Breaker, docker-compose.prod.yml & Nginx',
    tacticalNotes:
      'Generates production container orchestration, reverse proxy rules, and stage fallback wrappers.',
  },
];

export const PROMPT_VAULT_ITEMS: PromptTemplate[] = [
  {
    id: 'prompt-1',
    number: 1,
    title: 'NotebookLM Problem Statement Scoring Matrix Prompt',
    stage: 'Brain',
    phaseRef: 'Phase 1.1 (0:00 – 0:10)',
    targetModels: ['NotebookLM'],
    usesDynamicDomain: false,
    systemContext:
      'Paste into NotebookLM after uploading the official Hackathon Rubric PDF, Sponsor API documentation, and 3–5 past winning Devpost submissions.',
    template: `Analyze all uploaded hackathon rules, judging rubrics, sponsor challenge briefs, and past winning project writeups.

Output a strict "Rubric Reverse-Engineering Matrix" with the following 4 sections:
1. EXPLICIT vs. IMPLICIT WEIGHTS: Break down the official judging criteria into percentage weights, and identify the unspoken technical signals that separated past 1st-place winners from finalists.
2. SPONSOR PRIZE STACKABILITY: Map which sponsor APIs/models can be naturally combined in a single architecture so one codebase qualifies for the Grand Prize + at least 2 Sponsor Track Bounties without scope creep.
3. INSTANT DISQUALIFIERS & CLICHÉS: List the top 5 overbuilt or generic project tropes in this track that judges are fatigued by.
4. THE 180-SECOND STAGE PROOF REQUIREMENT: Specify the exact live visual proof a judge must see in under 3 minutes to award a 10/10 on Technical Execution and Real-World Impact.`,
  },
  {
    id: 'prompt-2',
    number: 2,
    title: 'Gemini Deep Research Domain Bottleneck Prompt',
    stage: 'Brain',
    phaseRef: 'Phase 1.1 (0:10 – 0:30)',
    targetModels: ['Gemini Deep Research'],
    usesDynamicDomain: true,
    systemContext:
      'Uses the dynamic [Problem Domain] variable below to uncover quantified 2025–2026 technical bottlenecks, latency failures, and regulatory pain points.',
    template: `Execute a deep technical and operational investigation into [Problem Domain] focusing on 2025–2026 production workflows.

Do NOT summarize generic consumer complaints. Uncover:
1. THREE QUANTIFIED BOTTLENECKS: Identify the top 3 high-cost operational or latency failure modes in [Problem Domain], including exact industry metrics (e.g., error rates, manual triage latency in minutes/hours, false-positive costs, or compliance fines).
2. WHY NAIVE LLM WRAPPERS FAIL HERE: Explain specifically why passing raw text/images in [Problem Domain] to a single monolithic LLM prompt fails in production (e.g., >4s latency, hallucinated structured fields, lack of spatial/acoustic grounding, or PII exposure).
3. HIGH-LEVERAGE MULTIMODAL INPUTS: Identify the real-world raw inputs available in [Problem Domain] (sensor streams, images/frames, voice logs, tabular telemetry, PDFs) that a 3-Tier Hybrid AI pipeline (Encoder + Vision/Audio + Structured Reasoning) can process in under 2 seconds.
4. BENCHMARK TARGETS: Provide realistic baseline vs. target KPI metrics we can cite in our README and live stage demo.`,
  },
  {
    id: 'prompt-3',
    number: 3,
    title: 'Divergent 3-Architecture Ideation Prompt',
    stage: 'Brain',
    phaseRef: 'Phase 1.2 (0:30 – 0:45)',
    targetModels: ['Gemini 4 Argon', 'Qwen3-235B-A22B Thinking'],
    usesDynamicDomain: true,
    systemContext:
      'Run simultaneously in Gemini 4 Argon and Qwen3-235B-A22B Thinking to generate 3 distinct, non-wrapper architectures for your chosen domain.',
    template: `We are building a 17-hour hackathon system for [Problem Domain] based on our Rubric Matrix and Domain Bottleneck findings.

Propose 3 radically distinct, production-feasible system architectures (Architecture A, B, and C). Every architecture MUST obey these constraints:
- ZERO "Chat-with-PDF" or generic chatbot interfaces.
- Must implement a 3-Tier Hybrid AI Pipeline:
  * Tier 1 (<10ms local encoder): ModernBERT-base for instant intent routing, guardrail filtering, and NER.
  * Tier 2 (Specialized open-weight perception/retrieval): Choose from SAM 3 / DINOv3 (vision), Whisper large-v3-turbo (audio), BGE-M3 / Qwen3-Embedding-0.6B (hybrid RAG), or Google SigLIP 2 (multimodal vector search).
  * Tier 3 (Agentic orchestration & structured synthesis): Google ADK coordinating local/edge Gemma 4 (E2B/31B) + cloud Gemini 4 Argon with a strict JSON responseSchema.
- For each architecture, specify:
  1. The 1-Sentence Pitch & Quantified Value Proposition.
  2. The 4-Screen Live Stage Demo Flow (Trigger -> Visible Pipeline -> Interactive Output -> Closed-Loop Action).
  3. Exact Data Flow & Model Handoff Latency Budget (<2500ms total p95).`,
  },
  {
    id: 'prompt-4',
    number: 4,
    title: 'Cynical Principal Engineer "Judge Red-Team" Gauntlet Prompt',
    stage: 'Brain',
    phaseRef: 'Phase 1.2 (0:45 – 1:00 — Hard Stop at 1:00)',
    targetModels: ['DeepSeek-R1', 'DeepSeek V4.1'],
    usesDynamicDomain: true,
    systemContext:
      'Feed your 3 candidate architectures into DeepSeek-R1 / V4.1 at Minute 45. Use its ruthless verdict to kill 2 ideas and lock 1 survivor before Hour 1:00.',
    template: `Act as a cynical Staff/Principal Systems Engineer and lead hackathon judge who has evaluated 400+ AI projects for [Problem Domain] and despises vaporware, thin LLM wrappers, and bloated scope.

Critically audit our 3 candidate architectures below:
[PASTE ARCHITECTURES A, B, C]

For EACH architecture:
1. THE WRAPPER TEST: Could a competent developer replicate 90% of this value with a single system prompt in ChatGPT/Claude? If yes, explain why and score it 0/10.
2. THE 11.5-HOUR CODING REALITY CHECK: Identify the exact integration bottleneck that will break at Hour 11:00 (e.g., VRAM starvation, unindexed vector latency, flaky API dependencies).
3. STAGE DEMO LETHALITY: Will a tired judge sitting 15 feet away immediately grasp the visual "Aha!" moment within 30 seconds?

FINAL VERDICT (MANDATORY):
- Execute 2 of the 3 architectures with a one-line post-mortem each.
- Crown the 1 SURVIVING ARCHITECTURE and prescribe 3 surgical modifications to make it undeniable on stage.`,
  },
  {
    id: 'prompt-5',
    number: 5,
    title: '"Argon Visual Wow" 3D WebGL/CSS Shader Upgrade Prompt',
    stage: 'Coder',
    phaseRef: 'Phase 2.1 (5:00 – 6:00)',
    targetModels: ['Gemini 4 Argon'],
    usesDynamicDomain: true,
    systemContext:
      'Run during Hour 5:00–6:00 once your 4 core screens are wired to mock_server.py to inject a 60fps interactive visual centerpiece into Screen 2 and Screen 3.',
    template: `We are upgrading Screen 2 (Visible Multi-Model Pipeline) and Screen 3 (Interactive Output) of our [Problem Domain] application.

Here is our current React/TypeScript component and CONTEXT.md design tokens:
- Background: #090D16 | Surface: #111827 | Primary Accent: #06B6D4 | Secondary Glow: #6366F1
- Font Stack: Space Grotesk (Headers), Inter (Body), JetBrains Mono (Telemetry)

Refactor this component to include a hardware-accelerated, 60fps interactive visual centerpiece:
1. LIVE PIPELINE TELEMETRY CANVAS: Render an interactive Canvas/WebGL or SVG shader DAG showing real-time token/tensor flow across Tier 1 (ModernBERT <10ms), Tier 2 (SAM 3 / Whisper / BGE-M3), and Tier 3 (Gemma 4 + Gemini 4 Argon).
2. INTERACTIVE INSPECTION: Clicking any node or spatial bounding region must inspect the exact intermediate tensor/JSON payload, latency in milliseconds (tabular-nums), and confidence score.
3. HEADLESS & LOW-GPU SAFETY: Detect headless or reduced-motion environments and throttle continuous requestAnimationFrame loops cleanly so layout and E2E Playwright tests remain instant.`,
  },
  {
    id: 'prompt-6',
    number: 6,
    title: 'Production Docker & Nginx Reverse Proxy Prompt',
    stage: 'Shipyard',
    phaseRef: 'Phase 3.3 (15:30 – 15:50)',
    targetModels: ['DeepSeek V4.1 Flash'],
    usesDynamicDomain: false,
    systemContext:
      'Run at Hour 15:30 in The Shipyard to generate production container orchestration, WebSocket proxy headers, and healthchecks for DigitalOcean/Azure/Cloud Run.',
    template: `Generate a bulletproof production deployment configuration for our 3-service monorepo (/web React+Vite, /api FastAPI/Node async server, /engine ONNX+vLLM inference worker).

Output 3 complete, drop-in files with zero placeholders:
1. docker-compose.prod.yml:
   - Multi-stage builds with layer caching, restart: unless-stopped, strict memory/CPU limits, and internal bridge networking.
   - Healthchecks for /api/health and /engine/health with 5s intervals.
   - Volume mounts for quantized ONNX models, GGUF weights, and demo_vault.json fallback cache.
2. nginx/nginx.conf:
   - Reverse proxy routing /api/* and /ws/* to the backend container with full WebSocket Upgrade and Connection headers.
   - Proxy_read_timeout set to 10s (aligned with our 5500ms application Stage Circuit-Breaker).
   - Gzip/Brotli compression and immutable cache headers for static frontend assets.
3. deploy_verify.sh:
   - A 20-line smoke-test script that verifies HTTP 200 on /, POST /api/v1/analyze latency < 2500ms, and fallback circuit-breaker readiness.`,
  },
];

export const DEFAULT_ARTIFACT_CONFIG: ArtifactConfig = {
  projectName: 'AegisGrid AI',
  tagline: 'Sub-Second Multimodal Grid Anomaly & Acoustic Fault Triage Engine',
  problemDomain: 'Autonomous Microgrid & Substation Fault Triage',
  domainUrl: 'https://aegisgrid.tech',
  screen1Trigger:
    'Live Substation Feed Ingest: Operator drops a thermal drone frame + 4-second acoustic transformer hum clip or clicks "Simulate Line Fault #04".',
  screen2Pipeline:
    'Visible 3-Tier DAG Telemetry: Tier 1 ModernBERT (<7ms) classifies fault severity & extracts asset IDs -> Tier 2 SAM 3 segments thermal hotspots + Whisper large-v3-turbo transcribes field dispatch -> Tier 3 BGE-M3 retrieves IEEE maintenance SOPs.',
  screen3Output:
    'Interactive Spatial Fault Overlay: Split-screen thermal segmentation mask with clickable bounding boxes, root-cause confidence matrix, and Gemma 4 / Gemini 4 Argon structured remediation JSON.',
  screen4ClosedLoop:
    '1-Click Automated Dispatch: Operator clicks "Execute Load Reroute & Dispatch Crew" -> emits live WebSocket breaker telemetry and exports signed incident PDF/JSON audit log.',
  hexBackground: '#090D16',
  hexSurface: '#111827',
  hexAccent: '#06B6D4',
  hexAlert: '#F43F5E',
  fontPair: 'Space Grotesk (Headers) + Inter (Body) + JetBrains Mono (Telemetry)',
  directoryTree: `/
├── web/                        # React 19 + Vite + Tailwind CSS + WebGL Canvas
│   ├── src/components/         # 4 Golden Demo Screens (Zero-Bloat UI)
│   └── src/assets/             # Canva Pro Lite + FLUX.2-klein-4B assets
├── api/                        # FastAPI / Express Async Gateway + WebSockets
│   ├── main.py                 # POST /api/v1/analyze & GET /api/v1/dashboard
│   ├── circuit_breaker.py      # 5500ms Stage Circuit-Breaker wrapper
│   └── demo_vault.json         # Pre-computed deterministic fallback payloads
├── engine/                     # 3-Tier Hybrid AI + Quantized ONNX/vLLM Pipeline
│   ├── tier1_modernbert.py     # <10ms ONNX fp16 intent & entity router
│   ├── tier2_perception.py     # SAM 3 / DINOv3 vision + Whisper large-v3-turbo
│   ├── tier2_hybrid_rag.py     # BGE-M3 text + SigLIP 2 multimodal vector index
│   └── tier3_adk_reasoning.py  # Google ADK + Gemma 4 (Q4_K_M) + Gemini 4 Argon
├── CONTEXT.md                  # Single Source of Truth Architecture Contract
└── docker-compose.prod.yml     # Production Container & Nginx Orchestration`,
  dbSchema: `CREATE TABLE incidents (
  id TEXT PRIMARY KEY,
  asset_code TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('NOMINAL', 'WARNING', 'CRITICAL')) NOT NULL,
  tier1_latency_ms NUMERIC NOT NULL,
  tier2_latency_ms NUMERIC NOT NULL,
  tier3_latency_ms NUMERIC NOT NULL,
  bounding_boxes_json JSONB NOT NULL,
  remediation_plan_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hybrid Vector Indices (BGE-M3 1024-dim + SigLIP 2 768-dim)
CREATE INDEX idx_sop_dense_vec ON sop_chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX idx_thermal_vision_vec ON thermal_frames USING hnsw (siglip_vec vector_cosine_ops);`,
  analyzeEndpointRequest: `{
  "incident_id": "inc_2026_049",
  "asset_code": "SUB-TX-09",
  "modality": "thermal_plus_acoustic",
  "input_text": "Transformer bay 4 oil temperature spike + 120Hz corona discharge hum",
  "frame_uri": "/assets/samples/substation_bay4_thermal.png"
}`,
  analyzeEndpointResponse: `{
  "incident_id": "inc_2026_049",
  "status": "CRITICAL",
  "circuit_breaker_triggered": false,
  "pipeline_telemetry": {
    "tier1_modernbert_ms": 6.4,
    "tier2_sam3_whisper_ms": 148.2,
    "tier2_bgem3_rag_ms": 19.1,
    "tier3_gemma4_argon_ms": 612.0,
    "total_e2e_ms": 785.7
  },
  "detections": [
    { "label": "Bushing_Hotspot_PhaseB", "temp_c": 114.6, "confidence": 0.97, "bbox": [142, 88, 310, 245] }
  ],
  "remediation": {
    "sop_reference": "IEEE-C57.104-Sec4.2",
    "immediate_action": "Isolate Bay 4 Tie-Breaker & reroute 42MW load to Feeder B2",
    "confidence_score": 0.96
  }
}`,
  dashboardEndpointResponse: `{
  "active_substations": 14,
  "incidents_processed_24h": 50,
  "median_pipeline_latency_ms": 740,
  "p95_pipeline_latency_ms": 1180,
  "circuit_breaker_status": "ARMED_5500MS"
}`,
  tier1Model: 'ModernBERT-base (ONNX fp16, <10ms)',
  tier2Model: 'SAM 3 + Whisper large-v3-turbo + BGE-M3 + Google SigLIP 2',
  tier3Model: 'Google ADK + Local Gemma 4 (E2B/31B Q4_K_M) + Cloud Gemini 4 Argon (responseSchema)',
};

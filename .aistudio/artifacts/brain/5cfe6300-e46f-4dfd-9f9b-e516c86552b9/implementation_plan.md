# WAR ROOM NEXUS — Seamless Shader UI/UX & Adaptive Theme Architecture

Elevate the entire multi-site application (**Home Portal**, **Sub-Website 1: WAR ROOM v2.0**, and **Sub-Website 2: AUTOPILOT v2.0**) with a custom **WebGL Fluid Aurora & Precision Grid Field Shader**, an **Interactive 3-Tier Hybrid AI DAG Shader Visualizer**, a full **Adaptive Dark & Light Mode Semantic Color System**, refined typographic hierarchy, and tactile micro-interactions.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following design and architectural decisions incorporate your confirmed selections from the clarification prompt while preserving 100% of existing features across the Home Portal and both sub-websites.

- **Confirmed Decision 1 — Seamless WebGL Shader Style**: Implement a custom **Interactive Fluid Aurora & Precision Grid Field GLSL Shader** that responds subtly to cursor coordinates, active module/stage state (`Brain` cyan, `Coder` indigo, `Shipyard` emerald/rose), and current theme posture.
- **Confirmed Decision 2 — Dual-Layer Shader Integration**:
  1. **Ambient Full-Viewport Shader Canvas**: Persistent, zero-layout-shift background canvas with `webglcontextlost` recovery and automatic frame-rate throttling in headless/reduced-motion environments.
  2. **Interactive 3-Tier Hybrid AI DAG Shader Visualizer**: Embedded interactive shader & spatial canvas displaying real-time tensor/token pulses across **Tier 1 (`ModernBERT-base` <10ms)** → **Tier 2 (`SAM 3` / `Whisper v3-turbo` / `BGE-M3`)** → **Tier 3 (`Google ADK` + `Gemma 4` + `Gemini 4 Argon`)** with clickable node inspection, live latency telemetry (`tabular-nums`), and circuit-breaker stress testing.
- **Confirmed Decision 3 — Adaptive Dark & Light Mode System**: Default to **High-Craft Dark Mode** on initial load with a persistent **Light / Dark Theme Toggle** (`localStorage`-backed) that simultaneously transitions all semantic CSS surface/text/border tokens and interpolates the WebGL shader uniforms between deep obsidian aurora (`#070A12`) and crisp architectural alabaster (`#F8FAFC`).

---

### 1. Overview & Core Concept

- **What It Does**:
  - Wraps the **Home Portal**, **Sub-Website 1 (War Room OS)**, and **Sub-Website 2 (Autopilot Automation Plan)** in a cohesive, shader-powered design system where translucent glassmorphic surfaces (`backdrop-blur-md`), crisp 1px hairline borders, and semantic status colors adapt seamlessly between Dark Mode and Light Mode.
  - Embeds an interactive **3-Tier Hybrid AI Pipeline Shader Visualizer** inside the Home Portal, Phase 2.4 of War Room OS, and Stage 06 of the Autopilot Automation Plan so users and judges can visually inspect live tensor flow, trigger simulated traffic spikes, and test the `5500ms` Stage Circuit-Breaker (`demo_vault.json`).
- **Target Audience / Persona**: Hackathon teams, product designers, and technical judges evaluating both visual craft ("Argon Visual Wow") and systems engineering rigor.
- **Key Value**: Transforms a utility dashboard into a flagship, tactile operating system with real GPU-accelerated visual depth, accessible high-contrast Light and Dark themes, and interactive pipeline observability.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Adaptive Theme Switching & Shader Uniform Morphing**: Clicking the theme toggle switches the entire interface between **Obsidian Dark Mode** and **Alabaster Light Mode** in under `150ms`. The background GLSL shader smoothly transitions its base luminance, grid line opacity, and aurora harmonic hues to maintain WCAG AA contrast across all cards and tables.
  2. **Interactive 3-Tier DAG Shader Inspection**: Users can click any node in the 3-Tier DAG Shader Visualizer (`Tier 1: ModernBERT`, `Tier 2: SAM 3 / Whisper / BGE-M3`, `Tier 3: Gemma 4 / Gemini 4 Argon`, or `5500ms Stage Circuit-Breaker`) to inspect live intermediate JSON payloads, p95 quantized latency (`6.4ms` → `148.2ms` → `612.0ms`), and toggle a **"Simulate Venue Wi-Fi Drop (Trigger 5500ms Breaker)"** mode that visually reroutes shader particles to `demo_vault.json`.
  3. **Tactile Micro-Interactions, Skeletons & Empty States**: Switching views, filtering the 20-Model Routing Matrix, or running the 8-Stage Pipeline Simulator triggers crisp `<180ms` transitions, shimmer skeleton placeholders during simulated async operations, and actionable empty states.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Precision Glass & Atmospheric Telemetry—combining restrained frosted glass surfaces, razor-sharp 1px structural borders, and fluid GPU shader harmonics without visual clutter.
  - *Color Palette & Mood (Semantic Token System)*:
    - **Dark Mode (Default)**: Canvas `#070A12`, Elevated Glass Surface `rgba(17, 24, 39, 0.78)`, Hairline Border `rgba(148, 163, 184, 0.14)`, Primary Text `#F8FAFC`, Secondary Text `#94A3B8`, Primary Accent `#06B6D4` (Cyan), Secondary Accent `#6366F1` (Indigo), Success `#10B981` (Emerald), Warning `#F59E0B` (Amber), Error/Freeze `#F43F5E` (Rose).
    - **Light Mode**: Canvas `#F8FAFC`, Elevated Glass Surface `rgba(255, 255, 255, 0.84)`, Hairline Border `rgba(15, 23, 42, 0.10)`, Primary Text `#0F172A`, Secondary Text `#475569`, Primary Accent `#0891B2` (Deep Cyan), Secondary Accent `#4F46E5` (Royal Indigo), Success `#059669` (Emerald), Warning `#D97706` (Amber), Error/Freeze `#E11D48` (Rose).
  - *Typography & Hierarchy*:
    - **Display / Headings**: `Plus Jakarta Sans` & `Space Grotesk` (`clamp(1.75rem, 3.2vw, 2.75rem)` for hero titles; `1.25rem–1.5rem` for section headers; `tracking-tight`, `text-wrap: balance`).
    - **Body / UI Controls**: `Plus Jakarta Sans` (`14px–15px`, `1.6` line-height, clean single-line button labels).
    - **Code, Timers & Telemetry**: `JetBrains Mono` with strict `font-variant-numeric: tabular-nums` across all clocks, latency benchmarks, and terminal logs.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Custom Raw WebGL / Canvas2D Hybrid Shader Engine (Zero Heavy 3D Bundle Overhead)**
  - *Chosen Approach*: Build a dedicated, lightweight WebGL GLSL fragment shader engine (`FluidAuroraGridShader`) with automatic fallback and headless Chromium detection (`navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent)`).
  - *Why*: Delivers silky 60fps fluid aurora + precision grid visuals on user GPUs while automatically rendering a single static frame or throttled 15fps pass in headless browser verification so screenshots and E2E tests never stall.
- **Decision 2: CSS Custom Property Semantic Theme Engine (`data-theme="dark" | "light"`)**
  - *Chosen Approach*: Define semantic CSS variables (`--bg-canvas`, `--bg-surface`, `--bg-elevated`, `--border-subtle`, `--text-primary`, `--text-secondary`, `--accent-primary`, `--accent-secondary`) at the root level and bind them to utility classes and shader uniforms.
  - *Why*: Ensures every card, table row, input field, code block, and modal across the Home Portal and both sub-websites switches cleanly between Dark Mode and Light Mode without flash or broken contrast.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                 ADAPTIVE THEME & SHADER ROOT CONTROLLER                      │
│   • Theme State ('dark' | 'light') -> CSS Semantic Tokens + Shader Uniforms  │
│   • WebGL Fluid Aurora & Precision Grid Background Canvas (Full Viewport)    │
└──────────────────────┬───────────────────────────┬───────────────────────────┘
                       │                           │
                       ▼                           ▼
┌──────────────────────────────────────┐ ┌─────────────────────────────────────┐
│     GLOBAL PORTAL HEADER (3-Zone)    │ │  INTERACTIVE 3-TIER DAG SHADER      │
│ • Brand Wordmark                     │ │  VISUALIZER (Shared Component)      │
│ • Home | War Room OS | Automation    │ │ • Tier 1 ModernBERT (<10ms) Node    │
│ • Theme Toggle + Export Action       │ │ • Tier 2 SAM 3 / Whisper / BGE-M3   │
└──────────────────────┬───────────────┘ │ • Tier 3 Gemma 4 / Gemini 4 Argon   │
                       │                 │ • 5500ms Circuit-Breaker Simulator  │
       ┌───────────────┴───────────┐     └─────────────────┬───────────────────┘
       ▼                           ▼                       ▼
┌─────────────────────┐ ┌─────────────────────────┐ ┌──────────────────────────┐
│  HOME PAGE PORTAL   │ │ SUB-SITE 1: WAR ROOM OS │ │ SUB-SITE 2: AUTOPILOT OS │
│ • Glass Hero & KPIs │ │ • 17h Clock & Sync Strip│ │ • 8-Stage CLI Playbook   │
│ • Interactive DAG   │ │ • 14-Phase Navigator    │ │ • Live Terminal Simulator│
│   Shader Showcase   │ │ • 20-Model Routing Hub  │ │   with Skeletons & Logs  │
│ • Dual Launch Cards │ │ • 6-Prompt Vault        │ │ • Dynamic Script Exporter│
│ • Compression Table │ │ • Artifact Studio       │ │                          │
└─────────────────────┘ └─────────────────────────┘ └──────────────────────────┘
```

- **Data Model & State**:
  - `ThemeMode`: `'dark' | 'light'` persisted in `localStorage` (defaults to `'dark'`).
  - `ShaderUniformState`: Tracks `themeMode`, `activeModule` (`brain` | `coder` | `shipyard`), `cursorX/Y`, and `circuitBreakerSimulated` (`boolean`) to modulate shader colors and particle speed.
  - `DAGNodeTelemetry`: Structured telemetry for each node in the 3-Tier Hybrid AI DAG (`tier1_modernbert`, `tier2_perception`, `tier2_rag`, `tier3_synthesis`, `circuit_breaker_vault`) including live latency, tensor dimensions, hardware target (`ONNX fp16`, `vLLM Q4_K_M`, `Cloud API`), and sample JSON output.
- **Interactive Component & State Mapping**:
  - **Theme Toggle Control**: Switches `themeMode` between `'dark'` and `'light'`, updates `<html data-theme="...">`, persists to `localStorage`, and updates WebGL shader background colors immediately.
  - **Ambient Fluid Aurora & Grid Shader**: Listens to pointer movement with smooth linear interpolation (`lerp`) and shifts its primary harmonic tint based on whether the user is viewing `Brain` (Cyan), `Coder` (Indigo), or `Shipyard` (Emerald/Rose).
  - **Interactive 3-Tier DAG Shader Visualizer**: Allows clicking any of the 5 pipeline nodes to inspect its live tensor contract and latency, plus a **"Simulate 5500ms Timeout / Fallback"** toggle that demonstrates the automatic switchover to `demo_vault.json`.

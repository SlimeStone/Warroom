import React, { useState } from 'react';
import { Check, Copy, Download, FileCode2, Layers, Palette, RotateCcw, ShieldCheck } from 'lucide-react';
import { ArtifactConfig, DEFAULT_ARTIFACT_CONFIG } from '../data/warRoomData.ts';
import {
  generateCircuitBreakerFiles,
  generateContextMd,
  generateCopilotInstructionsMd,
  generateJudgeReadmeMd,
} from '../utils/warRoomLogic.ts';

interface ArtifactStudioProps {
  config: ArtifactConfig;
  onUpdateConfig: (updated: ArtifactConfig) => void;
  onResetConfig: () => void;
}

type PreviewArtifactTab =
  | 'context_md'
  | 'copilot_md'
  | 'circuit_breaker'
  | 'demo_vault'
  | 'readme_md';

const FONT_PAIR_OPTIONS = [
  'Space Grotesk (Headers) + Inter (Body) + JetBrains Mono (Telemetry)',
  'Plus Jakarta Sans (Headers) + DM Sans (Body) + JetBrains Mono (Telemetry)',
  'Bricolage Grotesque (Headers) + Public Sans (Body) + IBM Plex Mono (Telemetry)',
  'Outfit (Headers) + Manrope (Body) + Space Mono (Telemetry)',
];

export const ArtifactStudio: React.FC<ArtifactStudioProps> = ({
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [activeArtifactTab, setActiveArtifactTab] = useState<PreviewArtifactTab>('context_md');
  const [circuitLang, setCircuitLang] = useState<'ts' | 'py'>('ts');
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const contextMdContent = generateContextMd(config);
  const copilotMdContent = generateCopilotInstructionsMd(config);
  const circuitFiles = generateCircuitBreakerFiles(config);
  const readmeMdContent = generateJudgeReadmeMd(config);

  const getCurrentArtifactFile = (): { filename: string; content: string } => {
    switch (activeArtifactTab) {
      case 'context_md':
        return { filename: 'CONTEXT.md', content: contextMdContent };
      case 'copilot_md':
        return { filename: 'copilot-instructions.md', content: copilotMdContent };
      case 'circuit_breaker':
        return circuitLang === 'ts'
          ? { filename: 'circuitBreaker.ts', content: circuitFiles.typescriptCode }
          : { filename: 'circuit_breaker.py', content: circuitFiles.pythonCode };
      case 'demo_vault':
        return { filename: 'demo_vault.json', content: circuitFiles.demoVaultJson };
      case 'readme_md':
        return { filename: 'README.md', content: readmeMdContent };
    }
  };

  const currentFile = getCurrentArtifactFile();

  const handleCopyFile = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.content);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentFile.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedLabel(currentFile.filename);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const updateField = <K extends keyof ArtifactConfig>(key: K, value: ArtifactConfig[K]) => {
    onUpdateConfig({ ...config, [key]: value });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Studio Header */}
      <div className="bg-[#111827] border border-slate-800 rounded-lg p-5 sm:p-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1 max-w-3xl">
          <div className="text-xs font-mono text-cyan-400">
            INTERACTIVE ARTIFACT STUDIO · 1-CLICK FILE GENERATORS
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
            Golden Demo Script, Canva Brand Kit, CONTEXT.md & 5500ms Circuit-Breaker Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Configure your 4-Screen Golden Demo, Canva hex tokens, database schema, and 3-Tier
            Hybrid AI DAG below. Immediately copy or download ready-to-commit files for your
            repository.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetConfig}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#090D16] hover:bg-slate-800 border border-slate-800 rounded-md transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Default Blueprint</span>
        </button>
      </div>

      {/* Left/Right Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Structured Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Project Identity & 4-Screen Golden Demo Script */}
          <section className="bg-[#111827] border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-100 font-display pb-2 border-b border-slate-800">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2>1. 4-Screen Golden Demo & Project Identity</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="artifact-project-name"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Project Name
                </label>
                <input
                  id="artifact-project-name"
                  type="text"
                  value={config.projectName}
                  onChange={(e) => updateField('projectName', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#090D16] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="artifact-domain-url"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Student Pack .tech / .me URL
                </label>
                <input
                  id="artifact-domain-url"
                  type="text"
                  value={config.domainUrl}
                  onChange={(e) => updateField('domainUrl', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs sm:text-sm font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="artifact-tagline"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                One-Sentence Value Proposition
              </label>
              <input
                id="artifact-tagline"
                type="text"
                value={config.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm bg-[#090D16] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <label
                  htmlFor="screen-1-input"
                  className="block text-xs font-semibold text-cyan-400 mb-1"
                >
                  Screen 1 (Input / Trigger)
                </label>
                <textarea
                  id="screen-1-input"
                  rows={2}
                  value={config.screen1Trigger}
                  onChange={(e) => updateField('screen1Trigger', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-[#090D16] border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="screen-2-input"
                  className="block text-xs font-semibold text-cyan-400 mb-1"
                >
                  Screen 2 (Visible 3-Tier Pipeline)
                </label>
                <textarea
                  id="screen-2-input"
                  rows={2}
                  value={config.screen2Pipeline}
                  onChange={(e) => updateField('screen2Pipeline', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-[#090D16] border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="screen-3-input"
                  className="block text-xs font-semibold text-cyan-400 mb-1"
                >
                  Screen 3 (Interactive Spatial / Visual Output)
                </label>
                <textarea
                  id="screen-3-input"
                  rows={2}
                  value={config.screen3Output}
                  onChange={(e) => updateField('screen3Output', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-[#090D16] border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="screen-4-input"
                  className="block text-xs font-semibold text-cyan-400 mb-1"
                >
                  Screen 4 (Closed-Loop Action)
                </label>
                <textarea
                  id="screen-4-input"
                  rows={2}
                  value={config.screen4ClosedLoop}
                  onChange={(e) => updateField('screen4ClosedLoop', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-[#090D16] border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </section>

          {/* 2. Canva Brand Kit Tokens (4 Hex Codes + Font Pair) */}
          <section className="bg-[#111827] border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-100 font-display pb-2 border-b border-slate-800">
              <Palette className="w-4 h-4 text-indigo-400" />
              <h2>2. Canva Brand Kit & Design Tokens</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="hex-bg-input"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Background Hex
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    aria-label="Background Color Picker"
                    value={config.hexBackground}
                    onChange={(e) => updateField('hexBackground', e.target.value)}
                    className="w-8 h-8 rounded bg-transparent border border-slate-700 cursor-pointer shrink-0"
                  />
                  <input
                    id="hex-bg-input"
                    type="text"
                    value={config.hexBackground}
                    onChange={(e) => updateField('hexBackground', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="hex-surface-input"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Surface Card Hex
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    aria-label="Surface Color Picker"
                    value={config.hexSurface}
                    onChange={(e) => updateField('hexSurface', e.target.value)}
                    className="w-8 h-8 rounded bg-transparent border border-slate-700 cursor-pointer shrink-0"
                  />
                  <input
                    id="hex-surface-input"
                    type="text"
                    value={config.hexSurface}
                    onChange={(e) => updateField('hexSurface', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="hex-accent-input"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Primary Accent Hex
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    aria-label="Accent Color Picker"
                    value={config.hexAccent}
                    onChange={(e) => updateField('hexAccent', e.target.value)}
                    className="w-8 h-8 rounded bg-transparent border border-slate-700 cursor-pointer shrink-0"
                  />
                  <input
                    id="hex-accent-input"
                    type="text"
                    value={config.hexAccent}
                    onChange={(e) => updateField('hexAccent', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="hex-alert-input"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Alert / Freeze Hex
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    aria-label="Alert Color Picker"
                    value={config.hexAlert}
                    onChange={(e) => updateField('hexAlert', e.target.value)}
                    className="w-8 h-8 rounded bg-transparent border border-slate-700 cursor-pointer shrink-0"
                  />
                  <input
                    id="hex-alert-input"
                    type="text"
                    value={config.hexAlert}
                    onChange={(e) => updateField('hexAlert', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="font-pair-select"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Typography Pairing
              </label>
              <select
                id="font-pair-select"
                value={config.fontPair}
                onChange={(e) => updateField('fontPair', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#090D16] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {FONT_PAIR_OPTIONS.map((fp) => (
                  <option key={fp} value={fp}>
                    {fp}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* 3. 3-Tier Hybrid AI DAG & Endpoint Contracts */}
          <section className="bg-[#111827] border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-100 font-display pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h2>3. 3-Tier Hybrid AI Pipeline & Schema</h2>
            </div>

            <div>
              <label
                htmlFor="tier1-model-input"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Tier 1 (&lt;10ms Local Encoder / Router)
              </label>
              <input
                id="tier1-model-input"
                type="text"
                value={config.tier1Model}
                onChange={(e) => updateField('tier1Model', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="tier2-model-input"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Tier 2 (Open-Weight Vision / Audio / Hybrid RAG)
              </label>
              <input
                id="tier2-model-input"
                type="text"
                value={config.tier2Model}
                onChange={(e) => updateField('tier2Model', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="tier3-model-input"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Tier 3 (Edge Gemma 4 + Cloud Gemini 4 Argon)
              </label>
              <input
                id="tier3-model-input"
                type="text"
                value={config.tier3Model}
                onChange={(e) => updateField('tier3Model', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="db-schema-textarea"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                DB & Hybrid Vector Index Schema
              </label>
              <textarea
                id="db-schema-textarea"
                rows={4}
                value={config.dbSchema}
                onChange={(e) => updateField('dbSchema', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono bg-[#090D16] border border-slate-800 rounded text-slate-200"
              />
            </div>
          </section>
        </div>

        {/* Right Column: Live Generated Artifact Preview & Download (7 cols) */}
        <div className="lg:col-span-7 bg-[#111827] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-4 sticky top-36">
          {/* Artifact File Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveArtifactTab('context_md')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeArtifactTab === 'context_md'
                    ? 'bg-cyan-400 text-slate-950 font-semibold'
                    : 'bg-[#090D16] text-slate-300 hover:text-slate-100 border border-slate-800'
                }`}
              >
                CONTEXT.md
              </button>
              <button
                type="button"
                onClick={() => setActiveArtifactTab('copilot_md')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeArtifactTab === 'copilot_md'
                    ? 'bg-cyan-400 text-slate-950 font-semibold'
                    : 'bg-[#090D16] text-slate-300 hover:text-slate-100 border border-slate-800'
                }`}
              >
                .github/copilot-instructions.md
              </button>
              <button
                type="button"
                onClick={() => setActiveArtifactTab('circuit_breaker')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeArtifactTab === 'circuit_breaker'
                    ? 'bg-cyan-400 text-slate-950 font-semibold'
                    : 'bg-[#090D16] text-slate-300 hover:text-slate-100 border border-slate-800'
                }`}
              >
                5500ms Circuit-Breaker
              </button>
              <button
                type="button"
                onClick={() => setActiveArtifactTab('demo_vault')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeArtifactTab === 'demo_vault'
                    ? 'bg-cyan-400 text-slate-950 font-semibold'
                    : 'bg-[#090D16] text-slate-300 hover:text-slate-100 border border-slate-800'
                }`}
              >
                demo_vault.json
              </button>
              <button
                type="button"
                onClick={() => setActiveArtifactTab('readme_md')}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeArtifactTab === 'readme_md'
                    ? 'bg-cyan-400 text-slate-950 font-semibold'
                    : 'bg-[#090D16] text-slate-300 hover:text-slate-100 border border-slate-800'
                }`}
              >
                Judge README.md
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeArtifactTab === 'circuit_breaker' && (
                <div className="flex items-center gap-1 bg-[#090D16] border border-slate-800 p-0.5 rounded">
                  <button
                    type="button"
                    onClick={() => setCircuitLang('ts')}
                    className={`px-2 py-1 text-xs font-mono rounded cursor-pointer ${
                      circuitLang === 'ts' ? 'bg-indigo-500 text-white' : 'text-slate-400'
                    }`}
                  >
                    TypeScript
                  </button>
                  <button
                    type="button"
                    onClick={() => setCircuitLang('py')}
                    className={`px-2 py-1 text-xs font-mono rounded cursor-pointer ${
                      circuitLang === 'py' ? 'bg-indigo-500 text-white' : 'text-slate-400'
                    }`}
                  >
                    Python
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleCopyFile}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  copiedLabel === currentFile.filename
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-[#090D16] hover:bg-slate-800 text-slate-100 border border-slate-700'
                }`}
              >
                {copiedLabel === currentFile.filename ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied {currentFile.filename}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Copy {currentFile.filename}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadFile}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Live Color Swatch Preview Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#090D16] border border-slate-800 px-3.5 py-2.5 rounded-md text-xs">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <span data-testid="active-artifact-filename">{currentFile.filename}</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm border border-slate-600 inline-block"
                  style={{ backgroundColor: config.hexBackground }}
                />
                {config.hexBackground}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm border border-slate-600 inline-block"
                  style={{ backgroundColor: config.hexSurface }}
                />
                {config.hexSurface}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm border border-slate-600 inline-block"
                  style={{ backgroundColor: config.hexAccent }}
                />
                {config.hexAccent}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-sm border border-slate-600 inline-block"
                  style={{ backgroundColor: config.hexAlert }}
                />
                {config.hexAlert}
              </span>
            </div>
          </div>

          {/* Live Code / Markdown Output */}
          <pre
            data-testid="artifact-code-preview"
            className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[640px] overflow-y-auto"
          >
            {currentFile.content}
          </pre>
        </div>
      </div>
    </div>
  );
};

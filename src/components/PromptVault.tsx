import React, { useState } from 'react';
import { Check, Copy, Sparkles, Terminal } from 'lucide-react';
import { PROMPT_VAULT_ITEMS, RoutingStage } from '../data/warRoomData.ts';
import { injectPromptVariables } from '../utils/warRoomLogic.ts';

interface PromptVaultProps {
  problemDomain: string;
  onChangeProblemDomain: (newDomain: string) => void;
}

const DOMAIN_PRESETS = [
  'Autonomous Microgrid & Substation Fault Triage',
  'Intraoperative Surgical Laparoscopy Vision & Voice Log Triage',
  'Maritime Port Container Anomaly & Customs Document Verification',
  'Wildfire Drone Thermal Perimeter & Emergency Radio Dispatch',
];

export const PromptVault: React.FC<PromptVaultProps> = ({
  problemDomain,
  onChangeProblemDomain,
}) => {
  const [stageFilter, setStageFilter] = useState<'ALL' | RoutingStage>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visiblePrompts = PROMPT_VAULT_ITEMS.filter(
    (p) => stageFilter === 'ALL' || p.stage === stageFilter
  );

  const handleCopyPrompt = async (promptId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback copy when clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(promptId);
    setTimeout(() => {
      setCopiedId((prev) => (prev === promptId ? null : prev));
    }, 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Dynamic Variable Injection Header */}
      <div className="bg-[#111827] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="text-xs font-mono text-cyan-400">
              ONE-CLICK PROMPT VAULT · DYNAMIC VARIABLE INJECTION
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
              Battle-Tested Prompts with Live [Problem Domain] Injection
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Type your target hackathon track or domain below. Every prompt template that uses{' '}
              <code className="font-mono text-cyan-300">[Problem Domain]</code> updates in real time
              for immediate 1-click copy into NotebookLM, Gemini Deep Research, Gemini 4 Argon, or
              DeepSeek-R1.
            </p>
          </div>

          {/* Stage Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#090D16] border border-slate-800 rounded-md">
            {(['ALL', 'Brain', 'Coder', 'Shipyard'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  stageFilter === st
                    ? 'bg-cyan-400 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'ALL' ? 'All 6 Prompts' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic [Problem Domain] Input Field & Quick Presets */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            <label
              htmlFor="dynamic-problem-domain-input"
              className="lg:col-span-3 text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Inject [Problem Domain]:</span>
            </label>
            <div className="lg:col-span-9">
              <input
                id="dynamic-problem-domain-input"
                type="text"
                value={problemDomain}
                onChange={(e) => onChangeProblemDomain(e.target.value)}
                placeholder="Enter your target hackathon problem domain..."
                className="w-full px-3.5 py-2 text-sm font-mono bg-[#090D16] border border-cyan-500/50 rounded-md text-cyan-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400">Quick Domain Presets:</span>
            {DOMAIN_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onChangeProblemDomain(preset)}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  problemDomain === preset
                    ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200 font-medium'
                    : 'bg-[#090D16] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6 Prompt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visiblePrompts.map((item) => {
          const renderedPrompt = injectPromptVariables(item.template, problemDomain);
          const isCopied = copiedId === item.id;

          return (
            <article
              key={item.id}
              data-testid={`prompt-card-${item.number}`}
              className="bg-[#111827] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400">
                      <span className="text-cyan-400 font-semibold">PROMPT 0{item.number}</span>
                      <span>·</span>
                      <span>{item.stage}</span>
                      <span>·</span>
                      <span className="tabular-nums">{item.phaseRef}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-100 font-display mt-1">
                      {item.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(item.id, renderedPrompt)}
                    aria-label={`Copy ${item.title}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Target Models:</span>
                  <span className="font-mono text-indigo-300">
                    {item.targetModels.join(' · ')}
                  </span>
                  {item.usesDynamicDomain && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-400 font-mono">Dynamic Domain Active</span>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{item.systemContext}</p>

                <pre
                  data-testid={`prompt-text-${item.number}`}
                  className="bg-[#090D16] border border-slate-800 rounded-md p-3.5 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-72 overflow-y-auto"
                >
                  {renderedPrompt}
                </pre>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

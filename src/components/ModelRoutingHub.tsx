import React, { useState } from 'react';
import { Cpu, RotateCcw, Search } from 'lucide-react';
import {
  MODEL_ROUTING_MATRIX,
  ModelRole,
  RoutingStage,
  TaskCategory,
} from '../data/warRoomData.ts';
import { filterModelRouting } from '../utils/warRoomLogic.ts';

interface ModelRoutingHubProps {
  initialSearchQuery?: string;
  onClearInitialSearch?: () => void;
}

const ROLE_OPTIONS: Array<'ALL' | ModelRole> = [
  'ALL',
  'Closed Frontier Subscription',
  'Open-Weight / Open-Source',
];

const STAGE_OPTIONS: Array<'ALL' | RoutingStage> = ['ALL', 'Brain', 'Coder', 'Shipyard'];

const TASK_CATEGORIES: Array<'ALL' | TaskCategory> = [
  'ALL',
  'Research & Rubric',
  'Ideation',
  'Red-Teaming',
  'Shaders & UI',
  'RAG & Embeddings',
  'Backend & DevOps',
  'Vision & Audio',
  'Hybrid Reasoning & Routing',
  'Quantization & Edge',
];

export const ModelRoutingHub: React.FC<ModelRoutingHubProps> = ({
  initialSearchQuery = '',
  onClearInitialSearch,
}) => {
  const [roleFilter, setRoleFilter] = useState<'ALL' | ModelRole>('ALL');
  const [stageFilter, setStageFilter] = useState<'ALL' | RoutingStage>('ALL');
  const [taskFilter, setTaskFilter] = useState<'ALL' | TaskCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const filteredModels = filterModelRouting(
    MODEL_ROUTING_MATRIX,
    roleFilter,
    stageFilter,
    taskFilter,
    searchQuery
  );

  const handleResetFilters = () => {
    setRoleFilter('ALL');
    setStageFilter('ALL');
    setTaskFilter('ALL');
    setSearchQuery('');
    onClearInitialSearch?.();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header & Strategy Distinction (Builder Models vs. Product Models) */}
      <div className="bg-[#111827] border border-slate-800 rounded-lg p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="text-xs font-mono text-cyan-400">
              MASTER MODEL & TOOL ROUTING HUB · 20 VERIFIED ENTRIES
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
              Multi-Model Routing Matrix (Brain · Coder · Shipyard)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Separate <strong>Builder Models</strong> (the frontier subscriptions that write your
              code, shaders, and Dockerfiles) from <strong>Product Models</strong> (the specialized
              open-weight encoders, vision segmenters, and hybrid RAG engines embedded inside your
              live demo).
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-300 bg-[#090D16] border border-slate-800 px-4 py-2.5 rounded-md tabular-nums">
            <div>
              <div className="text-slate-400">Showing Models</div>
              <div className="text-base font-bold text-cyan-400" data-testid="routing-count">
                {filteredModels.length} / {MODEL_ROUTING_MATRIX.length}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Filter Controls */}
        <div className="mt-5 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Search Input (4 cols) */}
          <div className="md:col-span-4">
            <label
              htmlFor="routing-search-input"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Search Model, Latency, or Use Case
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="routing-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., ModernBERT, SAM 3, Shader, ONNX..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#090D16] border border-slate-800 rounded-md text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Stage Segmented Filter (3 cols) */}
          <div className="md:col-span-3">
            <span className="block text-xs font-medium text-slate-300 mb-1.5">Stage Filter</span>
            <div className="flex items-center gap-1 p-1 bg-[#090D16] border border-slate-800 rounded-md">
              {STAGE_OPTIONS.map((stage) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setStageFilter(stage)}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    stageFilter === stage
                      ? 'bg-cyan-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {stage === 'ALL' ? 'All Stages' : stage}
                </button>
              ))}
            </div>
          </div>

          {/* Role Filter Select (3 cols) */}
          <div className="md:col-span-3">
            <label
              htmlFor="routing-role-select"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Model Role
            </label>
            <select
              id="routing-role-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as 'ALL' | ModelRole)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-[#090D16] border border-slate-800 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role === 'ALL' ? 'All Roles (Closed + Open-Weight)' : role}
                </option>
              ))}
            </select>
          </div>

          {/* Task Category Select (2 cols) */}
          <div className="md:col-span-2">
            <label
              htmlFor="routing-task-select"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Task Category
            </label>
            <select
              id="routing-task-select"
              value={taskFilter}
              onChange={(e) => setTaskFilter(e.target.value as 'ALL' | TaskCategory)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-[#090D16] border border-slate-800 rounded-md text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              {TASK_CATEGORIES.map((task) => (
                <option key={task} value={task}>
                  {task === 'ALL' ? 'All Tasks' : task}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Task Quick-Filter Bar */}
        <div className="mt-3 flex items-center justify-between gap-2 flex-wrap pt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {TASK_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTaskFilter(cat)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  taskFilter === cat
                    ? 'bg-indigo-500/20 border-indigo-400/60 text-indigo-200 font-medium'
                    : 'bg-[#090D16] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {(roleFilter !== 'ALL' ||
            stageFilter !== 'ALL' ||
            taskFilter !== 'ALL' ||
            searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-[#090D16] border border-slate-800 rounded cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* High-Density Routing Data Table */}
      {filteredModels.length === 0 ? (
        <div className="bg-[#111827] border border-slate-800 rounded-lg p-10 text-center space-y-3">
          <Cpu className="w-8 h-8 text-slate-500 mx-auto" />
          <div className="text-base font-bold text-slate-200 font-display">
            No Models Match Current Filter Criteria
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Clear your search query or reset the Role, Stage, and Task Category filters to view all
            20 routing entries across Brain, Coder, and Shipyard.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="bg-[#111827] border border-slate-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#090D16]/90 text-[11px] font-mono uppercase text-slate-400">
                  <th className="py-3 px-3.5">Model / Engine</th>
                  <th className="py-3 px-3.5">Stage · Phase</th>
                  <th className="py-3 px-3.5">Role</th>
                  <th className="py-3 px-3.5">Category</th>
                  <th className="py-3 px-3.5">Primary Tactical Function</th>
                  <th className="py-3 px-3.5 text-right">Target Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {filteredModels.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-slate-800/40 transition-colors align-top"
                  >
                    <td className="py-3 px-3.5 font-mono font-semibold text-cyan-300 max-w-[220px]">
                      {entry.modelName}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap text-xs text-slate-300 font-mono tabular-nums">
                      <span
                        className={
                          entry.stage === 'Brain'
                            ? 'text-amber-300'
                            : entry.stage === 'Coder'
                            ? 'text-cyan-300'
                            : 'text-emerald-300'
                        }
                      >
                        {entry.stage}
                      </span>
                      <span className="text-slate-600 mx-1">·</span>
                      <span className="text-slate-400">{entry.phaseRef}</span>
                    </td>
                    <td className="py-3 px-3.5 text-xs max-w-[165px]">
                      <span
                        className={
                          entry.role === 'Open-Weight / Open-Source'
                            ? 'text-emerald-300 font-medium'
                            : 'text-indigo-300 font-medium'
                        }
                      >
                        {entry.role}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap text-xs text-slate-300">
                      {entry.taskCategory}
                    </td>
                    <td className="py-3 px-3.5 max-w-[380px]">
                      <div className="font-semibold text-slate-100 text-xs sm:text-sm">
                        {entry.primaryUse}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {entry.tacticalNotes}
                      </p>
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono text-xs text-emerald-400 whitespace-nowrap tabular-nums">
                      {entry.latencyTarget}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

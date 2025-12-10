import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { Terminal, Clock, Trash2 } from 'lucide-react';

interface LoggerProps {
  logs: LogEntry[];
  onClear: () => void;
}

export const Logger: React.FC<LoggerProps> = ({ logs, onClear }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 flex flex-col h-64 md:h-80 overflow-hidden shadow-inner">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal size={16} />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider">Event Log</span>
        </div>
        <button 
          onClick={onClear}
          className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-red-400 transition-colors"
          title="Clear Logs"
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-2">
        {logs.length === 0 && (
          <div className="text-slate-600 italic text-center mt-10">
            Waiting for user interaction...
          </div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3">
            <span className="text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Clock size={10} />
              {log.timestamp}
            </span>
            <span className={`break-all ${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'action' ? 'text-blue-400' :
              log.type === 'warning' ? 'text-amber-400' :
              'text-slate-300'
            }`}>
              <span className="opacity-50 mr-2">{'>'}</span>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};
import React from 'react';
import { Bug, Smartphone, Monitor } from 'lucide-react';

export const Instructions: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
        <Bug className="text-yellow-500" />
        How to Reproduce the Crash
      </h3>
      <div className="space-y-4 text-sm text-slate-300">
        <div className="flex gap-4">
          <div className="mt-1 bg-slate-700 p-2 rounded-lg h-fit">
            <Smartphone size={20} className="text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">1. Prepare iPhone</p>
            <p>Settings &gt; Safari &gt; Advanced &gt; Enable <strong>Web Inspector</strong>.</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="mt-1 bg-slate-700 p-2 rounded-lg h-fit">
            <Monitor size={20} className="text-purple-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">2. Prepare Mac</p>
            <p>Connect iPhone via USB. Open Safari (Desktop) &gt; Develop &gt; [Your iPhone] &gt; Inspect this page.</p>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-900/50 p-3 rounded-lg text-red-200">
          <strong>Goal:</strong> Trigger an action below that causes the Web Inspector window on your Mac to close, disconnect, or freeze unexpectedly.
        </div>
      </div>
    </div>
  );
};
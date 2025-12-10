import React, { useState, useCallback } from 'react';
import { ExternalLink, Zap, Layout, AlertTriangle, Repeat } from 'lucide-react';
import { Button } from './components/Button';
import { Logger } from './components/Logger';
import { Instructions } from './components/Instructions';
import { LogEntry } from './types';

// Random image to ensure a proper page load happens
const TARGET_URL = 'https://picsum.photos/600/400';

export default function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    setLogs(prev => [...prev, entry]);
  }, []);

  const clearLogs = () => setLogs([]);

  // METHOD 1: Standard Blank
  const openStandard = () => {
    addLog("Attempting: window.open(url, '_blank')", 'action');
    try {
      const win = window.open(TARGET_URL, '_blank');
      if (win) {
        addLog("Success: Window handle returned", 'info');
      } else {
        addLog("Warning: Window handle is null (blocked?)", 'warning');
      }
    } catch (e: any) {
      addLog(`Error: ${e.message}`, 'error');
    }
  };

  // METHOD 2: Named Window (Reuses context if name exists)
  const openNamed = () => {
    const name = `debug_target_${Math.floor(Math.random() * 1000)}`;
    addLog(`Attempting: window.open(url, '${name}')`, 'action');
    try {
      const win = window.open(TARGET_URL, name);
      addLog(win ? "Success: Named window opened" : "Warning: Failed to open", win ? 'info' : 'warning');
    } catch (e: any) {
      addLog(`Error: ${e.message}`, 'error');
    }
  };

  // METHOD 3: Popup with Features (Often handled differently by iOS SpringBoard)
  const openPopup = () => {
    const features = 'width=500,height=600,resizable,scrollbars';
    addLog(`Attempting: window.open(url, '_blank', '${features}')`, 'action');
    try {
      const win = window.open(TARGET_URL, '_blank', features);
      addLog(win ? "Success: Popup opened" : "Warning: Blocked", win ? 'info' : 'warning');
    } catch (e: any) {
      addLog(`Error: ${e.message}`, 'error');
    }
  };

  // METHOD 4: Stress Test (Rapid Fire)
  // This is the most likely candidate to crash the debugger protocol
  const runStressTest = () => {
    addLog("WARNING: Starting Stress Test (5 opens in 500ms)", 'warning');
    let count = 0;
    const interval = setInterval(() => {
      count++;
      try {
        addLog(`Stress Test #${count}: Opening...`, 'action');
        window.open(`${TARGET_URL}?r=${Math.random()}`, '_blank');
      } catch (e: any) {
        addLog(`Error #${count}: ${e.message}`, 'error');
      }

      if (count >= 5) {
        clearInterval(interval);
        addLog("Stress Test Complete", 'info');
      }
    }, 100);
  };

  // METHOD 5: Self Replace
  const openSelf = () => {
    addLog("Attempting: window.open(url, '_self')", 'action');
    addLog("Inspector connection will likely be lost naturally here.", 'warning');
    setTimeout(() => {
        window.open(TARGET_URL, '_self');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="space-y-2 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">Safari Inspector <span className="text-blue-500">Killer</span></h1>
          <p className="text-slate-400">
            A utility to test WebKit Remote Inspector stability when handling new window creation contexts on iOS.
          </p>
        </header>

        {/* Instructions */}
        <Instructions />

        {/* Control Panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Zap className="text-blue-500" size={24} />
            Test Scenarios
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={openStandard} className="flex gap-2 items-center">
              <ExternalLink size={18} />
              Standard New Tab
            </Button>

            <Button onClick={openNamed} variant="secondary" className="flex gap-2 items-center">
              <Layout size={18} />
              Named Window
            </Button>

            <Button onClick={openPopup} variant="secondary" className="flex gap-2 items-center">
              <Layout size={18} />
              Popup (Features)
            </Button>

            <Button onClick={openSelf} variant="secondary" className="flex gap-2 items-center">
              <ExternalLink size={18} />
              Self Replace (_self)
            </Button>

             <Button onClick={runStressTest} variant="danger" className="col-span-1 sm:col-span-2 flex gap-2 items-center justify-center">
              <AlertTriangle size={18} />
              Stress Test (Rapid Fire)
            </Button>
          </div>
          <p className="text-xs text-slate-500 text-center">
            Note: Ensure "Block Pop-ups" is disabled in iOS Settings for this to work effectively.
          </p>
        </div>

        {/* Logs */}
        <div className="space-y-2">
           <h2 className="text-xl font-semibold text-white">Execution Log</h2>
           <Logger logs={logs} onClear={clearLogs} />
        </div>

      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ingestion() {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);
  const [logs, setLogs] = useState<{ text: string, status?: string }[]>([]);
  const [loadingTaskIndex, setLoadingTaskIndex] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const loadingTasks = [
    "Drink 2 glasses of water.",
    "Stand in your balcony for a moment.",
    "Look outside and admire nature.",
    "Take a quick washroom break.",
    "Stretch your arms and shoulders.",
    "Rest your eyes by looking at something 20 feet away.",
    "Do 5 deep breaths.",
    "Organize your physical desk space.",
    "Stand up and shake out your legs.",
    "Think of one thing you're grateful for.",
    "Text a friend you haven't spoken to in a while.",
    "Do a quick neck stretch.",
    "Close your eyes and count to 10.",
    "Roll your shoulders back 5 times.",
    "Plan your next meal.",
    "Jot down a quick to-do list for later.",
    "Check your posture and sit up straight.",
    "Pet a dog or cat if one is nearby.",
    "Tidy up your downloads folder.",
    "Smile, you're doing great!"
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isIngesting) {
      interval = setInterval(() => {
        setLoadingTaskIndex(prev => (prev + 1) % loadingTasks.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isIngesting]);

  const startIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    setIsIngesting(true);
    setLogs([{ text: 'Initialising secure connection...' }]);

    try {
      // Simulate some initial terminal activity
      setTimeout(() => setLogs(prev => [...prev, { text: 'Cloning repository from remote...' }]), 1000);
      setTimeout(() => setLogs(prev => [...prev, { text: 'Reading manifest files and extracting AST...' }]), 2500);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/analyze-repo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status} - Failed to analyze repository`);

      const data = await response.json();

      setLogs(prev => [
        ...prev,
        { text: 'Generating high-dimensional embeddings (Sentence-BERT)...' },
        { text: 'Saving vector records to ChromaDB...' },
        { text: `Process complete. ${data.chunks_processed} chunks indexed.`, status: 'SUCCESS' }
      ]);

      setTimeout(() => {
        navigate('/analysis', { state: { files: data.files || [] } });
      }, 2000);

    } catch (error) {
      setLogs(prev => [...prev, { text: `Error: ${error instanceof Error ? error.message : String(error)}`, status: 'ERROR' }]);
      setIsIngesting(false);
    }
  };

  useEffect(() => {
    // Auto scroll to bottom
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className={`dark bg-[#0a0a0a] text-gray-200 font-sans min-h-screen selection:bg-brand selection:text-black w-full min-h-screen relative`}>
      {/*  BEGIN: Layout Wrapper  */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
        {/*  BEGIN: Ingestion Container  */}
        <div className="relative z-10 w-full max-w-2xl space-y-8 animate-in fade-in duration-1000" data-purpose="ingestion-card">
          {/*  Header Section  */}
          <header className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-brand uppercase">DataStore Ingestion</h1>
            <p className="text-gray-400 font-light">Enter a GitHub repository URL to begin deep architectural analysis.</p>
          </header>
          {/*  BEGIN: Input Form  */}
          {/*  BEGIN: Dynamic Input/Loading Section  */}
          {!isIngesting ? (
            <section className="glass-effect p-8 rounded-custom shadow-2xl animate-in fade-in zoom-in duration-500" data-purpose="input-section">
              <form className="space-y-4" onSubmit={startIngestion}>
                <div className="relative">
                  <label className="block text-xs font-semibold text-brand-light mb-2 uppercase tracking-widest" htmlFor="repo-url">Repository URL</label>
                  <div className="flex items-center">
                    <input
                      className="w-full bg-surface-input border-gray-800 focus:border-brand focus:ring-1 focus:ring-brand text-gray-100 px-4 py-3 rounded-custom transition-all"
                      id="repo-url"
                      placeholder="https://github.com/username/repository"
                      type="text"
                      value={repoUrl}
                      onChange={e => setRepoUrl(e.target.value)}
                      disabled={isIngesting}
                    />
                    <button
                      className={`ml-3 px-8 py-3 bg-brand hover:bg-brand-light text-black font-bold rounded-custom transition-colors duration-200 active:scale-95 whitespace-nowrap ${isIngesting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      type="submit"
                      disabled={isIngesting}
                    >
                      INGEST REPOSITORY
                    </button>
                  </div>
                </div>
              </form>
            </section>
          ) : (
            <section className="glass-effect p-12 rounded-custom shadow-2xl flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500 border border-[#d4a73d]/30" data-purpose="loading-section">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-[#d4a73d] animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-[#d4a73d]/60 animate-[spin_2s_linear_infinite_reverse]"></div>
                <div className="absolute inset-4 rounded-full border-t-2 border-[#d4a73d]/30 animate-[spin_3s_linear_infinite]"></div>
                <div className="w-3 h-3 bg-[#d4a73d] rounded-full animate-pulse shadow-[0_0_15px_#d4a73d]"></div>
              </div>
              <div className="text-center space-y-4 max-w-sm">
                <h2 className="text-[#d4a73d] font-bold tracking-[0.2em] uppercase text-sm">This might take a while...</h2>
                <div className="h-12 flex items-center justify-center">
                  <p className="text-sm text-[#d4a73d]/80 font-mono italic animate-in fade-in slide-in-from-bottom-2 duration-500" key={loadingTaskIndex}>
                    {loadingTasks[loadingTaskIndex]}
                  </p>
                </div>
              </div>
            </section>
          )}
          {/*  END: Dynamic Input/Loading Section  */}
          {/*  END: Input Form  */}
          {/*  BEGIN: Terminal Output  */}
          <section className="bg-black border border-gray-800 rounded-custom shadow-2xl overflow-hidden font-mono text-sm" data-purpose="terminal-log">
            <div className="bg-zinc-900 px-4 py-2 border-b border-gray-800 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-brand/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-zinc-500 text-[10px] uppercase tracking-tighter">System Output</span>
            </div>
            <div className="p-6 h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-brand scrollbar-track-transparent" id="terminal-content">
              {/*  Initial state  */}
              {!isIngesting && <div className="text-zinc-500 italic">Waiting for input...</div>}
              {/*  Mock Log Items dynamically added  */}
              {logs.map((log, i) => (
                <div key={i} className="flex space-x-3 transition-opacity animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <span className="text-brand shrink-0">[$]</span>
                  <span className={log.status === 'SUCCESS' ? 'text-green-500 font-bold' : 'text-gray-300'}>
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </section>
          {/*  END: Terminal Output  */}
          {/* Footer info removed per request */}
        </div>
        {/*  END: Ingestion Container  */}
      </main>
      {/*  END: Layout Wrapper  */}

    </div>
  );
}

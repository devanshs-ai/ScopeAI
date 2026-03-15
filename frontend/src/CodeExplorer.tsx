import { useNavigate } from 'react-router-dom';

export default function CodeExplorer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e5e3] font-sans flex flex-col relative overflow-hidden selection:bg-[#b38a23] selection:text-black">
      {/* Top Navigation */}
      <nav className="h-16 border-b border-[#242424] flex items-center justify-between px-8 bg-[#0a0a0a] z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#b38a23] text-black font-bold flex items-center justify-center text-sm cursor-pointer" onClick={() => navigate('/')}>
            &lt;&gt;
          </div>
          <div className="font-bold tracking-wide text-lg">
            <span className="text-white cursor-pointer" onClick={() => navigate('/')}>CodeExplorer</span>
            <span className="text-[#9ca3af] mx-2">/</span>
            <span className="text-[#b38a23]">core-engine</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <button className="text-[#9ca3af] hover:text-white transition-colors">History</button>
          <button className="text-[#9ca3af] hover:text-white transition-colors">Pull Requests</button>
          <button className="text-[#9ca3af] hover:text-white transition-colors">Insights</button>
          <div className="w-px h-4 bg-[#242424]"></div>
          <button className="bg-[#b38a23] hover:bg-[#d4a73d] text-black font-bold px-4 py-2 rounded-sm transition-colors text-xs uppercase tracking-wider">
            Clone Repository
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 z-10 flex flex-col gap-8 max-w-[1400px] w-full mx-auto hidden-scrollbar">

        {/* Header Header */}
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="border border-[#b38a23]/30 text-[#b38a23] bg-[#b38a23]/10 px-2 py-0.5 rounded-sm uppercase tracking-widest">
                Public
              </span>
              <span className="text-[#9ca3af]">
                Last commit: 2 hours ago by @mark_z
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              Distributed Graph Protocol
            </h1>

            <p className="text-[#9ca3af] leading-relaxed">
              High-performance engine for mapping social connections across decentralized nodes.<br />
              Built with Rust and optimized for low-latency traversal.
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <button className="flex items-center gap-2 border border-[#242424] hover:border-[#b38a23]/50 bg-[#121212] px-4 py-2 rounded-sm text-sm transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b38a23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>1,204 Stars</span>
            </button>
            <button className="flex items-center gap-2 border border-[#242424] hover:border-[#b38a23]/50 bg-[#121212] px-4 py-2 rounded-sm text-sm transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b38a23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path><path d="M12 12v3"></path></svg>
              <span>48 Forks</span>
            </button>
          </div>
        </header>

        {/* File Explorer Table */}
        <div className="border border-[#242424] rounded-sm bg-[#121212] overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#242424] bg-[#0a0a0a] text-xs font-bold text-[#9ca3af] uppercase tracking-wider">
            <div className="col-span-4 pl-2">Name</div>
            <div className="col-span-8">AI Architecture Summary</div>
          </div>

          <div className="flex flex-col text-sm">
            {/* Folder 1 */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#242424] hover:bg-[#1a1a1a] transition-colors group cursor-pointer">
              <div className="col-span-4 flex items-center gap-3 pl-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b38a23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span className="font-medium text-white group-hover:text-[#b38a23] transition-colors">src</span>
              </div>
              <div className="col-span-8 text-[#9ca3af] italic flex items-center">
                Contains core logic, including the graph traversal engine and node balancing algorithms.
              </div>
            </div>

            {/* Folder 2 */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#242424] hover:bg-[#1a1a1a] transition-colors group cursor-pointer">
              <div className="col-span-4 flex items-center gap-3 pl-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b38a23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span className="font-medium text-white group-hover:text-[#b38a23] transition-colors">tests</span>
              </div>
              <div className="col-span-8 text-[#9ca3af] italic flex items-center">
                Automated stress tests simulating million-node workloads and collision scenarios.
              </div>
            </div>

            {/* File 1 */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#242424] hover:bg-[#1a1a1a] transition-colors group cursor-pointer">
              <div className="col-span-4 flex items-center gap-3 pl-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span className="font-medium text-[#e0e5e3] group-hover:text-white transition-colors">Cargo.toml</span>
              </div>
              <div className="col-span-8 text-[#9ca3af] italic flex items-center">
                Manifest file defining crate dependencies and workspace configurations.
              </div>
            </div>

            {/* File 2 */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#242424] hover:bg-[#1a1a1a] transition-colors group cursor-pointer">
              <div className="col-span-4 flex items-center gap-3 pl-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span className="font-medium text-[#e0e5e3] group-hover:text-white transition-colors">README.md</span>
              </div>
              <div className="col-span-8 text-[#9ca3af] italic flex items-center">
                Project overview, installation guide, and architectural philosophy documentation.
              </div>
            </div>

            {/* File 3 */}
            <div className="grid grid-cols-12 gap-4 p-4 hover:bg-[#1a1a1a] transition-colors group cursor-pointer">
              <div className="col-span-4 flex items-center gap-3 pl-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span className="font-medium text-[#e0e5e3] group-hover:text-white transition-colors">LICENSE</span>
              </div>
              <div className="col-span-8 text-[#9ca3af] italic flex items-center">
                Open-source MIT license terms.
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121212] border border-[#242424] p-6 rounded-sm flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#b38a23] uppercase tracking-widest">Network Analysis</h3>
            <p className="text-sm text-[#e0e5e3] leading-relaxed">
              AI predicts a potential scaling bottleneck in <span className="text-[#b38a23] font-mono">node_sync.rs</span> during peak concurrent writes.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#242424] p-6 rounded-sm flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Security Pulse</h3>
            <p className="text-sm text-[#e0e5e3] leading-relaxed">
              All dependencies verified. No vulnerabilities detected in the current dependency tree.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#242424] p-6 rounded-sm flex flex-col gap-4">
            <h3 className="text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Contributor Velocity</h3>
            <p className="text-sm text-[#e0e5e3] leading-relaxed">
              Weekly commit frequency is up by 14%. Core engine optimization is the primary focus.
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#242424] p-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6b7280] font-mono mt-auto shrink-0 bg-[#0a0a0a]">
        <div>
          © thedarknight
        </div>
      </footer>
    </div>
  );
}

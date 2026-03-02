export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-black text-xs">
            H
          </div>
          <span className="text-slate-500 text-sm font-mono">Harsh Shrivas</span>
        </div>
        <p className="text-slate-600 text-xs font-mono">
          © {new Date().getFullYear()} · Built with Next.js & Tailwind CSS
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/harshshrivas8055"
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 hover:text-slate-300 transition-colors text-xs font-mono"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/harsh-shrivas-b0668b214"
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 hover:text-slate-300 transition-colors text-xs font-mono"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
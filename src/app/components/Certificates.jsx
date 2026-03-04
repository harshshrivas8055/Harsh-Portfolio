"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

// ─── Add your certificates here ─────────────────────────────────────────────
const certificates = [
  {
    title: "Data Analytics with Python",
    issuer: "NPTEL",
    icon: "🟩",
  },
];
// ────────────────────────────────────────────────────────────────────────────

// Issuer → brand color mapping
const issuerColors = {
  "NPTEL": { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },

};

const defaultColor = { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" };

function CertCard({ cert, index, inView }) {
  const color = issuerColors[cert.issuer] || defaultColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <TiltCard intensity={8} className="group h-full">
        <div className="glass-card rounded-2xl p-5 md:p-6 hover:border-blue-500/25 transition-all duration-300 h-full flex flex-col gap-4">

          {/* Top row: icon + issuer badge */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
              {cert.icon}
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${color.bg} ${color.border} ${color.text}`}>
              {cert.issuer}
            </span>
          </div>

          {/* Title */}
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-semibold text-white leading-snug group-hover:text-blue-300 transition-colors duration-300">
              {cert.title}
            </h3>
          </div>

          {/* Bottom: verified badge */}
          <div className="flex items-center gap-1.5 pt-3 border-t border-slate-800">
            <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-.723 3.065 3.745 3.745 0 01-3.065.723A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.065-.723 3.745 3.745 0 01-.723-3.065A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 01.723-3.065 3.746 3.746 0 013.065-.723A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.065.723 3.746 3.746 0 01.723 3.065A3.745 3.745 0 0121 12z" />
            </svg>
            <span className="text-xs text-slate-500 font-mono">Verified Certificate</span>
          </div>

        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="certificates" ref={ref} className="py-16 md:py-28 px-4 md:px-6 max-w-5xl mx-auto">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8 md:mb-14">
          <span className="text-blue-500 font-mono text-sm flex-shrink-0">05.</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">Certificates</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
      </motion.div>

      {/* Count badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 flex items-center gap-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-blue-400 text-xs font-mono">{certificates.length} Certificates Earned</span>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {certificates.map((cert, i) => (
          <CertCard key={i} cert={cert} index={i} inView={inView} />
        ))}
      </div>

    </section>
  );
}
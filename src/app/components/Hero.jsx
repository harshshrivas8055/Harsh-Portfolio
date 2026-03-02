"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";

const ROLES = [
  "Full Stack MERN Developer",
  "Backend Engineer",
  "ReactJS Developer",
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const typedRole = useTypewriter(ROLES, { typingSpeed: 70, deletingSpeed: 40, pauseMs: 2000 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      <div className="absolute inset-0 grid-bg" />

      {/* Glow — smaller on mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-[280px] h-[280px] md:w-[700px] md:h-[700px] rounded-full bg-blue-600/10 blur-[80px] md:blur-[130px]"
        />
      </div>

      {/* Floating orbs — hidden on mobile to avoid clutter */}
      <div className="hidden md:block">
        {[
          { top: "22%", left: "18%", size: 3, delay: 0, color: "bg-blue-400/50" },
          { top: "35%", right: "22%", size: 2, delay: 1.2, color: "bg-cyan-400/50" },
          { bottom: "30%", left: "32%", size: 4, delay: 2.4, color: "bg-blue-500/30" },
          { top: "60%", right: "15%", size: 2, delay: 0.8, color: "bg-slate-400/30" },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${orb.color}`}
            style={{
              top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
              width: orb.size, height: orb.size,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center w-full max-w-3xl mx-auto py-32 md:py-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs md:text-sm mb-6 md:mb-8 backdrop-blur-sm"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400 block flex-shrink-0"
          />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <div className="mb-3 md:mb-4 leading-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-white"
          >
            Harsh
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-gradient"
          >
            Shrivas
          </motion.div>
        </div>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xs sm:text-sm md:text-xl font-mono tracking-widest uppercase mb-5 md:mb-6 h-7 md:h-8 flex items-center justify-center gap-1"
        >
          <span className="text-slate-400 truncate max-w-[280px] sm:max-w-none">{typedRole}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-4 md:h-5 bg-blue-400 ml-0.5 flex-shrink-0"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed px-2"
        >
          I architect scalable, secure web applications with the MERN stack —
          with deep focus on backend systems, API design, and clean architecture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 md:py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-sm md:text-base text-center"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 md:py-3.5 border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white rounded-xl font-semibold transition-all duration-300 text-sm md:text-base backdrop-blur-sm text-center"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-slate-600 text-xs hidden md:flex"
        >
          <span className="tracking-widest uppercase font-mono text-[10px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
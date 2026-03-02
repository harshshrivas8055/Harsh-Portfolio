"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const stats = [
  { value: "2+", label: "Internships" },
  { value: "3+", label: "Projects" },
  { value: "MERN", label: "Stack" },
  { value: "B.Tech.", label: "CSE Graduate" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" ref={ref} className="py-16 md:py-28 px-4 md:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          <span className="text-blue-500 font-mono text-sm flex-shrink-0">01.</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
      </motion.div>

      {/* Stats grid — top on mobile, right on desktop */}
      <div className="grid grid-cols-2 gap-3 mb-8 md:hidden">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
          >
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
        {/* Text */}
        <div className="md:col-span-3 space-y-4 md:space-y-5">
          {[
            "I'm a Computer Science graduate with hands-on experience in full-stack development through internships and real-world projects.",
            "My primary focus is backend engineering using Node.js, Express, and MongoDB — designing RESTful APIs, implementing secure authentication systems, and structuring applications using clean architecture patterns.",
            "I'm currently seeking opportunities as a Backend or MERN Stack Developer to contribute to building scalable and production-ready applications.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="text-slate-400 leading-relaxed text-sm md:text-base"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Stats — desktop only (hidden on mobile, shown above) */}
        <div className="md:col-span-2 grid-cols-2 gap-4 hidden md:grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <TiltCard intensity={10} className="group">
                <div className="glass-card rounded-xl p-5 text-center hover:border-blue-500/30 transition-colors">
                  <div className="text-3xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                    {stat.label}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const experiences = [
  {
    role: "Frontend Developer Intern",
    company: "Mamo Technolabs LLP",
    type: "Internship",
    highlights: [
      "Developed responsive UI for a role-based School Management System.",
      "Integrated REST APIs for attendance and performance tracking.",
      "Optimized state management using Redux Toolkit.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "AliveCreate Web Solution",
    type: "Internship",
    highlights: [
      "Built full-stack features using MERN stack and Next.js.",
      "Designed and consumed RESTful APIs.",
      "Implemented authentication flows and protected routes.",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="experience" ref={ref} className="py-16 md:py-28 px-4 md:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8 md:mb-14">
          <span className="text-blue-500 font-mono text-sm flex-shrink-0">03.</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
      </motion.div>

      <div className="relative">
        {/* Timeline line — desktop only */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-slate-700 to-transparent hidden md:block" />

        <div className="space-y-6 md:space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="md:pl-14 relative"
            >
              {/* Timeline dot — desktop only */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                className="absolute left-0 top-6 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/50 items-center justify-center hidden md:flex"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </motion.div>

              <TiltCard intensity={5} className="group">
                <div className="glass-card rounded-2xl p-5 md:p-7 hover:border-blue-500/25 transition-all duration-300">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4 md:mb-5">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base md:text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors leading-snug">
                        {exp.role}
                      </h3>
                      <p className="text-blue-400 font-mono text-xs md:text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono flex-shrink-0">
                      {exp.type}
                    </span>
                  </div>

                  <ul className="space-y-2 md:space-y-2.5">
                    {exp.highlights.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.15 + j * 0.06 + 0.2 }}
                        className="flex items-start gap-2 md:gap-3 text-slate-400 text-xs md:text-sm leading-relaxed"
                      >
                        <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
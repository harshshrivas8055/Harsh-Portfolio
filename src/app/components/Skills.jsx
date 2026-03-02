"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const skillGroups = [
  { label: "Languages", icon: "{ }", skills: ["JavaScript (ES6+)"] },
  { label: "Frontend", icon: "◈", skills: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS", "Material UI"] },
  { label: "Backend", icon: "⚙", skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Middleware", "Error Handling"] },
  { label: "Database", icon: "◉", skills: ["MongoDB", "Schema Design", "CRUD Operations"] },
  { label: "Tools", icon: "⌧", skills: ["Git", "GitHub", "Postman", "Vercel"] },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" ref={ref} className="py-16 md:py-28 px-4 md:px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8 md:mb-14">
          <span className="text-blue-500 font-mono text-sm flex-shrink-0">02.</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">Technical Skills</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
      </motion.div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <TiltCard intensity={6} className="group h-full">
              <div className="glass-card rounded-2xl p-5 md:p-6 hover:border-blue-500/20 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-blue-400 text-base md:text-lg font-mono">{group.icon}</span>
                  <h3 className="text-white font-bold text-xs md:text-sm uppercase tracking-widest">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.08 + j * 0.04 + 0.15 }}
                      className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
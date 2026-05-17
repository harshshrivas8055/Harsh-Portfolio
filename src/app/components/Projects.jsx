"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";

const projects = [
  {
    num: "01",
    title: "Image Optimizer Web App",
    description:
      "Full-stack MERN application with secure image upload and compression pipeline.",
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Multer",
      "Sharp",
      "React",
    ],
    features: [
      "JWT-based authentication system",
      "Multer file upload handling",
      "Sharp image compression engine",
      "Protected backend routes",
    ],
    github: "https://github.com/harshshrivas8055",
  },

  {
    num: "02",
    title: "School Management System",
    description:
      "Role-based academic management platform with multi-dashboard architecture.",
    tech: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "MongoDB",
      "REST API",
    ],
    features: [
      "Admin, Teacher & Student dashboards",
      "Attendance tracking module",
      "Performance management system",
      "Role-based access control",
    ],
    github: "https://github.com/harshshrivas8055",
  },

  {
    num: "03",
    title: "To-Do App with Authentication",
    description:
      "Secure CRUD-based task management with persistent user sessions.",
    tech: ["MERN Stack", "JWT", "MongoDB"],
    features: [
      "Full user authentication flow",
      "Protected routes & sessions",
      "MongoDB data persistence",
      "Clean REST API design",
    ],
    github: "https://github.com/harshshrivas8055",
  },

  {
    num: "04",
    title: "QRBite",
    description:
      "QR-based digital menu platform for restaurants with live ordering experience.",
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Railway",
      "NextJS",
    ],
    features: [
      "QR code menu generation",
      "Digital menu management",
      "Live order system",
      "Anlyasis and generate monthly report",
      "Location based ordering",
    ],
    github: "https://github.com/harshshrivas8055/QRBite",
    live: "https://qrbite-production.up.railway.app/",
  },
];

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
      }}
    >
      <TiltCard intensity={7} className="h-full group">
        <div
          className="
          glass-card
          rounded-2xl
          p-6
          border border-slate-800
          hover:border-blue-500/40
          transition-all duration-500
          h-full flex flex-col
          hover:-translate-y-2
        "
        >
          {/* top section */}

          <div className="flex justify-between items-start mb-5">
            <span
              className="
              text-5xl
              font-black
              font-mono
              text-slate-800
              group-hover:text-blue-900/50
              transition
            "
            >
              {project.num}
            </span>

            <div className="flex gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live Demo"
                  className="
                  p-2
                  text-slate-500
                  hover:text-blue-400
                  transition
                "
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="
                p-2
                text-slate-500
                hover:text-blue-400
                transition
              "
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <h3
            className="
            text-lg
            font-bold
            text-white
            mb-2
            group-hover:text-blue-300
            transition
          "
          >
            {project.title}
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {project.description}
          </p>

          <ul className="space-y-2 flex-1">
            {project.features.map((feature, i) => (
              <li
                key={i}
                className="
                text-xs
                text-slate-500
                flex gap-2
                items-start
              "
              >
                <span className="text-blue-500 mt-[2px]">
                  ▸
                </span>

                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-slate-800">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="
                text-xs
                font-mono
                bg-slate-800/80
                text-slate-400
                px-2 py-1
                rounded
              "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      id="projects"
      ref={ref}
      className="
      py-24
      px-6
      max-w-6xl
      mx-auto
    "
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <div className="flex items-center gap-3 mb-14">
          <span className="text-blue-500 font-mono">
            04.
          </span>

          <h2 className="text-3xl font-black text-white">
            Projects
          </h2>

          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
      </motion.div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      "
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}
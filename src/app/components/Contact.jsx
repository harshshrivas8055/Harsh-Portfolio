"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import TiltCard from "./TiltCard";

// ─── Loaded from .env.local ──────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
// ────────────────────────────────────────────────────────────────────────────

const contacts = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "harshkumarshrivas128@gmail.com",
    href: "mailto:harshkumarshrivas128@gmail.com",
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/harshshrivas8055",
    href: "https://github.com/harshshrivas8055",
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/harsh-shrivas",
    href: "https://linkedin.com/in/harsh-shrivas-b0668b214",
  },
];

const INITIAL_FORM = { from_name: "", from_email: "", subject: "", message: "" };

function validate(fields) {
  const errors = {};
  if (!fields.from_name.trim()) errors.from_name = "Name is required";
  if (!fields.from_email.trim()) errors.from_email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.from_email))
    errors.from_email = "Invalid email address";
  if (!fields.subject.trim()) errors.subject = "Subject is required";
  if (!fields.message.trim()) errors.message = "Message is required";
  else if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
}

function InputField({ label, name, type = "text", value, onChange, onBlur, error, placeholder, touched }) {
  const showError = touched && error;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-slate-500">
        {label} <span className="text-blue-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : "off"}
        className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:bg-white/8
          ${showError
            ? "border-red-500/60 focus:border-red-400"
            : "border-slate-700 focus:border-blue-500/60 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
          }`}
      />
      <AnimatePresence>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-400 flex items-center gap-1"
          >
            <span>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [fields, setFields] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ from_name: true, from_email: true, subject: true, message: true });
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Guard: check env vars are loaded
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setErrorMsg("EmailJS keys are missing. Check your .env.local file.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // Using emailjs.send() with explicit template params —
      // more reliable than sendForm(), no form ref needed.
      // These keys MUST match your EmailJS template variables exactly.
      const templateParams = {
        from_name:  fields.from_name,
        from_email: fields.from_email,
        subject:    fields.subject,
        message:    fields.message,
        to_name:    "Harsh",          // optional — use {{to_name}} in template
        reply_to:   fields.from_email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFields(INITIAL_FORM);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      const msg =
        err?.text ||
        err?.message ||
        `Error ${err?.status ?? ""}: Check your Service ID, Template ID, and Public Key in .env.local`;
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  const resetStatus = () => {
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section id="contact" ref={ref} className="py-16 md:py-28 px-4 md:px-6 max-w-5xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8 md:mb-14">
          <span className="text-blue-500 font-mono text-sm flex-shrink-0">05.</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">Get In Touch</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 md:gap-10 items-start">

        {/* ── LEFT: info + links ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Let's work together</h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              I'm open to Backend and MERN Stack Developer opportunities. Drop me a message
              and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-3">
            {contacts.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              >
                <TiltCard intensity={5} className="group">
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    data-hover
                    className="flex items-center gap-3 glass-card p-3.5 rounded-xl hover:border-blue-500/30 transition-all duration-300 touch-manipulation"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                      {c.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-0.5">{c.label}</div>
                      <div className="text-xs md:text-sm text-slate-300 group-hover:text-blue-300 transition-colors truncate">{c.value}</div>
                    </div>
                    <span className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0">↗</span>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: contact form ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <TiltCard intensity={4} className="group">
            <div className="glass-card rounded-2xl p-5 md:p-7 hover:border-blue-500/20 transition-all duration-300">

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">Message Sent! 🎉</h4>
                      <p className="text-slate-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
                    </div>
                    <button
                      onClick={resetStatus}
                      className="mt-2 px-5 py-2 text-sm border border-slate-700 hover:border-blue-500/40 text-slate-400 hover:text-white rounded-lg transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>

                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        label="Your Name"
                        name="from_name"
                        value={fields.from_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.from_name}
                        touched={touched.from_name}
                        placeholder="John Doe"
                      />
                      <InputField
                        label="Email Address"
                        name="from_email"
                        type="email"
                        value={fields.from_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.from_email}
                        touched={touched.from_email}
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Subject */}
                    <InputField
                      label="Subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.subject}
                      touched={touched.subject}
                      placeholder="Job opportunity / Freelance project / Just saying hi"
                    />

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono uppercase tracking-widest text-slate-500">
                        Message <span className="text-blue-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={fields.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        placeholder="Tell me about your project, opportunity, or just say hello..."
                        className={`bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none resize-none transition-all duration-200
                          ${touched.message && errors.message
                            ? "border-red-500/60 focus:border-red-400"
                            : "border-slate-700 focus:border-blue-500/60 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
                          }`}
                      />
                      <AnimatePresence>
                        {touched.message && errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-xs text-red-400 flex items-center gap-1"
                          >
                            <span>⚠</span> {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                        >
                          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                          <span className="flex-1 break-words">{errorMsg || "Something went wrong. Please try again."}</span>
                          <button onClick={resetStatus} className="text-red-400/60 hover:text-red-300 flex-shrink-0">✕</button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      {status === "loading" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
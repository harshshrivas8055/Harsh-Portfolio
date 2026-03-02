"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 28, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 300, mass: 0.5 });
  const trailSpringX = useSpring(trailX, { damping: 40, stiffness: 150, mass: 0.8 });
  const trailSpringY = useSpring(trailY, { damping: 40, stiffness: 150, mass: 0.8 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect touch device
    const touch = window.matchMedia("(hover: none)").matches || window.innerWidth < 768;
    setIsTouchDevice(touch);
  }, []);

  useEffect(() => {
    if (!mounted || isTouchDevice) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const over = (e) => setIsHovering(!!e.target.closest("a, button, [data-hover]"));

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, [mounted, isTouchDevice, isVisible]);

  // Don't render on touch/mobile devices
  if (!mounted || isTouchDevice) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-blue-400/40"
        style={{ x: trailSpringX, y: trailSpringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
          backgroundColor: isHovering ? "rgba(59,130,246,0.08)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-blue-400 w-1.5 h-1.5"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
          boxShadow: isHovering
            ? "0 0 12px 3px rgba(59,130,246,0.6)"
            : "0 0 6px 1px rgba(59,130,246,0.3)",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
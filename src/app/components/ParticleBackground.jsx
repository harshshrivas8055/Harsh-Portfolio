"use client";

import { useEffect, useRef } from "react";

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 55;

    let animId;
    let particles = [];

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: randomBetween(0, canvas.width),
        y: randomBetween(0, canvas.height),
        r: randomBetween(0.5, isMobile ? 1.5 : 2.2),
        vx: randomBetween(-0.1, 0.1),
        vy: randomBetween(-0.15, -0.04),
        opacity: randomBetween(0.08, isMobile ? 0.3 : 0.5),
        twinkleSpeed: randomBetween(0.005, 0.015),
        twinkleOffset: randomBetween(0, Math.PI * 2),
        color: Math.random() > 0.6 ? "96,165,250" : Math.random() > 0.5 ? "34,211,238" : "148,163,184",
        isStar: !isMobile && Math.random() > 0.55,
      }));
    };

    initCanvas();
    initParticles();

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
        const twinkle = Math.sin(frame * p.twinkleSpeed + p.twinkleOffset);
        const alpha = p.opacity * (0.6 + 0.4 * twinkle);

        if (p.isStar && p.r > 1.4) {
          const size = p.r * 2.2;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = `rgba(${p.color},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-size, 0); ctx.lineTo(size, 0);
          ctx.moveTo(0, -size); ctx.lineTo(0, size);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${alpha * 1.4})`;
          ctx.fill();
          ctx.restore();
        } else {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
          grd.addColorStop(0, `rgba(${p.color},${alpha})`);
          grd.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Debounced resize
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCanvas();
        initParticles();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.65 }}
    />
  );
}
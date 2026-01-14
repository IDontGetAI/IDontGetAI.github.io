import { useEffect, useMemo, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type NeuralTopologyCanvasProps = {
  className?: string;
  particleAmount?: number;
  linkRadius?: number;
  baseSpeed?: number;
  variantSpeed?: number;
  particleRadius?: number;
};

export function NeuralTopologyCanvas({
  className,
  particleAmount = 80,
  linkRadius = 120,
  baseSpeed = 0.3,
  variantSpeed = 0.5,
  particleRadius = 2,
}: NeuralTopologyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const config = useMemo(() => {
    return {
      particleAmount,
      linkRadius,
      baseSpeed,
      variantSpeed,
      particleRadius,
      repelRadius: 90,
      repelStrength: 0.06,
    };
  }, [baseSpeed, linkRadius, particleAmount, particleRadius, variantSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particleColor = "rgba(189, 0, 255, 0.65)";
    const lineColorPrefix = "rgba(189, 0, 255,";

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedParticles = () => {
      const { w, h } = sizeRef.current;
      const arr: Particle[] = [];
      for (let i = 0; i < config.particleAmount; i += 1) {
        const signX = Math.random() > 0.5 ? 1 : -1;
        const signY = Math.random() > 0.5 ? 1 : -1;
        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx:
            (Math.random() - 0.5) * config.variantSpeed +
            config.baseSpeed * signX,
          vy:
            (Math.random() - 0.5) * config.variantSpeed +
            config.baseSpeed * signY,
          r: Math.random() * config.particleRadius + 1,
        });
      }
      particlesRef.current = arr;
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(canvas);

    updateCanvasSize();
    seedParticles();

    const step = () => {
      const { w, h } = sizeRef.current;
      const particles = particlesRef.current;
      const { active, x: px, y: py } = pointerRef.current;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (active) {
          const dx = p.x - px;
          const dy = p.y - py;
          const dist2 = dx * dx + dy * dy;
          const rr = config.repelRadius;
          if (dist2 > 0 && dist2 < rr * rr) {
            const dist = Math.sqrt(dist2);
            const t = 1 - dist / rr;
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * t * config.repelStrength;
            p.vy += ny * t * config.repelStrength;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        if (p.x < 0) p.x = 0;
        if (p.x > w) p.x = w;
        if (p.y < 0) p.y = 0;
        if (p.y > h) p.y = h;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.linkRadius) {
            const opacity = 1 - dist / config.linkRadius;
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = `${lineColorPrefix}${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onPointerMove={(e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        pointerRef.current = {
          active: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current.active = false;
      }}
    />
  );
}


import { useEffect, useRef } from 'react';

export default function NebulaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w, h;
    let animId;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createStars() {
      stars = [];
      const count = Math.floor((w * h) / 2500);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.2,
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          isPink: Math.random() < 0.25
        });
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const flicker = Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
        const a = s.alpha * flicker;
        ctx.fillStyle = s.isPink
          ? `rgba(196, 148, 152, ${a})`
          : `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1 && a > 0.6) {
          ctx.fillStyle = s.isPink
            ? `rgba(196, 148, 152, ${a * 0.15})`
            : `rgba(255, 255, 255, ${a * 0.12})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    createStars();
    animId = requestAnimationFrame(draw);

    const handleResize = () => { resize(); createStars(); };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="nebula-bg" />
      <div className="nebula-overlay" />
    </>
  );
}

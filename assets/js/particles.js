(() => {
  const canvas = document.getElementById("particles");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let points = [];
  let raf = 0;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor((width * height) / 22000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < points.length; i += 1) {
      const p = points[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45, 212, 191, 0.55)";
      ctx.fill();

      for (let j = i + 1; j < points.length; j += 1) {
        const q = points[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.14 * (1 - dist / 120)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    draw();
  });
})();

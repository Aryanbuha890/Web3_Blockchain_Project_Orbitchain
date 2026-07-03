export function Starfield() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.6 + 0.4,
    opacity: Math.random() * 0.6 + 0.2,
    delay: Math.random() * 4,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `pulse 4s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

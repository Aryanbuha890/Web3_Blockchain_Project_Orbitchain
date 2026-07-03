import { useEffect, useState } from "react";

export function StatCounter({
  label,
  target,
  suffix = "",
  increment = 1,
  intervalMs = 1200,
}: {
  label: string;
  target: number;
  suffix?: string;
  increment?: number;
  intervalMs?: number;
}) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => v + increment), intervalMs);
    return () => clearInterval(id);
  }, [increment, intervalMs]);
  return (
    <div className="surface p-5">
      <div className="eyebrow">{label}</div>
      <div className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">
        {value.toLocaleString()}
        <span className="ml-1 text-sm text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}

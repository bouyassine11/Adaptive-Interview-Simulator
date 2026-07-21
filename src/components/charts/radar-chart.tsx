"use client";

interface RadarChartProps {
  data: { label: string; value: number }[];
  size?: number;
}

export function RadarChart({ data, size = 300 }: RadarChartProps) {
  if (data.length === 0) return null;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 40;
  const levels = 5;
  const angleStep = (2 * Math.PI) / data.length;

  function getPoint(index: number, value: number) {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  const polygonPoints = data
    .map((d, i) => {
      const p = getPoint(i, d.value);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: levels }, (_, l) => {
        const r = (radius / levels) * (l + 1);
        const pts = data
          .map((_, i) => {
            const angle = angleStep * i - Math.PI / 2;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
          })
          .join(" ");
        return (
          <polygon
            key={l}
            points={pts}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        );
      })}

      {data.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + radius * Math.cos(angle)}
            y2={cy + radius * Math.sin(angle)}
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={polygonPoints}
        fill="hsl(var(--primary) / 0.15)"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />

      {data.map((d, i) => {
        const p = getPoint(i, d.value);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="hsl(var(--primary))"
          />
        );
      })}

      {data.map((d, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const lx = cx + (radius + 24) * Math.cos(angle);
        const ly = cy + (radius + 24) * Math.sin(angle);
        const anchor =
          Math.cos(angle) < -0.1
            ? "end"
            : Math.cos(angle) > 0.1
              ? "start"
              : "middle";
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor={anchor}
            dominantBaseline="central"
            className="fill-muted-foreground text-[10px]"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

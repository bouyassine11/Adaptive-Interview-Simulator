"use client";

interface LineChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
}

export function LineChart({
  data,
  width = 400,
  height = 200,
  color = "hsl(var(--primary))",
}: LineChartProps) {
  if (data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(0, ...values);
  const maxVal = Math.max(1, ...values);
  const range = maxVal - minVal || 1;

  function x(i: number) {
    return padding.left + (i / (data.length - 1 || 1)) * chartW;
  }
  function y(v: number) {
    return padding.top + chartH - ((v - minVal) / range) * chartH;
  }

  const pathD = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ");
  const areaD = `${pathD} L${x(data.length - 1)},${padding.top + chartH} L${x(0)},${padding.top + chartH} Z`;

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => minVal + (range / yTicks) * i);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {yTickValues.map((v) => (
        <g key={v}>
          <line
            x1={padding.left}
            y1={y(v)}
            x2={padding.left + chartW}
            y2={y(v)}
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
          <text
            x={padding.left - 8}
            y={y(v)}
            textAnchor="end"
            dominantBaseline="central"
            className="fill-muted-foreground text-[10px]"
          >
            {v.toFixed(1)}
          </text>
        </g>
      ))}

      {data.map((d, i) => (
        <text
          key={i}
          x={x(i)}
          y={padding.top + chartH + 20}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          {d.label}
        </text>
      ))}

      <path d={areaD} fill={color} opacity="0.1" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" />

      {data.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.value)} r="3" fill={color} />
      ))}
    </svg>
  );
}

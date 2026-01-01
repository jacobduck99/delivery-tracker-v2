import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart.jsx"

const chartConfig = {
  drops: {
    label: "Drops",
    color: "#2563eb",
  },
}

export default function DropsPerDayChart({ data }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: -8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" className="opacity-25" />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          interval={3}
          tickFormatter={(v) => v.slice(0, 6)}
          className="text-[10px] text-gray-500"
        />

        <YAxis
          domain={[0, 30]}
          ticks={[0, 10, 20, 30]}
          allowDataOverflow
          tickLine={false}
          axisLine={false}
          width={22}
          className="text-[10px] text-gray-400"
        />

        <ChartTooltip
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey="drops"
          fill="var(--color-drops)"
          radius={0}
          barSize={10}
        />
      </BarChart>
    </ChartContainer>
  );
}


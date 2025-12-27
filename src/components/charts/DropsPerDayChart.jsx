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

const chartData = [
  { day: "Aug 26", drops: 18 },
  { day: "Aug 27", drops: 22 },
  { day: "Aug 28", drops: 0 },
  { day: "Aug 29", drops: 25 },
  { day: "Aug 30", drops: 21 },
  { day: "Aug 31", drops: 19 },
  { day: "Sep 01", drops: 24 },
  { day: "Sep 02", drops: 26 },
  { day: "Sep 03", drops: 0 },
  { day: "Sep 04", drops: 20 },
  { day: "Sep 05", drops: 23 },
  { day: "Sep 06", drops: 27 },
  { day: "Sep 07", drops: 22 },
  { day: "Sep 08", drops: 24 },
  { day: "Sep 09", drops: 0 },
  { day: "Sep 10", drops: 19 },
  { day: "Sep 11", drops: 21 },
  { day: "Sep 12", drops: 28 },
  { day: "Sep 13", drops: 26 },
  { day: "Sep 14", drops: 23 },
  { day: "Sep 15", drops: 25 },
  { day: "Sep 16", drops: 0 },
  { day: "Sep 17", drops: 20 },
  { day: "Sep 18", drops: 22 },
  { day: "Sep 19", drops: 24 },
  { day: "Sep 20", drops: 27 },
  { day: "Sep 21", drops: 21 },
  { day: "Sep 22", drops: 23 },
  { day: "Sep 23", drops: 26 },
  { day: "Sep 24", drops: 24 },
]

const chartConfig = {
  drops: {
    label: "Drops",
    color: "#2563eb",
  },
}

export default function DropsPerDayChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-[200px] sm:h-[280px] w-full"
    >
      <BarChart
        data={chartData}
        margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          className="opacity-25 sm:opacity-40"
        />

        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={5}
          tickFormatter={(value) => value.slice(0, 6)}
          className="text-[10px] text-gray-500 sm:text-xs"
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={6}
          width={28}
          className="text-[10px] text-gray-400 sm:text-xs sm:text-gray-500"
        />

        <ChartTooltip
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey="drops"
          fill="var(--color-drops)"
          radius={0}
          barSize={8}
        />
      </BarChart>
    </ChartContainer>
  )
}

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

// =======================
// DATA
// =======================

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

// =======================
// CHART CONFIG
// =======================

const chartConfig = {
  drops: {
    label: "Drops",
    color: "#2563eb",
  },
}

// =======================
// COMPONENT
// =======================

export default function DropsPerDayChart() {
  return (
    <>
      {/* =======================
          MOBILE CHART
          ======================= */}
      <div className="block sm:hidden">
        <ChartContainer
          config={chartConfig}
          className="h-[200px] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="opacity-25"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval={5}
              tickFormatter={(v) => v.slice(0, 6)}
              className="text-[10px] text-gray-500"
            />

            <YAxis
              tickLine={false}
              axisLine={true}
              width={15}
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
              barSize={9}
            />
          </BarChart>
        </ChartContainer>
      </div>

      {/* =======================
          DESKTOP CHART
          ======================= */}
      <div className="hidden sm:block">
        <ChartContainer
          config={chartConfig}
          className="h-[280px] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="opacity-40"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval={2}
              tickFormatter={(v) => v.slice(0, 6)}
              className="text-xs text-gray-500"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              className="text-xs text-gray-500"
            />

            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="drops"
              fill="var(--color-drops)"
              radius={0}
              barSize={14}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </>
  )
}


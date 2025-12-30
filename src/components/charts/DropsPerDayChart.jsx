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
    <>

      <div className="block sm:hidden">
        <ChartContainer
          config={chartConfig}
          className="h-[220px] w-full"
        >
          <BarChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: -10 }} >
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
              domain={[0, 30]}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              allowDataOverflow
              tickLine={false}
              axisLine={false}
              width={20}
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

      <div className="hidden sm:block">
        <ChartContainer
          config={chartConfig}
          className="h-[280px] w-full"
        >
          <BarChart data={data}>
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
              domain={[0, 30]}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              allowDataOverflow
              tickLine={false}
              axisLine={true}
              width={20}
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
              barSize={14}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </>
  )
}


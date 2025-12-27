import { ChartConfig } from "../.ui/chart.jsx";
import { Bar, BarChart, CartesianGrid, XAxis} from "recharts"

const chartData = [
  { day: "Aug 26", drops: 18 },
  { day: "Aug 27", drops: 22 },
  { day: "Aug 28", drops: 0 },   // day off
  { day: "Aug 29", drops: 25 },
  { day: "Aug 30", drops: 21 },
  { day: "Aug 31", drops: 19 },
  { day: "Sep 01", drops: 24 },
  { day: "Sep 02", drops: 26 },
  { day: "Sep 03", drops: 0 },   // day off
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
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
}

export default chartConfig

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <Bar dataKey="drops" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

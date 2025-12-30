import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import DropsPerDayChart from "@/components/charts/DropsPerDayChart"

export default function DropsChartCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drops per Day</CardTitle>
        <CardDescription>Last 30 days workload</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-w-0">
        <div className="w-full">
          <DropsPerDayChart data={data} />
        </div>
      </CardContent>
    </Card>
  )
}


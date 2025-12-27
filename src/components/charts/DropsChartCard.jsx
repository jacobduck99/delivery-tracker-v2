import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import DropsPerDayChart from "@/components/charts/DropsPerDayChart"

export default function DropsChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drops per Day</CardTitle>
        <CardDescription>
          Last 30 days workload
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DropsPerDayChart />
      </CardContent>
    </Card>
  )
}

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
      <CardHeader className="pb-2">
        <CardTitle>Drops per Day</CardTitle>
      </CardHeader>

      <CardContent className="min-w-0">
        <div className="w-full h-[clamp(140px,22dvh,220px)] sm:h-[clamp(170px,24dvh,260px)] lg:h-[clamp(200px,26dvh,320px)]">
          <DropsPerDayChart data={data} />
        </div>
      </CardContent>
    </Card>
  );
}



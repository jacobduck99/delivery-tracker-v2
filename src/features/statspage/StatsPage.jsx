import { getRunStats, getPreviousRun, getLast30Days } from "../../lib/api/statsApi.js";
import { getAllRuns } from "../../lib/api/runApi.js";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { getUserId } from "../../lib/storage/userStorage.js";
import Metric from "../../components/metric.jsx";
import Calendar01 from "../../components/calendar-01.jsx";
import DropsChartCard from "../../components/charts/DropsChartCard.jsx"
// dummy data just to get the feel of how everything should look.
export default function StatsPage() {
    const [selectedRunId, setSelectedRunId] = useState(null);
    const getUser = getUserId();
    // 1️⃣ Load all runs for the dropdown
    const {
    isLoading: runsLoading,
    isError: runsError,
    data: runsData
  } = useQuery({
    queryKey: ["runs", getUser],
    queryFn: () => getAllRuns(getUser)
  });

  // 2️⃣ Load stats for the selected run
    const {
        data: statsData,
        isLoading: statsLoading,
        isError: statsError
        } = useQuery({
        queryKey: ["stats", selectedRunId],
        queryFn: () => getRunStats(selectedRunId),
        enabled: !!selectedRunId
});

    const { 
        data: chartData,
        isLoading: chartDataLoading,
        isError: chartError
        } = useQuery({
        queryKey: ["30days", getUser],
        queryFn: () => getLast30Days(getUser)
    });

    const {
        data: previousRunData,
        isLoading: previousRunLoading,
        isError: previousRunError
        } = useQuery({
        queryKey: ["previousRun", getUser],
        queryFn: () => getPreviousRun(getUser)
    });

    if (runsLoading) return <span>Loading runs...</span>;
    if (runsError) return <span>Error loading runs</span>;

    const runs = runsData.Runs;
    const reversedRuns = [...runs].reverse()

    const sourceSeconds = statsData?.data?.AverageTimeSeconds ?? 
            previousRunData?.data?.AverageTimeSeconds;

    let readable = "";

    if (sourceSeconds != null) {
      const minutes = Math.floor(sourceSeconds / 60);
      const seconds = Math.round(sourceSeconds % 60);
      readable = `${minutes}m ${seconds}s`;
    }

    const previousRun = previousRunData?.data
    const selectedRun = statsData?.data

    const runData =
        selectedRunId === null
        ? previousRun
        : selectedRun    
    
    if (!runData) {
      return <p>No stats available</p>;
    }
    
    if (!navigator.onLine) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-15">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              You’re currently offline
            </h2>

            <p className="text-sm text-gray-600">
              Stats require an internet connection.
              Please reconnect to view your reports.
            </p>
          </div>
        </div>
      );
    }

    const date = runData.StartTime;
    const auDate = new Date(date).toLocaleTimeString("en-AU")

    const parts = auDate.split(":");
    const left = parts.slice(0, 2);
    const right = parts.slice(2);

    const ampm = right[0].split(" ")[1]; // "pm"
    const time = left.join(":");         // "10:30"
    const formattedTime = `${time} ${ampm}`; // "10:30 pm"

    const dropsChartData = 
        chartData?.data?.map(row => ({
        day: new Date(row.date).toLocaleDateString("en-AU", {
          month: "short",
          day: "numeric",
        }),
        drops: row.drop_count,
      })) ?? []

return (

<div className="min-h-screen bg-gray-100 pb-12">
  <div className="px-4 py-3 max-w-5xl mx-auto space-y-5">

    {/* Header */}
    <div className="flex flex-col items-center gap-1">
      <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">
        Run Overview
      </h2>
    </div>

    {/* Controls */}
<div className="flex justify-center">
  <div className="w-full max-w-md">
    <label
      htmlFor="runs"
      className="text-xs uppercase tracking-wide text-gray-500 block"
    >
      Selected Run
    </label>

    <select
      id="runs"
      className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      value={selectedRunId ?? ""}
      onChange={(e) =>
        setSelectedRunId(
          e.target.value === "" ? null : Number(e.target.value)
        )
      }
    >
      <option value="">Most recent</option>
      {reversedRuns.map((run) => (
        <option key={run.id} value={run.id}>
          {new Date(run.start_time).toLocaleDateString("en-AU")}
        </option>
      ))}
    </select>
  </div>
</div>

    {/* States */}
    {statsLoading && (
      <p className="text-center text-sm text-gray-500">
        Loading stats…
      </p>
    )}
    {statsError && (
      <p className="text-center text-sm text-red-600">
        Error loading stats
      </p>
    )}

    {/* Summary Card */}
   <DropsChartCard data={dropsChartData}/> 
<div className="bg-white rounded-2xl border border-gray-300 shadow-md">

  <div className="px-6 py-4 border-b border-gray-200">
    <h3 className="text-m font-semibold text-gray-800">
      Summary
    </h3>
  </div>

  <div className="grid grid-cols-2 gap-x-3 gap-y-3 px-6 py-3">
    <Metric label="Van #" value={runData.VanNumber} />
    <Metric label="Van Name" value={runData.VanName} />
    <Metric label="Drops" value={runData.Drops} />
    <Metric label="Duration" value={`${runData.DurationHours} hrs`} />
    <Metric label="Start Time" value={formattedTime} />
    <Metric label="Truck Damage" value={runData.TruckDamage ? runData.TruckDamage : "None"} />
    <Metric
      label="Avg / Drop"
      value={readable}
      full
      highlight
    />
  </div>
</div>
  </div>
</div>
);
}

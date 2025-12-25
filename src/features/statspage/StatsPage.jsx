import { getRunStats, getPreviousRun } from "../../lib/api/statsApi.js";
import { getAllRuns } from "../../lib/api/runApi.js";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { getUserId } from "../../lib/storage/userStorage.js";
import Metric from "../../components/metric.jsx";
import Calendar01 from "../../components/calendar-01.jsx";
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

    let readable = "";
    if (statsData) {
        const totalSeconds = statsData.data.AverageTimeSeconds;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        readable = `${minutes}m ${seconds}s`;
    }

    const runData = selectedRunId === null
      ? previousRunData?.data
      : statsData?.data;

    if (!runData) return null;

    const date = runData.StartTime;
    const auDate = new Date(date).toLocaleTimeString("en-AU")
    console.log("this is ur time", auDate)

return (

<div className="min-h-screen bg-gray-100 pb-12">
  <div className="px-4 py-8 max-w-5xl mx-auto space-y-8">

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
      className="text-xs uppercase tracking-wide text-gray-500 mb-1 block"
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
<div className="bg-white rounded-2xl border border-gray-300 shadow-md">
  <div className="px-6 py-4 border-b border-gray-200">
    <h3 className="text-m font-semibold text-gray-800">
      Summary
    </h3>
  </div>

  <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-6 py-7">
    <Metric label="Van #" value={runData.VanNumber} />
    <Metric label="Van Name" value={runData.VanName} />
    <Metric label="Drops" value={runData.Drops} />
    <Metric label="Duration" value={`${runData.DurationHours} hrs`} />
    <Metric label="Start Time" value={auDate} />
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

import { getRunStats, getPreviousRun } from "../../lib/api/statsApi.js";
import { getAllRuns } from "../../lib/api/runApi.js";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { getUserId } from "../../lib/storage/userStorage.js";
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

return (
  <div className="min-h-screen bg-gray-100 mb-10">
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-center font-bold text-lg md:text-xl lg:mt-15">
        Overview
      </h2>

      {/* Dropdown */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="runs" className="font-medium mt-5">
          Choose a Run:
        </label>

        <select
          id="runs"
          className="border rounded-md px-3 py-2 w-full mt-1 h-10 md:w-64 bg-white"
          value={selectedRunId ?? ""}
          onChange={(e) =>
            setSelectedRunId(
              e.target.value === "" ? null : Number(e.target.value)
            )
          }
        >
          <option value="">Select a run</option>
          {reversedRuns.map((run) => (
            <option key={run.id} value={run.id}>
              {new Date(run.start_time).toLocaleDateString("en-AU")}
            </option>
          ))}
        </select>
      </div>

      {/* Loading / Error */}
      {statsLoading && <p className="text-sm">Loading stats…</p>}
      {statsError && (
        <p className="text-sm text-red-600">Error loading stats</p>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Van #</th>
              <th className="border px-3 py-2 text-left">Van Name</th>
              <th className="border px-3 py-2 text-left">Drops</th>
              <th className="border px-3 py-2 text-right">
                Duration (hrs)
              </th>
              {selectedRunId !== null && (
                <th className="border px-3 py-2 text-right">
                  Avg Min / Drop
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white">
              <td className="border px-3 py-2">
                {runData.VanNumber}
              </td>
              <td className="border px-3 py-2">
                {runData.VanName}
              </td>
              <td className="border px-3 py-2">
                {runData.Drops}
              </td>
              <td className="border px-3 py-2 text-right">
                {runData.DurationHours}
              </td>
              {selectedRunId !== null && (
                <td className="border px-3 py-2 text-right">
                  {readable}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


}

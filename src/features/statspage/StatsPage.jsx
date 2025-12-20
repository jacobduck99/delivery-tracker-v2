import { getRunStats } from "../../lib/api/statsApi.js";
import { getAllRuns } from "../../lib/api/runApi.js";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { getUserId } from "../../lib/storage/userStorage.js";
import Calendar01 from "../../components/calendar-01.jsx";
// dummy data just to get the feel of how everything should look.
export default function StatsPage() {

    const [selectedRunId, setSelectedRunId] = useState(0);
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

  if (runsLoading) return <span>Loading runs...</span>;
  if (runsError) return <span>Error loading runs</span>;

  const runs = runsData.Runs;

  let readable = "";
  if (statsData) {
    const totalSeconds = statsData.data.AverageTimeSeconds;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    readable = `${minutes}m ${seconds}s`;
  }

  return (
    <div style={{ padding: "16px" }}>
      <h2 className="flex justify-center font-bold mt-10 mb-5">Shifts</h2>

      {/* Dropdown */}
      <label htmlFor="runs">Choose a Run: </label>
      <select
        value={selectedRunId}
        onChange={(e) => setSelectedRunId(Number(e.target.value))}
      >
        <option value={0}>Select a run</option>
        {runs.map(run => (
          <option key={run.id} value={run.id}>
            {run.start_time}
          </option>
        ))}
      </select>

      {/* Table */}
      {statsLoading && <p>Loading stats...</p>}
      {statsError && <p>Error loading stats</p>}

      {statsData && (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Drops</th>
              <th className="border px-3 py-2 text-right">Duration (hrs)</th>
              <th className="border px-3 py-2 text-right">Avg Min / Drop</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border px-3 py-2">
                {statsData.data.Drops}
              </td>
              <td className="border px-3 py-2 text-right">
                {statsData.data.DurationHours}
              </td>
              <td className="border px-3 py-2 text-right">
                {readable}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}




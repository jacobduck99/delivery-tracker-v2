import { getRunStats } from "../../lib/api/statsApi.js";
import { getAllRuns } from "../../lib/api/runApi.js";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
// dummy data just to get the feel of how everything should look.
export default function StatsPage({ runId }) {
    const [selectRunId, setSelectRunId] = useState(0);

    const { isLoading, isError, data } = useQuery({ queryKey: ['runs'], queryFn: getAllRuns })
    
    console.log(selectRunId);
    const statsQuery = useQuery({ queryKey: ['stats', selectRunId],
  queryFn: () => getRunStats(selectRunId),
  enabled: !!selectRunId
})    

    if (isLoading) {
        return <span>Loading...</span>
    }

    const shifts = data.Runs;

    const run = statsQuery;

    return (
    <div style={{ padding: "16px" }}>
      <h2 className="flex justify-center font-bold mt-10 mb-5">Shifts</h2>
    
    <label htmlFor="Runs">Choose a Run: </label>
   
    <select
      value={selectRunId}
      onChange={(e) => setSelectRunId(Number(e.target.value))}
    >
      {shifts.map(run => (
        <option key={run.id} value={run.id}>
          {run.start_time}
        </option>
      ))}
    </select>

    <table className="w-full border-collapse border border-gray-300">
    <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-300 px-3 py-2 text-left">Date</th>
      <th className="border border-gray-300 px-3 py-2 text-right">Drops</th>
      <th className="border border-gray-300 px-3 py-2 text-right">Duration (hrs)</th>
      <th className="border border-gray-300 px-3 py-2 text-right">Avg Min / Drop</th>
    </tr>
    </thead>

    <tbody>
    {shifts.map(shift => (
      <tr key={shift.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
        <td className="border border-gray-300 px-3 py-2">{run.date}</td>
        <td className="border border-gray-300 px-3 py-2 text-right">{run.drops}</td>
        <td className="border border-gray-300 px-3 py-2 text-right">{run.durationHours}</td>
        <td className="border border-gray-300 px-3 py-2 text-right">{run.avgMinutesPerDrop}</td>
      </tr>
    ))}
    </tbody>
    </table>

    </div>
    );
    }



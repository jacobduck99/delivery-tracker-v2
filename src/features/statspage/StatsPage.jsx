import { getRunStats } from "../../lib/api/statsApi.js";
import { getAllRuns } from "../../lib/api/runApi.js";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
// dummy data just to get the feel of how everything should look.
export default function StatsPage({ runId }) {
    const [selectRunId, setSelectRunId] = useState([]);

    const { isLoading, isError, data } = useQuery({ queryKey: ['runs'], queryFn: getAllRuns })
    


//    const { isLoading, isError, data } = useQuery({ queryKey: ['stats', runId], queryFn: getRunStats })     

    if (isLoading) {
        return <span>Loading...</span>
    }

    const shifts = [
    {
      id: 1,
      date: "2025-01-10",
      drops: 25,
      durationHours: 6.5,
      avgMinutesPerDrop: 15.6,
    },
    {
      id: 2,
      date: "2025-01-11",
      drops: 22,
      durationHours: 6.0,
      avgMinutesPerDrop: 16.4,
    },
    ];

    return (
    <div style={{ padding: "16px" }}>
      <h2 className="flex justify-center font-bold mt-10 mb-5">Shifts</h2>
    
    <select name="select" onChange={setSelectRunId}></select>

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
        <td className="border border-gray-300 px-3 py-2">{shift.date}</td>
        <td className="border border-gray-300 px-3 py-2 text-right">{shift.drops}</td>
        <td className="border border-gray-300 px-3 py-2 text-right">{shift.durationHours}</td>
        <td className="border border-gray-300 px-3 py-2 text-right">{shift.avgMinutesPerDrop}</td>
      </tr>
    ))}
    </tbody>
    </table>

    </div>
    );
    }



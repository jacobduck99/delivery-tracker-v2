import { getRunStats, getPreviousRun, getLast30Days } from "../../lib/api/statsApi.js";
import { ChevronLeft } from 'lucide-react';
import { getAllRuns } from "../../lib/api/runApi.js";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserId } from "../../lib/storage/userStorage.js";
import { formatTime, formatMinutesAndSeconds, formatChartDate, formatDate } from "../../lib/utils/formatters.js";
import Metric from "../../components/metric.jsx";
import DropsChartCard from "../../components/charts/DropsChartCard.jsx"

export default function StatsPage() {
    const [selectedRunId, setSelectedRunId] = useState(null);
    const userId = getUserId();
    const navigate = useNavigate();
    // 1️⃣ Load all runs for the dropdown

    if (!navigator.onLine) {
      return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-lg shadow-sm p-6 ">
            <h2 className="text-lg font-semibold  text-gray-900 mb-2">
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

    const {
    isLoading: runsLoading,
    isError: runsError,
    data: runsData
    } = useQuery({
    queryKey: ["runs", userId],
    queryFn: () => getAllRuns(userId)
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
        queryKey: ["30days", userId],
        queryFn: () => getLast30Days(userId)
    });

    const {
        data: previousRunData,
        isLoading: previousRunLoading,
        isError: previousRunError
        } = useQuery({
        queryKey: ["previousRun", userId],
        queryFn: () => getPreviousRun(userId)
    });

    if (runsLoading) return <span>Loading runs...</span>;
    if (runsError) return <span>Error loading runs</span>;

    const runs = runsData.Runs;
    const reversedRuns = [...runs].reverse()

    const sourceSeconds = statsData?.data?.AverageTimeSeconds ?? 
            previousRunData?.data?.AverageTimeSeconds;
    
    const readable = formatMinutesAndSeconds(sourceSeconds);

    const previousRun = previousRunData?.data
    const selectedRun = statsData?.data

    const runData =
        selectedRunId === null
        ? previousRun
        : selectedRun    
    
    if (!runData) {
      return <p>No stats available</p>;
    }

    const date = runData.StartTime;
    const formattedTime = formatTime(date); 

    const dropsChartData = chartData?.data?.map(row => ({
    day: formatChartDate(row.date),  
    drops: row.drop_count,
      })) ?? []

    function redirectToRun() {
        navigate("/run");
    }

return (
  <div className="bg-background text-foreground min-h-screen pb-6 sm:pb-10 lg:pb-12">
    <div className="px-4 max-w-5xl mx-auto space-y-3 sm:space-y-5">

      {/* Header */}
      <div className="px-4 py-4 min-[390px]:px-1 min-[390px]:py-1">
        <div className="grid grid-cols-[40px_1fr_40px] items-center">

          <button
            type="button"
            onClick={redirectToRun}
            className="justify-self-start inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted active:scale-95 transition"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>

          <h2 className="justify-self-center text-lg min-[390px]:text-lg min-[430px]:text-2xl font-semibold text-foreground">
            Run Overview
          </h2>

          <div className="justify-self-end h-10 w-10" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <label
            htmlFor="runs"
            className="text-xs uppercase tracking-wide text-muted-foreground block py-1 px-1"
          >
            Selected Run
          </label>

          <select
            id="runs"
            className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-ring"
            value={selectedRunId ?? ""}
            onChange={(e) =>
              setSelectedRunId(e.target.value === "" ? null : Number(e.target.value))
            }
          >
            <option value="">Most recent</option>
            {reversedRuns.map((run) => (
              <option key={run.id} value={run.id}>
                {formatDate(run.start_time)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* States */}
      {statsLoading && (
        <p className="text-center text-sm text-muted-foreground">
          Loading stats…
        </p>
      )}
      {statsError && (
        <p className="text-center text-sm text-destructive">
          Error loading stats
        </p>
      )}

      {/* Chart Card */}
      <DropsChartCard data={dropsChartData} />

      {/* Summary Card */}
      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-md">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-m font-semibold text-foreground">
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
);}

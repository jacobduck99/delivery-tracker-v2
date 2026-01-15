import { Card } from "./progresscircle.jsx";
import { EndBreakTimerBtn } from "./breaktimer.jsx";
import { formatMinutesAndSecondsMs } from "../lib/utils/formatters.js";
import { loadBreakStartTime, loadBreakSelection } from "../lib/storage/breakStorage.js";
import { useState, useEffect } from "react";

export default function TimerCard({ setBreakEndAt, setRenderTimer }) {
    const [nowMs, setNowMs] = useState(Date.now());
    const [startBreak, setStartBreak] = useState("loading");
    const [selectedBreak, setSelectedBreak] = useState("loading");

    const checkStartTime = loadBreakStartTime();

    useEffect(() => {
        const checkStartTime = loadBreakStartTime();
        if (!checkStartTime) return;

        const breakSelected = loadBreakSelection();
        if (!breakSelected) return;
       
        setSelectedBreak(breakSelected)
        setStartBreak(checkStartTime); 
    }, []);
 
    const durationMs = selectedBreak * 60000;

    const elapsedMs = nowMs - startBreak; 
    const remainingMs = durationMs - elapsedMs;

    const readable = formatMinutesAndSecondsMs(remainingMs);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNowMs(Date.now());
        }, 1000)

    return () => {
      clearInterval(intervalId);
    };
    }, []);

  return (
    <div className="min-h-[90dvh] flex items-center justify-center p-4">
      <Card className="flex items-center justify-center">
        <div className="w-full flex flex-col items-center text-center gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">On break</p>
            <p className="text-5xl font-semibold tabular-nums tracking-tight">
              {selectedBreak === 15 ? `${readable}` : `${readable}` }
            </p>
            <p className="text-sm text-muted-foreground">
              {selectedBreak === 15 ? "15 minute break" : "30 minute break"}
            </p>
          </div>

          <div className="w-full flex justify-center pt-2">
            <EndBreakTimerBtn setBreakEndAt={setBreakEndAt} setRenderTimer={setRenderTimer}/>
          </div>
        </div>
      </Card>
    </div>
  );
}

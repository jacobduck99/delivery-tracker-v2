import { Card } from "./progresscircle.jsx";
import { EndBreakTimerBtn } from "./breaktimer.jsx";
import { formatMinutesAndSeconds } from "../lib/utils/formatters.js";
import { useState } from "react";

export default function TimerCard({ breakSelection, breakStartAt, setBreakEndAt, setBreakStartAt }) {
    const [nowMs, setNowMs] = useState(Date.now());

    function durationMS(breakSelection) {
        const ms = breakSelection * 60000;
        return ms;
    }

    const elapsedMs = nowMs - breakStartAt; 
    const remainingMs = durationMs(breakSelection) - elapsedMs;

    const readable = formatMinutesAndSeconds(remainingMs);

    let intervalId = setInterval(() => setNow)

  return (
    <div className="min-h-[90dvh] flex items-center justify-center p-4">
      <Card className="flex items-center justify-center">
        <div className="w-full flex flex-col items-center text-center gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">On break</p>
            <p className="text-5xl font-semibold tabular-nums tracking-tight">
              {breakSelection === 15 ? "15:00" : "30:00"}
            </p>
            <p className="text-sm text-muted-foreground">
              {breakSelection === 15 ? "15 minute break" : "30 minute break"}
            </p>
          </div>

          <div className="w-full flex justify-center pt-2">
            <EndBreakTimerBtn setBreakEndAt={setBreakEndAt} setBreakStartAt={setBreakStartAt}/>
          </div>
        </div>
      </Card>
    </div>
  );
}

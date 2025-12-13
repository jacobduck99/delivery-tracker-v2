import { useState } from "react";
import Gps from "./gps.jsx";
import { startGps } from "./nav.js";
import Startbtn, { Stopbtn } from "./buttons.jsx";
import { savePendingDrop } from "../lib/storage/runStorage.js";

export default function Dropcard({
    drop,
    index,
    onChangeStatus,
    onChangeAddress,
    onChangeStart,
    onChangeStop,
    onChangeElapsed,
    onChangeSyncStatus,
}) {
    const [address, setAddress] = useState("");
    const [arrived, setArrived] = useState(null);
    const [delivered, setDelivered] = useState(null);

    function onStart() {
        startGps(address);
        onChangeStatus(drop.drop_idx, "Navigating");
        onChangeAddress(drop.drop_idx, address);
        }

    function onArrived() {
        const start = Date.now();
        setArrived(start);
        onChangeStatus(drop.drop_idx, "In-progress");
        onChangeStart(drop.drop_idx, start);
    }

    async function onDelivered() {
        const end = Date.now();
        setDelivered(end);

        const ms = end - arrived;

        onChangeStatus(drop.drop_idx, "Finishing");
        onChangeStop(drop.drop_idx, end);
        onChangeElapsed(drop.drop_idx, ms);

        await new Promise((resolve) => setTimeout(resolve, 4000));

        onChangeStatus(drop.drop_idx, "Completed");
        onChangeSyncStatus(drop.drop_idx, "Ready");

        const job = {
        job_id: `drop-${drop.drop_idx}`,   // stable, unique
        drop_idx: drop.drop_idx,

        status: "ready",                   // ready | syncing | synced | failed

        payload: {
        end_time: end,
        elapsed_ms: ms,
        },

  created_at: Date.now(),
};
        savePendingDrop(job); 
        }

    function onCompleted(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
        }
    
const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto mt-6 min-h-[220px] flex flex-col">
    {children}
  </div>
);


if (drop.status === "Not-started") {
  return (
    <Card>
      <h2 className="text-[0.9rem] font-bold ">Drop {index}</h2>

      <div className="flex-1 flex flex-col justify-center">
        <Gps address={address} setAddress={setAddress} onStart={onStart} />
      </div>
    </Card>
  );
}

if (drop.status === "Navigating") {
  return (
    <Card>
      <h2 className="text-[0.9rem] font-bold ">Drop {index}</h2>

      <div className="flex-1 flex flex-col justify-center items-center">
        <button
          onClick={onArrived}
          className="w-70 bg-green-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700"
        >
          Arrived
        </button>
      </div>
    </Card>
  );
}

if (drop.status === "In-progress") {
  return (
    <Card>
      <h2 className="text-[0.9rem] font-bold ">Drop {index}</h2>
      <div className="flex-1 flex flex-col justify-center items-center">
        <button
          onClick={onDelivered}
          className="w-70 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        >
          Delivered
        </button>
      </div>
    </Card>
  );
}

if (drop.status === "Finishing") {
  const ms = drop.end_ts - drop.start_ts;

  return (
    <Card>
      <h2 className="text-[0.9rem] font-bold ">Drop {index}</h2>
      <div className="flex-1 flex flex-col justify-center items-center1">
        <h3 className="text-lg font-semibold text-gray-800">
          Total-time <span className="text-blue-600">{onCompleted(ms)}</span>
        </h3>
      </div>
    </Card>
  );
}

if (drop.status === "Completed") {
  const ms = drop.end_ts - drop.start_ts;

  return (
    <Card>
      <h2 className="text-[0.9rem] font-bold ">Drop {index}</h2>

      <div className="flex-1 flex flex-col justify-center items-center min-h-[150px]">
        <h3 className="text-lg font-semibold text-gray-800">
          Completed:{" "}
          <span className="font-bold text-green-600">{onCompleted(ms)}</span>
        </h3>
      </div>
    </Card>
  );
}
  return null;
}


import { loadPendingQueue, loadDeliveries, savePendingDrop, saveDeliveries, drainQueue } from "../../lib/storage/runStorage.js";
import { syncPendingDrops, postBreak } from "../../lib/api/runApi.js";

import { clearSyncedBreak } from "../../lib/storage/breakStorage.js";

// leaving this how it is took me two days to come up with this is for future jacob to look at 11 months into my coding progress :)

export async function syncDrops(runId) {
  const queue = loadPendingQueue("Pending_queue_v1");
  if (!queue || queue.length === 0) return;

  const deliveries = loadDeliveries(runId); 
  if (!deliveries) return;

  for (const job of queue) {
    if (job.status !== "Ready") continue;

    const drop = deliveries.find(
      d => d.drop_idx === job.drop_idx
    );

    if (!drop) continue; // safety

    // THIS is your fresh data
    const payload = {
      drop_idx: drop.drop_idx, address: drop.address,
      start_ts: drop.start_ts,
      end_ts: drop.end_ts,
      elapsed: drop.elapsed,
      expected_minutes: drop.expected_minutes,
      status: drop.status,
};
    const result = await syncPendingDrops(runId, payload);

    if (result.ok) {
            console.log(result);
            const synced = { ...drop, sync_status: "Synced"};
            const queue = savePendingDrop(synced); 
            console.log({"this is ur sync drop": synced});
            const updateDrops = deliveries.map(d => d.drop_idx === drop.drop_idx ? {...d, sync_status: "Synced"}: d);
            console.log({"this is ur deliveries list": updateDrops})
            saveDeliveries(runId, updateDrops);
            drainQueue(drop)
            
        }

        
}}

export async function syncPendingBreak(payload) {
    const result = await postBreak(payload); 
        
        if (result.ok) {
           console.log("break success synced", result) 
           clearSyncedBreak(); 
        }
}

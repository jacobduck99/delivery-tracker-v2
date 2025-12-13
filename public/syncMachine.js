import { loadPendingQueue, loadDeliveries } from "../src/lib/storage/runStorage.js";
import { syncPendingDrops } from "../src/lib/api/runApi.js";

export async function syncDrops(runId) {
  const queue = loadPendingQueue("Pending_queue_v1");
  if (!queue || queue.length === 0) return;

  const deliveries = loadDeliveries(runId); // ← SOURCE OF TRUTH
  if (!deliveries) return;

  for (const job of queue) {
    if (job.status !== "Ready") continue;

    const drop = deliveries.find(
      d => d.drop_idx === job.drop_idx
    );

    if (!drop) continue; // safety

    // THIS is your fresh data
const payload = {
  drop_idx: drop.drop_idx,
  address: drop.address,
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
            console.log({"this is ur sync drop": synced});
        }

        
}}

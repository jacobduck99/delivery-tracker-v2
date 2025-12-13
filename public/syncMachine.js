import { syncPendingDrops } from "../src/lib/api/runApi.js";
import { loadPendingQueue, savePendingQueue, saveDeliveries, loadDeliveries } from "../src/lib/storage/runStorage.js";



let syncing = false;

export async function syncWorker(runId) {
  if (syncing) return;
  syncing = true;

  const queue = loadPendingQueue("pending_queue_v1");
        console.log(queue);
  if (!queue || queue.length === 0) {
    syncing = false;
    return;
  }

  const remaining = [];

  for (const job of queue) {
    if (job.sync_status !== "ready") {
      remaining.push(job);
      continue;
    }

    const result = await syncPendingDrops(runId, job);
    console.log(result);

    if (!result.ok) {
      // stop on failure, retry later
      remaining.push(job); 
      break;
    }
    
    const updatedrops = loadDeliveries(runId);
    const synced = updatedrops.map(d => d.drop_idx === job.drop_idx 
        ? {...d, sync_status: "synced"} : d);
                saveDeliveries(runId, synced);
    // success → do not re-add
  }
    savePendingQueue(remaining);
    syncWorker(runId);
  syncing = false;
}

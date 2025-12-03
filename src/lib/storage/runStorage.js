
export function saveRun(run) {
  localStorage.setItem("current_run", JSON.stringify(run));
}

export function loadRun(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function saveDeliveries(run_id, drops) {
  localStorage.setItem(`run_drops_${run_id}`, JSON.stringify(drops));
}

export function loadDeliveries(run_id) {
  const raw = localStorage.getItem(`run_drops_${run_id}`);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function addCompletedLs(runId, drop_idx) {
    const getDeliveries = loadDeliveries(runId); 
    const completed = getDeliveries.filter(drop => drop.drop_idx === drop_idx && drop.status === "Completed");
    const queue = completed;
    if (completed.length === 0) {
        return;
    }
    const saveQueueLs = localStorage.setItem("Pending_queue_v1", JSON.stringify(queue));
};





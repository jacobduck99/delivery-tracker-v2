
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

export function loadPendingQueue(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
};

export function addCompletedLs(runId, drop_idx) {
    const deliveries = loadDeliveries(runId);
    if (!deliveries) return;
    
    const completed = deliveries.filter( (drop) => drop.status === "Completed" );
    if (!completed) return;
    const queue = completed; 

    localStorage.setItem("Pending_queue_v1", JSON.stringify(queue));

    };




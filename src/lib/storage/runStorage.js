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

export function syncCompletedLs(runId, drop) {
    const stored = localStorage.getItem("Pending_queue_v1");
    const queue = stored ? JSON.parse(stored) : [];

    const alreadyQueued = queue.some(
        item => item.drop_idx === drop.drop_idx
    );

    if (alreadyQueued) {
    const updated = queue.map(item =>
        item.drop_idx === drop.drop_idx ? drop : item
    );
    localStorage.setItem("Pending_queue_v1", JSON.stringify(updated));
    return;
}

    queue.push(drop);

    localStorage.setItem("Pending_queue_v1", JSON.stringify(queue));
}

export function drainQueue(dropidx, runId) {
    const queue = loadPendingQueue("Pending_queue_v1");

    const filtered = queue.filter(item => item.drop_idx !== dropidx);

    localStorage.setItem("Pending_queue_v1", JSON.stringify(filtered));
}

export function clearRun(run_id) {
    localStorage.removeItem("current_run");
    localStorage.removeItem("Pending_queue_v1");
    localStorage.removeItem(`run_drops_${run_id}`);
    localStorage.removeItem("Pending_queue_v1");
};

export function endShiftPendingSync(endShift) {
  localStorage.setItem("Pending_endShift_sync", JSON.stringify(endShift)
  );
}










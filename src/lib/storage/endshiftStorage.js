
export function clearCurrentRun() {
    localStorage.removeItem("current_run");
    localStorage.removeItem("Pending_queue_v1"); 
};

export function resetRun(runId) {
    localStorage.removeItem(`run_drops_${runId}`);
    localStorage.removeItem("config");
}

export function queueEndingShift(endShift) {
  localStorage.setItem("Pending_endShift_sync", JSON.stringify(endShift)
  );
}

export function drainEndShiftQueue() {
    const pending = loadPendingEndShift();
    if (!pending) return;

    if (pending.synced_status === "Completed") {
        localStorage.removeItem("Pending_endShift_sync");
    }
}

export function loadPendingEndShift() {
    const raw = localStorage.getItem("Pending_endShift_sync");
    if (!raw) return null;          // IMPORTANT
    return JSON.parse(raw);
}

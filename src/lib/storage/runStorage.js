
export function saveRun(run) {
  localStorage.setItem("current_run", JSON.stringify(run));
}

export function loadRun() {
  const raw = localStorage.getItem("current_run");
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


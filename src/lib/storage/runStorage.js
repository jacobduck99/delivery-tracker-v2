


export function saveRun(run) {
    localStorage.setItem("current_run", JSON.stringify(run)); 
};

export function loadRun() {
    const getRun = JSON.parse(localStorage.getItem("current_run") || "[]");
    return getRun;
};

export function saveDeliveries(run_id, drops) {
    localStorage.setItem(`run_drops_${run_id}`, JSON.stringify(drops));
};

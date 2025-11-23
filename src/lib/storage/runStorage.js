


export function saveRun(run) {
    localStorage.setItem("current_run", JSON.stringify(run)); 
}

export function loadRun() {
    const getRun = JSON.parse(localStorage.getItem("current_run") || "[]");
    return getRun;
};

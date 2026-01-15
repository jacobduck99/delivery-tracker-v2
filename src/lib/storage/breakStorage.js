
export function saveBreakStartTime(breakStartedAt) {
    localStorage.setItem("Break started at", JSON.stringify(breakStartedAt)); 
} 

export function loadBreakStartTime() {
    const raw = localStorage.getItem("Break started at");
    if (!raw) return null;
    return JSON.parse(raw);
}

export function saveBreakSelection(selectedBreak) {
    localStorage.setItem("Break selected", JSON.stringify(selectedBreak)); 
} 

export function loadBreakSelection() {
    const raw = localStorage.getItem("Break selected");
    if (!raw) return null;
    return JSON.parse(raw);
}

export function saveBreakEndTime(breakEndedAt) {
    localStorage.setItem("Break ended at", JSON.stringify(breakEndedAt)); 
}

export function loadBreakEndTime() {
    const raw = localStorage.getItem("Break ended at");
    if (!raw) return null;
    return JSON.parse(raw);
}

export function savePendingBreakQueue(payload) {
    localStorage.setItem("Completed break", JSON.stringify(payload));
}



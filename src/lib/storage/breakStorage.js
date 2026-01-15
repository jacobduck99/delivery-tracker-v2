
export function saveBreakStartTime(breakStartedAt) {
    localStorage.setItem("Break started at", JSON.stringify(breakStartedAt)); 
} 

export function loadBreakStartTime() {
    const raw = localStorage.getItem("Break started at");
    if (!raw) return null;
    return JSON.parse(raw);
}

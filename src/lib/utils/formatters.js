
export function formatTime(date) {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString("en-AU", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function formatMinutesAndSeconds(time) {
    if (time == null || isNaN(time)) return "N/A";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}m ${seconds}s`;
}

export function formatDate(date) {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-AU");
}

export function formatChartDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-AU", {
        month: "short",
        day: "numeric",
    });
}

export function formatHours(hours) {
    if (hours == null || isNaN(hours)) return "N/A";
    return `${hours} hrs`;
}

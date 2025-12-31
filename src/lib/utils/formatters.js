
export function formatTime(date) {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString("en-AU", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    }



export function saveDisplayName(displayName) {
    localStorage.setItem("display_name", JSON.stringify(displayName)); 
} 

export function loadDisplayName() {
    const raw = localStorage.getItem("display_name");
    if (!raw) return null;
    return JSON.parse(raw);
}

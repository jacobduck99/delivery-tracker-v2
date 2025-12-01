

export function saveConfig(form) {
    localStorage.setItem("config", JSON.stringify(form)); 
}

export function loadConfig() {
    const getConfig = JSON.parse(localStorage.getItem("config") || "[]");
    return getConfig;
};

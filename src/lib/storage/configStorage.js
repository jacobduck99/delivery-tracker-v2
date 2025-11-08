

export function saveConfig(form) {
   const config = localStorage.setItem("all_drops", JSON.stringify(form)); 
}

export function loadConfig() {
    const getConfig = JSON.parse(localStorage.getItem("all_drops") || "[]");
    return getConfig;
};

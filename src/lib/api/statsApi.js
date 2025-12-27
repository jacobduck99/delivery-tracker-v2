const API_BASE = import.meta.env.VITE_API_URL;

export async function getRunStats(run_id) {
    const url = `${API_BASE}/api/stats/${run_id}`; // TEMP: bypass Vite proxy & correct run id

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        return null;
    }  
}

export async function getPreviousRun(userId) {
    const url = `${API_BASE}/api/stats/${userId}`; // TEMP: bypass Vite proxy & correct run id

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        return null;
    }  
}

export async function getLast30Days(userId) {
    const url = `${API_BASE}/api/stats/last30days/${userId}`; // TEMP: bypass Vite proxy & correct run id

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        return null;
    }  
}

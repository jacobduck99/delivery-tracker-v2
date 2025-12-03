
import { loadRun } from "../../lib/storage/runStorage.js";

const API_BASE = import.meta.env.VITE_API_URL;

export async function getDrops() {
    const current_run = loadRun("current_run");
    const run_id = current_run.run_id
    const url = `${API_BASE}/api/run/${run_id}`; // TEMP: bypass Vite proxy & correct run id
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

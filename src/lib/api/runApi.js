import { loadRun } from "../../lib/storage/runStorage.js";

export async function getDrops() {
    const current_run = loadRun()
    const run_id = current_run.run_id
    const url = `http://127.0.0.1:5000/api/run/${run_id}`; // TEMP: bypass Vite proxy
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


const API_BASE = import.meta.env.VITE_API_URL;

export async function getProfile(userId) {
    const url = `${API_BASE}/api/profile/${userId}`; // TEMP: bypass Vite proxy & correct run id
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

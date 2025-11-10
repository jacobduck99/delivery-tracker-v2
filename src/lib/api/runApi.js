

export async function getDrops() {
    const url = "http://127.0.0.1:5000/api/config"; // TEMP: bypass Vite proxy
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

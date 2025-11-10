import { useState, useEffect } from "react";
import { getDrops } from "../../lib/api/runApi.js"; 

export default function Run() {
    const [drops, setDrops] = useState([])

//this allows me to get the drop info from backend need to write logic to render cards tho
    //need to change back end so when config loads in the run gets populated so then i can just grab how many drops in the run by index so drop 1 row drop 2 row etc.   
    useEffect(() => {
        const loadDrops = async () => {
            const data = await getDrops();
            if (data) {
                setDrops(data);
            }
            
        }
        loadDrops();

    }, []);

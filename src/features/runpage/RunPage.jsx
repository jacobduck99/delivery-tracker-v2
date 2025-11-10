import { useState } from "react";
import { getDrops } from "../../lib/api/runApi.js"; 

export default function Run() {
    const [delivery, setDelivery] = useState({
        upcoming: "",
        in_progress: "",
        completed: "", 
    })
}

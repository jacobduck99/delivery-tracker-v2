import { useState, useEffect } from "react";
import Gps from "./gps.jsx";
import { startGps } from "./nav.js";

export default function Dropcard({ drop, index }) {
    const [address, setAddress] = useState("");


    function onStart() {
        startGps(address); 
        };
    
    return (
    <div className="card">
      <h2>Drop {index + 1}</h2>
      <pre style={{ background: "#eee", padding: "6px" }}>

      </pre>
    <Gps 
        address={address}
        setAddress={setAddress}
        onStart={onStart}
        />
    </div>
  );
}




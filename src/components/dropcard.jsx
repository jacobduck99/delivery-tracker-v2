import { useState, useEffect } from "react";
import Gps from "../components/gps.jsx";

export default function Dropcard({ drop, index }) {
  return (
    <div className="card">
      <h2>Drop {index + 1}</h2>
      <pre style={{ background: "#eee", padding: "6px" }}>
        {JSON.stringify(drop, null, 2)}
      </pre>
    </div>
  );
}
    function onStart() {
       startGps(); 
    };

    function update(value) {
        setAddress((prev) => ({ ...prev, value }));
    }


    <Gps 
        address={drop.address}
        setAddress={drop.address}
        onStart={onStart}
        />

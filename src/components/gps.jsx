import { useState } from "react";

export default function Gps() {
    const [gps, setGps] = useState("");

    function update(field, value) {
        setGps((prev) => ({...prev, [field]: value}));
    }





    return (
    <div className="container">
    <div className="card">
      <div className="input-row">
        <label htmlFor="gps-input">Enter address</label>
        <input
          id="gps-input"
          type="text"
          value={gps.address}
          onChange={(e) => update("address", e.target.value)}
        />
      </div>

      <button type="button">Start navigation</button>
        </div>
    </div>
    );


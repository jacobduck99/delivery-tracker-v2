import { useState } from "react";
import { startGps } from "./nav.js";

export default function Gps() {
    const [address, setAddress] = useState("");

    handleClick(e) {
    startGps(address);
    }

    return (
    <div className="container">
    <div className="card">
      <div className="input-row">
        <label htmlFor="gps-input">Enter address</label>
        <input
          id="gps-input"
          type="text"
          value={address}
          onChange={(e) => update("address", e.target.value)}
        />
      </div>

      <button onClick={handleClick} type="button">Start navigation</button>
        </div>
    </div>
    );


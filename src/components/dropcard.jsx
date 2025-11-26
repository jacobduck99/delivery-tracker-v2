import { useState, useEffect } from "react";
import Gps from "./gps.jsx";
import { startGps } from "./nav.js";
import s from './Dropcard.module.css';

export default function Dropcard({ drop, index }) {
    const [address, setAddress] = useState("");


    function onStart() {
        startGps(address); 
        };
    
    return (
    <div className={s.dropCard}>
      <h2>Drop {index}</h2>
    <Gps 
        address={address}
        setAddress={setAddress}
        onStart={onStart}
        />
    </div>
  );
}

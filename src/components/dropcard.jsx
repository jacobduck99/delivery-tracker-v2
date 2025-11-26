import { useState, useEffect } from "react";
import Gps from "./gps.jsx";
import { startGps } from "./nav.js";
import s from './Dropcard.module.css';
import Startbtn from "./buttons.jsx";

export default function Dropcard({ drop, index, onChangeStatus }) {
    const [address, setAddress] = useState("");

    const [arrived, setArrived] = useState(null);

    function onStart() {
        startGps(address); 
        onChangeStatus(index, "Navigating"); 
        };

    function onArrived() {
        const start = Date.now();
        setArrived(start);
    };
    
    return (
    <div className={s.dropCard}>
      <h2>Drop {index}</h2>
    <Gps 
        address={address}
        setAddress={setAddress}
        onStart={onStart}
        />
    <Startbtn onArrived={onArrived}/>
    </div>
  );
}

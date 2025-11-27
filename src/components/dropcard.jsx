import { useState, useEffect } from "react";
import Gps from "./gps.jsx";
import { startGps } from "./nav.js";
import s from './Dropcard.module.css';
import Startbtn, { Stopbtn } from "./buttons.jsx";

export default function Dropcard({ drop, index, onChangeStatus, onChangeStart, onChangeStop }) {
    const [address, setAddress] = useState("");
    const [arrived, setArrived] = useState(null);
    const [delivered, setDelivered] = useState(null);

    function onStart() {
        startGps(address); 
        onChangeStatus(drop.drop_idx, "Navigating"); 
        };

    function onArrived() {
        const start = Date.now();
        setArrived(start);
        onChangeStatus(drop.drop_idx, "In-progress");
        onChangeStart(drop.drop_idx, start);
        console.log(start);
    };

    function onDelivered() {
        const end = Date.now();
        setDelivered(end);
        onChangeStatus(drop.drop_idx, "Completed");
        onChangeStop(drop.drop_idx, end);
        console.log(end);
    };

    function onCompleted() {
        const elapsedms = delivered - arrived;
        return elapsedms;
    }

    if (drop.status === "Not-started") {
    
    return (
    <div className={s.dropCard}>
      <h2>Drop {index}</h2>
    <Gps 
        address={address}
        setAddress={setAddress}
        onStart={onStart}
        />
    </div>
           ) }
    if (drop.status === "Navigating") {
    return (
    <div className={s.dropCard}>
        <h2>Drop {index}</h2>
    <Startbtn onArrived={onArrived}/>
    </div>
                )
    }

    if (drop.status === "In-progress") {
    return (
    <div className={s.dropCard}>
        <h2>Drop {index}</h2>
    <Stopbtn onDelivered={onDelivered}/>

    </div>
        ) 
    }

    if (drop.status === "Completed") {
        return (
        <div className={s.dropCard}>
        <h3>elapsed time: {onCompleted()}</h3>
        </div>
        )
    }
}

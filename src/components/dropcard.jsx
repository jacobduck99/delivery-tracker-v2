import { useState, useEffect } from "react";
import Gps from "./gps.jsx";
import { startGps } from "./nav.js";
import s from './Dropcard.module.css';
import Startbtn, { Stopbtn } from "./buttons.jsx";
import { addCompletedLs } from "../lib/storage/runStorage.js";

export default function Dropcard({ drop, index, onChangeStatus, onChangeAddress, onChangeStart, onChangeStop, onChangeElapsed }) {
    const [address, setAddress] = useState("");
    const [arrived, setArrived] = useState(null);
    const [delivered, setDelivered] = useState(null);

    function onStart() {
        startGps(address); 
        onChangeStatus(drop.drop_idx, "Navigating"); 
        onChangeAddress(drop.drop_idx, address); 
        };

    function onArrived() {
        const start = Date.now();
        setArrived(start);
        onChangeStatus(drop.drop_idx, "In-progress");
        onChangeStart(drop.drop_idx, start);
        console.log(start);
    };

    async function onDelivered() {
        const end = Date.now();
        setDelivered(end);

        const ms = end - arrived;

        onChangeStatus(drop.drop_idx, "Finishing");
        onChangeStop(drop.drop_idx, end);
        onChangeElapsed(drop.drop_idx, ms); 
        console.log("waiting")
        await timerForStatus(4000);
        console.log("done");
        onChangeStatus(drop.drop_idx, "Completed");
        console.log(end);
        }

    function timerForStatus(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("done");
            }, ms);
            });
        }

    function onCompleted(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const paddedSeconds = seconds.toString().padStart(2, "0");

        return `${minutes}:${paddedSeconds}`;
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

    if (drop.status === "Finishing") {
        const ms = drop.end_ts - drop.start_ts;
    return (
        <div className={s.dropCard}>
            <h3>elapsed time: {onCompleted(ms)}</h3>
        </div>
    );
}

    if (drop.status === "Completed") {
        const ms = drop.end_ts - drop.start_ts;
    return (
        <div className={s.dropCard}>
            <h3>elapsed time: {onCompleted(ms)}</h3>
        </div>
    );
}
}

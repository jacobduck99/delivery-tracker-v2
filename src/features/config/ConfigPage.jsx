import { useState } from "react";
import s from "./config.module.css";
import { loadConfig, saveConfig } from "../../lib/storage/configStorage.js";
import { saveConfigToServer } from "../../lib/api/configApi.js";
import { getUserId } from "../../lib/storage/userStorage.js";
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const [form, setForm] = useState({
    vanNumber: "",
    vanName: "",
    shiftStart: "",
    firstBreak: "",
    secondBreak: "",
    shiftEnd: "",
    numberOfDeliveries: "",
    truckDamage: "",
  });

    const navigate = useNavigate();

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }


async function handleSubmit(e) {
    e.preventDefault();

    saveConfig(form);
    const localConfig = loadConfig();
    console.log("Loaded from localStorage:", localConfig);

    const userId = getUserId();
    navigate("/run");
    if (!userId) {
    console.error("No user ID found. User probably not logged in.");
    return;
  }

    const payload = {
    user_id: Number(userId),
    van_number: form.vanNumber,
    van_name: form.vanName,
    start_time: form.shiftStart,
    first_break: form.firstBreak,
    second_break: form.secondBreak,
    end_time: form.shiftEnd,
    number_of_drops: Number(form.numberOfDeliveries),
    truck_damage: form.truckDamage,
  };

    try {
        const result = await saveConfigToServer(payload);
        console.log("Config saved on server:", result);
    } catch (err) {
        console.error("Error saving config:", err);
    }

    console.log("Form state:", form);
    }


  return (
    <main className={s.wrap}>
      <div className={s.container}> 
<h1 className={s.title}>Love Coles</h1>
        <form onSubmit={handleSubmit}>
          <div className={s.group}>
            <label className={s.label} htmlFor="vanNumber">Van Number</label>
            <input
              id="vanNumber"
              className={s.input}
              value={form.vanNumber}
              onChange={(e) => updateField("vanNumber", e.target.value)}
              placeholder="e.g 26"
            />
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="vanName">Van Name</label>
            <input
              id="vanName"
              className={s.input}
              value={form.vanName}
              onChange={(e) => updateField("vanName", e.target.value)}
              placeholder="e.g Jacob"
            />
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="shiftStart">Shift Start</label>
            <input
              id="shiftStart"
              type="time"
              className={s.input}
              value={form.shiftStart}
              onChange={(e) => updateField("shiftStart", e.target.value)}
            />
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="firstBreak">First Break</label>
            <input
              id="firstBreak"
              type="time"
              className={s.input}
              value={form.firstBreak}
              onChange={(e) => updateField("firstBreak", e.target.value)}
            />
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="secondBreak">Second Break</label>
            <input
              id="secondBreak"
              type="time"
              className={s.input}
              value={form.secondBreak}
              onChange={(e) => updateField("secondBreak", e.target.value)}
            />
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="shiftEnd">Shift End</label>
            <input
              id="shiftEnd"
              type="time"
              className={s.input}
              value={form.shiftEnd}
              onChange={(e) => updateField("shiftEnd", e.target.value)}
            />
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="numberOfDeliveries">Number of Deliveries</label>
            <input
              id="numberOfDeliveries"
              className={s.input}
              value={form.numberOfDeliveries}
              onChange={(e) => updateField("numberOfDeliveries", e.target.value)}
              placeholder="e.g 25"
            />
          </div>

          <div className={s.group}>
            <label className={s.label} htmlFor="truckDamage">Truck Damage?</label>
            <input
              id="truckDamage"
              className={s.input}
              value={form.truckDamage}
              onChange={(e) => updateField("truckDamage", e.target.value)}
              placeholder="optional"
            />
          </div>

          <div className={s.actions}>
            <button type="submit" className={s.button}>
              Start Shift
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

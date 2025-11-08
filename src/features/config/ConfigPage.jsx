import { useState } from "react";
import s from "./config.module.css";

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

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
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

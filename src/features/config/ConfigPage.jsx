import { useState } from "react";
import s from "./config.module.css";
import { loadConfig, saveConfig } from "../../lib/storage/configStorage.js";
import { saveConfigToServer } from "../../lib/api/configApi.js";
import { getUserId } from "../../lib/storage/userStorage.js";
import { useNavigate } from 'react-router-dom';
import { saveRun } from "../../lib/storage/runStorage.js";

export default function Form() {
    const [form, setForm] = useState({
    vanNumber: "",
    vanName: "",
    shiftStart: "",
    firstBreak: "",
    secondBreak: "",
    shiftEnd: "",
    actualEndTime: "",
    numberOfDeliveries: "",
    truckDamage: "",
  });

    const navigate = useNavigate();

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

    function handleSkip() {
        navigate("/run");
    }


async function handleSubmit(e) {
    e.preventDefault();

    saveConfig(form);
    const localConfig = loadConfig();
    console.log("Loaded from localStorage:", localConfig);

    const userId = getUserId();
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
    actual_end_time: form.actualEndTime,
    number_of_drops: Number(form.numberOfDeliveries),
    truck_damage: form.truckDamage,
  };

    try {
        const result = await saveConfigToServer(payload);
        saveRun(result);
        navigate("/run");
        console.log("Config saved on server:", result);
        

    } catch (err) {
        console.error("Error saving config:", err);
    }

    console.log("Form state:", form);
    }

return (
  <main className="min-h-screen w-full flex justify-center items-center bg-page px-4 font-sans">
    <div className="w-[90%] max-w-[800px] mx-auto mb-[55px] p-3 bg-card border border-app rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-center my-6 mb-3 text-[1.2rem] font-semibold text-high">
          Love Coles
        </h1>

        <button
          type="button"
          onClick={handleSkip}
          className="text-[1rem] font-semibold text-med hover:text-high active:scale-95 transition"
        >
          Skip
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* group */}
        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="vanNumber">
            Van Number
          </label>
          <input
            id="vanNumber"
            type="number"
            inputMode="numeric"
            min="0"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high placeholder:text-med/80 focus:outline-none focus:border-[var(--primary)] focus:ring-0 focus:ring-offset-0"
            value={form.vanNumber}
            onChange={(e) => updateField("vanNumber", e.target.value)}
            placeholder="e.g 26"
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="vanName">
            Van Name
          </label>
          <input
            id="vanName"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high placeholder:text-med/80 focus:outline-none focus:border-[var(--primary)]"
            value={form.vanName}
            onChange={(e) => updateField("vanName", e.target.value)}
            placeholder="e.g Jacob"
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="shiftStart">
            Shift Start
          </label>
          <input
            id="shiftStart"
            type="time"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high focus:outline-none focus:border-[var(--primary)]"
            value={form.shiftStart}
            onChange={(e) => updateField("shiftStart", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="firstBreak">
            First Break
          </label>
          <input
            id="firstBreak"
            type="time"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high focus:outline-none focus:border-[var(--primary)]"
            value={form.firstBreak}
            onChange={(e) => updateField("firstBreak", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="secondBreak">
            Second Break
          </label>
          <input
            id="secondBreak"
            type="time"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high focus:outline-none focus:border-[var(--primary)]"
            value={form.secondBreak}
            onChange={(e) => updateField("secondBreak", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="shiftEnd">
            Shift End
          </label>
          <input
            id="shiftEnd"
            type="time"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high focus:outline-none focus:border-[var(--primary)]"
            value={form.shiftEnd}
            onChange={(e) => updateField("shiftEnd", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="numberOfDeliveries">
            Number of Deliveries
          </label>
          <input
            id="numberOfDeliveries"
            type="number"
            inputMode="numeric"
            min="0"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high placeholder:text-med/80 focus:outline-none focus:border-[var(--primary)]"
            value={form.numberOfDeliveries}
            onChange={(e) => updateField("numberOfDeliveries", e.target.value)}
            placeholder="e.g 25"
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-[10px]">
          <label className="text-left mb-1 text-med font-semibold text-[0.9rem]" htmlFor="truckDamage">
            Truck Damage?
          </label>
          <input
            id="truckDamage"
            className="px-[0.6rem] py-[0.45rem] text-[16px] border border-app rounded-[8px] bg-card text-high placeholder:text-med/80 focus:outline-none focus:border-[var(--primary)]"
            value={form.truckDamage}
            onChange={(e) => updateField("truckDamage", e.target.value)}
            placeholder="optional"
          />
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="w-full rounded-full px-4 py-[0.65rem] text-[0.95rem] font-semibold text-white bg-primary bg-primary-hover hover:-translate-y-[1px] transition"
          >
            Start Shift
          </button>
        </div>
      </form>
    </div>
  </main>
);


}

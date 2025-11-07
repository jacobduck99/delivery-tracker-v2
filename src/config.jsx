import { useState } from 'react';


    export default function Form() {
    const [form, setForm] = useState({
    vanNumber: "",
    vanName: "",
    shiftStart: "",
    firstBreak: "",
    secondBreak: "",
    shiftEnd: "",
    numberOfDelivieries: "",
    truckDamage: "", 
    }) 


    
    function updateField(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    }

    return (
    <form onSubmit={handleSubmit}>
    <input
        value={form.vanNumber} 
        onChange={(e) => updateField("vanNumber", e.target.value)}
        placeholder="e.g 26"
    />
    <input 
        value={form.vanName}
        onChange={(e) => updateField("vanName", e.target.value)}
        placeholder="e.g Jacob"
    />
    <input
        value={form.shiftStart}
        onChange={(e) => updateField("shifStart", e.target.value)}
    />
    <input
        value={form.firstBreak}
        onChange={(e) => updateField("firstBreak", e.target.value)}
    />

    <input
        value={form.secondBreak}
        onChange={(e) => updateField("secondBreak", e.target.value)}
    />

    <input
        value={form.shiftEnd}
        onChange={(e) => updateField("shiftEnd", e.target.value)}
    />

    <input
        value={form.numberOfDeliveries}
        onChange={(e) => updateField("numberOfDeliveries", e.target.value)}
    />

    <input
        value={form.truckDamage}
        onChange={(e) => updateField("truckDamage", e.target.value)}
    />
    <button onClick={handleSubmit}>Start shift</button>
    </form>
    ); 

};

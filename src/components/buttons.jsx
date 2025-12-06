

export default function Startbtn({ onArrived }) {
  return (
    <button
      onClick={onArrived}
      className="w-full bg-blue-500 text-white font-semibold py-3 rounded-full shadow-sm active:scale-[0.98] transition"
    >
      Arrived
    </button>
  );
}

export function Stopbtn({ onDelivered }) {
  return (
    <button
      onClick={onDelivered}
      className="w-full bg-red-500 text-white font-semibold py-3 rounded-full shadow-sm active:scale-[0.98] transition"
    >
      Delivered
    </button>
  );
}


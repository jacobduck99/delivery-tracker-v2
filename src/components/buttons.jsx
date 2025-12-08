

export default function Startbtn({ onArrived }) {
  return (
    <button
      onClick={onArrived}>
      Arrived
    </button>
  );
}

export function Stopbtn({ onDelivered }) {
  return (
    <button
      onClick={onDelivered}>Delivered
    </button>
  );
}

export function EndshiftBtn({ endShift, runId, showModal }) {
  return (
    <div>
      <button
        className="w-70 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => showModal(true)}
      >
        End shift
      </button>
      </div>
  );
}

export function EndShiftModal() {
    return (
    <div>
        <button
            className="">
            Cancel
        </button>
        </div>


    ) 
} 

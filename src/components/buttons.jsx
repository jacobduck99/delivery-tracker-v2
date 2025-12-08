

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

export function EndshiftBtn({ showModal }) {
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

export function EndShiftModal({ showModal, endshift }) {
    return (
    <div>
        <p>Are you sure you want to end shift?</p>
        <button
            className="" onClick={() => showModal(false)}>
            No
        </button>

        <button
            className="" onClick={() => endshift()}>
                Yes
        </button>
        </div>


    ) 
} 

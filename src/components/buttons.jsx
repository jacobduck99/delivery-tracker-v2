

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

export function EndshiftBtn({ showModal, hideEndShift }) {
  return (
    <div>
      <button
        className="w-70 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => { showModal(true); hideEndShift(true);}}
      >
        End shift
      </button>
      </div>
  );
}

export function EndShiftModal({ showModal, handleEndShift, hideEndShift }) {
    return (
    <div className="flex space-x-4">
        <button
            className="w-50 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700" 
            onClick={() => { showModal(false); hideEndShift(false);}}>
            No
        </button>

        <button
            className="w-50 bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700" 
            onClick={() => handleEndShift()}>
                Yes
        </button>
        </div>


    ) 
} 

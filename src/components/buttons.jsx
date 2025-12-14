

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

export function EndshiftBtn({ showModal, setIsEndShiftVisible }) {
  return (
    <div>
      <button
        className="w-70 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => { showModal(true); setIsEndShiftVisible(true);}}
      >
        End shift
      </button>
      </div>
  );
}

export function EndShiftModal({ showModal, handleEndShift, setIsEndShiftVisible }) {
    return (
    <div className="flex space-x-8">
        <button
            className="w-35 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700" 
            onClick={() => { showModal(false); setIsEndShiftVisible(false);}}>
            No
        </button>


        <button
            className="w-35 bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700" 
            onClick={() => handleEndShift()}>
                Yes
        </button>
        </div>


    ) 
} 

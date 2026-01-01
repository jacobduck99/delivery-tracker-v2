

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
        className="w-40 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => { showModal(true); setIsEndShiftVisible(true);}}
      >
        End shift
      </button>
      </div>
  );
}

export function EndShiftModal({ showModal, handleEndShift, setIsEndShiftVisible }) {
    return (
    <div className="flex space-x-6">
        <button
            className="w-35 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700" 
            onClick={() => { showModal(false); setIsEndShiftVisible(false);}}>
            No
        </button>


        <button
            className="w-35 bg-green-600 text-white py-2.5 rounded-full font-semibold hover:bg-green-700" 
            onClick={() => handleEndShift()}>
                Yes
        </button>
        </div>

    ) 
} 

export function LogoutBtn({ handleOnClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={[
        "h-10 px-4",
        "bg-orange-600 text-white",
        "rounded-full font-semibold",
        "text-[0.95rem] leading-none",
        "hover:bg-orange-700",
        className,
      ].join(" ")}
    >
      Logout
    </button>
  );
}

export function ConfigBtn({ handleOnClick }) {
  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleOnClick}
        className="w-[15rem] bg-blue-600 text-white py-2.5 rounded-full font-medium hover:bg-blue-700"
      >
        Config shift
      </button>
    </div>
  );
}




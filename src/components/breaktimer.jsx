
export function BreakButton({ showBreakModal }) {
    return (
        <div>
          <button
            className="w-13 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
            onClick={() => { showBreakModal(true); }}
          >
            B
          </button>
          </div>
      );
}

export function BreakButtonModal({ setBreakSelection, handleSelectedBreak }) {
  return (
    <div className="flex flex-col gap-4 mt-3 items-center">
      <button
        className="w-25 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => {
            handleSelectedBreak(15);
        }}
      >
        15 
      </button>

      <button
        className="w-25 bg-green-600 text-white py-2.5 rounded-full font-semibold hover:bg-green-700"
        onClick={() => {
            handleSelectedBreak(30);
        }}
      >
        30
      </button>
    </div>
  );
}

export function EndBreakTimerBtn({ handleBreakEnded }) {
   return (
    <button
        className="w-30 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => { handleBreakEnded() }}
      >
        End Break
      </button>
   ) 
}


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

export function BreakButtonModal({ setBreakSelection, setShowBreakModal, setBreakStartAt }) {
  return (
    <div className="flex flex-col gap-4 mt-3 items-center">
      <button
        className="w-25 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => {
            setBreakSelection(15);
            setShowBreakModal(false);
            setBreakStartAt(Date.now());
        }}
      >
        15 
      </button>

      <button
        className="w-25 bg-green-600 text-white py-2.5 rounded-full font-semibold hover:bg-green-700"
        onClick={() => {
            setBreakSelection(30);
            setShowBreakModal(false);
            setBreakStartAt(Date.now());
        
        }}
      >
        30
      </button>
    </div>
  );
}

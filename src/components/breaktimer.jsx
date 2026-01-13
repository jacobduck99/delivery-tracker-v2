
export function BreakButton({ showBreakModal }) {
    return (
        <div>
          <button
            className="w-40 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
            onClick={() => { showBreakModal(true); }}
          >
            Start Break
          </button>
          </div>
      );
}

export function BreakButtonModal({ setBreakSelection, setShowBreakModal }) {
  return (
    <div className="flex space-x-6 flex flex-col justify-center">
      <button
        className="w-35 bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => {
          setBreakSelection(15);
          setShowBreakModal(false);
        }}
      >
        15 minute break
      </button>

      <button
        className="w-35 bg-green-600 text-white py-2.5 rounded-full font-semibold hover:bg-green-700"
        onClick={() => {
          setBreakSelection(30);
          setShowBreakModal(false);
        }}
      >
        30 minute break
      </button>
    </div>
  );
}

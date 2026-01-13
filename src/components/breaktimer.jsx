
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

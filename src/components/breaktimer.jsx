import { Coffee } from 'lucide-react';

export function BreakButton({ showBreakModal }) {
  return (
    <button
      type="button"
      aria-label="Toggle break modal"
      className="w-13 text-foreground py-2.5 inline-flex items-center justify-center"
      onClick={() => showBreakModal((prev) => !prev)}
    >
      <Coffee className="h-7 w-7" />
    </button>
  );
}

export function BreakButtonModal({ setBreakSelection, handleSelectedBreak }) {
  return (
    <div className="flex flex-col gap-4 mt-3 items-center">
      <button
        className="w-25 text-white py-2.5 rounded-full font-semibold hover:bg-red-700"
        onClick={() => {
            handleSelectedBreak(15);
        }}
      >
        15 
      </button>

      <button
        className="w-25 text-white py-2.5 rounded-full font-semibold hover:bg-green-700"
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

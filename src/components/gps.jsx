
// make sure on the run page you create the data for the arguments and also wire up start gps from nav.js 

export default function Gps({ address, setAddress, onStart }) {
  return (
    <div className="bg-card text-card-foreground rounded-xl p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input
          id="gps-input"
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-input bg-background text-foreground placeholder:text-muted-foreground rounded-lg p-2
                     focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

    <button
      type="button"
      onClick={onStart}
      className="
        mt-1 w-full rounded-[14px] px-4 py-3
        bg-primary text-primary-foreground
        font-semibold tracking-tight
        shadow-md
        hover:bg-primary/90
        active:bg-primary/80
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-offset-2
        transition
      "
    >
      Start Navigation
    </button>

    </div>
  );
}




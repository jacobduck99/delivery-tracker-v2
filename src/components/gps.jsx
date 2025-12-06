
// make sure on the run page you create the data for the arguments and also wire up start gps from nav.js 

export default function Gps({ address, setAddress, onStart }) {
  return (
   
  <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <label htmlFor="gps-input" className="text-sm font-medium">
        Enter address
      </label>

      <input
        id="gps-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border border-gray-300 rounded-lg p-2"
      />
    </div>

    <button
      type="button"
      onClick={onStart}
      className="bg-green-500 text-white py-3 rounded-full font-semibold"
    >
      Start Navigation
    </button>
  </div>

  );
}



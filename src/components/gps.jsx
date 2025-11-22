
// make sure on the run page you create the data for the arguments and also wire up start gps from nav.js
export default function Gps({ address, setAddress, onStart }) {
  return (
    <div className="container">
      <div className="card">
        <div className="input-row">
          <label htmlFor="gps-input">Enter address</label>
          <input
            id="gps-input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="button" onClick={onStart}>
          Start Navigation
        </button>
      </div>
    </div>
  );
}



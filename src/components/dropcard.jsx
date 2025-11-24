



export default function Dropcard({ drop, index }) {
  return (
    <div className="card">
      <h2>Drop {index + 1}</h2>
      <pre style={{ background: "#eee", padding: "6px" }}>
        {JSON.stringify(drop, null, 2)}
      </pre>
    </div>
  );
}


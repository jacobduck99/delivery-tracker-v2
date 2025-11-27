



export default function Startbtn({ onArrived }) {
  return (
    <div className="container">
      <button onClick={onArrived}>Arrived</button>
    </div>
  );
}

export function Stopbtn({ onDelivered }) {
  return (
    <div className="container">
      <button onClick={onDelivered}>Delivered</button>
    </div>
  );
}

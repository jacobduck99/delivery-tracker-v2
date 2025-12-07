

export default function Startbtn({ onArrived }) {
  return (
    <button
      onClick={onArrived}>
      Arrived
    </button>
  );
}

export function Stopbtn({ onDelivered }) {
  return (
    <button
      onClick={onDelivered}>Delivered
    </button>
  );
}

export function EndshiftBtn( { className }) {
    return (
    <button className={className}>
    End shift
    </button>
    )
}

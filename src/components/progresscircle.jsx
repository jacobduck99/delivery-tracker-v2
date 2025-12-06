import Gps from "./gps.jsx";

const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto mt-6 min-h-[240px] flex flex-col">
    {children}
  </div>
);

export default function Circleprogress() {
  return (

<Card>
  <div className="flex-1 flex flex-col items-center justify-center">
    <svg
      width="180"
      height="200"
      viewBox="0 0 200 200"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="#e5e7eb"
        strokeWidth="12"
        fill="none"
      />

      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="#3b82f6"
        strokeWidth="12"
        fill="none"
      />
    </svg>

  </div>
</Card>

  );
}


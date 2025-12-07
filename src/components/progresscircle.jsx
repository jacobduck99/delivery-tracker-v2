import Gps from "./gps.jsx";

export const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto mt-6 min-h-[240px] flex flex-col">
    {children}
  </div>
);

export default function CircleProgress({ completed, total }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const progress = total > 0 ? completed / total : 0;
  const offset = circumference * (1 - progress);

  // Five colours: red → orange → yellow → blue → green
  let colour;
  if (progress < 0.20) colour = "#ef4444";      // red
  else if (progress < 0.40) colour = "#f97316"; // orange
  else if (progress < 0.60) colour = "#eab308"; // yellow
  else if (progress < 0.80) colour = "#3b82f6"; // blue
  else colour = "#22c55e";                      // green

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">

        <svg
          className="absolute top-0 left-0"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="18"
            fill="none"
          />

          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={colour}
            strokeWidth="18"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)" // clockwise
            style={{
              transition: "stroke-dashoffset 0.3s ease, stroke 0.2s ease"
            }}
          />
        </svg>

        <span className="text-2xl font-bold">
          {Math.round(progress * 100)}%
        </span>

      </div>
    </div>
  );
}


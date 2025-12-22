import Gps from "./gps.jsx";

export const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto mt-6 min-h-[240px] flex flex-col">
    {children}
  </div>
);

export default function CircleProgress({
  completed,
  total,
  size = 170,        // 👈 smaller overall size
  strokeWidth = 12,  // 👈 thinner ring
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = total > 0 ? completed / total : 0;
  const offset = circumference * (1 - progress);

  let colour;
  if (progress < 0.2) colour = "#ef4444";
  else if (progress < 0.4) colour = "#f97316";
  else if (progress < 0.6) colour = "#eab308";
  else if (progress < 0.8) colour = "#3b82f6";
  else colour = "#22c55e";

  return (
    <div className="flex-1 flex items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="absolute top-0 left-0"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colour}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: "stroke-dashoffset 0.3s ease, stroke 0.2s ease",
            }}
          />
        </svg>

        <span className="text-lg font-semibold">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}



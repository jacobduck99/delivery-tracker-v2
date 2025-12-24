
export default function Metric({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span
        className={`mt-1 text-lg font-semibold ${
          highlight
            ? "text-gray-900"
            : "text-gray-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

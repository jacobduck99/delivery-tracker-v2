
export default function Metric({ label, value, highlight, full = false }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-[0.7rem] uppercase tracking-wider text-gray-600">
        {label}
      </p>
      <p
        className={`mt-1 ${
          highlight
            ? "text-[1.2rem] font-medium text-gray-900"
            : "text-lg font-medium text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

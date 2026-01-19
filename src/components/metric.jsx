
export default function Metric({ label, value, highlight, full = false }) {
  return (
    <div className={`${full ? "col-span-3" : ""} flex flex-col`}>
      <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 ${
          highlight
            ? "text-[1.2rem] font-medium text-foreground"
            : "text-lg font-medium text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}


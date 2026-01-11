

export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "bg-card text-card-foreground border border-border rounded-2xl shadow-md w-full mx-auto flex flex-col",
        "max-w-md",
        "p-[clamp(0.75rem,2.2vh,1.5rem)]",
        "mt-[clamp(0.5rem,2vh,1.5rem)]",
        "min-h-[clamp(9rem,28svh,14rem)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}




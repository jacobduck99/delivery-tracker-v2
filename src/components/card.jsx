
export default function Card({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto mt-6 min-h-[220px] flex flex-col">
      {children}
    </div>
  );
}


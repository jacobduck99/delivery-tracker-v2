import Gps from "./gps.jsx";

const Card = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto mt-6 min-h-[220px] flex flex-col">
    {children}
  </div>
);

export default function Circleprogress() {
  return (
    <Card>
      <h2 className="text-[0.9rem] font-bold">Drop</h2>

      <div className="flex-1 flex flex-col justify-center">
        <Gps 
          address="" 
          setAddress={() => {}} 
          onStart={() => {}} 
        />
      </div>
    </Card>
  );
}


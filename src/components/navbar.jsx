import React from "react";
import { Link } from "react-router-dom";
import { Navigation2, ChartNoAxesColumn, CircleUser } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-3 left-0 right-0 z-10 flex justify-center px-4">
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-4xl xl:max-w-6xl bg-white/90 backdrop-blur border border-gray-200 shadow-sm rounded-2xl">
        <ul className="flex justify-around py-3">
          <li>
            <Link to="/run" className="flex flex-col items-center text-[0.9rem] font-semibold text-gray-700">
              <Navigation2 size={22} />
              <span>Live</span>
            </Link>
          </li>

          <li>
            <Link to="/stats" className="flex flex-col items-center text-[0.9rem] font-semibold text-gray-700">
              <ChartNoAxesColumn size={22} />
              <span>Stats</span>
            </Link>
          </li>

          <li>
            <Link to="/account" className="flex flex-col items-center text-[0.9rem] font-semibold text-gray-700">
              <CircleUser size={22} />
              <span>Account</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}







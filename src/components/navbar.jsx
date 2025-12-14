import React from "react";
import { Link } from "react-router-dom";
import { Navigation2, ChartNoAxesColumn, CircleUser } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-2 w-full bg-white z-10">

      <ul className="flex justify-around py-2">
        <li>
          <Link
            to="/run"
            className="flex flex-col items-center text-[0.9rem] font-semibold text-gray-700"
          >
            <Navigation2 size={22} />
            <span>Live</span>
          </Link>
        </li>

        <li>
          <Link
            to="/stats"
            className="flex flex-col items-center text-[0.9rem] font-semibold text-gray-700"
          >
            <ChartNoAxesColumn size={22} />
            <span>Stats</span>
          </Link>
        </li>

        <li>
          <Link
            to="/config"
            className="flex flex-col items-center text-[0.9rem] font-semibold text-gray-700"
          >
            <CircleUser size={22} />
            <span>Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}


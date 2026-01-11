import React from "react";
import { Link } from "react-router-dom";
import { Navigation2, ChartNoAxesColumn, CircleUser } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed bottom-3 left-0 right-0 z-10 flex justify-center px-4">
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-4xl xl:max-w-6xl bg-card text-card-foreground border border-border shadow-sm rounded-2xl h-16">
        <ul className="grid grid-cols-3 h-full">
          <li className="h-full">
            <Link
              to="/run"
              className="h-full grid place-items-center text-muted-foreground hover:text-foreground transition"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <Navigation2 size={22} className="block" />
                <span className="text-[0.9rem] font-semibold leading-none">
                  Live
                </span>
              </div>
            </Link>
          </li>

          <li className="h-full">
            <Link
              to="/stats"
              className="h-full grid place-items-center text-muted-foreground hover:text-foreground transition"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <ChartNoAxesColumn size={22} className="block" />
                <span className="text-[0.9rem] font-semibold leading-none">
                  Stats
                </span>
              </div>
            </Link>
          </li>

          <li className="h-full">
            <Link
              to="/account"
              className="h-full grid place-items-center text-muted-foreground hover:text-foreground transition"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <CircleUser size={22} className="block" />
                <span className="text-[0.9rem] font-semibold leading-none">
                  Account
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}





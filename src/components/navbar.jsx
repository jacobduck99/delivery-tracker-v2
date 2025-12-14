import React from 'react';
import { Link } from "react-router-dom";
// these are mostly dummy values for the links because pages haven't been built yet. 
export default function Navbar() {
  return (
  <nav className="fixed h-15 bg-red-600 bottom-0 w-full z-10">
    <ul className="flex flex-row justify-center space-x-8">
    <li>
      <Link to="/">Live</Link>
    </li>
    <li>
      <Link to="/config">Stats</Link>
    </li>
    <li>
      <Link to="/login">Account</Link>
    </li>
    </ul>
  </nav>
  );
}
;

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <nav>
        <ul>
          <li>
            <Link
              href="/"
              className={`block p-4 ${
                pathname === "/" ? "bg-gray-700" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/patient"
              className={`block p-4 ${
                pathname === "/patient" ? "bg-gray-700" : ""
              }`}
            >
              Patients
            </Link>
          </li>
          <li>
            <Link
              href="/professional"
              className={`block p-4 ${
                pathname === "/professional" ? "bg-gray-700" : ""
              }`}
            >
              Professionals
            </Link>
          </li>
          <li>
            <Link
              href="/health-insurance"
              className={`block p-4 ${
                pathname === "/health-insurance" ? "bg-gray-700" : ""
              }`}
            >
              Health Insurance
            </Link>
          </li>
          <li>
            <Link
              href="/office"
              className={`block p-4 ${
                pathname === "/office" ? "bg-gray-700" : ""
              }`}
            >
              Offices
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

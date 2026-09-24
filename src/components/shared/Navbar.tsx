"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { WorkoutContext } from "@/context/WorkoutContext";

const Navbar = () => {
  const pathname = usePathname();

  const workoutContext = useContext(WorkoutContext);
  const plan = workoutContext?.plan || [];
  const saved = workoutContext?.saved || [];

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "bg-[#31322F] text-[#CCFF00]"
              : "text-gray-400"
          }
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan"
          className={
            pathname === "/my-plan"
              ? "bg-[#31322F] text-[#CCFF00]"
              : "text-gray-400"
          }
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <nav className="border-b border-[#1D2022] bg-[#0B0D0E] text-white">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">

        {/* Navbar Start */}
        <div className="navbar-start">

          {/* Mobile Dropdown */}
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-[#272A2E] bg-[#17191E] p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={28}
              height={28}
            />

            <span className="text-lg font-bold sm:text-xl">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Navbar Center - Desktop/Tablet */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-3 sm:gap-5">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2"
          >
            <span className="hidden text-xs text-[#8B8D91] sm:inline">
              Plan
            </span>

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CCFF00] text-[10px] font-semibold text-black">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2"
          >
            <span className="hidden text-xs text-[#8B8D91] sm:inline">
              Saved
            </span>

            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#4A4D50] text-[10px] text-[#A6A8AB]">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
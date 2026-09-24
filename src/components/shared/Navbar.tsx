"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png"

const Navbar = () => {
  const pathname = usePathname();

  return (
  <nav className="border-b border-[#1D2022] bg-[#0B0D0E] text-white">
   <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
        <Image 
        src={logo}
        alt="FitLog Logo"
         width={28} height={28}
         />
         <span className="text-xl font-bold">
            FITLOG
        </span>
        </Link>

        {/* Navigation */}
       <div className="flex items-center gap-3">
       <Link href="/"
         className={`rounded-full px-4 py-2 ${
           pathname === "/" ? "bg-[#31322f] text-[#ccff00]" : "text-gray-400" }`
           }>
            Workouts
        </Link>

        <Link href="/my-plan"
         className={`rounded-full px-4 py-2 ${
           pathname === "/my-plan" ? "bg-[#31322f] text-[#ccff00]": "text-gray-400"}`
           }> 
            My Plan
        </Link>
       </div>
    {/* Status */}
    <div className="flex items-center gap-5 text-xs">

     {/* Plan */}
    <div className="flex items-center gap-2">
    <span className="text-[#8B8D91]">Plan</span>

    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CCFF00] text-[10px] font-semibold text-black">
      0
    </span>
    </div>

  {/* Saved */}
    <div className="flex items-center gap-2">
    <span className="text-[#8B8D91]">Saved</span>

    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#4A4D50] text-[10px] text-[#A6A8AB]">
      0
    </span>
    </div>

</div>
  </div>
    </nav>
  );
}
export default Navbar;
import Image from "next/image";

import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-[#272A2E] bg-[#0B0D0E]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />

          <span className="font-[family-name:var(--font-oswald)] text-sm font-bold uppercase text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-[#858990] md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
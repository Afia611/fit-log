import Image from "next/image";
import Link from "next/link";

import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-[#101B2D] px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 rounded-xl border border-[#2A2D31] bg-[#17191E] px-6 py-10 md:grid-cols-2 md:px-12 md:py-10">
        
        {/* Left Side */}
        <div>
          <p className="text-sm font-bold uppercase text-[#CCFF00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-6 text-[#A5A7AB] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Browse Workouts CTA */}
          <Link
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#CCFF00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#B8E600]"
          >
            BROWSE WORKOUTS

            <span aria-hidden="true" className="text-base">
              ↓
            </span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center md:justify-end">
          <Image
            src={banner}
            alt="Workout exercise"
            priority
            className="h-auto w-full max-w-[380px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
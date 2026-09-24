import Image from "next/image";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-[#0B0D0E] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="grid min-h-[430px] items-center overflow-hidden rounded-xl border border-[#272A2E] bg-[#17191E] px-8 py-10 md:grid-cols-2 md:px-14">

          {/* Left Content */}
          <div>
            <p className="mb-6 text-xs font-bold tracking-wide text-[#CCFF00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-2xl text-4xl font-extrabold uppercase leading-[0.95] text-white md:text-5xl lg:text-6xl">
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-[#9B9DA1]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-7 inline-flex items-center gap-2 rounded bg-[#CCFF00] px-6 py-3 text-xs font-bold text-black transition hover:bg-[#b8e600]"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right Image */}
          <div className="mt-10 flex items-center justify-center md:mt-0 md:justify-end">
            <Image
              src={banner}
              alt="Workout exercise"
              className="h-auto w-[280px] md:w-[330px] lg:w-[380px]"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
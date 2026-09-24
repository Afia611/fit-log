import Image from "next/image";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-gray-900 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center overflow-hidden rounded-xl border border-[#272A2E] bg-[#17191E] px-5 py-8 sm:px-8 sm:py-10 md:min-h-[430px] md:grid-cols-2 md:px-10 lg:px-14">

          {/* Left Content */}
          <div className="text-center md:text-left">

            <p className="mb-4 text-xs font-bold tracking-wider text-[#CCFF00] sm:mb-6">
              WORKOUT LIBRARY
            </p>

            <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              TRAIN WITH INTENT.
              <br className="hidden lg:block" /> LOG EVERY SET.
            </h1>

            <p className="mx-auto mt-10 max-w-lg text-sm leading-6 text-[#9B9DA1] md:mx-0 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            <a
              href="#library"
              className="mt-7 inline-flex items-center justify-center rounded bg-[#CCFF00] px-6 py-3 text-xs font-bold text-black transition hover:bg-[#B8E600]"
            >
              BROWSE WORKOUTS
            </a>

          </div>

          {/* Right Image */}
          <div className="mt-8 flex items-center justify-center md:mt-0 md:justify-end">
            <Image
              src={banner}
              alt="Workout exercise"
              className="h-auto w-full max-w-[240px] sm:max-w-[300px] md:max-w-[330px] lg:max-w-[380px]"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
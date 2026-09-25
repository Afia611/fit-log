import { Workout } from "@/types/workout-types";
import WorkoutLibrary from "./WorkoutLibrary";

const Workouts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  const workouts: Workout[] = await res.json();

  return (
    <section
      id="library"
      className="bg-[#0B0D0E] px-4 py-12 text-white sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
            Workout Library
          </p>

          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase sm:text-4xl">
            Find Your Next Workout
          </h2>

          <p className="mt-2 text-sm text-[#9B9DA1]">
            Explore workouts and build your perfect training plan.
          </p>
        </div>

        {/* Search + Workout Cards */}
        <WorkoutLibrary workouts={workouts} />
      </div>
    </section>
  );
};

export default Workouts;
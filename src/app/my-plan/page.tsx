"use client";

import { useContext, useState } from "react";
import Link from "next/link";

import { WorkoutContext } from "@/context/WorkoutContext";
import PlanWorkoutCard from "@/components/shared/PlanWorkoutCard";

const MyPlanPage = () => {
  const workoutContext = useContext(WorkoutContext);

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] = useState<
  "duration" | "calories" | "rating"
  >("duration");

  if (!workoutContext) {
    return null;
  }

  const { plan, saved } = workoutContext;

  // Calculate Today's Plan metrics
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  // Choose workouts based on the active tab
  const activeWorkouts = activeTab === "plan" ? plan : saved;

  // Sort a copy so the original Context state is not changed
   const sortedWorkouts = [...activeWorkouts].sort((a, b) => {
  if (sortBy === "duration") {
    return a.duration - b.duration;
  }

  if (sortBy === "calories") {
    return b.caloriesBurned - a.caloriesBurned;
  }

  if (sortBy === "rating") {
    return b.rating - a.rating;
  }

  return 0;
});
  return (
    <main className="min-h-screen bg-[#0B0D0E] text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Page Heading */}
        <div>
          <h1 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-[#8B8D91]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary */}
        <div className="mt-7 grid grid-cols-1 overflow-hidden rounded-xl border border-[#272A2E] bg-[#17191E] sm:grid-cols-3">
          {/* Exercises */}
          <div className="px-6 py-5 sm:border-r sm:border-[#272A2E]">
            <p className="text-xs text-[#8B8D91]">Exercises</p>

            <p className="mt-1 font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#CCFF00]">
              {plan.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-t border-[#272A2E] px-6 py-5 sm:border-r sm:border-t-0">
            <p className="text-xs text-[#8B8D91]">Minutes</p>

            <p className="mt-1 font-[family-name:var(--font-oswald)] text-3xl font-bold">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="border-t border-[#272A2E] px-6 py-5 sm:border-t-0">
            <p className="text-xs text-[#8B8D91]">Calories</p>

            <p className="mt-1 font-[family-name:var(--font-oswald)] text-3xl font-bold">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs and Sort */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex">
            <div className="flex rounded-lg border border-[#272A2E] bg-[#17191E] p-1">
              <button
                onClick={() => setActiveTab("plan")}
                className={`rounded-md px-5 py-2 text-xs transition ${
                  activeTab === "plan"
                    ? "bg-[#30333A] font-semibold text-white"
                    : "text-[#8B8D91]"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`rounded-md px-5 py-2 text-xs transition ${
                  activeTab === "saved"
                    ? "bg-[#30333A] font-semibold text-white"
                    : "text-[#8B8D91]"
                }`}
              >
                Saved
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8B8D91]">Sort By</span>

            <select
            value={sortBy} onChange={(event) =>
              setSortBy( 
              event.target.value as | "duration"| "calories" | "rating"
            )
          }
          className="rounded-lg border border-[#272A2E] bg-[#17191E] px-4 py-2.5 text-xs text-white outline-none transition focus:border-[#CCFF00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          
          </div>
        </div>

        {/* Workout Area */}
        <div className="mt-6">
          {activeWorkouts.length === 0 ? (
            /* Empty State */
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#272A2E] px-4 text-center">
              <h2 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase">
                NOTHING HERE YET
              </h2>

              <p className="mt-2 text-sm text-[#8B8D91]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-5 rounded-full bg-[#CCFF00] px-6 py-2 text-xs font-bold text-black transition hover:bg-[#B8E600]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            /* Workout Cards */
            <div className="space-y-4">
              {sortedWorkouts.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  type={activeTab}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyPlanPage;
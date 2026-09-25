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
  const [searchText, setSearchText] = useState("");

  if (!workoutContext) return null;

  const { plan, saved, isLoaded } = workoutContext;
  
  if (!isLoaded) {
  return (
    <main className="min-h-screen bg-[#0B0D0E] text-white">
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#CCFF00]"></span>
        <p className="text-sm text-[#9B9DA1]">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}
  // Select workouts depending on the active tab
  const activeWorkouts = activeTab === "plan" ? plan : saved;

// Metrics change according to the active tab
  const totalExercises = activeWorkouts.length;

  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );
  
  const totalCalories = activeWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  // Search workouts by name or muscle group
  const filteredWorkouts = activeWorkouts.filter((workout) => {
    const search = searchText.toLowerCase().trim();

    const matchesName = workout.name
      .toLowerCase()
      .includes(search);

    const matchesTag = workout.muscleGroups.some((tag) =>
      tag.toLowerCase().includes(search)
    );

    return matchesName || matchesTag;
  });

  // Sort current list
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
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
    <main className="min-h-screen bg-[#0B0D0E] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
            Workout Log
          </p>

          <h1 className="font-[family-name:var(--font-oswald)] text-4xl font-bold uppercase sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm text-[#9B9DA1]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Exercises */}
          <div className="rounded-lg border border-[#272A2E] bg-[#17191E] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#858990]">
              Exercises
            </p>

            <p className="mt-2 font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#CCFF00]">
              {totalExercises}
            </p>
          </div>

          {/* Minutes */}
          <div className="rounded-lg border border-[#272A2E] bg-[#17191E] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#858990]">
              Minutes
            </p>

            <p className="mt-2 font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#CCFF00]">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-lg border border-[#272A2E] bg-[#17191E] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#858990]">
              Calories
            </p>

            <p className="mt-2 font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#CCFF00]">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex border-b border-[#272A2E]">
          <button
            onClick={() => {
              setActiveTab("plan");
              setSearchText("");
            }}
            className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
              activeTab === "plan"
                ? "border-[#CCFF00] text-[#CCFF00]"
                : "border-transparent text-[#858990] hover:text-white"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>

          <button
            onClick={() => {
              setActiveTab("saved");
              setSearchText("");
            }}
            className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
              activeTab === "saved"
                ? "border-[#CCFF00] text-[#CCFF00]"
                : "border-transparent text-[#858990] hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Search + Sort */}
        {activeWorkouts.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="w-full sm:max-w-sm">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search workouts..."
                className="w-full rounded-md border border-[#272A2E] bg-[#17191E] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#666A70] focus:border-[#CCFF00]"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap text-xs font-bold uppercase text-[#858990]">
                Sort By
              </span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "duration"
                      | "calories"
                      | "rating"
                  )
                }
                className="rounded-md border border-[#272A2E] bg-[#17191E] px-4 py-3 text-sm text-white outline-none transition focus:border-[#CCFF00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        )}

        {/* Workout Cards */}
        {sortedWorkouts.length > 0 ? (
          <div className="space-y-4">
            {sortedWorkouts.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                type={activeTab}
              />
            ))}
          </div>
        ) : searchText.trim() && activeWorkouts.length > 0 ? (
          /* No Search Results */
          <div className="flex min-h-[250px] items-center justify-center rounded-lg border border-[#272A2E] bg-[#17191E] px-4 text-center">
            <div>
              <h2 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase text-white">
                NO WORKOUTS FOUND
              </h2>

              <p className="mt-2 text-sm text-[#9B9DA1]">
                Try searching with a different workout name or muscle group.
              </p>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-[#272A2E] bg-[#17191E] px-4 text-center">
            <div>
              <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase text-white">
                NOTHING HERE YET
              </h2>

              <p className="mt-2 text-sm text-[#9B9DA1]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-5 inline-flex items-center justify-center rounded-md bg-[#CCFF00] px-5 py-3 text-sm font-bold uppercase text-black transition hover:bg-[#B8E600]"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlanPage;
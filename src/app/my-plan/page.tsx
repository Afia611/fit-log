"use client";

import { useContext, useState } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";
import PlanWorkoutCard from "@/components/shared/PlanWorkoutCard";

const MyPlanPage = () => {
  const workoutContext = useContext(WorkoutContext);

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "rating"
  >("duration");

  const [searchText, setSearchText] = useState("");

  if (!workoutContext) {
    return null;
  }

  const { plan, saved } = workoutContext;

  // Today's Plan statistics
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  // Decide which list should currently be displayed
  const activeWorkouts = activeTab === "plan" ? plan : saved;

  // Search by workout name or muscle group/tag
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

  // Sort the currently filtered list
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
    <main className="min-h-screen bg-[#0B0D0E] text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#CCFF00]">
            Workout Planner
          </p>

          <h1 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9B9DA1]">
            Build your session. Keep it focused — up to 5 workouts.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Exercises */}
          <div className="rounded-lg border border-[#272A2E] bg-[#17191E] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#9B9DA1]">
              Exercises
            </p>

            <p className="mt-2 font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#CCFF00]">
              {plan.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="rounded-lg border border-[#272A2E] bg-[#17191E] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#9B9DA1]">
              Minutes
            </p>

            <p className="mt-2 font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#CCFF00]">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-lg border border-[#272A2E] bg-[#17191E] p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-[#9B9DA1]">
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
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 px-5 py-3 text-sm font-bold transition ${
              activeTab === "plan"
                ? "border-[#CCFF00] text-[#CCFF00]"
                : "border-transparent text-[#9B9DA1] hover:text-white"
            }`}
          >
            TODAY&apos;S PLAN ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-5 py-3 text-sm font-bold transition ${
              activeTab === "saved"
                ? "border-[#CCFF00] text-[#CCFF00]"
                : "border-transparent text-[#9B9DA1] hover:text-white"
            }`}
          >
            SAVED ({saved.length})
          </button>
        </div>

        {/* Search + Sort */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by workout or tag..."
            className="w-full rounded-md border border-[#272A2E] bg-[#17191E] px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#777A80] focus:border-[#CCFF00] sm:max-w-sm"
          />

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-[#9B9DA1]">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as
                    | "duration"
                    | "calories"
                    | "rating"
                )
              }
              className="rounded-md border border-[#272A2E] bg-[#17191E] px-4 py-2.5 text-sm text-white outline-none transition focus:border-[#CCFF00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Workout List */}
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
        ) : searchText.trim() ? (
          /* No Search Results */
          <div className="flex min-h-[250px] items-center justify-center rounded-lg border border-[#272A2E] bg-[#17191E] px-4 text-center">
            <div>
              <p className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase">
                No Workouts Found
              </p>

              <p className="mt-2 text-sm text-[#9B9DA1]">
                No workouts match &quot;{searchText}&quot;.
              </p>
            </div>
          </div>
        ) : (
          /* Empty Plan / Saved State */
          <div className="flex min-h-[250px] items-center justify-center rounded-lg border border-[#272A2E] bg-[#17191E] px-4 text-center">
            <div>
              <p className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase">
                {activeTab === "plan"
                  ? "Your Plan Is Empty"
                  : "No Saved Workouts"}
              </p>

              <p className="mt-2 text-sm text-[#9B9DA1]">
                {activeTab === "plan"
                  ? "Add workouts from the library to build today's training session."
                  : "Save workouts from the library and they will appear here."}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPlanPage;
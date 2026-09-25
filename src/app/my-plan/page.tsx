"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { WorkoutContext } from "@/context/WorkoutContext";
import PlanWorkoutCard from "@/components/shared/PlanWorkoutCard";

const MyPlanPage = () => {
  const workoutContext = useContext(WorkoutContext);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  if (!workoutContext) {
    return null;
  }

  const { plan, saved } = workoutContext;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const activeWorkouts = activeTab === "plan" ? plan : saved;

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

          <div className="px-6 py-5 sm:border-r sm:border-[#272A2E]">
            <p className="text-xs text-[#8B8D91]">
              Exercises
            </p>

            <p className="mt-1 font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#CCFF00]">
              {plan.length}
            </p>
          </div>

          <div className="border-t border-[#272A2E] px-6 py-5 sm:border-r sm:border-t-0">
            <p className="text-xs text-[#8B8D91]">
              Minutes
            </p>

            <p className="mt-1 font-[family-name:var(--font-oswald)] text-3xl font-bold">
              {totalMinutes}
            </p>
          </div>

          <div className="border-t border-[#272A2E] px-6 py-5 sm:border-t-0">
            <p className="text-xs text-[#8B8D91]">
              Calories
            </p>

            <p className="mt-1 font-[family-name:var(--font-oswald)] text-3xl font-bold">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="mt-8 flex">
          <div className="flex rounded-lg border border-[#272A2E] bg-[#17191E] p-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-5 py-2 text-xs transition ${
                activeTab === "plan"
                  ? "bg-[#30333A] text-white"
                  : "text-[#8B8D91]"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-5 py-2 text-xs transition ${
                activeTab === "saved"
                  ? "bg-[#30333A] text-white"
                  : "text-[#8B8D91]"
              }`}
            >
              Saved
            </button>

          </div>
        </div>

       {/* Workout Area */}
      <div className="mt-6">
      {activeWorkouts.length === 0 ? (
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
      <div className="space-y-4">
      {activeWorkouts.map((workout) => (
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
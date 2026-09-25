"use client";

import { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout-types";
import { toast } from "react-toastify";

type WorkoutActionsProps = {
  workout: Workout;
};

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const workoutContext = useContext(WorkoutContext);

  if (!workoutContext) {
    return null;
  }

  const { plan, saved, addToPlan, saveWorkout } = workoutContext;

  // Check current workout status
  const isAlreadyInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const isAlreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  // Maximum 5 workouts can be added to today's plan
  const isPlanFull = plan.length >= 5;

  const handleAddToPlan = () => {
    const added = addToPlan(workout);

    if (added) {
      toast.success(`${workout.name} added to today's plan`);
    } else {
      toast.error("Unable to add workout to today's plan");
    }
  };

  const handleSaveWorkout = () => {
    const savedSuccessfully = saveWorkout(workout);

    if (savedSuccessfully) {
      toast.success(`${workout.name} saved successfully`);
    } else {
      toast.info("Workout is already saved");
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      {/* Add to Plan */}
      <button
        onClick={handleAddToPlan}
        disabled={isPlanFull || isAlreadyInPlan}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition ${
          isPlanFull || isAlreadyInPlan
            ? "cursor-not-allowed bg-[#272A2E] text-[#777A80]"
            : "bg-[#CCFF00] text-black hover:bg-[#B8E600]"
        }`}
      >
        {isAlreadyInPlan
          ? "ADDED TO PLAN"
          : isPlanFull
            ? "PLAN FULL"
            : "ADD TO TODAY'S PLAN"}
      </button>

      {/* Save Workout */}
      <button
        onClick={handleSaveWorkout}
        disabled={isAlreadySaved}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md border px-5 py-3 text-sm font-bold transition ${
          isAlreadySaved
            ? "cursor-not-allowed border-[#272A2E] bg-[#17191E] text-[#777A80]"
            : "border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black"
        }`}
      >
        {isAlreadySaved ? "SAVED" : "SAVE WORKOUT"}
      </button>
    </div>
  );
};

export default WorkoutActions;
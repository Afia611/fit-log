"use client";

import { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout-types";

const WorkoutActions = ({ workout }: { workout: Workout }) => {
  const workoutContext = useContext(WorkoutContext);

  if (!workoutContext) {
    return null;
  }

  const { addToPlan, saveWorkout } = workoutContext;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addToPlan(workout)}
        className="rounded-md bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#B8E600]"
      >
        ＋ Add to today&apos;s plan
      </button>

      <button
        onClick={() => saveWorkout(workout)}
        className="rounded-md border border-[#3A3D40] px-5 py-3 text-sm text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
      >
        ♡ Save for later
      </button>
    </div>
  );
};

export default WorkoutActions;
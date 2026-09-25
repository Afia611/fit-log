"use client";
import { useContext } from "react";
import { toast } from "react-toastify";
import { WorkoutContext } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout-types";

const WorkoutActions = ({ workout }: { workout: Workout }) => {
  const workoutContext = useContext(WorkoutContext);

  if (!workoutContext) {
    return null;
  }

  const { plan, saved, addToPlan, saveWorkout } = workoutContext;

  const handleAddToPlan = () => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast.warning("Workout is already in today's plan");
      return;
    }

    addToPlan(workout);
    toast.success("Workout added to today's plan");
  };

  const handleSaveWorkout = () => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast.warning("Workout is already saved");
      return;
    }

    saveWorkout(workout);
    toast.success("Workout saved for later");
  };

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAddToPlan}
        className="rounded-md bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#B8E600]"
      >
        ＋ Add to today&apos;s plan
      </button>

      <button
        onClick={handleSaveWorkout}
        className="rounded-md border border-[#3A3D40] px-5 py-3 text-sm text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
      >
        ♡ Save for later
      </button>
    </div>
  );
};

export default WorkoutActions;
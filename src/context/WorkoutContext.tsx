"use client";

import { createContext, ReactNode, useState } from "react";
import { Workout } from "@/types/workout-types";

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  isLoading: boolean;
  addToPlan: (workout: Workout) => boolean;
  saveWorkout: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

export const WorkoutContext =
  createContext<WorkoutContextType | null>(null);

const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const isLoading = false;

  const addToPlan = (workout: Workout) => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      return false;
    }

    if (plan.length >= 5) {
      return false;
    }

    setPlan((previousPlan) => [...previousPlan, workout]);

    return true;
  };

  const saveWorkout = (workout: Workout) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      return false;
    }

    setSaved((previousSaved) => [...previousSaved, workout]);

    return true;
  };

  const removeFromPlan = (id: number) => {
    setPlan((previousPlan) =>
      previousPlan.filter((workout) => workout.id !== id)
    );
  };

  const removeFromSaved = (id: number) => {
    setSaved((previousSaved) =>
      previousSaved.filter((workout) => workout.id !== id)
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        isLoading,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
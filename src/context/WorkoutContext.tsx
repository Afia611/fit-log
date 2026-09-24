"use client";

import { createContext, ReactNode, useState } from "react";
import { Workout } from "@/types/workout-types";

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  saveWorkout: (workout: Workout) => void;
};

export const WorkoutContext = createContext<WorkoutContextType | null>(null);

const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    setPlan((previousPlan) => [...previousPlan, workout]);
  };

  const saveWorkout = (workout: Workout) => {
    setSaved((previousSaved) => [...previousSaved, workout]);
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
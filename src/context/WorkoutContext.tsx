"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Workout } from "@/types/workout-types";

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
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
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const storedPlan = localStorage.getItem("fitlog-plan");
  const storedSaved = localStorage.getItem("fitlog-saved");

  if (storedPlan) {
    setPlan(JSON.parse(storedPlan));
  }

  if (storedSaved) {
    setSaved(JSON.parse(storedSaved));
  }

  setIsLoaded(true);
}, []);

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }
}, [plan, isLoaded]);

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }
}, [saved, isLoaded]);

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
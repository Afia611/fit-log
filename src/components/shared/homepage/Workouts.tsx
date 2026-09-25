"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types/workout-types";
import WorkoutLibrary from "./WorkoutLibrary";

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await res.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="bg-[#0B0D0E] px-4 py-12 text-white sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Library Heading */}
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase">
            The Library
          </h2>

          <p className="mt-1 text-sm text-[#9B9DA1]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
            <span className="loading loading-spinner loading-lg text-[#CCFF00]"></span>

            <p className="text-sm text-[#9B9DA1]">
              Loading workouts...
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-[#9B9DA1]">
              Unable to load workouts. Please try again.
            </p>
          </div>
        )}

        {/* Workout Library */}
        {!isLoading && !isError && (
          <WorkoutLibrary workouts={workouts} />
        )}
      </div>
    </section>
  );
};

export default Workouts;
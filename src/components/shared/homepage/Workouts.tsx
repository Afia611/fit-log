"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types/workout-types";
import WorkoutLibrary from "./WorkoutLibrary";
import Loading from "@/components/shared/Loading";

const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // Fetch the workouts and keep the loading animation
        // visible for at least 700ms.
        const [res] = await Promise.all([
          fetch("https://api.abcz.workers.dev/api/fitlog"),
          new Promise((resolve) => setTimeout(resolve, 700)),
        ]);

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await res.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Error loading workouts:", error);
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
            THE LIBRARY
          </h2>

          <p className="mt-1 text-sm text-[#9B9DA1]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <Loading />
        ) : isError ? (
          /* Error State */
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-[#272A2E] bg-[#17191E] px-4 text-center">
            <div>
              <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase text-white">
                Unable to load workouts
              </h3>

              <p className="mt-2 text-sm text-[#9B9DA1]">
                Something went wrong while loading the workout library.
              </p>
            </div>
          </div>
        ) : (
          /* Workout Library */
          <WorkoutLibrary workouts={workouts} />
        )}
      </div>
    </section>
  );
};

export default Workouts;
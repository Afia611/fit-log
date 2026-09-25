"use client";

import { useState } from "react";
import { Workout } from "@/types/workout-types";
import WorkoutCard from "./WorkoutCard";

type WorkoutLibraryProps = {
  workouts: Workout[];
};

const WorkoutLibrary = ({ workouts }: WorkoutLibraryProps) => {
  const [searchText, setSearchText] = useState("");

  const filteredWorkouts = workouts.filter((workout) => {
    const search = searchText.toLowerCase().trim();

    const matchesName = workout.name
      .toLowerCase()
      .includes(search);

    const matchesTag = workout.muscleGroups.some((tag) =>
      tag.toLowerCase().includes(search)
    );

    return matchesName || matchesTag;
  });

  return (
    <>
      {/* Search */}
      <div className="mb-8 flex justify-end">
        <div className="w-full sm:max-w-sm">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by workout or muscle group..."
            className="w-full rounded-md border border-[#272A2E] bg-[#17191E] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777A80] focus:border-[#CCFF00]"
          />
        </div>
      </div>

      {/* Workout Grid */}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-sm text-[#9B9DA1]">
            No workouts found for &quot;{searchText}&quot;.
          </p>
        </div>
      )}
    </>
  );
};

export default WorkoutLibrary;
"use client";

import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout-types";

type PlanWorkoutCardProps = {
  workout: Workout;
  type: "plan" | "saved";
};

const PlanWorkoutCard = ({
  workout,
  type,
}: PlanWorkoutCardProps) => {
  const {
    id,
    name,
    image,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#272A2E] bg-[#17191E] p-4 md:flex-row md:items-center">

      {/* Left Side */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center">

        {/* Thumbnail */}
        <div className="shrink-0 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={name}
            width={180}
            height={120}
            className="h-32 w-full object-cover sm:h-24 sm:w-40"
          />
        </div>

        {/* Workout Info */}
        <div className="min-w-0">
          <h2 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase text-white">
            {name}
          </h2>

          <p className="mt-1 text-sm text-[#8B8D91]">
            {equipment}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#B0B2B5]">
            <span>
              <span className="text-[#CCFF00]">◷</span>{" "}
              {duration} min
            </span>

            <span>
              <span className="text-[#CCFF00]">♦</span>{" "}
              {caloriesBurned} kcal
            </span>

            <span>
              <span className="text-[#CCFF00]">☆</span>{" "}
              {rating}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex flex-wrap items-center gap-3 md:ml-auto md:justify-end">

        <Link
          href={`/workouts/${id}`}
          className="rounded-full border border-[#4A5260] px-5 py-2.5 text-xs text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
        >
          View Details
        </Link>

        {/* Only Today's Plan gets Mark as Done */}
        {type === "plan" && (
          <button className="rounded-full bg-[#CCFF00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#B8E600]">
            ✓&nbsp;&nbsp; Mark as Done
          </button>
        )}

        <button
          aria-label="Remove workout"
          className="flex h-9 w-9 items-center justify-center text-lg text-[#737984] transition hover:text-red-400"
        >
          ×
        </button>

      </div>
    </div>
  );
};

export default PlanWorkoutCard;
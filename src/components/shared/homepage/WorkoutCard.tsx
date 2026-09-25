import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout-types";

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#272A2E] bg-[#17191E] transition hover:border-[#3A3D42]"
    >
      {/* Image */}
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-bold uppercase leading-none text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase leading-tight text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-xs text-[#858990]">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-4 border-t border-[#272A2E]" />

        {/* Stats */}
        <div className="flex items-center gap-5 text-[11px] text-[#9B9DA1]">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-3.5 w-3.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>

            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M12.5 2.5c.4 3-1.5 4.6-3.1 6.2C7.9 10.2 7 11.8 7 14a5 5 0 0 0 10 0c0-2.8-1.6-5.2-4.5-7.6.1 2-.7 3.1-1.7 4.1.1-3.1-.5-5.5 1.7-8Z" />
            </svg>

            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-3.5 w-3.5"
            >
              <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>

            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
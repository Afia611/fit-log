import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout-types";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
     const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;
  
  return (
    <Link href={`/workouts/${id}`}>
      <div className="h-full overflow-hidden rounded-xl border border-[#272A2E] bg-[#17191E] transition hover:border-[#CCFF00]">

        {/* Workout Image */}
        <div className="relative h-52 w-full bg-[#202328]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="p-5">

          {/* Muscle Groups */}
          <div className="mb-3 flex flex-wrap gap-2">
            {muscleGroups.map((muscle: string) => (
              <span
                key={muscle}
                className="rounded-full border border-[#3A3D40] px-3 py-1 text-[10px] font-bold uppercase text-[#CCFF00]"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase text-white sm:text-2xl">
            {name}
          </h3>

          {/* Equipment */}
          <p className="mt-2 text-sm text-[#9B9DA1]">
            {equipment}
          </p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#272A2E] pt-4 text-xs text-[#B0B2B5]">
            <span>⏱ {duration} min</span>

            <span>🔥 {caloriesBurned} kcal</span>

            <span>★ {rating}</span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
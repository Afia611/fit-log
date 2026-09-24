import Image from "next/image";
import { Workout } from "@/types/workout-types";
import WorkoutActions from "@/components/shared/WorkoutActions";

type WorkoutDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsProps) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`
  );

  const workout: Workout = await res.json();
  

  const {
    name,
    description,
    image,
    muscleGroups,
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    caloriesBurned,
    rating,
    instructions,
  } = workout;

  return (
    <main className="min-h-screen bg-[#0B0D0E] text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">

          {/* Left Side - Workout Image */}
          <div className="overflow-hidden rounded-xl bg-[#17191E]">
          <Image
           src={image}
           alt={name}
           width={740}
           height={900}
           priority
           className="h-auto w-full object-cover"
           />
         </div>

          {/* Right Side */}
          <div>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase sm:text-4xl lg:text-5xl">
              {name}
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-[#9B9DA1] sm:text-base">
              {description}
            </p>

            {/* Category Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Key Specs */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[#272A2E] bg-[#17191E]">

              <div className="flex items-center justify-between border-b border-[#272A2E] px-5 py-3">
                <span className="text-xs uppercase text-[#8B8D91]">
                  Equipment
                </span>
                <span className="text-sm">{equipment}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272A2E] px-5 py-3">
                <span className="text-xs uppercase text-[#8B8D91]">
                  Difficulty
                </span>
                <span className="text-sm">{difficulty}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272A2E] px-5 py-3">
                <span className="text-xs uppercase text-[#8B8D91]">
                  Sets
                </span>
                <span className="text-sm">{sets}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272A2E] px-5 py-3">
                <span className="text-xs uppercase text-[#8B8D91]">
                  Reps
                </span>
                <span className="text-sm">{reps}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272A2E] px-5 py-3">
                <span className="text-xs uppercase text-[#8B8D91]">
                  Duration
                </span>
                <span className="text-sm">{duration} min</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272A2E] px-5 py-3">
                <span className="text-xs uppercase text-[#8B8D91]">
                  Calories
                </span>
                <span className="text-sm">
                  {caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-xs uppercase text-[#8B8D91]">
                  Rating
                </span>
                <span className="text-sm"> {rating}</span>
              </div>

            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase">
                Instructions
              </h2>

              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-[#B0B2B5]">
                {instructions.map((instruction, index) => (
                  <li key={index}>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons - functionality comes next */}
            <WorkoutActions workout={workout} />

          </div>
        </div>

      </section>
    </main>
  );
};

export default WorkoutDetailsPage;
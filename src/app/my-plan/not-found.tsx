import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0B0D0E] px-4 text-white">
      <div className="text-center">
        {/* Error Code */}
        <p className="font-[family-name:var(--font-oswald)] text-7xl font-bold text-[#CCFF00] sm:text-8xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-4 font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase sm:text-4xl">
          PAGE NOT FOUND
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8B8D91]">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#CCFF00] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#B8E600]"
        >
          ← BACK TO WORKOUTS
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
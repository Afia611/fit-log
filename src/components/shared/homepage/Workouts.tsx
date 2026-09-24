const Workouts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  const workouts = await res.json();

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14"
    >
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase text-white sm:text-4xl">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-[#9B9DA1] sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <p className="text-white">
        Total workouts: {workouts.length}
      </p>
    </section>
  );
};

export default Workouts;
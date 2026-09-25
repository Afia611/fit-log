const Loading = () => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-[#CCFF00]"></span>

      <p className="text-sm text-[#9B9DA1]">
        Loading workouts...
      </p>
    </div>
  );
};

export default Loading;
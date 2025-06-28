export const UserCardSkeleton = () => {
  return (
    <div className="bg-white shadow border border-gray-300 p-4 md:w-[30%] w-full animate-pulse">
      <div className="h-[16px] w-[60%] bg-gray-300 rounded mb-2"></div>

      <div className="h-[14px] w-[80%] bg-gray-300 rounded mb-2"></div>

      <div className="h-[14px] w-[50%] bg-gray-300 rounded mb-4"></div>

      <div className="flex flex-wrap gap-2">
        <div className="h-[30px] w-[60px] bg-gray-200 rounded"></div>
        <div className="h-[30px] w-[60px] bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

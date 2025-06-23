export const HeroSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden mx-auto mt-[60px]">
      <div className="flex w-full">
        {/* Left Image Block */}
        <div className="w-[30%] hidden md:flex items-center justify-center">
          <div className="w-[200px] h-[300px] bg-gray-300 animate-pulse"></div>
        </div>

        {/* Mid Info (only for md+) */}
        <div className="absolute left-[25%] top-[40%] md:block hidden">
          <div className="flex items-center mb-2">
            <div className="w-[120px] h-[1px] bg-gray-400"></div>
            <div className="mx-2 w-[100px] h-[12px] bg-gray-300 animate-pulse"></div>
          </div>
          <div className="w-[250px] h-[40px] bg-gray-300 mb-2 animate-pulse"></div>
          <div className="w-[100px] h-[20px] bg-gray-300 animate-pulse"></div>
        </div>

        {/* Right Section */}
        <div className="md:w-[70%] h-[90vh] w-full bg-[#E6E6E6] flex flex-col items-center justify-center md:py-[20px] py-[50px] gap-10">
          {/* Top Info (for mobile) */}
          <div className="md:hidden flex flex-col items-center gap-2">
            <div className="w-[100px] h-[12px] bg-gray-300 animate-pulse"></div>
            <div className="w-[200px] h-[30px] bg-gray-300 animate-pulse"></div>
            <div className="w-[120px] h-[20px] bg-gray-300 animate-pulse"></div>
          </div>

          {/* Image Placeholder */}
          <div className="w-[280px] h-[350px] bg-gray-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

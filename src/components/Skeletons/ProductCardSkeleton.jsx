export const ProductCardSkeleton = () => {
  return (
    <div className="transition-all duration-300 p-3 w-fit select-none animate-pulse">
      {/* Main image slider area */}
      <div className="relative">
        {/* Left arrow placeholder */}
        <div className="absolute top-[130px] left-1 opacity-0">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>

        <div className="relative w-[200px] h-[300px] overflow-hidden bg-gray-200 rounded-md">
          {/* Single fake image */}
          <div className="w-full h-full bg-gray-300"></div>
        </div>

        {/* Right arrow placeholder */}
        <div className="absolute top-[130px] right-1 opacity-0">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Sub-image thumbnails */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="w-[40px] h-[40px] bg-gray-300 rounded-md"
          ></div>
        ))}
      </div>

      {/* Product Title */}
      <p className="text-center mt-4">
        <span className="block w-[120px] h-[14px] mx-auto bg-gray-300 rounded"></span>
      </p>

      {/* Price */}
      <p className="text-center mt-2">
        <span className="block w-[60px] h-[14px] mx-auto bg-gray-300 rounded"></span>
      </p>

      {/* SELECT OPTIONS */}
      <p className="text-center mt-3">
        <span className="block w-[100px] h-[15px] mx-auto bg-gray-300 rounded"></span>
      </p>
    </div>
  );
};

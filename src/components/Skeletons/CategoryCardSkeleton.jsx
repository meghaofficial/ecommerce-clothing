export const CategoryCardSkeleton = () => {
  return (
    <div className="relative w-fit overflow-hidden animate-pulse">
      <div className="relative w-[250px] h-[300px] bg-gray-200 overflow-hidden">
        {/* Image placeholder */}
        <div className="w-full h-full bg-gray-300"></div>

        {/* Overlay simulation */}
        <div className="absolute inset-0 bg-white opacity-50 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"></div>

        {/* Bottom text section */}
        <div className="absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-[300px] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <div className="w-[120px] h-[16px] bg-gray-300 mb-2"></div>
          <div className="w-[80px] h-[30px] bg-gray-400 mb-5"></div>
        </div>
      </div>
    </div>
  );
};

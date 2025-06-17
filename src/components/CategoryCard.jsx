import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryCard = ({ imgSrc, categoryDetail }) => {

  const navigate = useNavigate();

  return (
    <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
      <div className="relative group w-auto h-auto">
        <img src={imgSrc} alt="card" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-white opacity-50 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"></div>
        
        <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-[300px] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <p className="playfair-display w-auto text-center text-[0.9rem] text-black">
            {categoryDetail?.categoryName}
          </p>
          <p className="bg-black cursor-pointer px-6 py-2 my-5 text-[12px]" onClick={() => navigate(`/products/${categoryDetail?._id}`)}>Explore</p>
        </div>
      </div>
    </div>
  );
};

// const CategoryCard = ({ imgSrc, content }) => {
//   return (
//     <div className="relative w-[200px] h-[300px] overflow-hidden">
//       <img src={imgSrc} alt="card" className="w-full h-full object-cover" />

//       {/* Hover Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"></div>

//       {/* Hover Content */}
//       <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
//         <p className="playfair-display w-[150px] text-center text-[18px] text-black">
//           {content}
//         </p>
//         <Link className="bg-black px-6 py-2 my-5 text-[12px] text-white">
//           Explore
//         </Link>
//       </div>
//     </div>
//   );
// };

export default CategoryCard;

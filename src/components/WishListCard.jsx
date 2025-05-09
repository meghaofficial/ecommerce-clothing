import React from "react";
import imgSrc from "../assets/dark.jpg";
import { Link } from "react-router-dom";

const WishListCard = () => {
  return (
    <div className="">
      <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
        <div className="relative group w-[250px] h-auto">
          <img src={imgSrc} alt="card" className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black opacity-50 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"></div>

          <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-[300px] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            <p className="playfair-display w-auto text-center">Jeans</p>
            <p className="playfair-display w-auto text-center">Rs. 2200</p>
            <div className="flex gap-3">
              <Link className="bg-black px-6 py-2 my-5 text-[12px]">
                VIEW
              </Link>
              <Link to="/" className="bg-black px-6 py-2 my-5 text-[12px]">
                ADD TO BASKET
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;

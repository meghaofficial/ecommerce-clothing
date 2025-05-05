import React, { useState } from "react";
import light from "../assets/light.jpg";
import lightOnMan from "../assets/light-jeans-on-man.jpg";
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [images, setImages] = useState([
    { id: 1, imgSrc: darkOnMan },
    { id: 2, imgSrc: dark },
    { id: 3, imgSrc: lightOnMan },
    { id: 4, imgSrc: light },
  ]);
  const [currIndex, setCurrIndex] = useState(0);

  const nextClick = () => {
    setCurrIndex((prev) => (prev + 1) % images.length);
  };

  const prevClick = () => {
    setCurrIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="transition-all duration-300 hover:shadow-lg p-3 w-fit group select-none">
        {/* main images */}
        <div className="relative">
          <div className="absolute top-[130px] left-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-in-out z-[999]"
            onClick={prevClick}>
            <ChevronLeft className="text-gray-400 cursor-pointer" />
          </div>

          <div className="relative w-[200px] h-[300px] overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currIndex * 100}%)` }}
            >
              {images.map((image, index) => {
                return (
                  <img
                    src={image.imgSrc}
                    alt="man"
                    className="w-[200px]"
                    key={image.id}
                  />
                );
              })}
            </div>
          </div>

          <div className="absolute top-[130px] right-1 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
            onClick={nextClick}>
            <ChevronRight className="text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* sub images */}
        <div className="opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-3 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out flex items-center justify-center gap-2">
          {images.map((imageObj, index) => {
            return (
              <div
                className={`w-[40px] h-[40px] overflow-hidden cursor-pointer ${
                  currIndex === index ? "border" : ""
                } `}
                key={imageObj.id}
                onClick={() => setCurrIndex(index)}
              >
                <img
                  src={imageObj.imgSrc}
                  alt="dark"
                  className="w-[40px] h-auto object-cover scale-125"
                />
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-[14px] mt-2 -translate-y-10 group-hover:translate-y-3.5 transition-all duration-300 ease-in-out">
          Long Dark Blue Jeans
        </p>
        <p className="text-center font-semibold text-[14px] opacity-100 group-hover:opacity-0 -translate-y-10 group-hover:-translate-y-4 transition-all duration-300 ease-in-out">
          Rs. 2299
        </p>
        <Link to="/single-product" className="relative text-center flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-10 group-hover:-translate-y-1 transition-all duration-300 ease-in-out group-hover:underline-animation">
          <span className="relative after:block after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-500 group-hover:after:w-full text-[15px]">
            SELECT OPTIONS
          </span>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;

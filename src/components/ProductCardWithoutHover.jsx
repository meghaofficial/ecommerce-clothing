import React, { useState } from "react";
import light from "../assets/light.jpg";
import lightOnMan from "../assets/light-jeans-on-man.jpg";
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCardWithoutHover = () => {
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
      <div className="shadow-lg p-3 w-fit select-none">
        {/* main images */}
        <div className="relative">
          <div className="absolute top-[150px] left-1 z-[999]"
            onClick={prevClick}>
            <ChevronLeft className="text-gray-400 cursor-pointer" />
          </div>

          <div className="relative w-[270px] h-[400px] overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currIndex * 100}%)` }}
            >
              {images.map((image, index) => {
                return (
                  <img
                    src={image.imgSrc}
                    alt="man"
                    className=''
                    key={image.id}
                  />
                );
              })}
            </div>
          </div>

          <div className="absolute top-[150px] right-1"
            onClick={nextClick}>
            <ChevronRight className="text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* sub images */}
        <div className="flex items-center justify-center gap-2 mt-3 mb-4">
          {images.map((imageObj, index) => {
            return (
              <div
                className={`w-[60px] h-[60px] overflow-hidden cursor-pointer ${
                  currIndex === index ? "border" : ""
                } `}
                key={imageObj.id}
                onClick={() => setCurrIndex(index)}
              >
                <img
                  src={imageObj.imgSrc}
                  alt="dark"
                  className="w-[60px] h-auto object-cover scale-125"
                />
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-[14px] mt-2">
          Long Dark Blue Jeans
        </p>
        <p className="text-center font-semibold text-[18px]">
          Rs. 2299
        </p>
        <Link to="/single-product" className="relative text-center flex items-center justify-center underline font-semibold">
          <span className="relative text-[13px]">
            SELECT OPTIONS
          </span>
        </Link>
      </div>
    </>
  );
};


export default ProductCardWithoutHover

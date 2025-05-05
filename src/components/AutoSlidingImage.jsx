import React, { useEffect, useRef, useState } from "react";

const AutoSlidingImage = ({ originalImages }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Clone the first image to the end for smooth looping
  const images = [...originalImages, originalImages[0]];

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrIndex((prev) => prev + 1);
    }, 4000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const handleTransitionEnd = () => {
    // Reset to real first image without animation
    if (currIndex === images.length - 1) {
      setIsTransitioning(false);
      setCurrIndex(0);
    }
  };

  useEffect(() => {
    startAutoSlide();
    // return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      // Force no animation, jump to index 0
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // short delay to allow DOM to apply transform

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div
      className="relative select-none"
      //onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="relative w-[200px] h-[300px] overflow-hidden">
        <div
          ref={containerRef}
          className={`flex ${
            isTransitioning
              ? "transition-transform duration-500 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${currIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.imgSrc}
              alt={`Slide ${index}`}
              className="w-[200px] flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoSlidingImage;

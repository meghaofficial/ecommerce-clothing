import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";
import light from "../assets/light.jpg";
import lightOnMan from "../assets/light-jeans-on-man.jpg";
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";

const slides = [
  {
    id: 1,
    leftImg: light,
    rightImg: lightOnMan,
    boldContent: "In Light Color",
    withHash: "#NEW ARRIVALS",
    shopNow: "Shop Now",
  },
  {
    id: 2,
    leftImg: dark,
    rightImg: darkOnMan,
    boldContent: "In Dark Color",
    withHash: "#NEW ARRIVALS",
    shopNow: "Shop Now",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(() => {
  //     setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 7000);
  //   return () => resetTimeout();
  // }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-fit overflow-hidden mx-auto">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 flex h-[90vh] relative"
              style={{ width: `${100 / slides.length}%` }}
            >
              {/* left */}
              <div className="w-[30%] flex items-center">
                <img
                  src={slide.leftImg}
                  alt="demonstration"
                  className={`w-[200px] ${
                    isActive ? "animate__animated animate__slideInLeft" : ""
                  }`}
                />
              </div>

              {/* mid-info */}
              <div className="absolute left-[25%] top-[40%]">
                <div
                  className={`flex items-center relative left-[-120px] ${
                    isActive ? "animate__animated animate__fadeInUp animate__delay-1s" : ""
                  }`}
                >
                  <div className="border-b w-[120px]"></div>
                  <p className="text-nowrap mx-2 tracking-[5px] text-[12px]">
                    {slide.withHash}
                  </p>
                </div>
                <p
                  className={`text-[40px] font-semibold ms-2 ${
                    isActive
                      ? "animate__animated animate__fadeInUp animate__delay-2s"
                      : ""
                  }`}
                >
                  {slide.boldContent}
                </p>
                <button
                  className={`underline cursor-pointer text-[17px] font-semibold ms-2 ${
                    isActive
                      ? "animate__animated animate__fadeInUp animate__delay-3s"
                      : ""
                  }`}
                >
                  {slide.shopNow}
                </button>
              </div>

              {/* right */}
              <div className="w-[70%] bg-[#E6E6E6] flex items-center justify-center">
                <img
                  src={slide.rightImg}
                  alt="man"
                  className={`w-[280px] ${
                    isActive ? "animate__animated animate__slideInRight" : ""
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-200"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

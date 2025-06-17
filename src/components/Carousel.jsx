import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import light from "../assets/light.jpg";
import lightOnMan from "../assets/light-jeans-on-man.jpg";
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";
import axiosPublic from "../axiosPublic";


export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const [heroProd, setHeroProd] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosPublic.get("/api/all-product-by-tag", {
          params: { tag: "hero_img" },
        });
        const arr = [];
        response.data.allProducts.forEach((d, index) => {
          const obj = { id: index+1, imgSrc: d.imgSrc, subImg: d.sub_images[0], title: d?.title };
          arr.push(obj);
        });
        setHeroProd(arr);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(() => {
  //     setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 7000);
  //   return () => resetTimeout();
  // }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroProd?.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroProd?.length);
  };

  return (
    <div className="relative w-full h-fit overflow-hidden mx-auto">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${heroProd?.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / heroProd?.length)}%)`,
        }}
      >
        {heroProd.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 flex md:h-[90vh] relative"
              style={{ width: `${100 / heroProd?.length}%` }}
            >
              {/* left */}
              <div className="w-[30%] items-center md:flex hidden">
                <img
                  src={slide?.subImg}
                  alt="demonstration"
                  className={`w-[200px] ${
                    isActive ? "animate__animated animate__slideInLeft" : ""
                  }`}
                />
              </div>

              {/* mid-info */}
              <div className="absolute left-[25%] top-[40%] md:block hidden">
                <div
                  className={`flex items-center relative left-[-120px] ${
                    isActive
                      ? "animate__animated animate__fadeInUp animate__delay-1s"
                      : ""
                  }`}
                >
                  <div className="border-b w-[120px]"></div>
                  <p className="text-nowrap mx-2 tracking-[5px] text-[12px]">
                    #NEW ARRIVALS
                  </p>
                </div>
                <p
                  className={`text-[40px] font-semibold ms-2 ${
                    isActive
                      ? "animate__animated animate__fadeInUp animate__delay-2s"
                      : ""
                  }`}
                >
                  {slide?.title}
                </p>
                <button
                  className={`underline cursor-pointer text-[17px] font-semibold ms-2 ${
                    isActive
                      ? "animate__animated animate__fadeInUp animate__delay-3s"
                      : ""
                  }`}
                >
                  Shop Now
                </button>
              </div>

              {/* right */}
              <div className="md:w-[70%] w-full bg-[#E6E6E6] flex flex-col items-center justify-center md:py-0 py-[50px] gap-10">
                {/* top-info for small screen */}
                <div className="md:hidden flex items-center flex-col">
                  <div
                    className={`flex items-center left-[-120px] ${
                      isActive
                        ? "animate__animated animate__fadeInUp animate__delay-1s"
                        : ""
                    }`}
                  >
                    <p className="text-nowrap mx-2 tracking-[5px] text-[12px]">
                      #NEW ARRIVALS
                    </p>
                  </div>
                  <p
                    className={`text-[40px] font-semibold ms-2 ${
                      isActive
                        ? "animate__animated animate__fadeInUp animate__delay-2s"
                        : ""
                    }`}
                  >
                    {slide.title}
                  </p>
                  <button
                    className={`underline cursor-pointer text-[17px] font-semibold ms-2 ${
                      isActive
                        ? "animate__animated animate__fadeInUp animate__delay-3s"
                        : ""
                    }`}
                  >
                    Shop Now
                  </button>
                </div>
                <img
                  src={slide?.imgSrc}
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
        className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 rounded-full p-2"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 text-gray-400 cursor-pointer"
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
}

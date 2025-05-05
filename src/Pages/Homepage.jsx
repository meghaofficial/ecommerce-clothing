import React, { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import lightOnMan from "../assets/light-jeans-on-man.jpg";
import light from "../assets/light.jpg";
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AutoSlidingImage from "../components/AutoSlidingImage";
import Footer from "../components/Footer";

const originalImages = [
  { id: 1, imgSrc: darkOnMan },
  { id: 2, imgSrc: dark },
  { id: 3, imgSrc: lightOnMan },
  { id: 4, imgSrc: light },
];

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mt-[60px]">
      {/* Carousel Slide */}
      <Carousel />

      {/* New In */}
      {/* className={`mt-10 h-[100vh] ${scrollY >= 50 ? "animate__animated animate__fadeInUp" : ""}`} */}
      <div className={`mt-20 h-[100vh]`}>
        <p className="text-center text-[30px] font-semibold playfair-display">
          New In
        </p>
        <div className="flex items-center justify-center gap-5 mt-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      {/* Categories */}
      <p className="text-center text-[30px] font-semibold playfair-display mb-10">
        Explore Categories
      </p>
      <div className="w-[70%] m-auto mb-10 flex items-center gap-4">
        <CategoryCard imgSrc={lightOnMan} content="Men is blue" />
        <CategoryCard imgSrc={lightOnMan} content="Men is blue" />
        <CategoryCard imgSrc={lightOnMan} content="Men is blue" />
        {/* Explore more */}
        <div className="relative w-fit overflow-y-hidden">
          <img src={light} alt="card" className="w-[200px] h-[300px]" />
          <div className="w-[200px] h-[300px] bg-white opacity-50 absolute top-0"></div>
          <div className="text-white absolute top-0 flex items-center justify-center flex-col w-[200px] h-[300px]">
            <Link className="bg-black px-6 py-2 my-5 text-[16px]">
              Explore All
            </Link>
          </div>
        </div>
      </div>

      {/* 50% off */}
      <div className=" m-auto my-[180px] flex items-center gap-4 flex-col">
        <p className="font-[400] tracking-widest">JUST FOR YOU, JUST BECAUSE</p>
        <p className="flex gap-3 playfair-display text-[2em] items-center">
          <span className="italic">Enjoing</span>
          <span className="text-[2.5em] mx-3 font-bold">50%</span>
          <span className="italic">off</span>
        </p>
        <p className="font-[400] tracking-widest text-[1.2em]">
          YOUR NEXT ORDER
        </p>
        <Link className="bg-black px-6 py-2 my-5 text-[16px] text-white">
          Shop now
        </Link>
      </div>

      {/* news letter */}
      {/* <div className=" m-auto mb-20 py-[200px] flex items-center gap-4 flex-col bg-gray-100">
        <p className="syne text-[2em]">Newsletter</p>
        <input
          type="text"
          className="text-center outline-none border-b w-1/2 mt-3 pb-4"
        />
        <Link className="px-6 py-2 my-5 text-[16px] border-2 hover:bg-black hover:text-white">
          Subscribe
        </Link>
      </div> */}

      {/* contact us, shipping delievery, 30 days return policy */}
      <div className=" m-auto my-[180px] flex items-center px-6">
        <Link className="border border-gray-300 py-10 w-1/3 text-center playfair-display text-[0.9em] font-semibold tracking-widest">CONTACT US</Link>
        <Link className="border border-gray-300 py-10 w-1/3 text-center playfair-display text-[0.9em] font-semibold tracking-widest">SHIPPING AND DELIEVERY</Link>
        <Link className="border border-gray-300 py-10 w-1/3 text-center playfair-display text-[0.9em] font-semibold tracking-widest">30 DAYS RETURNS</Link>
      </div>

      {/* footer */}
      <Footer />

    </div>
  );
};

export default Homepage;

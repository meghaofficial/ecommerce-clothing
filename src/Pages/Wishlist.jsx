import React from "react";
import Footer from "../components/Footer";
import WishListCard from "../components/WishListCard";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import dark from "../assets/dark.jpg";

const Wishlist = () => {
  return (
    <div className="mt-16">
      <p className="text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5">
        WISHLIST
      </p>
      <div className="border-b border-gray-300 w-[90%] h-[10px] m-auto"></div>
      {/* <div className="flex flex-wrap items-center justify-center gap-5 p-10"> */}
        <div className="md:flex hidden flex-wrap items-center justify-center gap-5 p-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="">
              <WishListCard key={index} />
            </div>
          ))}
        </div>
        {/* for sm screen */}
        <div className="md:hidden p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
              <div className="relative group w-auto h-auto">
                <img
                  src={dark}
                  alt="card"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black opacity-50 translate-y-2/3 transition-all duration-300 ease-in-out"></div>

                <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-0 transition-all duration-300 ease-in-out">
                  <p className="playfair-display w-auto text-center text-[18px] text-white">
                    Man on light
                  </p>
                  <div className="flex items-center gap-2 text-[0.8em]">
                    <Link className="bg-black ps-6 pe-4 py-2 my-5 flex tracking-widest">
                      ADD TO BASKET{" "}
                    </Link>
                    <Link className="bg-black px-4 py-2 my-5 flex tracking-widest">
                      VIEW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Wishlist;

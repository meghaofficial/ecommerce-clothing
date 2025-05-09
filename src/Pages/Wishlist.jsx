import React from "react";
import Footer from "../components/Footer";
import WishListCard from "../components/WishListCard";

const Wishlist = () => {
  return (
    <div className="mt-16">
      <p className="text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5">
        WISHLIST
      </p>
      <div className="border-b border-gray-300 w-[90%] h-[10px] m-auto"></div>
      <div className="flex flex-wrap items-center justify-center gap-5 p-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="">
            <WishListCard key={index} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;

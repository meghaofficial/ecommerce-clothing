import React from "react";
import Footer from "../components/Footer";
import imgSrc from "../assets/dark.jpg";

const Cart = () => {
  return (
    <div className="mt-16">
      <p className="text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5">
        SHOPPING CART
      </p>
      {/* <div className="border-b border-gray-300 w-[90%] h-[10px] m-auto"></div> */}
      <div className="flex md:gap-20 gap-10 py-10 md:px-20 px-10 md:flex-row flex-col">
        <div className="md:w-[60%] w-full">
          <div className="border-t w-full flex items-center p-4 justify-between">
            <div>
              <p className="font-semibold text-[22px] playfair-display tracking-wider">
                SOME PRODUCT TITLE
              </p>
              <p className="mb-5 font-semibold poppins">Rs. 2434</p>
              <p className="text-[0.8em] poppins mb-5">
                <span className="font-semibold">SIZE</span> | 24
              </p>
              <div className="flex gap-2 select-none">
                <span className="cursor-pointer">-</span>
                <span>1</span>
                <span className="cursor-pointer">+</span>
              </div>
            </div>
            <div>
              <img src={imgSrc} alt="imgsrd" className="w-[100px] h-auto" />
            </div>
          </div>
          <div className="border-t w-full flex items-center p-4 justify-between">
            <div>
              <p className="font-semibold text-[22px] playfair-display">
                SOME PRODUCT TITLE
              </p>
              <p className="mb-5 font-semibold poppins">Rs. 2434</p>
              <p className="text-[0.8em] poppins mb-5">
                <span className="font-semibold">SIZE</span> | 24
              </p>
              <div className="flex gap-2 select-none">
                <span className="cursor-pointer">-</span>
                <span>1</span>
                <span className="cursor-pointer">+</span>
              </div>
            </div>
            <div>
              <img src={imgSrc} alt="imgsrd" className="w-[100px] h-auto" />
            </div>
          </div>
          <div className="border-t w-full flex items-center p-4 justify-between">
            <div>
              <p className="font-semibold text-[22px] playfair-display">
                SOME PRODUCT TITLE
              </p>
              <p className="mb-5 font-semibold poppins">Rs. 2434</p>
              <p className="text-[0.8em] poppins mb-5">
                <span className="font-semibold">SIZE</span> | 24
              </p>
              <div className="flex gap-2 select-none">
                <span className="cursor-pointer">-</span>
                <span>1</span>
                <span className="cursor-pointer">+</span>
              </div>
            </div>
            <div>
              <img src={imgSrc} alt="imgsrd" className="w-[100px] h-auto" />
            </div>
          </div>
          <div className="border-t w-full flex items-center p-4 justify-between">
            <div>
              <p className="font-semibold text-[22px] playfair-display">
                SOME PRODUCT TITLE
              </p>
              <p className="mb-5 font-semibold poppins">Rs. 2434</p>
              <p className="text-[0.8em] poppins mb-5">
                <span className="font-semibold">SIZE</span> | 24
              </p>
              <div className="flex gap-2 select-none">
                <span className="cursor-pointer">-</span>
                <span>1</span>
                <span className="cursor-pointer">+</span>
              </div>
            </div>
            <div>
              <img src={imgSrc} alt="imgsrd" className="w-[100px] h-auto" />
            </div>
          </div>
          <div className="border-t border-b w-full flex items-center p-4 justify-between">
            <div>
              <p className="font-semibold text-[22px] playfair-display">
                SOME PRODUCT TITLE
              </p>
              <p className="mb-5 font-semibold poppins">Rs. 2434</p>
              <p className="text-[0.8em] poppins mb-5">
                <span className="font-semibold">SIZE</span> | 24
              </p>
              <div className="flex gap-2 select-none">
                <span className="cursor-pointer">-</span>
                <span>1</span>
                <span className="cursor-pointer">+</span>
              </div>
            </div>
            <div>
              <img src={imgSrc} alt="imgsrd" className="w-[100px] h-auto" />
            </div>
          </div>
        </div>
        {/* right */}
        <div className="md:w-[40%] w-full border h-fit">
          <p className="text-center border-b font-semibold text-[22px] poppins p-3">
            ORDER SUMMARY
          </p>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[0.9em]">
              <span className="font-semibold poppins">SUBTOTAL</span>
              <span className="poppins">Rs. 3453</span>
            </div>
            <div className="flex items-center justify-between text-[0.9em]">
              <span className="font-semibold poppins">SHIPPING</span>
              <span className="poppins">Rs. 45</span>
            </div>
            <div className="flex items-center justify-between text-[0.9em]">
              <span className="font-semibold poppins">TAX</span>
              <span className="poppins">Rs. 60</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t p-3">
            <span className="font-semibold poppins">TOTAL</span>
            <span className="poppins">Rs. 3453</span>
          </div>
          <button className="border-t w-full p-5 cursor-pointer hover:bg-black hover:text-white">Check Out</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

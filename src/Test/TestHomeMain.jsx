import React from 'react'
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";
import light from "../assets/light.jpg";
import lightOnMan from "../assets/light-jeans-on-man.jpg";

const TestHomeMain = () => {
  return (
    <div>
      <div className="flex h-[85vh]">
        {/* left */}
        <div className="w-[30%] flex items-center">
          <img src={light} alt="demonstration" className="w-[200px] animate__animated animate__slideInLeft" />
        </div>
        {/* mid-info */}
        <div className="absolute left-[25%] top-[40%]">
          <div className="flex items-center relative left-[-120px] animate__animated animate__fadeInUp">
            <div className="border-b w-[120px]"></div>
            <p className="text-nowrap mx-2 tracking-[5px] text-[12px]">#NEW ARRIVALS</p>
          </div>
          <p className="text-[40px] font-semibold ms-2 animate__animated animate__fadeInUp animate__delay-1s">In Light Color</p>
          <button className="underline cursor-pointer text-[17px] font-semibold ms-2 animate__animated animate__fadeInUp animate__delay-2s">Shop Now</button>
        </div>
        {/* right */}
        <div className="w-[70%] bg-[#E6E6E6] flex items-center justify-center">
          <img src={lightOnMan} alt="man" className="w-[280px] animate__animated animate__slideInRight" />
        </div>
      </div>
    </div>
  )
}

export default TestHomeMain

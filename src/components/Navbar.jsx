import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  {
    label: "PRODUCTS",
    subItems: [
      "All",
      "Skinny Fit",
      "Slim Fit",
      "Straight Fit",
      "Tapered Fit",
      "Relaxed Fit",
      "Loose Fit / Baggy",
      "Bootcut",
      "Carpenter / Utility Jeans",
      "Stacked Jeans",
      "Cropped Jeans",
    ],
  },
  {
    label: "ABOUT",
    subItems: ["Company", "Team", "Careers"],
  },
  {
    label: "SUPPORT",
    subItems: ["Contact", "FAQs", "Warranty"],
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [displaySearch, setDisplaySearch] = useState(false);

  return (
    <div className="bg-white text-black w-full outfit font-light fixed top-0 z-[9999] border-b border-b-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold playfair-display">
          Thejeanscompany
        </Link>
        <div className="hidden md:flex gap-8 text-[13px] ">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button className="hover:text-[#D4C9BE] syne">
                {item.label}
              </button>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 bg-white text-black rounded shadow-lg py-2"
                  >
                    {item.subItems.map((sub, i) => (
                      <Link to="/products" className="w-full" state={{ subCategory: sub }} >
                        <div
                          key={i}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                        >
                          {sub}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Search
            style={{ strokeWidth: 1 }}
            size={20}
            className="cursor-pointer"
            onClick={() => setDisplaySearch((prev) => !prev)}
          />
          <div className="gap-3 flex items-center justify-between">
            <UserRound
              style={{ strokeWidth: 1 }}
              size={20}
              className="cursor-pointer"
            />
            <Heart
              style={{ strokeWidth: 1 }}
              size={20}
              className="cursor-pointer"
            />
            <ShoppingCart
              style={{ strokeWidth: 1 }}
              size={20}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={28} className="cursor-pointer" />
            ) : (
              <Menu size={28} className="cursor-pointer" />
            )}
          </button>
        </div>
      </div>
      {/* for small screen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden bg-white px-6"
          >
            <MobileNav navItems={navItems} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative top-[-64px]">
        {/* Animated Search Box */}
        <AnimatePresence>
          {displaySearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 z-50 bg-black px-5 h-[100vh] flex items-center justify-center"
            >
              <div className="w-full px-10 flex flex-col justify-evenly h-full">
                {/* background */}
                <div className="w-full flex items-end justify-end">
                  <div
                    className="bg-white cursor-pointer w-fit p-3"
                    onClick={() => setDisplaySearch(false)}
                  >
                    <X style={{ strokeWidth: 1 }} size={25} />
                  </div>
                </div>
                {/* input search */}
                <div className="relative bg-[#1A1A1A] shadow-lg w-full">
                  <input
                    type="text"
                    className="w-full py-5 outline-none text-white text-center placeholder:text-[#262626] placeholder:text-2xl urbanist uppercase"
                    placeholder="Search for Products"
                  />
                </div>
                {/* button */}
                <button className="bg-white py-4 px-8 font-[300] w-fit cursor-pointer mx-auto">
                  Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const MobileNav = ({ navItems }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="md:hidden bg-white h-[90vh]">
      {navItems.map((item, index) => (
        <div key={index} className="py-2">
          {" "}
          {/* border-b border-[#D4C9BE]  */}
          <div
            className="font-[300] text-[13px] mb-1 flex justify-between items-center cursor-pointer"
            onClick={() => toggleIndex(index)}
          >
            {item.label}
            <span className="text-xs">{activeIndex === index ? "-" : "+"}</span>
          </div>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4 overflow-hidden"
              >
                {item.subItems.map((sub, i) => (
                  <div
                    key={i}
                    className="py-1 text-gray-400 text-sm cursor-pointer hover:text-black"
                  >
                    {sub}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="flex items-center mt-3 gap-5">
        {/* <p className="text-[13px]">PROFILE</p> */}
        <UserRound
          style={{ strokeWidth: 1 }}
          size={20}
          className="cursor-pointer"
        />
        <Heart
          style={{ strokeWidth: 1 }}
          size={20}
          className="cursor-pointer"
        />
        <ShoppingCart
          style={{ strokeWidth: 1 }}
          size={20}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

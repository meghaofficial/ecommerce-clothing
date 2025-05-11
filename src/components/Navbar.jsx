import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

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
              <p className="hover:text-[#D4C9BE] syne">{item.label}</p>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 bg-white text-black rounded shadow-lg py-2"
                  >
                    {item.label === "PRODUCTS" &&
                      item.subItems.map((sub, i) => (
                        <Link
                          to="/products"
                          className="w-full"
                          state={{ subCategory: sub }}
                        >
                          <div
                            key={i}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                          >
                            {sub}
                          </div>
                        </Link>
                    ))}

                    {item.label === "SUPPORT" &&
                      item.subItems.map((sub, i) => (
                        <Link
                          to={`/${sub.toLowerCase()}`}
                          className="w-full"
                          state={{ subCategory: sub }}
                        >
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
            <Link to="/profile">
              <UserRound
                style={{
                  strokeWidth: 1,
                }}
                size={20}
                className="cursor-pointer"
              />
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              <Heart
                style={{ strokeWidth: 1 }}
                size={20}
                className="cursor-pointer"
              />
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <ShoppingCart
                style={{ strokeWidth: 1 }}
                size={20}
                className="cursor-pointer"
              />
            </Link>
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

const MobileNav = ({ navItems, setMenuOpen }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="md:hidden bg-white h-[90vh]">
      <div className="flex my-3 gap-5 flex-col">
        <Link
          to="/profile"
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`${
              location.pathname === "/profile"
                ? "text-white bg-black p-1.5"
                : ""
            }`}
          >
            <UserRound
              style={{ strokeWidth: 2 }}
              size={20}
              className="cursor-pointer"
            />
          </div>
          <p
            className={`${
              location.pathname === "/profile" ? "font-[500]" : "font-[350]"
            } text-[15px]`}
          >
            PROFILE
          </p>
        </Link>
        <Link to="/wishlist" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <Heart
            style={{ strokeWidth: 2 }}
            size={20}
            className="cursor-pointer"
          />
          <p className="font-[350] text-[15px]">WISHLIST</p>
        </Link>
        <Link to="/cart" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <ShoppingCart
            style={{ strokeWidth: 2 }}
            size={20}
            className="cursor-pointer"
          />
          <p className="font-[350] text-[15px]">CART</p>
        </Link>
      </div>
      {navItems.map((item, index) => (
        <div key={index} className="py-2">
          {" "}
          {/* border-b border-[#D4C9BE]  */}
          <div
            className="font-[350] text-[15px] mb-1 flex justify-between items-center cursor-pointer"
            onClick={() => toggleIndex(index)}
          >
            {item.label}
            <span className="text-lg">{activeIndex === index ? "-" : "+"}</span>
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
                    className="py-1 text-gray-600 text-md cursor-pointer hover:text-black"
                  >
                    {sub}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="relative h-1/3">
        <div className="absolute bottom-0 flex items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Searchhhhh..."
            className="border w-full p-4"
          />
          <button className="bg-black text-white p-4 border">Search</button>
        </div>
      </div>
    </div>
  );
};

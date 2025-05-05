import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F3F1F0] py-10 px-8 text-sm text-gray-700">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="font-bold text-lg mb-4 playfair-display">Thejeanscompany</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-400">About Us</li>
            <li className="cursor-pointer hover:text-gray-400">Store Locations</li>
            <li className="cursor-pointer hover:text-gray-400">Collabs</li>
            <li className="cursor-pointer hover:text-gray-400">Careers</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h2 className="font-bold mb-4 playfair-display">SUPPORT</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-400">Shipping & Delivery</li>
            <li className="cursor-pointer hover:text-gray-400">Refund Policy</li>
            <li className="cursor-pointer hover:text-gray-400">FAQ</li>
            <li className="cursor-pointer hover:text-gray-400">Contact Us</li>
            <li className="cursor-pointer hover:text-gray-400">Promotional Terms and Conditions</li>
            <li className="cursor-pointer hover:text-gray-400">Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h2 className="font-bold mb-4 playfair-display">SHOP</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-400">New Arrivals</li>
            <li className="cursor-pointer hover:text-gray-400">Best Sellers</li>
            <li className="cursor-pointer hover:text-gray-400">Wishlist</li>
            <li className="cursor-pointer hover:text-gray-400">My Account</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h2 className="font-bold text-[0.8em] playfair-display">
            JOIN & RECEIVE 20% OFF YOUR FIRST ORDER
          </h2>
          <p className="mb-4 text-gray-500 text-[0.8em]">
            Be the first to know about our latest sales and collection launches
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email"
              className="p-2 border bg-white focus:outline-none flex-1"
            />
            <button className="bg-black text-white px-4 ms-2">
              Send
            </button>
          </div>

          <div className="mt-8">
            <h2 className="font-bold playfair-display text-[0.9em]">CUSTOMER SUPPORT</h2>
            <p className="text-gray-500 text-[0.8em]">10:00am – 7:00pm AEST, Monday – Friday</p>
            <div className="flex space-x-4 mt-4">
              <div className="h-10 w-10 p-1 bg-black flex items-center justify-center cursor-pointer">
                  <FaFacebookF className="text-white" />
              </div>
              <div className="h-10 w-10 p-1 bg-black flex items-center justify-center cursor-pointer">
                  <FaTwitter className="text-white" />
              </div>
              <div className="h-10 w-10 p-1 bg-black flex items-center justify-center cursor-pointer">
                  <FaInstagram className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

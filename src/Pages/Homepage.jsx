import React, { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import lightOnMan from "../assets/light-jeans-on-man.jpg";
import light from "../assets/light.jpg";
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import AutoSlidingImage from "../components/AutoSlidingImage";
import Footer from "../components/Footer";
import ProductCardWithoutHover from "../components/ProductCardWithoutHover";
import axiosPrivate from "../axiosPrivate";
import axiosPublic from "../axiosPublic";

const Homepage = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosPublic.get("/api/all-products");
        const data = response.data.data;
        const sortedData = data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setAllProducts(sortedData);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axiosPublic.get("/api/categories");
        const data = response.data.data;
        setAllCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCategories();
  }, []);

  return (
    <div className="mt-[60px]">
      {/* Carousel Slide */}
      <Carousel />

      {/* New In */}
      {/* className={`mt-10 h-[100vh] ${scrollY >= 50 ? "animate__animated animate__fadeInUp" : ""}`} */}
      <div
        className={`mt-20 md:h-[100vh] h-fit md:block flex items-center justify-center flex-col`}
      >
        <p className="text-center text-[30px] font-semibold playfair-display">
          New In
        </p>
        <div className="md:flex hidden items-center justify-center gap-5 mt-5">
          {allProducts?.slice(0, 4)?.map((d) => {
            return (
              <div key={d?._id}>
                <ProductCard productDetails={d} />
              </div>
            );
          })}
        </div>

        <div className="md:hidden grid sm:grid-cols-2 lg:grid-cols-1 gap-10 pb-20 mt-6">
          {allProducts?.slice(0, 4)?.map((d) => {
            return (
              <div key={d?._id}>
                <ProductCardWithoutHover productDetails={d} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <p className="text-center text-[30px] font-semibold playfair-display my-10">
        Explore Categories
      </p>
      <div className="w-[70%] m-auto mb-10 md:flex items-center gap-4 hidden">
        {allCategories?.slice(0, 3)?.map((d) => {
          return (
            <div key={d?._id}>
              <CategoryCard imgSrc={lightOnMan} categoryDetail={d} />
            </div>
          );
        })}
        {/* Explore more */}
        <div className="relative w-fit overflow-y-hidden overflow-x-hidden">
          <div className="relative w-auto h-auto">
            <img
              src={lightOnMan}
              alt="card"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-white opacity-50 translate-y-0 transition-all duration-300 ease-in-out"></div>

            <div className="text-white absolute top-1/3 w-full flex items-center justify-end flex-col translate-y-0 transition-all duration-300 ease-in-out">
              <p className="bg-black px-6 py-2 my-5 text-[12px] cursor-pointer" onClick={() => navigate("/products")}>
                Explore All
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* for small screen */}
      <div className="md:hidden grid sm:grid-cols-2 lg:grid-cols-1 md:px-0 px-10 gap-10">
        {/* c1 */}
        <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
          <div className="relative group w-auto h-auto">
            <img
              src={lightOnMan}
              alt="card"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-white opacity-50 translate-y-2/3 transition-all duration-300 ease-in-out"></div>

            <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-0 transition-all duration-300 ease-in-out">
              <p className="playfair-display w-auto text-center text-[18px] text-black">
                Man on light
              </p>
              <Link className="bg-black ps-6 pe-4 py-2 my-5 text-[16px] flex">
                Explore{" "}
                <span className="ms-2">
                  <MoveRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* c2 */}
        <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
          <div className="relative group w-auto h-auto">
            <img
              src={lightOnMan}
              alt="card"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-white opacity-50 translate-y-2/3 transition-all duration-300 ease-in-out"></div>

            <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-0 transition-all duration-300 ease-in-out">
              <p className="playfair-display w-auto text-center text-[18px] text-black">
                Man on light
              </p>
              <Link className="bg-black ps-6 pe-4 py-2 my-5 text-[16px] flex">
                Explore{" "}
                <span className="ms-2">
                  <MoveRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* c3 */}
        <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
          <div className="relative group w-auto h-auto">
            <img
              src={lightOnMan}
              alt="card"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-white opacity-50 translate-y-2/3 transition-all duration-300 ease-in-out"></div>

            <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-0 transition-all duration-300 ease-in-out">
              <p className="playfair-display w-auto text-center text-[18px] text-black">
                Man on light
              </p>
              <Link className="bg-black ps-6 pe-4 py-2 my-5 text-[16px] flex">
                Explore{" "}
                <span className="ms-2">
                  <MoveRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* c4 */}
        <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
          <div className="relative group w-auto h-auto">
            <img
              src={lightOnMan}
              alt="card"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-white opacity-50 translate-y-0 transition-all duration-300 ease-in-out"></div>

            <div className="text-white absolute top-1/3 w-full flex items-center justify-end flex-col translate-y-0 transition-all duration-300 ease-in-out">
              <Link className="bg-black ps-6 pe-4 py-3 my-5 text-[16px] flex">
                Explore All{" "}
                <span className="ms-2">
                  <MoveRight />
                </span>
              </Link>
            </div>
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

      {/* contact us, shipping delievery, 30 days return policy */}
      <div className="m-auto md:my-[180px] my-[100px] flex items-center px-6 md:flex-row flex-col">
        <Link className="border border-gray-300 py-10 md:w-1/3 w-full text-center playfair-display text-[0.9em] font-semibold tracking-widest">
          CONTACT US
        </Link>
        <Link className="border border-gray-300 py-10 md:w-1/3 w-full text-center playfair-display text-[0.9em] font-semibold tracking-widest">
          SHIPPING AND DELIEVERY
        </Link>
        <Link className="border border-gray-300 py-10 md:w-1/3 w-full text-center playfair-display text-[0.9em] font-semibold tracking-widest">
          30 DAYS RETURNS
        </Link>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Homepage;

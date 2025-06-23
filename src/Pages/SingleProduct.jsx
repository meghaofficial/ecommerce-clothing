import React, { useEffect, useState } from "react";
import light from "../assets/light.jpg";
import lightOnMan from "../assets/light-jeans-on-man.jpg";
import dark from "../assets/dark.jpg";
import darkOnMan from "../assets/dark-jeans-on-man.jpg";
import ProductCard from "../components/ProductCard";
import ImageZoom from "react-image-zooom";
import Footer from "../components/Footer";
import ProductCardWithoutHover from "../components/ProductCardWithoutHover";
import { useParams } from "react-router-dom";
import axiosPublic from "../axiosPublic";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [currImg, setCurrImg] = useState(light);
  const [productDetail, setProductDetail] = useState(null);
  const { id } = useParams();

  const increaseQuantity = () => setQuantity((q) => q <= productDetail?.stock ? q + 1 : q);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await axiosPublic.get(`/api/product/${id}`);
        setProductDetail(response?.data?.product);
        setCurrImg(response.data.product.imgSrc);
      } catch (error) {
        console.error(error);
      }
    };
    getProductDetail();
  }, []);

  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-8 gap-12">
        {/* Left - Product Image */}
        <div className="flex-1 flex justify-center md:items-start items-center select-none md:flex-row  flex-col-reverse">
          {/* sub images */}
          <div className="flex md:flex-col flex-row items-center md:justify-center md:gap-2 me-2 justify-evenly md:w-auto w-full md:mt-0 mt-4">
            <img
              src={light}
              alt="{darkOnMan}"
              className={`h-[100px] ${currImg === light ? "border" : ""}`}
              onClick={() => setCurrImg(light)}
            />
            <img
              src={lightOnMan}
              alt="{lightOnMan}"
              className={`h-[100px] ${currImg === lightOnMan ? "border" : ""}`}
              onClick={() => setCurrImg(lightOnMan)}
            />
            <img
              src={dark}
              alt="{dark}"
              className={`h-[100px] ${currImg === dark ? "border" : ""}`}
              onClick={() => setCurrImg(dark)}
            />
            <img
              src={darkOnMan}
              alt="{darkOnMan}"
              className={`h-[100px] ${currImg === darkOnMan ? "border" : ""}`}
              onClick={() => setCurrImg(darkOnMan)}
            />
          </div>
          <div className="md:w-[283px] w-full">
            {/* <ImageZoom
              src={currImg}
              alt="Printed V-Neck T-shirt"
              className="object-cover md:w-auto"
              fullWidth={true}
            /> */}
            <img
              src={currImg}
              alt="card"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl urbanist font-semibold mb-4">
            {productDetail?.title}
          </h1>
          <p className="text-3xl text-gray-800 urbanist mb-6">
            Rs. {productDetail?.original_price}
          </p>
          <div className="text-gray-600 mb-6">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: productDetail?.description,
              }}
            ></div>
          </div>

          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center mb-6 gap-4">
            <div className="flex items-center border border-gray-300 py-1.5">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-1 text-lg font-bold cursor-pointer"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-1 text-lg font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="text-[0.9em] flex items-center gap-4">
              <select className="tracking-widest border px-3 py-4 text-[0.8em]">
                <option value="">CHOOSE THE SIZE</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
              </select>
            </div>
          </div>

          <button className="flex items-center gap-2 poppins bg-black text-white px-6 py-3 cursor-pointer hover:bg-white hover:text-black hover:border text-[0.8em] tracking-wider mb-5">
            ADD TO BASKET
          </button>

          {/* Wishlist */}
          <div className="mb-6">
            <a href="#" className="text-black underline hover:text-gray-700">
              + Browse Wishlist
            </a>
          </div>

          {/* Categories */}
          {/* <div className="text-gray-600">
            <span className="font-semibold">Categories:</span> Clothing, Home 1,
            Home 2-2, Home 3, Most popular, Women
          </div> */}
        </div>
      </div>
      <div className="md:my-10">
        <ProductTabs />
      </div>
      {/* related products */}
      <div className="my-10 md:block hidden">
        <p className="text-center text-3xl urbanist font-semibold mb-6">
          Related Products
        </p>
        <div className="flex items-center justify-center gap-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      {/* related products - small screen */}
      <div className="my-10 md:hidden">
        <p className="text-center text-3xl urbanist font-semibold mb-6">
          Related Products
        </p>
        <div className="flex items-center justify-center">
          <div className="md:hidden grid sm:grid-cols-2 lg:grid-cols-1 gap-10 pb-20 mt-6">
            <ProductCardWithoutHover />
            <ProductCardWithoutHover />
            <ProductCardWithoutHover />
            <ProductCardWithoutHover />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function ProductTabs() {
  const tabs = ["Description", "Additional information", "Reviews (0)"];
  const [activeTab, setActiveTab] = useState("Description");

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          <div className="text-gray-600 mt-6 space-y-6 text-[0.8em]">
            <p>
              Etiam cursus condimentum vulputate. Nulla nisi orci, vulputate at
              dolor et, malesuada ultrices nisi. Ut varius ex ut purus
              porttitor, a facilisis orci condimentum. Nullam in elit et sapien
              ornare pellentesque at ac lorem.
            </p>
            <p>
              Sed lobortis elit nec lacus congue tristique. Sed nunc orci,
              imperdiet et accumsan ac, tempor ut ante.
            </p>
          </div>
        );
      case "Additional information":
        return (
          <div className="mt-6 text-[0.8em]">
            <table className="w-full text-left border border-gray-200">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="p-4 bg-gray-100 font-semibold">Color</th>
                  <td className="p-4">Black, Purple</td>
                </tr>
                <tr>
                  <th className="p-4 bg-gray-100 font-semibold">Size</th>
                  <td className="p-4">M, S</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "Reviews (0)":
        return (
          <div className="text-gray-600 mt-6 space-y-8 text-[0.8em]">
            {/* Existing Review */}
            <div className="space-y-6">
              <div>
                <div className="font-semibold">admin</div>
                <div className="text-sm text-gray-400">July 24, 2018</div>
                <div className="flex text-yellow-400 text-lg">{"★★★★★"}</div>
                <p className="text-gray-600">
                  Etiam cursus condimentum vulputate. Nulla nisi orci, vulputate
                  at dolor et, malesuada ultrices nisi. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Impedit eos in odit
                  obcaecati nemo enim nam cumque veritatis consequuntur maxime.
                  Inventore, maxime nobis provident minima repellendus dolores
                  repudiandae porro expedita!
                </p>
              </div>
              <div>
                <div className="font-semibold">admin</div>
                <div className="text-sm text-gray-400">July 24, 2018</div>
                <div className="flex text-yellow-400 text-lg">{"★★★★★"}</div>
                <p className="text-gray-600">
                  Etiam cursus condimentum vulputate. Nulla nisi orci, vulputate
                  at dolor et, malesuada ultrices nisi. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Impedit eos in odit
                  obcaecati nemo enim nam cumque veritatis consequuntur maxime.
                  Inventore, maxime nobis provident minima repellendus dolores
                  repudiandae porro expedita!
                </p>
              </div>
              <div>
                <div className="font-semibold">admin</div>
                <div className="text-sm text-gray-400">July 24, 2018</div>
                <div className="flex text-yellow-400 text-lg">{"★★★★★"}</div>
                <p className="text-gray-600">
                  Etiam cursus condimentum vulputate. Nulla nisi orci, vulputate
                  at dolor et, malesuada ultrices nisi. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Impedit eos in odit
                  obcaecati nemo enim nam cumque veritatis consequuntur maxime.
                  Inventore, maxime nobis provident minima repellendus dolores
                  repudiandae porro expedita!
                </p>
              </div>
            </div>

            <hr className="border-t border-gray-200" />

            {/* Leave a Review Form */}
            <form className="space-y-6">
              <p>
                Your email address will not be published. Required fields are
                marked <span className="text-red-500">*</span>
              </p>

              {/* Rating */}
              <div>
                <label className="block font-semibold mb-2 text-[1.2em]">
                  Your rating <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-1 text-gray-400 text-2xl">
                  {"☆☆☆☆☆".split("").map((star, idx) => (
                    <span key={idx} className="cursor-pointer">
                      {star}
                    </span>
                  ))}
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block font-semibold mb-2 text-[1.2em]">
                  Your review <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full p-4 border bg-gray-100/50 outline-none"
                  rows="6"
                  placeholder="Write your review..."
                ></textarea>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2 text-[1.2em]">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border bg-gray-100/50 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-[1.2em]">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border bg-gray-100/50 outline-none"
                    placeholder="Your email"
                  />
                </div>
              </div>

              {/* Save info */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="saveInfo" className="w-4 h-4" />
                <label htmlFor="saveInfo" className="text-sm">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 text-[0.8em] tracking-wider cursor-pointer hover:bg-white hover:text-black hover:border"
              >
                SUBMIT
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:p-8 px-8 pb-8">
      {/* Tabs */}
      <div className="flex justify-center md:space-x-12 gap-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 md:text-[16px] text-[14px] text-nowrap ${
              activeTab === tab ? "border-b-2 text-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderContent()}
    </div>
  );
}

export default SingleProduct;

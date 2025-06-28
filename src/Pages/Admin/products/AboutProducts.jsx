import { useState } from "react";
import Categories from "./Categories";
import Products from "./Products";

const AboutProducts = () => {

    const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="w-full md:overflow-y-auto md:h-[88vh] urbanist">
      <h2 className="text-[1.3em] font-semibold ps-5 mt-5 mb-2 pb-2 md:block hidden border-b border-b-gray-300">
        About Products
      </h2>

      {/* Tabs */}
      <div className="flex space-x-6 mb-5 px-5 pt-3">
        <button
          className={`pb-0.5 urbanist font-semibold text-[0.9em] cursor-pointer outline-none ${
            activeTab === "categories"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button
          className={`pb-0.5 urbanist text-lg font-semibold text-[0.9em] cursor-pointer outline-none ${
            activeTab === "products"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
      </div>

      {activeTab === "categories" && (
        <>
          <Categories />
        </>
      )}
      {activeTab === "products" && (
        <>
          <Products />
        </>
      )}
    </div>
  )
}

export default AboutProducts

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import axiosPublic from "../axiosPublic";
import { numHighToLow, numLowToHigh } from "../utils/filterFunctions";
import { AnimatePresence, motion } from "framer-motion";
import ProductCardWithoutHover from "../components/ProductCardWithoutHover";

const AllProductsPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState(null);
  const [filteredCat, setFilteredCat] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //   getting all products
  const getAllProducts = async () => {
    try {
      const response = await axiosPublic.get(`/api/all-products`);
      const data = response.data.data;
      const sortedData = data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setAllProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  //   getting all categories
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axiosPublic.get("/api/categories");
        setAllCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCategories();
  }, []);

  const getAllProductsByCategory = async (id) => {
    try {
      const response = await axiosPublic.get(`/api/all-products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  //   product by categories
  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (filteredCat?.length > 0) {
          const all = await Promise.all(
            filteredCat.map((catId) => getAllProductsByCategory(catId))
          );

          // Flatten and merge all category products into one array
          const merged = all.flat();
          setAllProducts(merged);
        } else {
          getAllProducts();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAll();
  }, [filteredCat]);

  // filter

  useEffect(() => {
    if (!filterValue) getAllProducts();
    if (allProducts.length === 0) return;

    let sortedProducts = [...allProducts];

    switch (filterValue) {
      case "ltoh":
        sortedProducts.sort(
          (a, b) => Number(a.original_price) - Number(b.original_price)
        );
        break;
      case "htol":
        sortedProducts.sort(
          (a, b) => Number(b.original_price) - Number(a.original_price)
        );
        break;
      default:
        getAllProducts(); // Reset to original data
        return;
    }

    setAllProducts(sortedProducts);
  }, [filterValue]);

  return (
    <div className="mt-16">
      <p className="text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5">
        ALL
      </p>
      <div className="border-b border-gray-300 w-[90%] h-[10px] m-auto"></div>

      <div className="flex md:flex-col items-center justify-center w-full gap-4 mt-4">
        {/* all categories - for lg screens */}
        <div className="md:flex items-center justify-center hidden">
          <button
            className={`py-2 px-3 ${
              filteredCat.length <= 0 && "bg-black text-white"
            } cursor-pointer`}
            onClick={() => setFilteredCat([])}
          >
            All
          </button>
          {allCategories?.map((d) => {
            return (
              <button
                key={d?._id}
                className={`py-2 px-3 ${
                  filteredCat.includes(d?._id) && "bg-black text-white"
                } cursor-pointer`}
                onClick={() => {
                  if (filteredCat.includes(d?._id)) {
                    const arr = filteredCat?.filter((id) => id !== d?._id);
                    setFilteredCat(arr);
                  } else setFilteredCat((prev) => [...prev, d?._id]);
                }}
              >
                {d?.categoryName}
              </button>
            );
          })}
        </div>
        {/* filters */}
        <div
          className={`flex items-center ${
            allProducts?.length <= 0 ? "justify-center" : "justify-between"
          } w-full px-20 gap-16 mt-0`}
        >
          {allProducts?.length > 0 && (
            <div className="flex gap-5 items-center md:justify-end justify-center md:px-15 md:mt-4 w-[50%] md:w-full">
              {allProducts?.length > 0 && (
                <select
                  className="text-[0.8em] md:w-[20%] border rounded border-gray-500 py-1"
                  onChange={(e) => setFilterValue(e.target.value)}
                  value={filterValue}
                >
                  <option value="">DEFAULT SORTING</option>
                  <option value="ltoh">SORT BY PRICE: LOW TO HIGH</option>
                  <option value="htol">SORT BY PRICE: HIGH TO LOW</option>
                </select>
              )}
            </div>
          )}
          <button
            className={`md:hidden ${
              allProducts?.length <= 0 ? "w-full" : "w-[50%]"
            } md:w-auto px-10 py-1 cursor-pointer flex items-center justify-center text-[0.8em] text-white bg-black`}
            onClick={() => setIsOpen(true)}
          >
            FILTERS
          </button>
        </div>
        {/* for lg screen - all categories (side bar overlay) */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                className="fixed left-0 top-16 w-[180px] h-[89%] bg-white shadow-lg z-20 py-3 px-5 overflow-y-auto"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="text-black flex flex-col gap-2 overflow-y-auto">
                  <button
                    className={`py-2 px-3 ${
                      filteredCat.length <= 0 && "bg-black text-white"
                    } cursor-pointer`}
                    onClick={() => setFilteredCat([])}
                  >
                    All
                  </button>
                  {allCategories?.map((d) => {
                    return (
                      <button
                        key={d?._id}
                        className={`py-2 px-3 ${
                          filteredCat.includes(d?._id) && "bg-black text-white"
                        } cursor-pointer uppercase text-[0.8em] tracking-wider`}
                        onClick={() => {
                          if (filteredCat.includes(d?._id)) {
                            const arr = filteredCat?.filter(
                              (id) => id !== d?._id
                            );
                            setFilteredCat(arr);
                          } else setFilteredCat((prev) => [...prev, d?._id]);
                        }}
                      >
                        {d?.categoryName}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 p-10">
        {allProducts?.length > 0 ? (
          allProducts?.map((prod, index) => (
            <div>
              <div className="md:block hidden">
                <ProductCard key={index} productDetails={prod} />
              </div>
              <div className="md:hidden">
                <ProductCardWithoutHover key={index} productDetails={prod} />
              </div>
            </div>
          ))
        ) : (
          <div className="h-[40vh] flex items-center justify-center">
            <p>No product found!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllProductsPage;

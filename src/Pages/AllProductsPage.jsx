import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import axiosPublic from "../axiosPublic";
import { numHighToLow, numLowToHigh } from "../utils/filterFunctions";

const AllProductsPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState(null);
  const [filteredCat, setFilteredCat] = useState([]);
  const [filterValue, setFilterValue] = useState("");

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

      <div className="flex items-center justify-center w-full gap-4 mt-4">
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
      <div className="flex gap-5 items-center justify-end px-15 mt-10">
        {allProducts?.length > 0 && (
          <select
            className="text-[0.8em] w-[10%] border rounded border-gray-500"
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
          >
            <option value="">DEFAULT SORTING</option>
            <option value="ltoh">SORT BY PRICE: LOW TO HIGH</option>
            <option value="htol">SORT BY PRICE: HIGH TO LOW</option>
          </select>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 p-10">
        {allProducts?.length > 0 ? (
          allProducts?.map((prod, index) => (
            <ProductCard key={index} productDetails={prod} />
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

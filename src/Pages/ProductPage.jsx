import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import axiosPublic from "../axiosPublic";
import { ProductCardSkeleton } from "../components/Skeletons/ProductCardSkeleton";
import ProductCardWithoutHover from "../components/ProductCardWithoutHover";

const ProductPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [prodByCat, setProdByCat] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState({
    categoryLoading: false,
    productLoading: false,
  });
  const [filterValue, setFilterValue] = useState("");

  //   get category details
  useEffect(() => {
    const getCategoryDetails = async () => {
      setLoading((prev) => ({ ...prev, categoryLoading: true }));
      try {
        const response = await axiosPublic.get(`/api/categories/${id}`);
        setCategory(response.data.category);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((prev) => ({ ...prev, categoryLoading: false }));
      }
    };
    getCategoryDetails();
  }, [location.pathname]);

  //   get products by category
  const getAllProductsByCategory = async () => {
    try {
      setLoading((prev) => ({ ...prev, productLoading: true }));
      const response = await axiosPublic.get(`/api/all-products/${id}`);
      setProdByCat(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, productLoading: false }));
    }
  };

  useEffect(() => {
    getAllProductsByCategory();
  }, [id]);

  // filter
  useEffect(() => {
    if (!filterValue) getAllProductsByCategory();
    if (prodByCat.length === 0) return;

    let sortedProducts = [...prodByCat];

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
        getAllProductsByCategory(); 
        return;
    }

    getAllProductsByCategory(sortedProducts);
  }, [filterValue]);

  return (
    <div className="mt-16">
      {loading.categoryLoading ? (
        <div className="mt-[100px] mb-5 animate-pulse">
          <div className="h-[40px] w-[200px] mx-auto bg-gray-300 rounded"></div>
        </div>
      ) : (
        <p className="text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5">
          {category?.categoryName}
        </p>
      )}
      <div className="border-b border-gray-300 w-[90%] h-[10px] m-auto"></div>
      <div className="flex gap-5 items-center md:justify-end justify-center px-15 mt-10">
        {!loading.productLoading && prodByCat?.length > 0 && (
          <select className="text-[0.8em] md:w-[10%] border rounded border-gray-500" onChange={(e) => setFilterValue(e.target.value)} value={filterValue}>
            <option value="default">DEFAULT SORTING</option>
            <option value="ltoh">SORT BY PRICE: LOW TO HIGH</option>
            <option value="htol">SORT BY PRICE: HIGH TO LOW</option>
          </select>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 p-10">
        {loading.productLoading ? (
          [1, 2, 3].map((_, index) => {
            return (
              <div key={index}>
                <ProductCardSkeleton />
              </div>
            );
          })
        ) : (
          <>
            {prodByCat?.length > 0 ? (
              prodByCat?.map((prod, index) => (
                <ProductCardWithoutHover key={index} productDetails={prod} />
              ))
            ) : (
              <div className="h-[40vh] flex items-center justify-center">
                <p>No product found!</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import axiosPublic from "../axiosPublic";

const ProductPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [prodByCat, setProdByCat] = useState([]);
  const [category, setCategory] = useState(null);

  //   get category details
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const response = await axiosPublic.get(`/api/categories/${id}`);
        setCategory(response.data.category);
      } catch (error) {
        console.error(error);
      }
    };
    getCategoryDetails();
  }, [location.pathname]);

//   get products by category
  useEffect(() => {
    const getAllProductsByCategory = async () => {
      try {
        const response = await axiosPublic.get(`/api/all-products/${id}`);
        setProdByCat(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllProductsByCategory();
  }, [id]);

  return (
    <div className="mt-16">
      <p className="text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5">
        {category?.categoryName}
      </p>
      <div className="border-b border-gray-300 w-[90%] h-[10px] m-auto"></div>
      <div className="flex gap-5 items-center justify-end px-15 mt-10">
        {/* <select className="text-[0.8em] border rounded border-gray-500">
          <option value="12">VIEW 12 PRODUCTS</option>
          <option value="24">VIEW 24 PRODUCTS</option>
          <option value="48">VIEW 48 PRODUCTS</option>
          <option value="96">VIEW 96 PRODUCTS</option>
        </select> */}
        {prodByCat?.length > 0 && (
          <select className="text-[0.8em] w-[10%] border rounded border-gray-500">
            <option value="default">DEFAULT SORTING</option>
            <option value="low to high">SORT BY PRICE: LOW TO HIGH</option>
            <option value="high to low">SORT BY PRICE: HIGH TO LOW</option>
          </select>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 p-10">
        {prodByCat?.length > 0 ? prodByCat?.map((prod, index) => (
          <ProductCard key={index} productDetails={prod} />
        )) : (
            <div className="h-[40vh] flex items-center justify-center">
                  <p>No product found!</p>
            </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

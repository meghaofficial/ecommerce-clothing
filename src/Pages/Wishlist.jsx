import React from "react";
import Footer from "../components/Footer";
import WishListCard from "../components/WishListCard";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import axiosPublic from "../axiosPublic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosPrivate from "../axiosPrivate";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ProductCardSkeleton } from "../components/Skeletons/ProductCardSkeleton";

// export const ProductCardSkeleton = () => {
//   return (
//     <div className="w-[250px] h-[350px] animate-pulse bg-gray-200 relative rounded overflow-hidden">
//       {/* Heart icon placeholder */}
//       <div className="absolute right-3 top-3 w-5 h-5 bg-gray-300 rounded-full z-[999]" />

//       {/* Image placeholder */}
//       <div className="w-full h-[350px] bg-gray-300"></div>

//       {/* Overlay content */}
//       <div className="absolute bottom-0 w-full flex flex-col items-center justify-end bg-black bg-opacity-70 px-4 py-4 gap-2">
//         <div className="w-[70%] h-[15px] bg-gray-400 rounded"></div>
//         <div className="w-[50%] h-[15px] bg-gray-400 rounded"></div>
//         <div className="flex gap-3 mt-3">
//           <div className="w-[80px] h-[30px] bg-gray-400 rounded"></div>
//           <div className="w-[100px] h-[30px] bg-gray-400 rounded"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Wishlist = () => {
  const hasFetched = useRef(false);
  const [wishlistedProd, setWishlistedProd] = useState([]);
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(true);
  const wishlistIds = useSelector((state) => state.allWishlist.allWishlist);
  const [isLoading, setIsLoading] = useState(false);

  const removeFromWishList = async (productId) => {
    try {
      const response = await axiosPrivate.delete("/wishlist", {
        data: { productId },
      });
      setIsWishlisted(true);
      dispatch(setAllWishlist(response.data.wishlist));
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (hasFetched.current || !wishlistIds.length) return;

    const getAllProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPublic.get(`/api/all-products`);
        const data = response.data.data;
        const arr = data.filter((d) => wishlistIds.includes(d._id));
        setWishlistedProd(arr);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
    hasFetched.current = true;
  }, [wishlistIds]);

  return (
    <div className="mt-16">
      <p className="text-black uppercase playfair-display text-center text-[2.2em] mt-[100px] mb-5">
        WISHLIST
      </p>
      <div className="border-b border-gray-300 w-[90%] h-[10px] m-auto"></div>
      <div className="md:flex hidden flex-wrap items-center justify-center gap-5 p-10">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : (
          <>
            {wishlistedProd?.length <= 0 ? (
              <>
                <p>No wishlist found</p>
                <a href="">some link</a>
              </>
            ) : (
              wishlistedProd?.map((d, index) => (
                <div key={index}>
                  <WishListCard
                    details={d}
                    isWishlisted={isWishlisted}
                    removeFromWishList={removeFromWishList}
                  />
                </div>
              ))
            )}
          </>
        )}
      </div>
      {/* for sm screen */}
      <div className="md:hidden p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="flex items-center flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {wishlistedProd?.length <= 0 ? (
              <>
                <p>No wishlist found</p>
                <a href="">some link</a>
              </>
            ) : (
              wishlistedProd?.map((d, index) => (
                <div
                  className="relative group w-fit overflow-y-hidden overflow-x-hidden m-auto"
                  key={index}
                >
                  {/* heart */}
                  <div className="absolute right-6 top-6 z-[999]">
                    {isWishlisted ? (
                      <FaHeart
                        className="cursor-pointer text-red-500"
                        onClick={() => removeFromWishList(d._id)}
                      />
                    ) : (
                      <FaRegHeart className="cursor-pointer text-gray-500" />
                    )}
                  </div>
                  <div className="relative group w-[250px] h-auto">
                    <img
                      src={d?.imgSrc}
                      alt="card"
                      className="w-full h-[350px] object-cover"
                    />

                    <div className="absolute inset-0 bg-black opacity-80 translate-y-[200px] transition-all duration-300 ease-in-out"></div>

                    <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-0 transition-all duration-300 ease-in-out">
                      <p className="playfair-display w-auto text-center text-[18px] text-white">
                        {d?.title}
                      </p>
                      <p className="playfair-display w-auto text-center">
                        Rs. {d?.discounted_price || d?.original_price}
                      </p>
                      <div className="flex items-center gap-2 text-[0.8em]">
                        <Link className="bg-black ps-6 pe-4 py-2 my-5 flex tracking-widest">
                          ADD TO BASKET{" "}
                        </Link>
                        <Link className="bg-black px-4 py-2 my-5 flex tracking-widest">
                          VIEW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Wishlist;

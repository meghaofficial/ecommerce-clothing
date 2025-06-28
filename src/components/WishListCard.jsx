import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WishListCard = ({ details, isWishlisted, removeFromWishList }) => {
  return (
    <div className="">
      <div className="relative group w-fit overflow-y-hidden overflow-x-hidden">
        {/* heart */}
        <div className="absolute right-3 top-3 z-[999]">
          {isWishlisted ? (
            <FaHeart
              className="cursor-pointer text-red-500"
              onClick={() => removeFromWishList(details._id)}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer text-gray-500"
            />
          )}
        </div>
        <div className="relative group w-[250px] h-auto">
          <img
            src={details?.imgSrc}
            alt="card"
            className="w-full h-[350px] object-cover"
          />

          <div className="absolute inset-0 bg-black opacity-70 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out"></div>

          <div className="text-white absolute bottom-0 w-full flex items-center justify-end flex-col translate-y-[300px] group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            <p className="playfair-display w-auto text-center">
              {details?.title}
            </p>
            <p className="playfair-display w-auto text-center">
              Rs. {details?.discounted_price || details?.original_price}
            </p>
            <div className="flex gap-3">
              <Link className="bg-black px-6 py-2 my-5 text-[12px]">VIEW</Link>
              <Link to="/" className="bg-black px-6 py-2 my-5 text-[12px]">
                ADD TO BASKET
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;

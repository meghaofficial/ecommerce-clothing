import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCardWithoutHover = ({ productDetails }) => {
  const [images, setImages] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const navigate = useNavigate();

  const nextClick = () => {
    setCurrIndex((prev) => (prev + 1) % images.length);
  };

  const prevClick = () => {
    setCurrIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const arr = [
      { id: productDetails?._id, imgSrc: productDetails?.imgSrc },
      {
        id: productDetails?._id + "" + 1,
        imgSrc: productDetails?.sub_images[0],
      },
    ];
    if (productDetails?.sub_images[1])
      arr.push({
        id: productDetails?._id + "" + 2,
        imgSrc: productDetails?.sub_images[1],
      });
    if (productDetails?.sub_images[2])
      arr.push({
        id: productDetails?._id + "" + 3,
        imgSrc: productDetails?.sub_images[2],
      });
    setImages(arr);
  }, [productDetails]);

  return (
    <>
      <div className="shadow-lg p-3 w-fit select-none">
        {/* main images */}
        <div className="relative">
          <div
            className="absolute top-[150px] left-1 z-[999]"
            onClick={prevClick}
          >
            <ChevronLeft className="text-gray-400 cursor-pointer" />
          </div>

          <div className="relative w-[270px] h-[400px] overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currIndex * 100}%)` }}
            >
              {images.map((image, index) => {
                return (
                  <img src={image.imgSrc} alt="man" className="" key={index} />
                );
              })}
            </div>
          </div>

          <div className="absolute top-[150px] right-1" onClick={nextClick}>
            <ChevronRight className="text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* sub images */}
        <div className="flex items-center justify-center gap-2 mt-3 mb-4">
          {images.map((imageObj, index) => {
            return (
              <div
                className={`w-[60px] h-[60px] overflow-hidden cursor-pointer ${
                  currIndex === index ? "border" : ""
                } `}
                key={imageObj.id}
                onClick={() => setCurrIndex(index)}
              >
                <img
                  src={imageObj.imgSrc}
                  alt="dark"
                  className="w-[60px] h-auto object-cover scale-125"
                />
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-[14px] mt-2">
          {productDetails?.title}
        </p>
        <p className="text-center font-semibold text-[18px]">
          {" "}
          Rs.{" "}
          {productDetails?.discounted_price &&
          productDetails?.discounted_price !== "0"
            ? productDetails?.discounted_price
            : productDetails?.original_price}
        </p>
        <p
          onClick={() => navigate(`/products/${productDetails?._id}`)}
          className="relative text-center flex items-center justify-center underline font-semibold cursor-pointer"
        >
          <span className="relative text-[13px]">SELECT OPTIONS</span>
        </p>
      </div>
    </>
  );
};

export default ProductCardWithoutHover;

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import axiosPrivate from "../../../axiosPrivate";
import axiosPublic from "../../../axiosPublic";

const DisplayProductDetail = ({ isOpen, setIsOpen, activeProduct }) => {
  useEffect(() => {
    console.log(activeProduct);
  }, [activeProduct]);

  return (
    <div className="flex flex-col items-center justify-center z-[9999] relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="shadow-lg w-[90%] h-[90%] overflow-y-hidden bg-[#fafafa]"
            >
              <div className="flex flex-col">
                {/* header & cross */}
                <div className="flex items-center justify-between border-b border-b-gray-300 px-4 pt-3 pb-1">
                  {/* header */}
                  <p className="font-semibold text-[1.2em] w-full mb-1">
                    About this product
                  </p>
                  {/* cross */}
                  <button
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* categoryName, tag */}
                {/* upper text */}
                <div className="flex items-start justify-center flex-col mx-3 overflow-y-auto">
                  <DisplayDetails
                    activeProduct={activeProduct}
                    setIsOpen={setIsOpen}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DisplayDetails = ({ activeProduct, setIsOpen }) => {
  const [displayEdit, setDisplayEdit] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const deleteProduct = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;
    try {
      const response = await axiosPrivate.delete(`/product/${id}`);
      if (response.data.success) {
        toastSuccess(response.data.message);
        await getAllProducts();
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "80%",
    margin: "20px auto",
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  };

  useEffect(() => {
    const getAllTags = async () => {
      try {
        const response = await axiosPrivate.get(`/all-tags`);
        const { data } = response;
        if (data.success) {
          setAllTags(data?.allTags);
          return data.allTags;
        }
        return [];
      } catch (error) {
        console.error("upload failed", error);
      }
    };
    const getAllCategories = async () => {
      try {
        const response = await axiosPublic.get(`/api/categories`);
        const { data } = response;

        if (data.success) {
          setAllCategories(data?.data);
          return data.data;
        }
        return [];
      } catch (error) {
        console.error("upload failed", error);
      }
    };
    getAllTags();
    getAllCategories();
  }, []);

  return (
    <>
      {displayEdit ? (
        <>
          {/* <EditProduct
            activeProduct={activeProduct}
            setDisplayEdit={setDisplayEdit}
            allCategories={allCategories}
            allTags={allTags}
          /> */}
        </>
      ) : (
        <div className="overflow-y-hidden w-full">
          {/* <div className="sticky top-0">
            <p className="font-semibold text-[1.5em] w-full mb-1">
              About this product
            </p>
            <hr />
          </div> */}
          <div className="p-2 text-[0.9em] flex h-[82vh] py-5 overflow-y-auto scrollbar-hidden">
            {/* images */}
            <div className="flex flex-col justify-evenly w-[30%] gap-3 items-center">
              <img
                src={activeProduct?.imgSrc}
                alt="main"
                className="border border-gray-300 p-2 shadow rounded w-[200px] h-auto"
              />
              <div className="flex flex-wrap gap-3 w-full items-center justify-center mt-4">
                {activeProduct?.sub_images?.map((sImgs, index) => {
                  return (
                    <img
                      src={sImgs}
                      alt={sImgs}
                      key={index}
                      className="border border-gray-300 p-2 shadow rounded w-[140px] h-auto"
                    />
                  );
                })}
              </div>
            </div>

            <div className="w-[70%] flex flex-col items-center">
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={cellStyle}>Property</th>
                    <th style={cellStyle}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={cellStyle}>Product Name</td>
                    <td style={cellStyle}>{activeProduct?.title}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Description</td>
                    <td style={cellStyle}>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: activeProduct?.description,
                        }}
                      ></div>
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Product ID</td>
                    <td style={cellStyle}>{activeProduct?._id}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Category</td>
                    <td style={cellStyle}>{activeProduct?.categoryName}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Original Price</td>
                    <td style={cellStyle}>
                      Rs. {activeProduct?.original_price}
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Discount %</td>
                    <td style={cellStyle}>
                      {activeProduct?.discount_percent || 0}%
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Discounted Price</td>
                    <td style={cellStyle}>
                      Rs. {activeProduct?.discounted_price}
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Unique Code</td>
                    <td style={cellStyle}>{activeProduct?.unique_code}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Stock</td>
                    <td style={cellStyle}>{activeProduct?.stock}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Tag</td>
                    <td style={cellStyle}>{activeProduct?.tag}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Total sell of this product</td>
                    <td style={cellStyle}>{activeProduct?.sell_no}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Created at</td>
                    <td style={cellStyle}>
                      {new Date(activeProduct?.createdAt).toLocaleDateString()}{" "}
                      |{" "}
                      {new Date(activeProduct?.createdAt).toLocaleTimeString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Last updated at</td>
                    <td style={cellStyle}>
                      {new Date(activeProduct?.updatedAt).toLocaleDateString()}{" "}
                      |{" "}
                      {new Date(activeProduct?.updatedAt).toLocaleTimeString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex gap-3">
                <button
                  onClick={() => setDisplayEdit(true)}
                  className="bg-black text-white px-3 py-2 cursor-pointer"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => {
                    deleteProduct(activeProduct?._id);
                    setIsOpen(false);
                    window.location.reload();
                  }}
                  className="bg-red-600 text-white px-3 py-2 cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <button className="py-1 invisible">Edit Details</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayProductDetail;

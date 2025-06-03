import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosPrivate from "../../../axiosPrivate";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import axiosPublic from "../../../axiosPublic";

const CreateCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [catID, setCatID] = useState("");
  const [catName, setCatName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   getting details of category by id
  const getCategoryDetails = async () => {
    try {
      const response = await axiosPublic.get(`/api/categories/${id}`);
      if (response.data.success) {
        const { categoryId, categoryName } = response.data.category;
        setCatID(categoryId);
        setCatName(categoryName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   while creating the category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!catID && !catName) return showErrorToast("Both are required");
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post("/categories", {
        categoryId: catID,
        categoryName: catName,
      });

      if (response.data.success) {
        showSuccessToast(response.data.message);
        setCatID("");
        setCatName("");
      } else {
        showErrorToast("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // while updating category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!catID && !catName) return showErrorToast("Both are required");
    setIsLoading(true);
    try {
      const response = await axiosPrivate.put("/categories", {
        id,
        updatedId: catID,
        updatedName: catName,
      });
      if (response.data.success) {
        showSuccessToast(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    location.pathname.includes("update-category") && getCategoryDetails();
  }, []);

  return (
    <div className="w-full overflow-y-auto h-[88vh] urbanist bg-[#f5f5f5]">
      <h2 className="text-[1.3em] font-bold ps-5 mt-5 mb-2 pb-2">
        {location.pathname.includes("update-category") ? "Update" : "Create"}{" "}
        Category
      </h2>

      {/* form */}
      <div className="px-5">
        <form>
          {/* basic information */}
          <div className="bg-white py-4 px-5 border border-gray-300">
            {/* <p className="font-bold text-[1.2em]"> Information</p> */}
            {/* category id */}
            <div className="mt-3 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Category ID
              </span>
              <input
                type="text"
                placeholder="Category ID"
                className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
                value={catID}
                onChange={(e) => setCatID(e.target.value)}
              />
            </div>
            {/* category name */}
            <div className="my-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Category name
              </span>
              <input
                type="text"
                placeholder="Category Name"
                className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white p-3 fixed bottom-0 w-[82%] border-t border-t-gray-300 flex items-center justify-end text-[0.9em] gap-4 pe-5 z-[9999]">
        <button
          className="flex items-center gap-2 cursor-pointer text-red-500 border-[1.5px] border-red-500 px-4 py-2 font-semibold hover:bg-red-500 hover:text-white"
          onClick={() => navigate("/admin/products/")}
        >
          <Trash2 size={15} />
          <span>Discard</span>
        </button>
        <input
          type="submit"
          value={`${location.pathname.includes("update-category") ? `${isLoading ? 'Loading...' : 'Update'}` : `${isLoading ? 'Loading...' : 'Create'}`}`}
          className="cursor-pointer bg-[#2a85ff] text-white px-4 py-2 font-semibold"
          onClick={(e) => {
            location.pathname.includes("update-category")
              ? handleUpdateCategory(e)
              : handleSubmit(e);
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateCategory;

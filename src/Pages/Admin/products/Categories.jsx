import {
  CloudDownload,
  Edit,
  Funnel,
  MoveDown,
  MoveUp,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../../../axiosPublic";
import axiosPrivate from "../../../axiosPrivate";
import Loader from "../../../components/Loader";
import ExportButton from "../../../utils/ExportButton";
import {
  alphabetical,
  numHighToLow,
  numLowToHigh,
  reverseAlphabetical,
} from "../../../utils/filterFunctions";

const Categories = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [indices, setIndices] = useState({
    start: 0,
    end: 2,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // getting all categories
  const getAllCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.get("/api/categories");
      const { data } = response;
      if (data.success) {
        setAllCategories(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // deleting category
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirm) {
      try {
        const response = await axiosPrivate.delete("/categories", {
          data: { id },
        });
        if (response.data.success) {
          toastSuccess(response.data.message);
        } else {
          toastError("Something went wrong");
        }
      } catch (error) {
        console.error(error);
      } finally {
        window.location.reload();
      }
    }
  };

  // search

  const handleSearch = (e) => {
    const searchVal = e.target.value.toLowerCase().trim();

    if (searchVal.length > 0) {
      const searchedProd = filteredCategories?.filter(
        (data) =>
          data?.title?.toLowerCase().includes(searchVal) ||
          data?.categoryName?.toLowerCase().includes(searchVal)
      );
      setFilteredCategories(searchedProd);
    } else {
      setFilteredCategories(
        allCategories?.slice(indices.start, indices.end + 1)
      );
    }
  };

  // pagination

  const ITEMS_PER_PAGE = 10;

  const prevPage = () => {
    setCurrPage((prev) => {
      const newPage = Math.max(prev - 1, 0);
      const start = newPage * ITEMS_PER_PAGE;
      const end = Math.min(start + ITEMS_PER_PAGE, allCategories?.length) - 1;
      setIndices({ start, end });
      return newPage;
    });
    setFilterValue("");
  };

  const nextPage = () => {
    setCurrPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages - 1);
      const start = newPage * ITEMS_PER_PAGE;
      const end = Math.min(start + ITEMS_PER_PAGE, allCategories?.length) - 1;
      setIndices({ start, end });
      return newPage;
    });
    setFilterValue("");
  };

  useEffect(() => {
    const total_pages = Math.ceil(allCategories?.length / ITEMS_PER_PAGE);
    setTotalPages(total_pages);

    // Reset pagination on product list update
    if (allCategories?.length > 0) {
      const start = 0;
      const end = Math.min(ITEMS_PER_PAGE, allCategories?.length) - 1;
      setIndices({ start, end });
      setCurrPage(0);
    }
  }, [allCategories]);

  useEffect(() => {
    setFilteredCategories(allCategories?.slice(indices.start, indices.end + 1));
  }, [allCategories, indices]);

  // filter

  useEffect(() => {
    let arr;
    let newFiltered;
    switch (filterValue) {
      case "atoz":
        arr = filteredCategories?.map((data) => data?.categoryName);
        newFiltered = alphabetical(arr, filteredCategories, "categoryName");
        setFilteredCategories(newFiltered);
        break;
      case "ztoa":
        arr = filteredCategories?.map((data) => data?.categoryName);
        newFiltered = reverseAlphabetical(
          arr,
          filteredCategories,
          "categoryName"
        );
        setFilteredCategories(newFiltered);
        break;
      case "stockhightolow":
        arr = filteredCategories?.map((data) => data?.noOfProducts);
        newFiltered = numHighToLow(arr, filteredCategories, "noOfProducts");
        setFilteredCategories(newFiltered);
        break;
      case "stocklowtohigh":
        arr = filteredCategories?.map((data) => data?.noOfProducts);
        newFiltered = numLowToHigh(arr, filteredCategories, "noOfProducts");
        setFilteredCategories(newFiltered);
        break;

      default:
        setFilteredCategories(
          allCategories?.slice(indices.start, indices.end + 1)
        );
        break;
    }
  }, [filterValue]);

  return (
    <div className="bg-[#f5f5f5] p-4 urbanist text-[0.9em]">
      <div className="bg-white p-4">
        {/* header, export and add product */}
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <h1 className="font-bold text-[1.4em]">Category List</h1>
          <div className="flex items-center gap-3 md:mt-0 mt-3">
            <ExportButton data={allCategories} fileName="categories.xlsx" />
            <div
              className="flex items-center cursor-pointer bg-[#2a85ff] px-4 py-2 text-white"
              onClick={() => navigate("/admin/products/create-category")}
            >
              <Plus size={18} />
              <span className="font-semibold text-[0.9em]">Add Category</span>
            </div>
          </div>
        </div>
        {/* search and filter */}
        <div className="flex items-center gap-3 mt-4">
          <input
            type="text"
            className="bg-[#f5f5f5] outline-none px-4 py-2 w-[100%] text-[0.9em]"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>

        {/* overlay filter */}
        <div className="relative">
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/70 bg-opacity-50 z-40 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <div
            className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-b-gray-300">
              <h2 className="text-lg font-semibold">Filter</h2>
              <button
                onClick={closeSidebar}
                className="bg-gray-100 rounded-full p-1.5 cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-600 hover:text-black" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>

        {/* table - for lg screen */}
        <div className="pt-6 px-1 md:block hidden">
          <div className="grid grid-cols-12 gap-4 text-gray-500 font-semibold border-b border-b-gray-300 pb-2">
            <div className="col-span-3 flex justify-center items-center">
              Category ID
            </div>
            <div className="col-span-3 flex justify-center items-center">
              <span className="me-3">Category name</span>
              <div className="flex">
                <MoveUp
                  size={15}
                  className="cursor-pointer"
                  onClick={() => setFilterValue("atoz")}
                />
                <MoveDown
                  size={15}
                  className="cursor-pointer"
                  onClick={() => setFilterValue("ztoa")}
                />
              </div>
            </div>
            <div className="col-span-3 flex justify-center items-center">
              <span className="me-3">No of products</span>
              <div className="flex">
                <MoveUp
                  size={15}
                  className="cursor-pointer"
                  onClick={() => setFilterValue("stockhightolow")}
                />
                <MoveDown
                  size={15}
                  className="cursor-pointer"
                  onClick={() => setFilterValue("stocklowtohigh")}
                />
              </div>
            </div>
            <div className="col-span-3 flex justify-center items-center">
              Action
            </div>
          </div>

          {isLoading ? (
            <>
              <Loader type="square" />
            </>
          ) : (
            filteredCategories?.map((category) => (
              <div
                key={category?._id}
                className="grid grid-cols-12 gap-4 items-center py-4 border-b border-b-gray-300"
              >
                <div className="col-span-3 font-semibold text-black flex justify-center">
                  {category?.categoryId}
                </div>
                <div className="col-span-3 font-semibold text-black flex justify-center">
                  {category?.categoryName}
                </div>
                <div className="col-span-3 font-semibold text-black flex justify-center">
                  {category?.noOfProducts}
                </div>
                <div className="col-span-3 items-center gap-3 flex justify-center">
                  <Edit
                    size={18}
                    className="text-gray-500 hover:text-black cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/admin/products/update-category/${category?._id}`
                      )
                    }
                  />
                  <Trash2
                    size={18}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={() => handleDelete(category?._id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* card - for sm screen */}
        <div className="md:hidden mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="bg-white shadow border border-gray-200 p-4 w-[90%] animate-pulse"
                  key={index}
                >
                  {/* Category ID */}
                  <div className="h-[12px] w-[60%] bg-gray-300 rounded mb-2"></div>

                  {/* Category Name */}
                  <div className="h-[20px] w-[80%] bg-gray-300 rounded mb-2"></div>

                  {/* Product Count */}
                  <div className="h-[14px] w-[40%] bg-gray-300 rounded mb-4"></div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <div className="h-[32px] w-[70px] bg-gray-200 rounded"></div>
                    <div className="h-[32px] w-[70px] bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col w-full gap-4">
              {filteredCategories?.map((category) => (
              <div
                className="bg-white shadow border border-gray-200 p-4 w-full"
                key={category?._id}
              >
                <p className="text-xs text-gray-500 mb-1">
                  ID:{" "}
                  <span className="text-gray-700">{category.categoryId}</span>
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {category.categoryName}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  Products: {category.noOfProducts || 0}
                </p>

                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-[0.8em] cursor-pointer bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    onClick={() =>
                      navigate(
                        `/admin/products/update-category/${category?._id}`
                      )
                    }
                    title="Edit"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-[0.8em] cursor-pointer bg-red-100 text-red-600 rounded hover:bg-red-200"
                    onClick={() => handleDelete(category?._id)}
                    title="Delete"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* pagination */}
        {!isLoading && (
          <div className="">
            <Pagination
              totalPages={totalPages}
              currPage={currPage}
              prevPage={prevPage}
              nextPage={nextPage}
              totalEntries={allCategories?.length}
              indices={indices}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// is it not using here but for future if there's a use
const FilterContent = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Czhdffjhj" },
    { id: 2, name: "aeiriu" },
    { id: 3, name: "sjdgf" },
    { id: 4, name: "uhijkojkh" },
    { id: 5, name: "hdbjdgyuf" },
  ]);

  return (
    <>
      <div className="p-4 space-y-4 text-[1em] h-[90%] flex flex-col">
        {/* Price Filter */}
        <div>
          <p className="font-semibold text-gray-500">Product Price</p>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="text"
              className="bg-[#f5f5f5] outline-none px-4 py-2 w-full text-[0.9em]"
              placeholder="Start range"
            />
            <span>-</span>
            <input
              type="text"
              className="bg-[#f5f5f5] outline-none px-4 py-2 w-full text-[0.9em]"
              placeholder="End range"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-4 flex-1 overflow-y-auto scrollbar-hidden">
          <p className="font-semibold text-gray-500 mb-4">Product Category</p>
          <div className="flex flex-col gap-2">
            {categories.map((c, index) => (
              <div
                key={c.id}
                className="flex items-center justify-between w-full"
              >
                <span className="font-semibold">{c.name}</span>
                <input type="checkbox" className="cursor-pointer w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

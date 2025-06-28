import {
  CloudDownload,
  Edit,
  Eye,
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
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import ExportButton from "../../../utils/ExportButton";
import {
  alphabetical,
  findingCategoryWise,
  numHighToLow,
  numLowToHigh,
  rangeBetween,
  reverseAlphabetical,
} from "../../../utils/filterFunctions";
import DisplayProductDetail from "./DisplayProductDetail";

const products = [
  {
    name: "Flörven",
    id: "098327NT",
    price: 252.0,
    quantity: 46,
    sales: 387,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230703/zEjF/64a2f7b8eebac147fc48acfc/-473Wx593H-466325670-purple-MODEL.jpg",
  },
  {
    name: "Snövalla",
    id: "098359NT",
    price: 139.0,
    quantity: 28,
    sales: 892,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230703/zEjF/64a2f7b8eebac147fc48acfc/-473Wx593H-466325670-purple-MODEL.jpg",
  },
  {
    name: "Flörven",
    id: "098327NT",
    price: 252.0,
    quantity: 46,
    sales: 387,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230703/zEjF/64a2f7b8eebac147fc48acfc/-473Wx593H-466325670-purple-MODEL.jpg",
  },
  {
    name: "Snövalla",
    id: "098359NT",
    price: 139.0,
    quantity: 28,
    sales: 892,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230703/zEjF/64a2f7b8eebac147fc48acfc/-473Wx593H-466325670-purple-MODEL.jpg",
  },
  {
    name: "Flörven",
    id: "098327NT",
    price: 252.0,
    quantity: 46,
    sales: 387,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230703/zEjF/64a2f7b8eebac147fc48acfc/-473Wx593H-466325670-purple-MODEL.jpg",
  },
  {
    name: "Snövalla",
    id: "098359NT",
    price: 139.0,
    quantity: 28,
    sales: 892,
    image:
      "https://assets.ajio.com/medias/sys_master/root/20230703/zEjF/64a2f7b8eebac147fc48acfc/-473Wx593H-466325670-purple-MODEL.jpg",
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [indices, setIndices] = useState({
    start: 0,
    end: 2,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  // getting all the products
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.get("/api/all-products");
      if (response.data.success) {
        setIsLoading(false);
        setAllProducts(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // deleting product
  const deleteProduct = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;
    try {
      const response = await axiosPrivate.delete(`/product/${id}`);
      if (response.data.success) {
        showSuccessToast(response.data.message);
        await getAllProducts();
      } else {
        showErrorToast(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // pagination

  const ITEMS_PER_PAGE = 10;

  const prevPage = () => {
    setCurrPage((prev) => {
      const newPage = Math.max(prev - 1, 0);
      const start = newPage * ITEMS_PER_PAGE;
      const end = Math.min(start + ITEMS_PER_PAGE, allProducts?.length) - 1;
      setIndices({ start, end });
      return newPage;
    });
    setFilterValue("");
  };

  const nextPage = () => {
    setCurrPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages - 1);
      const start = newPage * ITEMS_PER_PAGE;
      const end = Math.min(start + ITEMS_PER_PAGE, allProducts?.length) - 1;
      setIndices({ start, end });
      return newPage;
    });
    setFilterValue("");
  };

  useEffect(() => {
    const total_pages = Math.ceil(allProducts?.length / ITEMS_PER_PAGE);
    setTotalPages(total_pages);

    // Reset pagination on product list update
    if (allProducts?.length > 0) {
      const start = 0;
      const end = Math.min(ITEMS_PER_PAGE, allProducts?.length) - 1;
      setIndices({ start, end });
      setCurrPage(0);
    }
  }, [allProducts]);

  useEffect(() => {
    getAllProducts();
  }, []);

  // search

  const handleSearch = (e) => {
    const searchVal = e.target.value.toLowerCase().trim();

    if (searchVal.length > 0) {
      const searchedProd = filteredProducts?.filter(
        (data) =>
          data?.title?.toLowerCase().includes(searchVal) ||
          data?.categoryName?.toLowerCase().includes(searchVal)
      );
      setFilteredProducts(searchedProd);
    } else {
      setFilteredProducts(allProducts?.slice(indices.start, indices.end + 1));
    }
  };

  useEffect(() => {
    setFilteredProducts(allProducts?.slice(indices.start, indices.end + 1));
  }, [allProducts, indices]);

  // filter

  useEffect(() => {
    let arr;
    let newFiltered;
    switch (filterValue) {
      case "atoz":
        arr = filteredProducts?.map((data) => data?.title);
        newFiltered = alphabetical(arr, filteredProducts, "title");
        setFilteredProducts(newFiltered);
        break;
      case "ztoa":
        arr = filteredProducts?.map((data) => data?.title);
        newFiltered = reverseAlphabetical(arr, filteredProducts, "title");
        setFilteredProducts(newFiltered);
        break;
      case "pricehightolow":
        arr = filteredProducts?.map((data) => Number(data?.original_price));
        newFiltered = numHighToLow(arr, filteredProducts, "original_price");
        setFilteredProducts(newFiltered);
        break;
      case "pricelowtohigh":
        arr = filteredProducts?.map((data) => Number(data?.original_price));
        newFiltered = numLowToHigh(arr, filteredProducts, "original_price");
        setFilteredProducts(newFiltered);
        break;
      case "stockhightolow":
        arr = filteredProducts?.map((data) => data?.stock);
        newFiltered = numHighToLow(arr, filteredProducts, "stock");
        setFilteredProducts(newFiltered);
        break;
      case "stocklowtohigh":
        arr = filteredProducts?.map((data) => data?.stock);
        newFiltered = numLowToHigh(arr, filteredProducts, "stock");
        setFilteredProducts(newFiltered);
        break;

      default:
        setFilteredProducts(allProducts?.slice(indices.start, indices.end + 1));
        break;
    }
  }, [filterValue]);

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

  return (
    <div className="bg-[#f5f5f5] p-4 urbanist text-[0.9em]">
      <div className="bg-white p-4">
        {/* header, export and add product */}
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <h1 className="font-bold text-[1.4em]">Products List</h1>
          <div className="flex items-center gap-3 md:mt-0 mt-3">
            <ExportButton data={allProducts} fileName="products.xlsx" />
            <div
              className="flex items-center cursor-pointer bg-[#2a85ff] px-4 py-2 text-white"
              onClick={() => navigate("/admin/products/create-product")}
            >
              <Plus size={18} />
              <span className="font-semibold text-[0.9em]">Add Product</span>
            </div>
          </div>
        </div>
        {/* search and filter */}
        <div className="flex items-center gap-3 mt-4">
          <input
            type="text"
            className="bg-[#f5f5f5] outline-none px-4 py-2 md:w-[90%] w-[70%] text-[0.9em]"
            placeholder="Search"
            onChange={handleSearch}
          />
          <div
            className="flex items-center justify-center gap-1 cursor-pointer border border-gray-300 px-4 py-2 text-gray-600 md:w-[10%] w-[30%]"
            onClick={toggleSidebar}
          >
            <Funnel size={18} />
            <span className="font-semibold text-[0.9em]">Filter</span>
          </div>
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
            <FilterContent
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
              setIsOpen={setIsOpen}
              setFilterValue={setFilterValue}
              allCategories={allCategories}
            />
          </div>
        </div>

        {/* table - for lg screen */}
        <div className="pt-6 px-1 md:block hidden">
          <div className="grid grid-cols-12 gap-4 text-gray-500 font-semibold border-b border-b-gray-300 pb-2">
            <div className="col-span-3 flex items-center justify-center">
              <span className="me-3">Product</span>
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
            <div className="col-span-3 flex items-center justify-center">
              <span className="me-3">Price</span>
              <div className="flex">
                <MoveUp
                  size={15}
                  className="cursor-pointer"
                  onClick={() => setFilterValue("pricehightolow")}
                />
                <MoveDown
                  size={15}
                  className="cursor-pointer"
                  onClick={() => setFilterValue("pricelowtohigh")}
                />
              </div>
            </div>
            <div className="col-span-3 flex items-center justify-center">
              <span className="me-3">Stock</span>
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
            <div className="col-span-3 flex items-center ps-11">
              <span className="me-3">Sales</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-[50vh]">
              <p>Loading...</p>
            </div>
          ) : allProducts?.length <= 0 ? (
            <div className="flex items-center justify-center h-[50vh]">
              <p>No product has been added!</p>
            </div>
          ) : (
            filteredProducts?.map((product) => (
              <div
                key={product?._id}
                className="grid grid-cols-12 gap-4 items-center py-4 border-b border-b-gray-300"
              >
                <div className="col-span-3 gap-4 flex items-center ps-5">
                  <img
                    src={product?.imgSrc}
                    alt={product?.title}
                    className="w-14 h-14 rounded-lg"
                  />
                  <div>
                    <div className="font-semibold text-black">
                      {product?.title}
                    </div>
                    <div className="text-sm">ID: {product?.unique_code}</div>
                  </div>
                </div>
                <div className="col-span-3 font-semibold text-black flex items-center justify-center">
                  Rs. {product?.original_price}
                </div>
                <div className="col-span-3 text-black flex items-center justify-center">
                  {product?.stock}
                </div>
                <div className="col-span-3 flex items-center gap-3 justify-center">
                  <div className="text-black font-medium me-6">
                    {product?.sell_no} Sales
                  </div>
                  <Eye
                    size={18}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    // onClick={() => deleteProduct(product?._id)}
                    onClick={() => {
                      setActiveProduct(product);
                      setDisplayDetails(true);
                    }}
                  />
                  <Edit
                    size={18}
                    className="text-gray-500 hover:text-black cursor-pointer"
                    onClick={() => navigate(`update-product/${product?._id}`)}
                  />
                  <Trash2
                    size={18}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={() => deleteProduct(product?._id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* cards - for sm screen */}
        <div className="md:hidden mt-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-6 px-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="bg-white border border-gray-200 shadow p-4 w-full md:w-[30%] animate-pulse" key={index}>
                  {/* Image placeholder */}
                  <div className="w-full h-[180px] bg-gray-300 mb-3"></div>

                  {/* Title placeholder */}
                  <div className="h-[20px] w-[70%] bg-gray-300 mb-2"></div>

                  {/* ID placeholder */}
                  <div className="h-[12px] w-[60%] bg-gray-200 mb-4"></div>

                  {/* Info placeholders */}
                  <div className="space-y-2 mb-4">
                    <div className="h-[14px] w-[50%] bg-gray-300"></div>
                    <div className="h-[14px] w-[40%] bg-gray-300"></div>
                    <div className="h-[14px] w-[45%] bg-gray-300"></div>
                    <div className="h-[14px] w-[35%] bg-gray-300"></div>
                  </div>

                  {/* Button placeholders */}
                  <div className="flex gap-2">
                    <div className="w-[70px] h-[32px] bg-gray-200"></div>
                    <div className="w-[70px] h-[32px] bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              {filteredProducts?.map((product) => (
                <div
                  className="bg-white border border-gray-200 shadow p-4 w-full"
                  key={product?._id}
                >
                  {/* Product Image */}
                  <div className="w-full h-[180px] mb-3 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={product?.imgSrc}
                      alt={product?.title}
                      className="object-contain h-full w-full"
                    />
                  </div>

                  {/* Product Title */}
                  <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                    {product?.title}
                  </h3>

                  {/* Product ID */}
                  <p className="text-xs text-gray-500 mb-2">
                    ID: {product?.unique_code}
                  </p>

                  {/* Price, Stock, Sales, Views */}
                  <div className="text-sm text-gray-700 mb-3 space-y-1">
                    <p>
                      Price: ₹
                      {product.discounted_price || product.original_price}
                    </p>
                    <p>Stock: {product.stock}</p>
                    <p>Sales: {product.sell_no || 0}</p>
                    {/* <p>Views: {product.views || 0}</p> */}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      className="flex text-[0.9em] items-center gap-1 text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      onClick={() => {
                        setActiveProduct(product);
                        setDisplayDetails(true);
                      }}
                    >
                      <Eye size={13} />
                      View
                    </button>
                    <button
                      className="flex text-[0.9em] items-center gap-1 text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      onClick={() => navigate(`update-product/${product?._id}`)}
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                    <button
                      className="flex text-[0.9em] items-center gap-1 text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      onClick={() => deleteProduct(product?._id)}
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

        <DisplayProductDetail
          isOpen={displayDetails}
          setIsOpen={setDisplayDetails}
          activeProduct={activeProduct}
        />

        {/* pagination */}
        {!isLoading && allProducts.length > 0 && (
          <div className="">
            <Pagination
              totalPages={totalPages}
              currPage={currPage}
              prevPage={prevPage}
              nextPage={nextPage}
              totalEntries={allProducts?.length}
              indices={indices}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

const FilterContent = ({
  filteredProducts,
  setFilteredProducts,
  setIsOpen,
  setFilterValue,
  allCategories,
}) => {
  const [range, setRange] = useState({ start: 0, end: 10000000 });
  const [checkedData, setCheckedData] = useState([]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedData((prev) => [...prev, value]);
    } else {
      setCheckedData((prev) => prev.filter((item) => item !== value));
    }
  };

  const applyFilters = () => {
    const ans = rangeBetween(range.start, range.end, filteredProducts);
    const ans2 = findingCategoryWise(filteredProducts, checkedData);

    // Merge and remove duplicates by _id
    const combined = [...ans, ...ans2];
    const uniqueById = Array.from(
      new Map(combined.map((item) => [item._id, item])).values()
    );

    setIsOpen(false);
    setFilteredProducts(uniqueById);
  };

  useEffect(() => {
    if (allCategories?.length > 0) {
      const onlyNames = allCategories.map((d) => d.categoryName);
      setCheckedData(onlyNames);
    }
  }, [allCategories]);

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
              value={range.start}
              onChange={(e) =>
                setRange((prev) => ({ ...prev, start: e.target.value }))
              }
            />
            <span>-</span>
            <input
              type="text"
              className="bg-[#f5f5f5] outline-none px-4 py-2 w-full text-[0.9em]"
              placeholder="End range"
              value={range.end}
              onChange={(e) =>
                setRange((prev) => ({ ...prev, end: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-4 flex-1 overflow-y-auto scrollbar-hidden">
          <p className="font-semibold text-gray-500 mb-4">Product Category</p>
          <div className="flex flex-col gap-2 mb-10">
            {allCategories?.map((c) => (
              <div
                key={c._id}
                className="flex items-center justify-between w-full"
              >
                <span className="font-semibold">{c?.categoryName}</span>
                <input
                  type="checkbox"
                  className="cursor-pointer w-5 h-5"
                  value={c?.categoryName}
                  onChange={handleChange}
                  checked={checkedData.includes(c?.categoryName)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="fixed bottom-5 w-[90%] py-2 cursor-pointer bg-[#2a85ff] text-white"
          onClick={applyFilters}
        >
          Apply filters
        </button>
      </div>
    </>
  );
};

export default Products;

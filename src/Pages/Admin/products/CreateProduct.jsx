import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { customStyles } from "../../../utils/customStyle";
import ImageUploadBox from "../../../components/ImageUploadBox";
import { Trash2 } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosPrivate from "../../../axiosPrivate";
import axiosPublic from "../../../axiosPublic";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import ColorSelector from "../../../components/ColorSelector";

const CreateProduct = () => {
  const navigate = useNavigate();
  const editorRef = useRef();
  const location = useLocation();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [selectedMainImg, setSelectedMainImg] = useState(null);
  const [selectedSubImg1, setSelectedSubImg1] = useState(null);
  const [selectedSubImg2, setSelectedSubImg2] = useState(null);
  const [selectedSubImg3, setSelectedSubImg3] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [productInfo, setProductInfo] = useState({
    title: "",
    category: "",
    tag: "",
    price: "",
    discount: "",
    uniqueCode: "",
    stock: "",
    description: "",
    categoryName: "",
    discountedPrice: "",
  });
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleGetContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getHTML();
    setProductInfo((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // alert("hu")
    const {
      title,
      category,
      tag,
      price,
      discount,
      uniqueCode,
      stock,
      description,
    } = productInfo;
    // if (
    //   !title ||
    //   !category ||
    //   !tag ||
    //   !price ||
    //   !uniqueCode ||
    //   !stock ||
    //   !description ||
    //   !selectedMainImg ||
    //   !selectedSubImg1
    // ) {
    //   showErrorToast("Please fill mandatory field");
    //   return;
    // }
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("imgSrc", selectedMainImg);
      formData.append("sub_images", selectedSubImg1);
      if (selectedSubImg2) {
        formData.append("sub_images", selectedSubImg2);
      }
      if (selectedSubImg3) {
        formData.append("sub_images", selectedSubImg3);
      }
      formData.append("categoryId", productInfo.category);
      formData.append("categoryName", productInfo.categoryName);
      formData.append("title", productInfo.title);
      formData.append("description", productInfo.description);
      formData.append("original_price", productInfo.price);
      formData.append("discount_percent", productInfo.discount);
      formData.append("stock", productInfo.stock);
      formData.append("tag", productInfo.tag);
      formData.append("unique_code", productInfo.uniqueCode);
      selectedSizes.forEach((d) => formData.append("size", d.value));
      formData.append("color", selectedColors);

      const response = await axiosPrivate.post("/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;

      if (data?.success) {
        showSuccessToast("Product created successfully");
        setProductInfo({
          title: "",
          category: "",
          tag: "",
          price: "",
          discount: "",
          uniqueCode: "",
          stock: "",
          description: "",
        });
        setSelectedMainImg(null);
        setSelectedSubImg1(null);
        setSelectedSubImg2(null);
        setSelectedSubImg3(null);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          showErrorToast(error.response.data.message || "User already exists!");
        } else {
          showErrorToast(error.response.data.message || "Something went wrong");
        }
      } else if (error.request) {
        showErrorToast("No response from server");
      } else {
        showErrorToast("Error: " + error.message);
      }
    } finally {
      setUploadLoading(false);
    }
  };

  // getting tags and categories and sizes
  useEffect(() => {
    const getAllTags = async () => {
      try {
        const response = await axiosPrivate.get(`/all-tags`);
        const { data } = response;
        if (data.success) {
          const arr = data?.allTags?.map((d) => {
            const obj = {
              label: d,
              value: d,
            };
            return obj;
          });
          setAllTags(arr);
          return data.allTags;
        }
        return [];
      } catch (error) {
        console.error("failed", error);
      }
    };
    const getAllSizes = async () => {
      try {
        const response = await axiosPrivate.get(`/sizes`);
        const { data } = response;
        if (data.success) {
          const arr = data?.sizes?.map((d) => {
            const obj = {
              label: d,
              value: d,
            };
            return obj;
          });
          setSizes(arr);
          return data.sizes;
        }
        return [];
      } catch (error) {
        console.error("failed", error);
      }
    };
    const getAllCategories = async () => {
      try {
        const response = await axiosPublic.get(`/api/categories`);
        const { data } = response;

        if (data.success) {
          const arr = data?.data?.map((d) => {
            const obj = {
              label: d?.categoryName,
              value: d?._id,
            };
            return obj;
          });
          setAllCategories(arr);
          return data.data;
        }
        return [];
      } catch (error) {
        console.error("upload failed", error);
      }
    };
    getAllTags();
    getAllSizes();
    getAllCategories();
  }, []);

  const handleDiscountPrice = (val) => {
    const dp = productInfo.price - (val / 100) * productInfo.price;
    setProductInfo((prev) => ({ ...prev, discountedPrice: dp }));
  };

  useEffect(() => {
    setProductInfo((prev) => ({
      ...prev,
      category: selectedCategory?.value,
      categoryName: selectedCategory?.label,
    }));
  }, [selectedCategory]);

  useEffect(() => {
    setProductInfo((prev) => ({
      ...prev,
      tag: selectedTag?.label,
    }));
  }, [selectedTag]);

  useEffect(() => {
    handleDiscountPrice(productInfo?.discount);
  }, [productInfo.price]);

  //   getting details of category by id
  const getProductDetails = async () => {
    try {
      const response = await axiosPublic.get(`/api/product/${id}`);
      if (response.data.success) {
        console.log(response.data.product);
        const { product } = response.data.product;
        setProductInfo(prev => ({
          title: product?.title,
          category: product?.categoryId,
          tag: product?.tag,
          price: product?.original_price,
          discount: product?.discount_percent,
          uniqueCode: product?.unique_code,
          stock: product?.stock,
          description: product?.description,
          categoryName: product?.categoryName,
          discountedPrice: product?.discounted_price,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    location.pathname.includes("update-product") && getProductDetails();
  }, []);

  return (
    <div className="w-full overflow-y-auto h-[88vh] urbanist bg-[#f5f5f5]">
      <h2 className="text-[1.3em] font-bold ps-5 mt-5 mb-2 pb-2">
        {location.pathname.includes("update-product") ? "Update" : "Create"}{" "}
        Product
      </h2>

      {/* form */}
      <div className="px-5 pb-16">
        <form>
          {/* basic information */}
          <div className="bg-white py-4 px-5 border border-gray-300">
            <p className="font-bold text-[1.2em]">Basic Information</p>
            {/* product name */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Product name
              </span>
              <input
                type="text"
                placeholder="Product Name"
                className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
                value={productInfo.title}
                onChange={(e) =>
                  setProductInfo((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            {/* product code */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Product code
              </span>
              <input
                type="text"
                placeholder="Product Code"
                className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
                value={productInfo.uniqueCode}
                onChange={(e) =>
                  setProductInfo((prev) => ({
                    ...prev,
                    uniqueCode: e.target.value,
                  }))
                }
              />
            </div>
            {/* description */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Description
              </span>
              <Editor
                ref={editorRef}
                initialValue="Write the description"
                previewStyle="vertical"
                height="200px"
                initialEditType="wysiwyg"
                hideModeSwitch={true}
                useCommandShortcut={true}
                toolbarItems={[
                  ["bold", "italic"],
                  ["link", "image"],
                ]}
                value={productInfo.description}
                onChange={handleGetContent}
              />

              {/* <button onClick={handleGetContent}>Get Content</button>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div> */}
            </div>
          </div>

          {/* pricing */}
          <div className="bg-white py-4 px-5 border border-gray-300 mt-4">
            <p className="font-bold text-[1.2em]">Pricing</p>
            {/* price */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Price (MRP)
              </span>
              <input
                type="text"
                placeholder="Price"
                className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
                value={productInfo.price}
                onChange={(e) =>
                  setProductInfo((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            {/* discount */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Discount %
              </span>
              <input
                type="text"
                placeholder="Discount"
                className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
                value={productInfo.discount}
                onChange={(e) => {
                  setProductInfo((prev) => ({
                    ...prev,
                    discount: e.target.value,
                  }));
                  handleDiscountPrice(e.target.value);
                }}
              />
            </div>
            {/* discounted price */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Discounted Price
              </span>
              <p className="bg-[#f5f5f5] py-3 px-4 text-[0.8em]">
                {productInfo?.discountedPrice}
              </p>
            </div>
          </div>

          {/* attribute */}
          <div className="bg-white py-4 px-5 border border-gray-300 mt-4">
            <p className="font-bold text-[1.2em]">Attribute</p>
            {/* category */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Category
              </span>
              <Select
                defaultValue={selectedCategory}
                onChange={setSelectedCategory}
                options={allCategories}
                isSearchable={false}
                className="w-full text-[0.8em]"
                styles={customStyles}
              />
            </div>
            {/* tag */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Tag
              </span>
              <Select
                defaultValue={selectedTag}
                onChange={setSelectedTag}
                options={allTags}
                isSearchable={false}
                className="w-full text-[0.8em]"
                styles={customStyles}
              />
            </div>
            {/* stock */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Stock
              </span>
              <input
                type="text"
                placeholder="Stock"
                className="bg-[#f5f5f5] py-3 px-4 text-[0.8em] outline-none"
                value={productInfo.stock}
                onChange={(e) =>
                  setProductInfo((prev) => ({ ...prev, stock: e.target.value }))
                }
              />
            </div>
            {/* color */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Color
              </span>
              <ColorSelector
                colors={selectedColors}
                setColors={setSelectedColors}
              />
            </div>
            {/* size */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Size
              </span>
              <Select
                isMulti
                name="colors"
                options={sizes}
                className="basic-multi-select w-full text-[0.8em]"
                classNamePrefix="select"
                styles={customStyles}
                value={selectedSizes}
                onChange={(value) => setSelectedSizes(value)}
              />
            </div>
          </div>

          {/* images */}
          <div className="bg-white py-4 px-5 border border-gray-300 my-4">
            <p className="font-bold text-[1.2em]">Product Image</p>
            {/* image upload */}
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Choose a product main image or simply drag and drop image here.
              </span>
              <ImageUploadBox
                selectedFile={selectedMainImg}
                setSelectedFile={setSelectedMainImg}
              />
            </div>
            <div className="mt-5 flex flex-col gap-2 px-2">
              <span className="text-gray-500 font-semibold text-[0.9em]">
                Choose sub product images or simply drag and drop.
              </span>
              <div className="flex items-center gap-3 ">
                <ImageUploadBox
                  selectedFile={selectedSubImg1}
                  setSelectedFile={setSelectedSubImg1}
                />
                <ImageUploadBox
                  selectedFile={selectedSubImg2}
                  setSelectedFile={setSelectedSubImg2}
                />
                <ImageUploadBox
                  selectedFile={selectedSubImg3}
                  setSelectedFile={setSelectedSubImg3}
                />
              </div>
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
          value={`${uploadLoading ? "Loading..." : "Create"}`}
          className="cursor-pointer bg-[#2a85ff] text-white px-4 py-2 font-semibold"
          onClick={handleAddProduct}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;

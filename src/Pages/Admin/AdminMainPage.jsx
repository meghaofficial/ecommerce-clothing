import { ChevronRight, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../../redux/authSlice";
import Footer from "../../components/Footer";
import { AnimatePresence, motion } from "framer-motion";

const AdminMainPage = () => {
  const [currTab, setCurrTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuthInfo(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/admin":
        setCurrTab(0);
        break;
      case "/admin/products":
        setCurrTab(1);
        break;
      case "/admin/orders":
        setCurrTab(2);
        break;
      case "/admin/accounts":
        setCurrTab(3);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className="mt-16">
      <div className="flex md:flex-row flex-col">
        {/* left - for lg screen */}
        <div className="p-4 md:w-[22%] w-full bg-gray-100/50 border-r border-r-gray-300 md:flex hidden justify-center">
          <div className="md:w-fit w-full flex flex-col gap-3 items-center">
            <div
              className={`${
                currTab === 0 && !location.pathname.includes("products")
                  ? "bg-black text-white"
                  : ""
              } flex items-center justify-between w-full text-[0.7em] ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
              onClick={() => {
                setCurrTab(0);
                navigate("");
              }}
            >
              <span className="me-6 tracking-widest text-nowrap">
                ABOUT USERS
              </span>
              <ChevronRight />
            </div>
            <div
              className={`${
                currTab === 1 || location.pathname.includes("products")
                  ? "bg-black text-white"
                  : ""
              } flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
              onClick={() => {
                setCurrTab(1);
                navigate("products");
              }}
            >
              <span className="me-6 tracking-widest">ABOUT PRODUCTS</span>
              <ChevronRight />
            </div>
            <div
              className={`${
                currTab === 2 || location.pathname === "/admin/orders"
                  ? "bg-black text-white"
                  : ""
              } flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
              onClick={() => {
                setCurrTab(2);
                navigate("orders");
              }}
            >
              <span className="me-6 tracking-widest">ABOUT ORDERS</span>
              <ChevronRight />
            </div>
            <div
              className={`${
                currTab === 3 || location.pathname === "/admin/accounts"
                  ? "bg-black text-white"
                  : ""
              } flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
              onClick={() => {
                setCurrTab(3);
                navigate("accounts");
              }}
            >
              <span className="me-6 tracking-widest">ABOUT ACCOUNTS</span>
              <ChevronRight />
            </div>
            {/* <div
              className={`hover:bg-gray-200 hover:text-black flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer`}
              onClick={handleLogout}
            >
              <span className="me-6 tracking-widest">LOGOUT</span>
              <ChevronRight className="hidden" />
            </div> */}
          </div>
        </div>
        {/* for mobile view */}
        <div className="md:hidden">
          <div className="flex items-center justify-between pt-4 px-4 border-b border-b-gray-300 pb-3">
            <div>
              {currTab === 0 && !location.pathname.includes("products") && (
                <p className="text-[1.2em] font-semibold">About Users</p>
              )}

              {(currTab === 1 || location.pathname.includes("products")) && (
                <p className="text-[1.2em] font-semibold">About Products</p>
              )}

              {(currTab === 2 || location.pathname === "/admin/orders") && (
                <p className="text-[1.2em] font-semibold">About Orders</p>
              )}

              {(currTab === 3 || location.pathname === "/admin/accounts") && (
                <p className="text-[1.2em] font-semibold">About Accounts</p>
              )}
            </div>

            <button
              className={`md:hidden md:w-auto px-3 py-1 cursor-pointer flex items-center justify-center text-[0.8em] text-white bg-black`}
              onClick={() => setIsOpen(true)}
            >
              Open
            </button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />

                {/* Sidebar */}
                <motion.div
                  className="fixed left-0 top-16 w-[180px] h-[89%] bg-white shadow-lg z-20 py-3 px-5 overflow-y-auto"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="md:w-fit w-full flex flex-col gap-3 items-center">
                    <div
                      className={`${
                        currTab === 0 && !location.pathname.includes("products")
                          ? "font-[500]"
                          : ""
                      } flex items-center justify-between w-full text-[0.7em] ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
                      onClick={() => {
                        setCurrTab(0);
                        navigate("");
                        setIsOpen(false);
                      }}
                    >
                      <span className="tracking-widest text-nowrap">
                        ABOUT USERS
                      </span>
                    </div>
                    <div
                      className={`${
                        currTab === 1 || location.pathname.includes("products")
                          ? "font-[500]"
                          : ""
                      } flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
                      onClick={() => {
                        setCurrTab(1);
                        navigate("products");
                        setIsOpen(false);
                      }}
                    >
                      <span className="text-nowrap tracking-widest">
                        ABOUT PRODUCTS
                      </span>
                    </div>
                    <div
                      className={`${
                        currTab === 2 || location.pathname === "/admin/orders"
                          ? "font-[500]"
                          : ""
                      } flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
                      onClick={() => {
                        setCurrTab(2);
                        navigate("orders");
                        setIsOpen(false);
                      }}
                    >
                      <span className="text-nowrap tracking-widest">
                        ABOUT ORDERS
                      </span>
                    </div>
                    <div
                      className={`${
                        currTab === 3 || location.pathname === "/admin/accounts"
                          ? "font-[500]"
                          : ""
                      } flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
                      onClick={() => {
                        setCurrTab(3);
                        navigate("accounts");
                        setIsOpen(false);
                      }}
                    >
                      <span className="text-nowrap tracking-widest">
                        ABOUT ACCOUNTS
                      </span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="w-full flex md:h-full md:overflow-y-auto overflow-y-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;

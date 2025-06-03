import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../../redux/authSlice";
import Footer from "../../components/Footer";

const AdminMainPage = () => {
  const [currTab, setCurrTab] = useState(0);
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
        {/* left */}
        <div className="p-4 md:w-[22%] w-full bg-gray-100/50 border-r border-r-gray-300 flex justify-center">
          <div className="md:w-fit w-full flex flex-col gap-3 items-center">
            <div
              className={`${
                currTab === 0 || location.pathname === '/admin' ? "bg-black text-white" : ""
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
                currTab === 1 || location.pathname === '/admin/products' ? "bg-black text-white" : ""
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
                currTab === 2 || location.pathname === '/admin/orders' ? "bg-black text-white" : ""
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
                currTab === 3 || location.pathname === '/admin/accounts' ? "bg-black text-white" : ""
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
        <div className="w-full flex h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;

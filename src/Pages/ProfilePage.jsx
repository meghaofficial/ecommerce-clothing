import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { setAuthInfo } from "../redux/authSlice";

const ProfilePage = () => {
  const [currTab, setCurrTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuthInfo(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  useEffect(() => {
    switch (location.pathname) {
      case "/profile":
        setCurrTab(0);
        break;
      case "/profile/orders":
        setCurrTab(1);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className="mt-16">
    <div className="flex md:flex-row flex-col">
      {/* left */}
      <div className="p-4 md:w-[22%] w-full bg-gray-100/50 border-r border-r-gray-300 md:flex hidden justify-center">
        <div className="md:w-fit w-full flex flex-col gap-3 items-center">
          <div
            className={`${
              currTab === 0 ? "bg-black text-white" : ""
            } flex items-center justify-between text-[0.7em] ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
            onClick={() => {
              setCurrTab(0);
              navigate("/profile");
            }}
          >
            <span className="me-6 tracking-widest text-nowrap">PERSONAL INFORMATION</span>
            <ChevronRight />
          </div>
          <div
            className={`${
              currTab === 1 ? "bg-black text-white" : ""
            } flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer hover:bg-gray-200 hover:text-black`}
            onClick={() => {
              setCurrTab(1);
              navigate("orders");
            }}
          >
            <span className="me-6 tracking-widest">ORDERS</span>
            <ChevronRight />
          </div>
          <div
            className={`hover:bg-gray-200 hover:text-black flex items-center justify-between text-[0.7em] w-full ps-4 py-3 pe-2 cursor-pointer`}
            onClick={handleLogout}
          >
            <span className="me-6 tracking-widest">LOGOUT</span>
            <ChevronRight className="hidden" />
          </div>
        </div>
      </div>
      <div className="w-full flex p-5 md:h-[90vh] overflow-auto scrollbar-hidden">
        <Outlet />
      </div>
    </div>
    {/* <div className="">
      <Footer />
    </div> */}
    </div>
  );
};

export default ProfilePage;

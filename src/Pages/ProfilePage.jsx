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
      <div className="p-10 md:w-1/3 w-full">
        <div className="border border-gray-300 md:w-fit w-full">
          <div
            className={`${
              currTab === 0 ? "bg-black text-white" : "border border-gray-300"
            } flex items-center justify-between text-[0.7em] w-full ps-4 py-4 pe-2 cursor-pointer`}
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
              currTab === 1 ? "bg-black text-white" : "border border-gray-300"
            } flex items-center justify-between text-[0.7em] w-full ps-4 py-4 pe-2 cursor-pointer`}
            onClick={() => {
              setCurrTab(1);
              navigate("orders");
            }}
          >
            <span className="me-6 tracking-widest">ORDERS</span>
            <ChevronRight />
          </div>
          <div
            className={`border border-gray-300 hover:bg-red-700 hover:text-white flex items-center justify-between text-[0.7em] w-full ps-4 py-4 pe-2 cursor-pointer`}
            onClick={handleLogout}
          >
            <span className="me-6 tracking-widest">LOGOUT</span>
            <ChevronRight className="hidden" />
          </div>
        </div>
      </div>
      <div className="md:px-0 px-10 w-[60%]">
        <Outlet />
      </div>
    </div>
    <div className="mt-10">
      <Footer />
    </div>
    </div>
  );
};

export default ProfilePage;

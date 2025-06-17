import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ProductPage from "./Pages/ProductPage";
import SingleProduct from "./Pages/SingleProduct";
import ScrollToTop from "./utils/scrollToTop";
import ProfilePage from "./Pages/ProfilePage";
import Orders from "./components/Orders";
import Wishlist from "./Pages/Wishlist";
import PersonalInformation from "./components/PersonalInformation";
import PageNotFound from "./Pages/PageNotFound";
import Cart from "./Pages/Cart";
import FAQ from "./Pages/FAQ";
import Contact from "./Pages/Contact";
import loader from "./lotties/loader.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import axiosPrivate from "./axiosPrivate";
import { setAuthInfo } from "./redux/authSlice";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import Loader from "./components/Loader";
import { jwtDecode } from "jwt-decode";
import AdminMainPage from "./Pages/Admin/AdminMainPage";
import AboutUsers from "./Pages/Admin/users/AboutUsers";
import AboutAccounts from "./Pages/Admin/accounts/AboutAccounts";
import AboutOrders from "./Pages/Admin/orders/AboutOrders";
import AboutProducts from "./Pages/Admin/products/AboutProducts";
import CreateProduct from "./Pages/Admin/products/CreateProduct";
import CreateCategory from "./Pages/Admin/products/CreateCategory";
import AllProductsPage from "./Pages/AllProductsPage";

const PublicRoute = ({ isAuthenticated, loading }) => {
  if (loading) {
    return <Loader type="square" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const PrivateRoute = ({ isAuthenticated, loading }) => {
  if (loading) {
    return <Loader type="square" />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AdminProtectedRoute = ({ isAuthenticated, isAuthorized, loading }) => {
  if (loading) {
    return <Loader type="square" />;
  }
  if (!isAuthenticated || !isAuthorized) return <PageNotFound />;
  return <Outlet />;
};

const App = () => {
  const authInfo = useSelector((state) => state.auth.authInfo);
  const isLoggedIn = Boolean(authInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getDetails = async () => {
    try {
      const response = await axiosPrivate.get("/user/profile");
      const user = response.data.user;

      dispatch(
        setAuthInfo({
          fullname: user.fullname,
          email: user.email,
          userId: user._id,
          phone: user.phone,
          address: user.address,
          role: user.role,
        })
      );
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLoading(true);
      try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("accessToken");
          console.log("Session expired, please login again");
          window.location.href = "/login";
        } else {
          // Token still valid
          getDetails().finally(() => setIsLoading(false));
        }
      } catch (error) {
        console.error("Invalid token format", error);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("authInfo", authInfo);
    setIsAuthorized(authInfo?.role === 1001 ? true : false);
  }, [authInfo]);

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader type="square" />
        </div>
      ) : (
        <>
          <Navbar />
          <ScrollToTop />
          <Routes>
            {/* private routes */}
            <Route
              element={
                <PrivateRoute
                  isAuthenticated={isLoggedIn}
                  loading={isLoading}
                />
              }
            ></Route>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/single-product" element={<SingleProduct />} />
            <Route
              path="/profile"
              element={<PrivateRoute isAuthenticated={isLoggedIn} />}
            >
              <Route element={<ProfilePage />}>
                <Route index element={<PersonalInformation />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
            {/* public routes */}
            <Route
              element={
                <PublicRoute isAuthenticated={isLoggedIn} loading={isLoading} />
              }
            >
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Route>

            {/* admin protected routes */}
            <Route
              element={
                <AdminProtectedRoute
                  isAuthorized={isAuthorized}
                  isAuthenticated={isLoggedIn}
                  loading={isLoading}
                />
              }
            >
              <Route path="/admin" element={<AdminMainPage />}>
                <Route index element={<AboutUsers />} />
                <Route path="products" element={<AboutProducts />} />
                <Route path="products/create-product" element={<CreateProduct />} />
                <Route path="products/update-product/:id" element={<CreateProduct />} />
                <Route path="products/create-category" element={<CreateCategory />} />
                <Route path="products/update-category/:id" element={<CreateCategory />} />
                <Route path="orders" element={<AboutOrders />} />
                <Route path="accounts" element={<AboutAccounts />} />
              </Route>
            </Route>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;

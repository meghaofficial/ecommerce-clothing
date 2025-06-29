import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setAllWishlist } from "../redux/wishlistSlice";
import { setAuthInfo } from "../redux/authSlice";
import axiosPrivate from "../axiosPrivate";

export const useAuthInitializer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const authInfo = useSelector((state) => state.auth.authInfo);

  // Validate token and fetch user details
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return;
      }

      setIsLoading(true);

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("accessToken");
          // window.location.href = "/login";
          setIsLoading(false);
          return;
        }

        if (!hasFetched.current) {
          hasFetched.current = true;

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

          setIsAuthorized(user.role === 1001);
        }
      } catch (error) {
        console.error("Auth Error:", error);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  // Fetch wishlist only when authInfo is valid
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!authInfo?.userId) return;
      try {
        const response = await axiosPrivate.get("/wishlist");
        dispatch(setAllWishlist(response.data.wishlist));
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, [authInfo, dispatch]);

  return { isLoading, isAuthenticated: !!authInfo?.userId };
};

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import axiosPublic from "../../axiosPublic";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [displayPass, setDisplayPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      alert("Both email and password required!");
    }
    setIsLoading(true);
    try {
      const { data } = await axiosPublic.post("/auth/login", loginInfo);
      const { success, jwtToken, name } = data;
      if (success) {
        setIsLoading(false);
        localStorage.setItem("accessToken", jwtToken);
        localStorage.setItem("loggedInUser", name);
        navigate("/");
      } else {
        setLoginInfo({ email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6">
        <h1 className="text-[1.2em] playfair-display mb-8 font-semibold tracking-widest">
          LOGIN
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[0.8em] tracking-widest mb-1">
              USERNAME OR EMAIL ADDRESS *
            </label>
            <input
              type="text"
              className="w-full text-[0.8em] mt-1 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={loginInfo.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div className="relative">
            <label className="block text-[0.8em] tracking-widest mb-1">
              PASSWORD *
            </label>
            <input
              type={displayPass ? "text" : "password"}
              className="w-full text-[0.8em] mt-1 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={loginInfo.password}
              onChange={handleChange}
              name="password"
            />
            {displayPass ? (
              <Eye
                className="absolute top-[35px] text-gray-500 cursor-pointer right-4"
                onClick={() => setDisplayPass(false)}
                strokeWidth={1}
                size={18}
              />
            ) : (
              <EyeClosed
                className="absolute top-[35px] text-gray-500 cursor-pointer right-4"
                onClick={() => setDisplayPass(true)}
                strokeWidth={1}
                size={18}
              />
            )}
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="mr-2" id="remember" />
            <label htmlFor="remember" className="text-[0.8em] tracking-widest">
              REMEMBER ME
            </label>
            <button
              type="submit"
              className="ml-auto px-4 py-1 border border-black hover:bg-black hover:text-white transition cursor-pointer"
            >
            {isLoading ? (
                  <Loader type="circle" />
            ) : (
                  <span>Log in</span>
            )}
            </button>
          </div>

          <div>
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Lost your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

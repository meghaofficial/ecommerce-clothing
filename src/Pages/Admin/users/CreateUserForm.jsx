import { useState } from "react";
import axiosPublic from "../../../axiosPublic";
import CreateUserOtpModal from "./CreateUserOtpModal";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

const CreateUserForm = () => {
  const [newUserInfo, setNewUserInfo] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [tempNewUserInfo, setTempNewUserInfo] = useState(null);
  const [tempOtp, setTempOtp] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyNewUserInfo = { ...newUserInfo };
    copyNewUserInfo[name] = value;
    setNewUserInfo(copyNewUserInfo);
  };

  const handleDataTemperorily = (tempOtp) => {
    sessionStorage.setItem("tempOtp", tempOtp);
    setTimeout(() => {
      sessionStorage.removeItem("tempOtp");
    }, 30000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, password } = newUserInfo;
    if (!fullname || !email || !password) {
      return showErrorToast("All fields are required!");
    }
    try {
      const { data } = await axiosPublic.post("/auth/signup", newUserInfo);
      const { success, message } = data;
      if (success) {
        setIsOpen(true);
        showSuccessToast(message);
        setTempNewUserInfo(newUserInfo);
        setTempOtp(data.verificationCode);
        handleDataTemperorily(data.verificationCode);
      } else {
        showErrorToast(message);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setNewUserInfo((prev) => ({ ...prev, email: "" }));
        return toastError(
          error.response.data.message || "Something went wrong."
        );
      } else {
        return toastError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-start justify-center w-full">
      <form className="space-y-5 md:w-1/2 w-[90%] bg-white md:border md:border-gray-300 md:shadow p-6 text-[0.9em]">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2 focus:outline-none focus:ring-black"
            placeholder="Enter user name"
            name="fullname"
            onChange={handleChange}
            value={newUserInfo.fullname}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-4 py-2 focus:outline-none focus:ring-black"
            placeholder="Enter email address"
            name="email"
            onChange={handleChange}
            value={newUserInfo.email}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="text"
            className="w-full border px-4 py-2 focus:outline-none focus:ring-black"
            placeholder="Enter password"
            onChange={handleChange}
            value={newUserInfo.password}
            name="password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-black text-white cursor-pointer hover:bg-gray-800"
          onClick={handleSubmit}
        >
          Create User
        </button>
      </form>
      <CreateUserOtpModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        tempSignupInfo={tempNewUserInfo}
        setSignupInfo={setNewUserInfo}
        setTempSignupInfo={setTempNewUserInfo}
        tempOtp={tempOtp}
      />
      <ToastContainer />
    </div>
  );
};

export default CreateUserForm;

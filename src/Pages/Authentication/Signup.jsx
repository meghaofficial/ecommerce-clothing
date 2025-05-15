import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeClosed, Loader, X } from "lucide-react";
import axiosPublic from "../../axiosPublic";

const Signup = () => {
  const [displayPass, setDisplayPass] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [tempSignupInfo, setTempSignupInfo] = useState(null);
  const [tempOtp, setTempOtp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleDataTemperorily = (tempOtp) => {
    sessionStorage.setItem("tempOtp", tempOtp);
    setTimeout(() => {
      sessionStorage.removeItem("tempOtp");
    }, 30000);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    const { fullname, email, password } = signupInfo;
    if (!fullname || !email || !password) {
      return alert("All fields are required!");
    }
    try {
      const { data } = await axiosPublic.post("/auth/signup", signupInfo);
      const { success, message } = data;
      if (success) {
        setIsOpen(true);
        setTempSignupInfo(signupInfo);
        setTempOtp(data.verificationCode);
        handleDataTemperorily(data.verificationCode);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setSignupInfo((prev) => ({ ...prev, email: "" }));
        return console.error(
          error.response.data.message || "Something went wrong."
        );
      } else {
        return console.log("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white mt-5">
        <div className="w-full max-w-md p-6">
          <h1 className="text-[1.2em] playfair-display mb-8 font-semibold tracking-widest">
            SIGNUP
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[0.8em] tracking-widest mb-1">
                FULL NAME *
              </label>
              <input
                type="text"
                className="w-full text-[0.8em] mt-1 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                value={signupInfo.fullname}
                onChange={handleChange}
                name="fullname"
              />
            </div>

            <div>
              <label className="block text-[0.8em] tracking-widest mb-1">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                className="w-full text-[0.8em] mt-1 border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                value={signupInfo.email}
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
                value={signupInfo.password}
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
              <label
                htmlFor="remember"
                className="text-[0.8em] tracking-widest"
              >
                REMEMBER ME
              </label>
              <button
                type="submit"
                className="ml-auto px-4 py-1 border border-black hover:bg-black hover:text-white transition cursor-pointer"
              >
                {isLoading ? <Loader type="circle" /> : <span>Sign up</span>}
              </button>
            </div>

            <div>
              <Link to="/login" className="text-sm text-gray-600 hover:underline">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>


      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        tempSignupInfo={tempSignupInfo}
        setSignupInfo={setSignupInfo}
        setTempSignupInfo={setTempSignupInfo}
      />
    </>
  );
};

const Modal = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  tempSignupInfo,
  setSignupInfo,
  setTempSignupInfo,
}) => {
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [userEnteredOtp, setUserEnteredOtp] = useState(0);
  const [nullOtpInput, setNullOtpInput] = useState(false);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  const startTimer = () => {
    setTimer(30);

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return intervalId;
  };

  const handleVerify = async () => {
    if (!userEnteredOtp) {
      return alert("Please enter the OTP!");
    }

    try {
      const url = "http://localhost:5000/auth/signup/verify";
      const { data } = await axios.post(url, {
        ...tempSignupInfo,
        otp: userEnteredOtp,
        originalVerificationCode: sessionStorage.getItem("tempOtp"),
      });

      const { success, message } = data;

      if (success) {
        sessionStorage.removeItem("tempOtp");
        setIsValidOtp(true);
        setSignupInfo(tempSignupInfo);
        setTempSignupInfo(null);
      } else {
        setTimer(0);
        setNullOtpInput(true);
        console.log("Incorrect Otp");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setDisableVerifyBtn(true);
        setTimer(0);
        setNullOtpInput(true);
        return alert(error.response.data.message || "Something went wrong.");
      } else {
        return alert("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    let intervalId;
    if (isOpen) {
      intervalId = startTimer();
    }

    return () => clearInterval(intervalId);
  }, [isOpen]);

  useEffect(() => {
    let timeoutId;

    if (isValidOtp) {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
        navigate("/login");
      }, 4500);
    }

    return () => {
      clearTimeout(timeoutId); 
    };
  }, [isValidOtp]);

  useEffect(() => {
    console.log("nullOtpInput", nullOtpInput)
  }, [nullOtpInput])

  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white px-6 pt-6 shadow-lg w-[35%] h-[60%] overflow-y-auto"
            >
              <div className="flex flex-col">
                {/* cross */}
                <div className="flex items-center justify-end">
                  <button
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      setIsValidOtp(false);
                    }}
                  >
                    <X size={24} />
                  </button>
                </div>
                {/* upper text */}
                <div className="flex items-start justify-center flex-col mx-3">
                  <p className="text-[1.2em] font-semibold">
                    {isValidOtp ? "Verified!" : "Verify your account"}
                  </p>
                  {!isValidOtp ? (
                    <p className="my-2 text-[0.8em]">
                      Enter 6-digit code sent to your registered email. This
                      code is valid for next <span>{timer} sec.</span>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                {/* otp */}
                {isValidOtp ? (
                  <div className="flex items-center justify-center">
                    <div className="mt-10">
                      <Loader />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-col mt-6">
                    <OTP
                      timer={timer}
                      setDisableVerifyBtn={setDisableVerifyBtn}
                      setUserEnteredOtp={setUserEnteredOtp}
                      nullOtpInput={nullOtpInput}
                      setNullOtpInput={setNullOtpInput}
                    />
                    <p className="my-6 text-[0.8em]">
                      Didn't get the code?{" "}
                      <span
                        className={`underline ${
                          timer === 0
                            ? "cursor-pointer"
                            : "cursor-default text-gray-400"
                        } select-none`}
                        onClick={async () => {
                          if (timer === 0) {
                            startTimer();
                            setNullOtpInput(true);
                            await handleSubmit();
                          }
                        }}
                      >
                        Resend code
                      </span>
                    </p>
                  </div>
                )}
                {!isValidOtp && (
                  <button
                    className={`font-semibold text-[0.9em] w-full py-2 ${
                      disableVerifyBtn ? "bg-[#00000071]" : "bg-[#000000]"
                    } text-center text-white cursor-pointer`}
                    onClick={handleVerify}
                  >
                    Verify
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const OTP = ({
  timer,
  setDisableVerifyBtn,
  setUserEnteredOtp,
  nullOtpInput,
  setNullOtpInput,
}) => {
  const inputs = Array.from({ length: 6 }, () => useRef(null));

  const clearInputs = () => {
    inputs.forEach((input) => {
      if (input.current) {
        input.current.value = "";
      }
    });
    setDisableVerifyBtn(true);
  };

  const handleChange = (e, idx) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      if (idx < inputs.length - 1) {
        inputs[idx + 1].current.focus();
      }
    } else {
      e.target.value = "";
    }

    const allFilled = inputs.every(
      (input) => input.current?.value.length === 1
    );
    if (allFilled) {
      const userOtp = inputs.map((input) => input.current.value).join("");
      setDisableVerifyBtn(false);
      setUserEnteredOtp(userOtp);
    }
  };

  const handleKeyDown = (e, idx) => {
    // Allow Backspace even if timer === 0
    if (e.key === "Backspace") {
      if (!e.target.value && idx > 0) {
        inputs[idx - 1].current.focus();
      }

      setTimeout(() => {
        const allFilled = inputs.every(
          (input) => input.current?.value.length === 1
        );
        if (!allFilled) {
          setDisableVerifyBtn(true);
        }
      }, 0);
      return; 
    }

    // Block other key inputs if timer === 0
    if (timer === 0) {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {
    if (nullOtpInput) {
      clearInputs();
      setNullOtpInput(false);
    }
  }, [nullOtpInput]);

  return (
    <div className="flex gap-2">
      {inputs.map((inputRef, idx) => (
        <input
          key={idx}
          ref={inputRef}
          type="text"
          maxLength="1"
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-12 h-12 text-2xl text-center outline-2 outline-[#0000005d]"
        />
      ))}
    </div>
  );
};

export default Signup;

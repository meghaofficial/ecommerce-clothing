import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../../../components/Loader";
import { X } from "lucide-react";

const CreateUserOtpModal = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  tempSignupInfo,
  setSignupInfo,
  setTempSignupInfo,
  tempOtp,
}) => {
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [userEnteredOtp, setUserEnteredOtp] = useState(0);
  const [nullOtpInput, setNullOtpInput] = useState(false);
  const [timer, setTimer] = useState(30);
  const [disableVerifyBtn, setDisableVerifyBtn] = useState(true);

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
      return showErrorToast("Please enter the OTP!");
    }

    try {
      const url = "http://localhost:5000/auth/signup/verify";
      const { data } = await axios.post(url, {
        ...tempSignupInfo,
        otp: userEnteredOtp,
        originalVerificationCode: tempOtp, // send entered otp
      });

      const { success, message } = data;

      if (success) {
        showSuccessToast("Account created successfully!");
        sessionStorage.removeItem("tempOtp");
        setIsValidOtp(true);
        setSignupInfo({ fullname: "", email: "", password: "" });
        setTempSignupInfo(null);
      } else {
        setTimer(0);
        setNullOtpInput(true);
        toastError("Incorrect Otp");
        toastError(message);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setDisableVerifyBtn(true);
        setTimer(0);
        setNullOtpInput(true);
        return toastError(
          error.response.data.message || "Something went wrong."
        );
      } else {
        return toastError("Something went wrong. Please try again later.");
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
      }, 4500);
    }

    return () => {
      clearTimeout(timeoutId); // clear timeout if needed
    };
  }, [isValidOtp]);

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
              className="bg-white px-6 pt-6 rounded-lg shadow-lg w-[35%] h-[60%] overflow-y-auto"
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
                      {/* <Lottie
                        animationData={locktick}
                        loop={true}
                        className="w-[100px]"
                      /> */}
                      <Loader type="square" />
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
                    className={`font-semibold text-[0.9em] rounded-md w-full py-2 ${
                      disableVerifyBtn ? "bg-[#12345871]" : "bg-[#123458]"
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
  const [otpValues, setOtpValues] = useState(Array(inputs.length).fill(""));

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
      return; // 👈 Very important: return after handling backspace
    }

    // Block other key inputs if timer === 0
    if (timer === 0) {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {
    if (nullOtpInput) {
      clearInputs(); // clear all inputs
      setNullOtpInput(false); // reset flag
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
          className="w-12 h-12 text-2xl text-center rounded outline-2 outline-[#1234585d]"
        />
      ))}
    </div>
  );
};

export default CreateUserOtpModal
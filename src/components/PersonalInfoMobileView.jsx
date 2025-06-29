import { ChevronRight, Eye, EyeOff } from "lucide-react";
import axiosPrivate from "../axiosPrivate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { City, Country, State } from "country-state-city";
import { setAuthInfo } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const PersonalInfoMobileView = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullname: "",
    phone: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [displayPwd, setDisplayPwd] = useState(false);
  const authInfo = useSelector((state) => state.auth.authInfo);
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressObj, setAddressObj] = useState(null);
  const [loading, setLoading] = useState({
    personalInfoLoading: false,
    emailLoading: false,
    passwordLoading: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   update personal info
  const updatePersonalInfo = async (e) => {
    e.preventDefault();
    const { fullname, phone, area, city, state, country } = personalInfo;
    if (!fullname && !phone && !area && !city && !state && !country) {
      return alert("Anyone is required!");
    }
    try {
      setLoading((prev) => ({ ...prev, personalInfoLoading: true }));
      const response = await axiosPrivate.put("/user/update-personal-info", {
        fullname: personalInfo.fullname,
        phone: personalInfo.phone,
        address: {
          area: personalInfo.area,
          city: personalInfo.city,
          state: personalInfo.state,
          pincode: personalInfo.pincode,
        },
      });
      if (response.data.success) {
        showSuccessToast(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, personalInfoLoading: false }));
    }
  };

  //   update email
  const updateEmail = async (e) => {
    try {
    } catch (error) {}
  };

  //   update password
  const updatePassword = async (e) => {
    try {
    } catch (error) {}
  };

  //   getting states according to selected country
  useEffect(() => {
    const cWiseStates = State.getAllStates().filter(
      (stateInfo) => stateInfo.countryCode === personalInfo?.country
    );
    setStates(cWiseStates);
  }, [personalInfo?.country]);

  //   getting cities according to selected states
  useEffect(() => {
    const sWiseCities = City.getAllCities().filter(
      (cityInfo) =>
        cityInfo.stateCode === personalInfo?.state &&
        cityInfo.countryCode === personalInfo?.country
    );
    setCities(sWiseCities);
  }, [personalInfo?.state]);

  useEffect(() => {
    setAddressObj(authInfo?.address);
    setPersonalInfo((prev) => ({
      ...prev,
      fullname: authInfo?.fullname,
      phone: authInfo?.phone,
      street: authInfo?.address?.street,
      area: authInfo?.address?.area,
      landmark: authInfo?.address?.landmark,
      city: authInfo?.address?.city,
      state: authInfo?.address?.state,
      country: authInfo?.address?.country,
      pincode: authInfo?.address?.pincode,
    }));
  }, [authInfo]);

  // logout

  const handleLogout = () => {
    dispatch(setAuthInfo(null));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="py-6 text-sm text-gray-800">
      {/* Personal Info Form */}
      <form
        className="space-y-4 w-full mx-auto bg-white py-6"
        onSubmit={!loading.personalInfoLoading && updatePersonalInfo}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-base">
            Update Personal Information
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="w-full border p-3"
            value={personalInfo.fullname || ""}
            onChange={(e) =>
              setPersonalInfo((prev) => ({
                ...prev,
                fullname: e.target.value,
              }))
            }
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full border p-3"
            value={personalInfo.phone || ""}
            onChange={(e) =>
              setPersonalInfo((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />
        </div>

        <input
          type="text"
          name="area"
          placeholder="Street No. / Area / Landmark"
          className="w-full border p-3"
          value={personalInfo.area || ""}
          onChange={(e) =>
            setPersonalInfo((prev) => ({ ...prev, area: e.target.value }))
          }
        />

        <div className="flex flex-col md:flex-row gap-3">
          <select
            className="w-full border p-3"
            value={personalInfo.country}
            onChange={(e) =>
              setPersonalInfo((prev) => ({
                ...prev,
                country: e.target.value,
              }))
            }
          >
            <option value="">Select Country</option>
            {countries?.map((country, index) => (
              <option key={index} value={country.isoCode}>
                {country.name.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-3"
            value={personalInfo.state}
            onChange={(e) =>
              setPersonalInfo((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
          >
            <option value="">Select State</option>
            {states?.map((state, index) => (
              <option key={index} value={state.isoCode}>
                {state.name.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-3"
            value={personalInfo.city}
            onChange={(e) =>
              setPersonalInfo((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
          >
            <option value="">Select District / City</option>
            {cities?.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value={
            loading.personalInfoLoading
              ? "Loading..."
              : "Update Personal Information"
          }
          className="w-fit bg-black text-white p-3 font-medium cursor-pointer hover:bg-gray-900 transition"
        />
      </form>

      {/* Email Update Form */}
      <form
        className="space-y-4 w-full mx-auto bg-white py-6"
        onSubmit={!loading.emailLoading && updateEmail}
      >
        <h2 className="font-semibold text-base mb-2">Update Email</h2>
        <div className="flex items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3"
          />
          <input
            type="submit"
            value={loading.emailLoading ? "Loading..." : "Submit"}
            className="w-fit bg-black text-white p-3 font-medium cursor-pointer hover:bg-gray-900 transition"
          />
        </div>
      </form>

      {/* Password Update Form */}
      <form
        className="space-y-4 w-full mx-auto bg-white py-6"
        onSubmit={!loading.passwordLoading && updatePassword}
      >
        <h2 className="font-semibold text-base mb-2">Update Password</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <input
              type={displayPwd ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="w-full border p-3"
            />
            {displayPwd ? (
              <EyeOff
                onClick={() => setDisplayPwd(false)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                size={18}
              />
            ) : (
              <Eye
                onClick={() => setDisplayPwd(true)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                size={18}
              />
            )}
          </div>
          <input
            type="submit"
            value={loading.passwordLoading ? "Loading..." : "Submit"}
            className="w-fit bg-black text-white p-3 font-medium cursor-pointer hover:bg-gray-900 transition"
          />
        </div>
      </form>
      <div
        className={`hover:bg-black hover:text-white border mt-4 flex items-center justify-center text-[0.9em] w-full ps-4 py-3 pe-2 cursor-pointer`}
        onClick={handleLogout}
      >
        <span className="tracking-widest">LOGOUT</span>
        <ChevronRight className="hidden" />
      </div>
    </div>
  );
};

export default PersonalInfoMobileView;

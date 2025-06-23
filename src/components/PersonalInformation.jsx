import { Eye, EyeOff, Mail, MapPin, Pencil, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import axiosPrivate from "../axiosPrivate";
import { showSuccessToast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import PersonalInfoMobileView from "./PersonalInfoMobileView";

const PersonalInformation = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [displayPwd, setDisplayPwd] = useState(false);
  const authInfo = useSelector((state) => state.auth.authInfo);
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [addressObj, setAddressObj] = useState(null);
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

  const updatePersonalInfo = async (e) => {
    e.preventDefault();
    const { fullname, phone, area, city, state, country } = personalInfo;
    if (!fullname && !phone && !area && !city && !state && !country) {
      return alert("Anyone is required!");
    }
    try {
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
    }
  };

  useEffect(() => {
    const cWiseStates = State.getAllStates().filter(
      (stateInfo) => stateInfo.countryCode === personalInfo?.country
    );
    setStates(cWiseStates);
  }, [personalInfo?.country]);

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

  return (
    <div className=" w-full overflow-y-auto md:h-fit">
      {!isEdit ? (
        <>
        <div className="p-6 shadow border relative border-gray-300 flex items-center justify-between bg-white w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-700">
                {authInfo?.fullname?.charAt(0) || "A"}
              </div>
              {/* Info */}
              <div>
                <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {authInfo?.fullname || "Admin"}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {authInfo?.email || "admin@admin.com"}
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-6 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                +91 {authInfo?.phone || "xxxxxxxxxx"}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {addressObj
                  ? `${addressObj?.area || ""} ${
                      addressObj?.city || ""
                    }`.trim() || "Your address"
                  : "Your address"}
              </div>
            </div>
          </div>

          {/* Edit Icon */}
          <Pencil
            className="w-5 h-5 text-gray-600 cursor-pointer md:block hidden absolute right-6 top-6 hover:text-blue-500"
            onClick={() => setIsEdit(true)}
          />
        </div>
        {/* for mobile */}
        <PersonalInfoMobileView/>
        </>
      ) : (
        <div className="md:block hidden">
          <X
            size={18}
            className="cursor-pointer sticky top-0"
            onClick={() => setIsEdit(false)}
          />
          <div className="overflow-y-auto relative max-h-[80vh] px-10 py-6 text-sm text-gray-800 scrollbar-hidden">
            {/* Personal Info Form */}
            <form
              className="space-y-4 w-full mx-auto bg-white shadow p-6"
              onSubmit={updatePersonalInfo}
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
                  value={personalInfo.fullname}
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
                  value={personalInfo.phone}
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
                value={personalInfo.area}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({ ...prev, area: e.target.value }))
                }
              />

              <div className="flex flex-col md:flex-row gap-3">
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
              </div>

              <input
                type="submit"
                value="Update Personal Information"
                className="w-fit bg-black text-white p-3 font-medium cursor-pointer hover:bg-gray-900 transition"
              />
            </form>

            {/* Email Update Form */}
            <div className="flex gap-4 mt-4">
              <form className="space-y-4 w-full mx-auto bg-white shadow p-6">
                <h2 className="font-semibold text-base mb-2">Update Email</h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-3"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="w-fit bg-black text-white p-3 font-medium cursor-pointer hover:bg-gray-900 transition"
                />
              </form>

              {/* Password Update Form */}
              <form className="space-y-4 w-full mx-auto bg-white shadow p-6">
                <h2 className="font-semibold text-base mb-2">
                  Update Password
                </h2>
                <div className="relative">
                  <input
                    type={displayPwd ? "text" : "password"}
                    placeholder="Password"
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
                  value="Submit"
                  className="w-fit bg-black text-white p-3 font-medium cursor-pointer hover:bg-gray-900 transition"
                />
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PersonalInformation;

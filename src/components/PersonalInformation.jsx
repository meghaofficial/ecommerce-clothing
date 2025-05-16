import { Eye, EyeOff, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import axiosPrivate from "../axiosPrivate";

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
        // window.location.reload();
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
    setPersonalInfo((prev) => ({ ...prev, fullname: authInfo?.fullname, phone: authInfo?.phone, street: authInfo?.address?.street, area: authInfo?.address?.area, landmark: authInfo?.address?.landmark, city: authInfo?.address?.city, state: authInfo?.address?.state, country: authInfo?.address?.country, pincode: authInfo?.address?.pincode }));
  }, [authInfo]);

  return (
    <div className="md:p-10 p-5 w-full border border-gray-300 md:mt-10 md:me-10 overflow-y-auto md:h-[75vh]">
      {!isEdit ? (
        <div className="tracking-wider">
          <div className="flex items-center justify-end cursor-pointer">
            <Pencil size={18} onClick={() => setIsEdit(true)} />
          </div>
          <p className="text-[1.2em]" title="Full Name">
            {authInfo?.fullname}
          </p>
          <p className="text-[1em] my-2" title="Email">
            {authInfo?.email}
          </p>
          <p className="text-[1em] my-2" title="Phone">
            +91 {authInfo?.phone || "xxxxxxxxxx"}
          </p>
          <p className="text-[1em] my-2" title="Address">
            {addressObj
              ? `${addressObj?.area || "Your Area"} | ${
                  addressObj?.city || "Your City"
                } | ${addressObj?.state || "Your State"} | ${
                  addressObj?.country || "Your Country"
                } | ${addressObj?.pincode || "Your Pincode"}`
              : "Your address"}
          </p>
        </div>
      ) : (
        <>
          {/* personal info */}
          <form
            className="flex flex-col gap-4 text-[0.9em]"
            onSubmit={updatePersonalInfo}
          >
            <div className="flex items-center justify-end cursor-pointer">
              <X size={18} onClick={() => setIsEdit(false)} />
            </div>
            <div className="flex w-[70%] items-center">
              <p className="text-nowrap me-2">UPDATE PERSONAL INFORMATION</p>
              <div className="border-b h-1 w-full"></div>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 md:w-[70%]"
              value={personalInfo.fullname}
              onChange={(e) =>
                setPersonalInfo((prev) => ({
                  ...prev,
                  fullname: e.target.value,
                }))
              }
              name="fullname"
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-3 md:w-[70%]"
              value={personalInfo.phone}
              onChange={(e) =>
                setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))
              }
              name="phone"
            />
            <input
              type="text"
              placeholder="Street No./Area/LandMark"
              className="border p-3 md:w-[70%]"
              value={personalInfo.area}
              onChange={(e) =>
                setPersonalInfo((prev) => ({ ...prev, area: e.target.value }))
              }
              name="area"
            />
            <div className="flex items-center md:w-[70%] gap-2 md:flex-row flex-col">
              <select
                className="border p-3 w-full tracking-wider"
                onChange={(e) => setPersonalInfo((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))}
                value={personalInfo.city}
              >
                <option value="">SELECT DISTRICT/CITY</option>
                {cities?.map((city, index) => {
                  return (
                    <option value={city.name} key={index}>
                      {city.name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
              <select
                className="border p-3 w-full tracking-wider"
                onChange={(e) => setPersonalInfo((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))}
                value={personalInfo.state}
              >
                <option value="">SELECT STATE</option>
                {states?.map((state, index) => {
                  return (
                    <option value={state.isoCode} key={index}>
                      {state.name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
              <select
                className="border p-3 w-full tracking-wider"
                onChange={(e) => setPersonalInfo((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))}
                value={personalInfo.country}
              >
                <option value="">SELECT COUNTRY</option>
                {countries?.map((country, index) => {
                  return (
                    <option value={country.isoCode} key={index}>
                      {country.name.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="submit"
              value="UPDATE PERSONAL INFORMATION"
              className="bg-black text-white md:w-[70%] p-3 cursor-pointer"
            />
          </form>
          {/* email */}
          <form className="flex flex-col gap-4 mt-[70px] text-[0.9em]">
            <div className="flex md:w-[70%] items-center">
              <p className="text-nowrap me-2">UPDATE EMAIL</p>
              <div className="border-b h-1 w-full"></div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="border p-3 md:w-[70%]"
            />
            <input
              type="submit"
              value="SUBMIT"
              className="bg-black text-white md:w-[70%] p-3 cursor-pointer"
            />
          </form>
          {/* password */}
          <form className="flex flex-col gap-4 mt-[70px] text-[0.9em]">
            <div className="flex md:w-[70%] items-center">
              <p className="text-nowrap me-2">UPDATE PASSWORD</p>
              <div className="border-b h-1 w-full"></div>
            </div>
            <div className="relative md:w-[70%]">
              <input
                type={displayPwd ? "text" : "password"}
                placeholder="Password"
                className="border p-3 w-full"
              />
              {displayPwd ? (
                <EyeOff
                  onClick={() => setDisplayPwd(false)}
                  className="cursor-pointer absolute top-1/3 right-2 bg-white"
                  size={18}
                  style={{ strokeWidth: 1 }}
                />
              ) : (
                <Eye
                  onClick={() => setDisplayPwd(true)}
                  className="cursor-pointer absolute top-1/3 right-2 bg-white"
                  size={18}
                  style={{ strokeWidth: 1 }}
                />
              )}
            </div>
            <input
              type="submit"
              value="SUBMIT"
              className="bg-black text-white md:w-[70%] p-3 cursor-pointer"
            />
          </form>
        </>
      )}
    </div>
  );
};

export default PersonalInformation;

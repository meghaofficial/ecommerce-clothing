import axios from "axios";
import { Eye, EyeOff, Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Country, State, City }  from 'country-state-city';

const PersonalInformation = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [displayPwd, setDisplayPwd] = useState(false);
  const authInfo = useSelector((state) => state.auth.authInfo);
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  useEffect(() => {
    const cWiseStates = State.getAllStates().filter(stateInfo => stateInfo.countryCode === selectedCountry);
    setStates(cWiseStates);
  }, [selectedCountry]);


  useEffect(() => {
    const sWiseCities = City.getAllCities().filter(cityInfo => cityInfo.stateCode === selectedState && cityInfo.countryCode === selectedCountry);
    setCities(sWiseCities);
  }, [selectedState])


  return (
    <div className="md:p-10 p-5 w-full border border-gray-300 md:mt-10 md:me-10 overflow-y-auto md:h-[75vh]">
    {/* {console.log("countries", countries[0])}
    {console.log("states", states)}
    {console.log("citytes", City.getAllCities())} */}
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
            {authInfo?.address || "Your address"}
          </p>
        </div>
      ) : (
        <>
          {/* personal info */}
          <form className="flex flex-col gap-4 text-[0.9em]">
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
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-3 md:w-[70%]"
            />
            <input
              type="text"
              placeholder="Street No./Area/LandMark"
              className="border p-3 md:w-[70%]"
            />
            <div className="flex items-center md:w-[70%] gap-2 md:flex-row flex-col">
              <select className="border p-3 w-full tracking-wider" onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                <option value="">SELECT DISTRICT/CITY</option>
                {cities?.map((city, index) => {
                  return (
                    <option value={city.name} key={index}>{city.name.toUpperCase()}</option>
                  )
                })}
              </select>
              <select className="border p-3 w-full tracking-wider" onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
                <option value="">SELECT STATE</option>
                {states?.map((state, index) => {
                  return (
                    <option value={state.isoCode} key={index}>{state.name.toUpperCase()}</option>
                  )
                })}
              </select>
              <select className="border p-3 w-full tracking-wider" onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
                <option value="">SELECT COUNTRY</option>
                {countries?.map((country, index) => {
                  return (
                    <option value={country.isoCode} key={index}>{country.name.toUpperCase()}</option>
                  )
                })}
              </select>
            </div>
            <input
              type="submit"
              value="SUBMIT"
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
